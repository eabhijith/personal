import React from 'react';

const Resume: React.FC = () => {
    return (
        <div className="font-sans bg-[#f3f4f6] text-[#1f2937] min-h-screen">
            <style>
                {`
                @media print {
                    .no-print { display: none; }
                    body { background-color: white; }
                    .resume-container { box-shadow: none; margin: 0; width: 100%; max-width: 100%; }
                }
                `}
            </style>
            <div className="p-4 md:p-10">
                <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden resume-container">
                    {/* Header Section */}
                    <header className="bg-slate-900 text-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Abhijith Eanuga</h1>
                            <p className="text-blue-400 text-xl mt-2 font-medium tracking-wide">Senior Systems Architect & AI Specialist</p>
                            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-300">
                                <span className="flex items-center gap-2"><i className="fas fa-envelope text-blue-400"></i> eabhijith@gmail.com</span>
                                <span className="flex items-center gap-2"><i className="fas fa-phone text-blue-400"></i> +49 15510521709</span>
                                <span className="flex items-center gap-2"><i className="fas fa-map-marker-alt text-blue-400"></i> Berlin, Germany</span>
                            </div>
                        </div>
                        <div className="mt-8 md:mt-0 flex gap-4 no-print">
                            <a href="https://linkedin.com/in/eabhijith" target="_blank" rel="noreferrer" className="bg-slate-800 hover:bg-blue-600 p-3 rounded-full transition-colors"><i className="fab fa-linkedin-in text-xl"></i></a>
                            <a href="https://github.com/eabhijith" target="_blank" rel="noreferrer" className="bg-slate-800 hover:bg-slate-700 p-3 rounded-full transition-colors"><i class="fab fa-github text-xl"></i></a>
                            <button onClick={() => window.print()} className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all">
                                <i className="fas fa-print"></i> PDF
                            </button>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                        {/* Left Column: Experience */}
                        <main className="lg:col-span-8 p-8 md:p-12 border-r border-gray-100">

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-blue-500 pb-2 mb-6 flex items-center gap-2">
                                    <i className="fas fa-briefcase text-blue-500"></i> Professional Experience
                                </h2>

                                {/* Zalando */}
                                <div className="mb-10">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900">Senior Specialist (AI & Automation)</h3>
                                            <p className="text-blue-600 font-semibold text-lg">Zalando SE</p>
                                        </div>
                                        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mt-1">Aug 2020 – Present</span>
                                    </div>
                                    <ul className="list-disc ml-5 space-y-2 text-slate-600 text-sm md:text-base">
                                        <li><strong>Agentic AI & Prompt Engineering:</strong> Leveraging <strong>Salesforce Agentforce</strong> and <strong>Prompt Builder</strong> to architect autonomous agents that streamline complex customer and internal workflows.</li>
                                        <li><strong>Probabilistic Automations:</strong> Integrated <strong>n8n</strong> with external <strong>Model Context Protocol (MCP)</strong> to create dynamic, probabilistic flow automations, enabling smarter system-to-system context exchange.</li>
                                        <li><strong>LLM Steering & Custom ML:</strong> Fine-tuning model behavior through steering techniques and building custom classification models in <strong>SageMaker Studio</strong> for automated data categorisation.</li>
                                        <li><strong>Hybrid Cloud RAG:</strong> Engineered a cross-cloud RAG system utilizing <strong>AWS Bedrock Knowledge Bases</strong> integrated seamlessly with <strong>Google Cloud Platform (GCP)</strong>.</li>
                                        <li><strong>Optimization:</strong> Reduced training compute costs by 60% through <strong>LoRA</strong> (Low-Rank Adaptation) fine-tuning on domain-specific datasets.</li>
                                    </ul>
                                </div>

                                {/* Adidas */}
                                <div className="mb-10">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900">External Technology Specialist</h3>
                                            <p className="text-blue-600 font-semibold text-lg">adidas AG</p>
                                        </div>
                                        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mt-1">Mar 2017 – Jan 2020</span>
                                    </div>
                                    <ul className="list-disc ml-5 space-y-2 text-slate-600 text-sm md:text-base">
                                        <li>Lead Architect for <strong>Salesforce Service Cloud</strong>, delivering omnichannel support (Chat, WhatsApp, Social) for global customer service operations.</li>
                                        <li>Transformed global campaign management by building a custom <strong>Salesforce Lightning</strong> portal, replacing legacy spreadsheet workflows with automated tracking.</li>
                                        <li>Developed and maintained <strong>CI/CD pipelines</strong> (Jenkins/Gearset) to ensure high-velocity deployment cycles across complex sandbox environments.</li>
                                    </ul>
                                </div>

                                {/* Infosys */}
                                <div className="mb-10">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900">Senior Systems Engineer</h3>
                                            <p className="text-blue-600 font-semibold text-lg">Infosys</p>
                                        </div>
                                        <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mt-1">Jan 2015 – Feb 2017</span>
                                    </div>
                                    <p className="text-slate-600 text-sm md:text-base">Specialized in enterprise-scale CRM implementations, customized Apex/Visualforce development, and seamless third-party systems integration.</p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-blue-500 pb-2 mb-6 flex items-center gap-2">
                                    <i className="fas fa-graduation-cap text-blue-500"></i> Education
                                </h2>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Master of Science in Data Sciences</h3>
                                    <p class="text-blue-600 font-medium">University of Missouri-Kansas City (UMKC)</p>
                                    <p className="text-slate-500 text-sm mt-1 italic">Specialization in Machine Learning & Predictive Analytics • Graduated March 2021</p>
                                </div>
                            </section>
                        </main>

                        {/* Right Column: Sidebar */}
                        <aside className="lg:col-span-4 bg-slate-50 p-8 md:p-12">

                            {/* Skills */}
                            <section className="mb-10">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-wider border-b border-slate-200 pb-2">Technical Skills</h2>

                                <div className="mb-6">
                                    <h3 className="text-blue-600 font-bold text-xs uppercase mb-3">AI & Agentic Systems</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-white border border-slate-200 px-3 py-1 rounded-md text-sm font-medium">Agentforce</span>
                                        <span className="bg-white border border-slate-200 px-3 py-1 rounded-md text-sm font-medium">Prompt Builder</span>
                                        <span className="bg-white border border-slate-200 px-3 py-1 rounded-md text-sm font-medium">LLM Steering</span>
                                        <span className="bg-white border border-slate-200 px-3 py-1 rounded-md text-sm font-medium">LoRA Fine-tuning</span>
                                        <span className="bg-white border border-slate-200 px-3 py-1 rounded-md text-sm font-medium">RAG / Bedrock</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-blue-600 font-bold text-xs uppercase mb-3">Automation & Cloud</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-white border border-slate-200 px-3 py-1 rounded-md text-sm font-medium">n8n / MCP</span>
                                        <span className="bg-white border border-slate-200 px-3 py-1 rounded-md text-sm font-medium">AWS & GCP Hybrid</span>
                                        <span className="bg-white border border-slate-200 px-3 py-1 rounded-md text-sm font-medium">SageMaker Studio</span>
                                        <span className="bg-white border border-slate-200 px-3 py-1 rounded-md text-sm font-medium">Kubernetes / Docker</span>
                                        <span className="bg-white border border-slate-200 px-3 py-1 rounded-md text-sm font-medium">GitLab CI/CD</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-blue-600 font-bold text-xs uppercase mb-3">Salesforce Ecosystem</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-white border border-slate-200 px-3 py-1 rounded-md text-sm font-medium">Service Cloud</span>
                                        <span className="bg-white border border-slate-200 px-3 py-1 rounded-md text-sm font-medium">LWC / Apex</span>
                                        <span className="bg-white border border-slate-200 px-3 py-1 rounded-md text-sm font-medium">Omni-Channel</span>
                                        <span className="bg-white border border-slate-200 px-3 py-1 rounded-md text-sm font-medium">MERN Stack</span>
                                    </div>
                                </div>
                            </section>

                            {/* Core Competencies */}
                            <section className="mb-10">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-wider border-b border-slate-200 pb-2">Core Competencies</h2>
                                <ul className="space-y-4 text-slate-600">
                                    <li className="flex items-start gap-3">
                                        <i className="fas fa-robot text-blue-500 mt-1"></i>
                                        <div>
                                            <p className="font-bold text-sm">Agentic Workflows</p>
                                            <p className="text-xs">Designing autonomous systems</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <i className="fas fa-project-diagram text-blue-500 mt-1"></i>
                                        <div>
                                            <p className="font-bold text-sm">Probabilistic Logic</p>
                                            <p className="text-xs">Non-linear flow automation</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <i className="fas fa-cloud-upload-alt text-blue-500 mt-1"></i>
                                        <div>
                                            <p className="font-bold text-sm">Hybrid Solutions</p>
                                            <p className="text-xs">Connecting CRM to AI/Cloud</p>
                                        </div>
                                    </li>
                                </ul>
                            </section>

                            {/* Languages */}
                            <section>
                                <h2 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-wider border-b border-slate-200 pb-2">Languages</h2>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-medium">English</span>
                                        <span className="text-blue-600 font-bold text-xs uppercase">Professional</span>
                                    </div>
                                    <div className="w-full bg-slate-200 h-1 rounded-full"><div className="bg-blue-500 h-1 rounded-full w-full"></div></div>
                                    <div className="flex justify-between items-center text-sm mt-3">
                                        <span className="font-medium">German</span>
                                        <span className="text-slate-400 font-bold text-xs uppercase">Learning</span>
                                    </div>
                                    <div className="w-full bg-slate-200 h-1 rounded-full"><div className="bg-slate-400 h-1 rounded-full w-1/4"></div></div>
                                </div>
                            </section>

                        </aside>
                    </div>

                    {/* Footer */}
                    <footer className="bg-slate-100 text-center py-4 text-slate-400 text-[10px] uppercase tracking-widest border-t border-slate-200">
                        Professional Profile &bull; Abhijith Eanuga &bull; 2024
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Resume;
