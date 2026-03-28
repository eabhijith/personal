I need you to build a single-file interactive Knowledge Graph UI (`index.html`) using Vanilla HTML, CSS, and JavaScript. 

Do NOT use React, Vue, Tailwind, or any build tools. Use only standard web primitives and these two CDN libraries:
1. Force-Graph: `<script src="https://unpkg.com/force-graph@1.43.5/dist/force-graph.min.js"></script>`
2. D3.js: `<script src="https://d3js.org/d3.v7.min.js"></script>`

### 1. Data Schema
The graph must load a `data.json` file on init (`fetch('data.json')`). The JSON schema is:
```json
{
  "nodes": [
    {"id": "n1", "label": "API Gateway", "entityType": "System", "cluster": 1, "degree": 5, "color": "#0052cc", "val": 2.0, "observations": ["Routes traffic"]}
  ],
  "edges": [
    {"from": "n1", "to": "n2", "label": "CALLS", "weight": 1.0}
  ],
  "clusterToNodes": {"1": ["n1", "n2"]},
  "clusterColors": {"1": "#0052cc"}
}
```

### 2. Aesthetics: Modern Enterprise Light Theme
- **Background:** `radial-gradient(ellipse at center, #FFFFFF 0%, #FFFDF9 60%, #FFF0E6 100%)`
- **Text:** `#333333` (primary), `#777777` (secondary)
- **Accents:** `#FF6900` (Vibrant Orange) for active states/highlights.
- **Panels:** `#FFFFFF` with subtle shadows (`box-shadow: 2px 0 8px rgba(0,0,0,0.03)`).
- **Font:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.

### 3. Layout Architecture
- **Left Sidebar (220px, collapsible via '‹' button):** 
  - Search input box (filters nodes by label or observations).
  - List of toggleable `entityType` filters (custom styled checkboxes with colored dots matching the entity type).
  - Stats footer (Total Nodes / Edges).
- **Center Canvas:** Takes remaining width. Contains floating "Toggle Clusters" and "Clear Filters" buttons top-right.
- **Right Panel (320px, slides in when a node is clicked):**
  - Tabs at the top: "Details" (lists observations) and "Connections" (lists inbound/outbound edges with arrows).
  - Header: Node label, colored entity type pill, cluster ID, and degree count.

### 4. Graph Rendering & Canvas Customization
You must use `nodeCanvasObject` to override the default node drawing:
- **Default Nodes:** Draw circles colored by `node.color`. Give them a distinct white border (`lineWidth: 1.5, strokeStyle: '#FFFFFF'`) so they pop against the light background.
- **Labels:** Render short labels (max 11 chars + "…") below the node using `fillText`. Add a white text shadow (`shadowColor: '#FFFFFF', shadowBlur: 4`) for readability.
- **Focus/Hover State:** When a node is clicked or hovered:
  1. Highlight the node and its 1st-degree connected neighbors. 
  2. **CRITICAL:** Dim ALL other non-connected nodes by setting `ctx.globalAlpha = 0.08`.
  3. Draw a thicker border on the focused node.
  4. Draw the full label text inside a white rounded rectangle background (`rgba(255,255,255,0.95)`) below the node so it acts like a tooltip.

### 5. Advanced Physics & Convex Hulls
- **Clusters (Convex Hulls):** Write a 2D geometry function to calculate convex hulls for nodes sharing the same `cluster` ID. Expand the hull slightly (padding). Draw these hulls in the background (`onRenderFramePost`) using smooth bezier curves. Fill with `node.color` at 10% opacity (`1A` hex) and stroke at 30% opacity (`4D` hex). Tie this to the "Toggle Clusters" button.
- **Physics Tweaks:** 
  - `d3AlphaDecay(0.015)`, `d3VelocityDecay(0.3)`.
  - Mesh charge: `charge.strength(-400).distanceMax(1200)`.
  - Link distance: 120.
  - **Orphan Push:** Use `d3.forceX` and `d3.forceY` to push nodes where `cluster === -1` far away (e.g., x: 3000, y: 2000) so they don't clutter the main mesh.
  - Run `G.zoomToFit(500, 50)` on engine stop.

Please generate the complete HTML/JS/CSS in a single block.