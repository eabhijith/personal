import React from 'react';

interface Article {
    title: string;
    date: string;
    summary: string;
    tags: string[];
    url?: string;
}

const articles: Article[] = [
    {
        title: 'Building Pegasus Copilot: An AI Assistant for CRM Documentation',
        date: 'March 2026',
        summary: 'How we built an end-to-end RAG-powered chat widget for internal documentation using AWS Bedrock Knowledge Base, Claude 3.5 Sonnet, and MkDocs — with multi-turn conversation, source citations, and feedback analytics.',
        tags: ['AI', 'RAG', 'AWS Bedrock', 'Salesforce'],
    },
    {
        title: 'Agentic AI with Salesforce: RETURN_CONTROL Pattern',
        date: 'February 2026',
        summary: 'Deep dive into building a Salesforce Bedrock Agent that uses the RETURN_CONTROL pattern to execute Apex actions — enabling real-time CRM operations from a natural language chat interface.',
        tags: ['Salesforce', 'AWS Bedrock', 'Agentic AI', 'Apex'],
    },
    {
        title: 'LLM Fine-tuning with LoRA: Practical Guide',
        date: 'January 2026',
        summary: 'A practical walkthrough of fine-tuning large language models using Low-Rank Adaptation (LoRA) for domain-specific tasks, with lessons learned from applying it to enterprise Salesforce data.',
        tags: ['LLM', 'LoRA', 'Fine-tuning', 'ML'],
    },
    {
        title: 'n8n for Enterprise: Probabilistic AI Workflow Automation',
        date: 'December 2025',
        summary: 'How to build production-grade AI agent workflows in n8n with probabilistic routing, multi-agent orchestration, and Jira integration — achieving 90% reduction in manual processing time.',
        tags: ['n8n', 'Automation', 'AI Agents', 'Enterprise'],
    },
];

const tagColors: { [key: string]: string } = {
    'AI': '#bd93f9',
    'RAG': '#50fa7b',
    'AWS Bedrock': '#ff79c6',
    'Salesforce': '#8be9fd',
    'Agentic AI': '#ffb86c',
    'Apex': '#8be9fd',
    'LLM': '#bd93f9',
    'LoRA': '#50fa7b',
    'Fine-tuning': '#ffb86c',
    'ML': '#ff79c6',
    'n8n': '#50fa7b',
    'Automation': '#8be9fd',
    'AI Agents': '#bd93f9',
    'Enterprise': '#ffb86c',
};

const Home: React.FC = () => {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f4f5f9',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        }}>
            {/* Hero */}
            <div style={{
                textAlign: 'center',
                padding: '80px 24px 60px',
                backgroundColor: '#f4f5f9',
            }}>
                <h1 style={{
                    fontSize: 'clamp(42px, 8vw, 80px)',
                    fontFamily: "'Georgia', 'Times New Roman', serif",
                    fontStyle: 'italic',
                    fontWeight: '400',
                    color: '#2d3142',
                    margin: '0',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.1',
                }}>
                    Abhijith on AI
                </h1>
                <p style={{
                    marginTop: '16px',
                    color: '#6b7280',
                    fontSize: '16px',
                    fontWeight: '400',
                }}>
                    Writing about AI, Salesforce & building things that matter.
                </p>
            </div>

            {/* Articles */}
            <div style={{
                maxWidth: '720px',
                margin: '0 auto',
                padding: '0 24px 80px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
            }}>
                {articles.map((article, i) => (
                    <article
                        key={i}
                        style={{
                            borderTop: '1px solid #e5e7eb',
                            padding: '32px 0',
                            cursor: article.url ? 'pointer' : 'default',
                        }}
                        onClick={() => article.url && window.open(article.url, '_blank')}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                            <span style={{
                                fontSize: '12px',
                                color: '#9ca3af',
                                fontFamily: "'JetBrains Mono', monospace",
                                letterSpacing: '0.05em',
                            }}>
                                {article.date}
                            </span>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {article.tags.map(tag => (
                                    <span key={tag} style={{
                                        fontSize: '11px',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        backgroundColor: '#1e2130',
                                        color: tagColors[tag] || '#8892b0',
                                        fontFamily: "'JetBrains Mono', monospace",
                                        fontWeight: '500',
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: '600',
                            color: '#1f2937',
                            margin: '0 0 10px',
                            lineHeight: '1.4',
                            transition: 'color 0.2s',
                        }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#4f46e5')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#1f2937')}
                        >
                            {article.title}
                        </h2>

                        <p style={{
                            fontSize: '15px',
                            color: '#6b7280',
                            lineHeight: '1.65',
                            margin: '0',
                        }}>
                            {article.summary}
                        </p>
                    </article>
                ))}

                <div style={{
                    borderTop: '1px solid #e5e7eb',
                    paddingTop: '32px',
                    textAlign: 'center',
                    color: '#9ca3af',
                    fontSize: '13px',
                    fontFamily: "'JetBrains Mono', monospace",
                }}>
                    more articles coming soon_
                </div>
            </div>
        </div>
    );
};

export default Home;
