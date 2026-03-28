import os
import json
import re
import subprocess
from pathlib import Path
import time

def parse_document_locally(file_path):
    ext = file_path.suffix.lower()
    if ext in ['.md', '.txt', '.csv']:
        try:
            return file_path.read_text(errors='ignore')
        except Exception:
            return ""
    elif ext == '.pdf':
        try:
            # Attempt to use liteparse if available, otherwise fallback to pdftotext or placeholder
            result = subprocess.run(['liteparse', str(file_path)], capture_output=True, text=True)
            if result.returncode == 0 and result.stdout:
                return result.stdout
            return f"[LITEPARSE OUTPUT FOR {file_path.name}]"
        except FileNotFoundError:
            return f"[PDF CONTENT FOR {file_path.name} - liteparse not found]"
    elif ext in ['.mp3', '.mp4', '.wav']:
        try:
            result = subprocess.run(['libre', 'transcribe', str(file_path)], capture_output=True, text=True)
            if result.returncode == 0 and result.stdout:
                return result.stdout
            return f"[AUDIO/VIDEO TRANSCRIPTION FOR {file_path.name}]"
        except FileNotFoundError:
            return f"[TRANSCRIPTION FOR {file_path.name} - libre not found]"
    elif ext in ['.png', '.jpg', '.jpeg']:
        try:
            result = subprocess.run(['libre', 'analyze', str(file_path)], capture_output=True, text=True)
            if result.returncode == 0 and result.stdout:
                return result.stdout
            return f"[IMAGE ANALYSIS FOR {file_path.name}]"
        except FileNotFoundError:
            return f"[IMAGE CONTENT FOR {file_path.name} - libre not found]"
    return ""

def summarize_locally(raw_text):
    if len(raw_text) < 2000:
        return raw_text
    try:
        # Attempt to use libre if available
        result = subprocess.run(['libre', 'summarize', raw_text[:5000]], capture_output=True, text=True)
        if result.returncode == 0 and result.stdout:
            return result.stdout
    except FileNotFoundError:
        pass
    return raw_text[:2000] + " ... [TRUNCATED FOR TOKENS]"

def extract_anchors(raw_text):
    return {
        "salesforce_objects": list(set(re.findall(r'\b[A-Za-z0-9_]+__c\b', raw_text))),
        "apex_classes": list(set(re.findall(r'\b[A-Z][a-zA-Z0-9_]*(?:Controller|Service|TriggerHandler|Repository)\b', raw_text))),
        "nakadi_events": list(set(re.findall(r'nakadi\.zalando\.net/#types/([a-zA-Z0-9.-]+)', raw_text))),
        "jira_tickets": list(set(re.findall(r'\b(?:PPBCRM|PPT|CRM)-\d+\b', raw_text)))
    }

def extract_relationships_mock(filename, summary, anchors, raw_text):
    # This acts as the placeholder for the Gemini API call.
    # PROMPT TO GEMINI WOULD BE:
    # "Analyze this document. Extract relationships. ALSO determine if this document contains OUTDATED info 
    # (e.g., mentions of deprecated systems, old years like 2018, or explicit 'deprecated' tags). 
    # Return a JSON object with 'relationships', 'is_outdated' (boolean), and 'outdated_reason'."
    
    relations = []
    is_outdated = False
    outdated_reason = ""
    
    # Simple mock logic for outdated analysis:
    if "2018" in raw_text or "deprecated" in raw_text.lower() or "old" in raw_text.lower():
        is_outdated = True
        outdated_reason = "Contains references to older years or deprecation keywords."
    
    # Link doc to its anchors
    for obj in anchors.get("salesforce_objects", []):
        relations.append({"source": filename, "target": obj, "relation": "MENTIONS_SF_OBJECT"})
    for cls in anchors.get("apex_classes", []):
        relations.append({"source": filename, "target": cls, "relation": "MENTIONS_APEX_CLASS"})
    for evt in anchors.get("nakadi_events", []):
        relations.append({"source": filename, "target": evt, "relation": "MENTIONS_NAKADI_EVENT"})
    for tkt in anchors.get("jira_tickets", []):
        relations.append({"source": filename, "target": tkt, "relation": "TRACKED_BY_TICKET"})
        
    return {"relationships": relations, "is_outdated": is_outdated, "outdated_reason": outdated_reason}

