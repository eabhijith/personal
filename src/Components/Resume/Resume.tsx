import React from 'react';
import { BannerContent } from '../Data/banner';
import { ExperienceData, EducationData, SkillsData, CoreCompetencies, LanguagesData } from '../Data/data';

const Resume: React.FC = () => {
    return (
        <div className="font-sans bg-[#f3f4f6] text-[#1f2937] min-h-screen relative overflow-hidden">
            {/* Background elements for glassy effect context if needed, usually glassy relies on elements *behind* it.
                Given the 'minimalist' requirement, we'll keep the background simple but use backdrop-blur on the container.
            */}

            <style>
                {`
                @media print {
                    .no-print { display: none; }
                    body { background-color: white; }
                    .resume-container { box-shadow: none; margin: 0; width: 100%; max-width: 100%; }
                }
                .glass-panel {
                    background: rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }
                .hover-scale {
                    transition: transform 0.3s ease;
                }
                .hover-scale:hover {
                    transform: scale(1.05);
                }
                `}
            </style>
            <div className="p-4 md:p-10 relative z-10">
                <div className="max-w-5xl mx-auto glass-panel shadow-2xl rounded-xl overflow-hidden resume-container">
                    {/* Header Section */}
                    <header className="bg-slate-900 text-white p-8 md:p-12 flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
                        {/* Subtle background decoration for header */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 z-0"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left w-full">
                            {/* Profile Picture */}
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/20 shadow-lg overflow-hidden flex-shrink-0 hover-scale cursor-pointer">
                                <img src={`${BannerContent.displayPic}`} alt={BannerContent.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-grow">
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{BannerContent.name}</h1>
                                <p className="text-blue-400 text-xl mt-2 font-medium tracking-wide">{BannerContent.role}</p>
                                <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-300">
                                    <span className="flex items-center gap-2 hover:text-white transition-colors"><i className="fas fa-envelope text-blue-400"></i> {BannerContent.email}</span>
                                    <span className="flex items-center gap-2 hover:text-white transition-colors"><i className="fas fa-phone text-blue-400"></i> {BannerContent.phone}</span>
                                    <span className="flex items-center gap-2 hover:text-white transition-colors"><i className="fas fa-map-marker-alt text-blue-400"></i> {BannerContent.location}</span>
                                </div>
                            </div>

                            <div className="mt-8 md:mt-0 flex gap-4 no-print flex-shrink-0">
                                <a href={BannerContent.linkedin} target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all backdrop-blur-sm border border-white/10 hover:scale-110"><i className="fab fa-linkedin-in text-xl text-white"></i></a>
                                <a href={BannerContent.github} target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all backdrop-blur-sm border border-white/10 hover:scale-110"><i className="fab fa-github text-xl text-white"></i></a>
                                <button onClick={() => window.print()} className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all hover:shadow-lg hover:scale-105">
                                    <i className="fas fa-print"></i> PDF
                                </button>
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                        {/* Left Column: Experience */}
                        <main className="lg:col-span-8 p-8 md:p-12 border-r border-gray-100 bg-white/50 backdrop-blur-sm">

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-blue-500 pb-2 mb-6 flex items-center gap-2">
                                    <i className="fas fa-briefcase text-blue-500"></i> Professional Experience
                                </h2>

                                {ExperienceData.map((exp: any, index: number) => (
                                    <div className="mb-10 hover:bg-white/40 p-4 rounded-lg transition-colors -mx-4" key={index}>
                                        <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden shadow-sm border border-slate-100 flex-shrink-0 hidden md:block">
                                                    <img src={`${exp.logo}`} alt={exp.company} className="w-full h-full object-contain bg-white" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
                                                    <p className="text-blue-600 font-semibold text-lg">{exp.company}</p>
                                                </div>
                                            </div>
                                            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mt-1 whitespace-nowrap">{exp.duration}</span>
                                        </div>
                                        <ul className="list-disc ml-5 space-y-2 text-slate-600 text-sm md:text-base mt-2">
                                            {exp.experience.map((item: string, i: number) => (
                                                <li key={i}><div dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} /></li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-blue-500 pb-2 mb-6 flex items-center gap-2">
                                    <i className="fas fa-graduation-cap text-blue-500"></i> Education
                                </h2>
                                {EducationData.map((edu: any, index: number) => (
                                    <div key={index} className="flex gap-4 items-start">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden shadow-sm border border-slate-100 flex-shrink-0 hidden md:block bg-white p-1">
                                            <img src={`${edu.logo}`} alt={edu.university} className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">{edu.course}</h3>
                                            <p className="text-blue-600 font-medium">{edu.university}</p>
                                            <p className="text-slate-500 text-sm mt-1 italic">{edu.details} • {edu.duration}</p>
                                        </div>
                                    </div>
                                ))}
                            </section>
                        </main>

                        {/* Right Column: Sidebar */}
                        <aside className="lg:col-span-4 bg-slate-50/80 p-8 md:p-12 backdrop-blur-sm">

                            {/* Skills */}
                            <section className="mb-10">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-wider border-b border-slate-200 pb-2">Technical Skills</h2>

                                {SkillsData.map((category: any, index: number) => (
                                    <div className="mb-6" key={index}>
                                        <h3 className="text-blue-600 font-bold text-xs uppercase mb-3">{category.type}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {category.skills.map((skill: string, i: number) => (
                                                <span key={i} className="bg-white border border-slate-200 px-3 py-1 rounded-md text-sm font-medium hover:shadow-md transition-shadow cursor-default">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </section>

                            {/* Core Competencies */}
                            <section className="mb-10">
                                <h2 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-wider border-b border-slate-200 pb-2">Core Competencies</h2>
                                <ul className="space-y-4 text-slate-600">
                                    {CoreCompetencies.map((comp: any, index: number) => (
                                        <li className="flex items-start gap-3 hover:bg-slate-100 p-2 rounded-lg transition-colors -mx-2" key={index}>
                                            <i className={`${comp.icon} text-blue-500 mt-1`}></i>
                                            <div>
                                                <p className="font-bold text-sm">{comp.title}</p>
                                                <p className="text-xs">{comp.subtitle}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Languages */}
                            <section>
                                <h2 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-wider border-b border-slate-200 pb-2">Languages</h2>
                                <div className="space-y-4">
                                    {LanguagesData.map((lang: any, index: number) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="font-medium">{lang.language}</span>
                                                <span className={`font-bold text-xs uppercase ${lang.level === 'Professional' ? 'text-blue-600' : 'text-slate-400'}`}>{lang.level}</span>
                                            </div>
                                            <div className="w-full bg-slate-200 h-1 rounded-full mt-1">
                                                <div className={`h-1 rounded-full ${lang.level === 'Professional' ? 'bg-blue-500' : 'bg-slate-400'}`} style={{ width: `${lang.percentage}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                        </aside>
                    </div>

                    {/* Footer */}
                    <footer className="bg-slate-100/80 backdrop-blur-sm text-center py-4 text-slate-400 text-[10px] uppercase tracking-widest border-t border-slate-200 z-10 relative">
                        Professional Profile &bull; {BannerContent.name} &bull; 2024
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Resume;