def run_kg_agent(folders):
    print(f"\\n🕵️‍♂️ Initializing Multi-Modal KG Agent with Deep Routing & Outdated Analysis...")
    graph_data = {"nodes": [], "edges": []}
    outdated_data = [] # Store outdated info separately
    
    for folder_path in folders:
        target_dir = Path(folder_path)
        if not target_dir.exists():
            print(f"⚠️ Directory not found: {folder_path}")
            continue
            
        print(f"\\nScanning directory (recursively): {target_dir}")
        # os.walk naturally traverses all deeply routed subfolders
        for root, _, files in os.walk(target_dir):
            for file in files:
                if file.startswith('.'): 
                    continue
                
                file_path = Path(root) / file
                
                # 1. Local Extraction
                raw_text = parse_document_locally(file_path)
                if not raw_text.strip(): continue
                
                # 2. Extract Hard Anchors
                anchors = extract_anchors(raw_text)
                
                # 3. Local Summarization
                summary = summarize_locally(raw_text)
                
                # 4. Gemini Extraction & Analysis (Mocked for now)
                analysis = extract_relationships_mock(file, summary, anchors, raw_text)
                
                # If outdated, store it in the outdated archive instead of cluttering the main graph
                if analysis["is_outdated"]:
                    outdated_data.append({
                        "file_path": str(file_path),
                        "reason": analysis["outdated_reason"],
                        "summary": summary
                    })
                    # Mark the node as archived in the main graph so we know it exists but is old
                    graph_data["nodes"].append({"id": file, "label": file, "type": "Document", "status": "outdated"})
                else:
                    # Active document node
                    graph_data["nodes"].append({"id": file, "label": file, "type": "Document", "status": "active"})
                
                # Append to Master Graph
                for rel in analysis["relationships"]:
                    target = rel["target"]
                    if not any(n["id"] == target for n in graph_data["nodes"]):
                        graph_data["nodes"].append({"id": target, "label": target, "type": "TechnicalAsset"})
                    graph_data["edges"].append(rel)

    # Perform basic clustering and metadata calculation
    type_to_cluster = {}
    cluster_id_counter = 0
    cluster_to_nodes = {}
    
    # Colors matching the UI spec
    type_colors = {
        "business_domain": "#0052cc",
        "business_pillar": "#0969da",
        "team_member": "#FF6900",
        "business_feature": "#2da44e",
        "system_integration": "#8250df",
        "system": "#9e6a03",
        "technical_standard": "#b35900",
        "process_guide": "#cf222e",
        "jira_ticket": "#a40e26",
        "domain_topic": "#d29922",
        "domain_term": "#1a7f37",
        "documentation": "#57606a",
        "salesforce_object": "#00a1e0",
        "apex_class": "#1798c1",
        "nakadi_event": "#e36209",
        "document_section": "#8b949e",
        "Document": "#57606a",
        "TechnicalAsset": "#1798c1"
    }

    # Calculate degrees
    node_degrees = {node["id"]: 0 for node in graph_data["nodes"]}
    for edge in graph_data["edges"]:
        node_degrees[edge["source"]] = node_degrees.get(edge["source"], 0) + 1
        node_degrees[edge["target"]] = node_degrees.get(edge["target"], 0) + 1

    # Enrich nodes
    for node in graph_data["nodes"]:
        etype = node.get("type", "TechnicalAsset")
        if etype not in type_to_cluster:
            type_to_cluster[etype] = cluster_id_counter
            cluster_id_counter += 1
        
        cid = type_to_cluster[etype]
        node["cluster"] = cid
        node["degree"] = node_degrees.get(node["id"], 0)
        node["color"] = type_colors.get(etype, "#888888")
        node["val"] = 1.0 + (node["degree"] * 0.2)
        node["label"] = node["id"]
        node["entityType"] = etype
        node["observations"] = [f"Metadata extracted from {node['id']}"]

        if str(cid) not in cluster_to_nodes:
            cluster_to_nodes[str(cid)] = []
        cluster_to_nodes[str(cid)].append(node["id"])

    # Format edges for UI (from/to instead of source/target)
    formatted_edges = []
    for edge in graph_data["edges"]:
        formatted_edges.append({
            "from": edge["source"],
            "to": edge["target"],
            "label": edge["relation"],
            "weight": 1.0
        })

    final_graph = {
        "nodes": graph_data["nodes"],
        "edges": formatted_edges,
        "clusterToNodes": cluster_to_nodes,
        "clusterColors": {str(cid): type_colors.get(etype, "#888888") for etype, cid in type_to_cluster.items()}
    }

    # Save the unified graph
    output_file = Path('/Users/aeanuga/Documents/KG_Agent_Workspace/unified_graph.json')
    with open(output_file, 'w') as f:
        json.dump(final_graph, f, indent=2)
        
    # Save the outdated analysis archive
    outdated_file = Path('/Users/aeanuga/Documents/KG_Agent_Workspace/outdated_archive.json')
    with open(outdated_file, 'w') as f:
        json.dump(outdated_data, f, indent=2)
        
    print(f"\\n✅ Knowledge Graph Generation Complete!")
    print(f"   - Saved {len(graph_data['nodes'])} nodes and {len(graph_data['edges'])} edges to {output_file}")
    print(f"   - Archived {len(outdated_data)} outdated documents to {outdated_file}")

if __name__ == "__main__":
    folders_to_scan = [
        "/Users/aeanuga/Documents/GitHub/ppt-docs",
        "/Users/aeanuga/Documents/KG_Agent_Workspace/GoogleDriveContent"
    ]
    run_kg_agent(folders_to_scan)