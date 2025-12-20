import React, { useState, useRef, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import { BannerContent } from '../Data/banner';
import { ExperienceData } from '../Data/experience';
import { EducationData } from '../Data/education';
import { SkillsData } from '../Data/skills';
import { CoreCompetencies } from '../Data/coreCompetencies';
import { LanguagesData } from '../Data/languages';
import { CertificationsData } from '../Data/certifications';

interface ResumeProps {
    toggleTheme?: () => void;
    mode?: 'light' | 'dark';
}

const Resume: React.FC<ResumeProps> = ({ toggleTheme, mode = 'light' }) => {
    const [currentSection, setCurrentSection] = useState(0);
    const [isSwipeMode, setIsSwipeMode] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const startXRef = useRef<number>(0);
    const startYRef = useRef<number>(0);

    const trailheadStats = {
        rank: "All Star Ranger",
        badges: "100+",
        points: "50,000+",
        profileUrl: "https://www.salesforce.com/trailblazer/abhie"
    };

    const sections = ['experience', 'skills'];

    // Touch/swipe handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        if (window.innerWidth >= 1024) return; // Only on mobile/tablet
        startXRef.current = e.touches[0].clientX;
        startYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (window.innerWidth >= 1024) return;
        e.preventDefault();
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (window.innerWidth >= 1024) return;

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startXRef.current - endX;
        const diffY = startYRef.current - endY;

        // Only trigger swipe if horizontal movement is greater than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0 && currentSection < sections.length - 1) {
                // Swipe left - next section
                setCurrentSection(prev => prev + 1);
            } else if (diffX < 0 && currentSection > 0) {
                // Swipe right - previous section
                setCurrentSection(prev => prev - 1);
            }
        }
    };

    // Detect mobile/tablet for swipe mode
    useEffect(() => {
        const checkMobile = () => {
            setIsSwipeMode(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div className={`${mode} font-sans`}>
            <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 min-h-screen relative transition-colors duration-300 print:bg-white print:text-black">

                <style>
                    {`
                    @media screen {
                        .glass-panel {
                            background: rgba(255, 255, 255, 0.95);
                            backdrop-filter: blur(12px);
                            -webkit-backdrop-filter: blur(12px);
                            border: 1px solid rgba(255, 255, 255, 0.5);
                        }
                        .dark .glass-panel {
                             background: rgba(30, 41, 59, 0.8);
                             border: 1px solid rgba(255, 255, 255, 0.05);
                             box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
                        }
                        
                        .hover-card {
                            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                            border: 1px solid transparent;
                            position: relative;
                            overflow: hidden;
                        }
                        .hover-card:hover {
                            transform: translateY(-4px);
                            background: rgba(255, 255, 255, 0.8);
                            box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05);
                            border-color: rgba(59, 130, 246, 0.4);
                            z-index: 10;
                        }
                        .dark .hover-card:hover {
                            background: rgba(30, 41, 59, 0.8);
                            box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.5), 0 10px 15px -5px rgba(0, 0, 0, 0.3);
                            border-color: rgba(59, 130, 246, 0.4);
                        }
                        
                        /* Subtle shine effect on hover */
                        .hover-card::after {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: -100%;
                            width: 50%;
                            height: 100%;
                            background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
                            transform: skewX(-25deg);
                            transition: 0.5s;
                            pointer-events: none;
                        }
                        .dark .hover-card::after {
                            background: linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent);
                        }
                        .hover-card:hover::after {
                            left: 150%;
                            transition: 0.7s ease-in-out;
                        }

                        /* Animated Grid Background */
                        @keyframes gridMove {
                            0% { background-position: 0 0; }
                            100% { background-position: 40px 40px; }
                        }
                        
                        .grid-bg {
                            background-size: 40px 40px;
                            background-image: 
                                linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
                            animation: gridMove 20s linear infinite;
                        }
                        .dark .grid-bg {
                            background-image: 
                                linear-gradient(to right, rgba(148, 163, 184, 0.05) 1px, transparent 1px),
                                linear-gradient(to bottom, rgba(148, 163, 184, 0.05) 1px, transparent 1px);
                        }

                        /* Enhanced Timeline */
                        .skill-tag:hover {
                            transform: translateY(-2px);
                            background: rgba(59, 130, 246, 0.1);
                            border-color: rgba(59, 130, 246, 0.4);
                            box-shadow: 0 4px 10px -2px rgba(0, 0, 0, 0.1);
                        }
                        .dark .skill-tag:hover {
                            background: rgba(59, 130, 246, 0.1);
                            border-color: rgba(59, 130, 246, 0.3);
                        }

                        /* Improved Timeline */
                        .timeline-container {
                            position: relative;
                            padding-left: 2.5rem;
                        }
                        .timeline-line {
                            position: absolute;
                            left: 19px;
                            top: 15px;
                            bottom: 15px;
                            width: 4px;
                            background: linear-gradient(to bottom, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%);
                            border-radius: 4px;
                            box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
                        }
                        .dark .timeline-line {
                            background: linear-gradient(to bottom, #3b82f6 0%, #6366f1 50%, #06b6d4 100%);
                            box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
                        }
                        .timeline-dot {
                            position: absolute;
                            left: 8px;
                            top: 24px;
                            width: 26px;
                            height: 26px;
                            border-radius: 50%;
                            background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                            border: 3px solid white;
                            z-index: 10;
                            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
                            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .timeline-dot::after {
                            content: '';
                            width: 8px;
                            height: 8px;
                            background: white;
                            border-radius: 50%;
                            animation: pulse 2s infinite;
                        }
                        .dark .timeline-dot {
                            border-color: #0f172a;
                            background: linear-gradient(135deg, #3b82f6, #6366f1);
                        }
                        .group:hover .timeline-dot {
                            transform: scale(1.3) rotate(180deg);
                            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
                        }
                        @keyframes pulse {
                            0%, 100% { opacity: 1; transform: scale(1); }
                            50% { opacity: 0.7; transform: scale(1.2); }
                        }

                        /* Language Progress Bar Enhancement */
                        .language-progress {
                            height: 8px;
                            background: rgba(148, 163, 184, 0.2);
                            border-radius: 10px;
                            overflow: hidden;
                            position: relative;
                        }
                        .language-progress-bar {
                            height: 100%;
                            background: linear-gradient(90deg, #3b82f6 0%, #06b6d4 50%, #10b981 100%);
                            border-radius: 10px;
                            transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
                            position: relative;
                            overflow: hidden;
                        }
                        .language-progress-bar::after {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: -100%;
                            width: 100%;
                            height: 100%;
                            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                            animation: shimmer 2s infinite;
                        }
                        @keyframes shimmer {
                            0% { left: -100%; }
                            100% { left: 100%; }
                        }
                        .dark .language-progress {
                            background: rgba(51, 65, 85, 0.4);
                        }

                        /* Enhanced Banner Animations */
                        @keyframes spin-slow {
                            from { transform: rotate(0deg); }
                            to { transform: rotate(360deg); }
                        }
                        .animate-spin-slow {
                            animation: spin-slow 8s linear infinite;
                        }

                        /* Particle Animations */
                        .particle-1, .particle-2, .particle-3 {
                            position: absolute;
                            background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
                            border-radius: 50%;
                            filter: blur(1px);
                        }
                        .particle-1 {
                            width: 4px;
                            height: 4px;
                            top: 20%;
                            left: 10%;
                            animation: float 6s ease-in-out infinite;
                        }
                        .particle-2 {
                            width: 6px;
                            height: 6px;
                            top: 60%;
                            right: 15%;
                            animation: float 8s ease-in-out infinite reverse;
                        }
                        .particle-3 {
                            width: 3px;
                            height: 3px;
                            top: 80%;
                            left: 70%;
                            animation: float 10s ease-in-out infinite;
                        }
                        @keyframes float {
                            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
                            25% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
                            50% { transform: translateY(-10px) translateX(-10px); opacity: 0.6; }
                            75% { transform: translateY(-30px) translateX(5px); opacity: 0.8; }
                        }

                        /* Enhanced gradient text */
                        .bg-clip-text {
                            -webkit-background-clip: text;
                            background-clip: text;
                        }

                        /* Swipe Navigation */
                        .swipe-container {
                            overflow: hidden;
                            position: relative;
                        }
                        .swipe-content {
                            display: flex;
                            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        }
                        .swipe-section {
                            min-width: 100%;
                            flex-shrink: 0;
                        }
                        .swipe-indicators {
                            display: flex;
                            justify-content: center;
                            gap: 8px;
                            margin-top: 1rem;
                        }
                        .swipe-dot {
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: rgba(148, 163, 184, 0.3);
                            transition: all 0.3s ease;
                            cursor: pointer;
                        }
                        .swipe-dot.active {
                            background: #3b82f6;
                            transform: scale(1.2);
                        }

                        /* Mobile responsiveness */
                        @media (max-width: 1023px) {
                            .mobile-stack {
                                display: block !important;
                            }
                            .timeline-container {
                                padding-left: 1rem;
                            }
                            .timeline-line {
                                left: 8px;
                                width: 2px;
                            }
                            .timeline-dot {
                                left: 2px;
                                width: 16px;
                                height: 16px;
                            }
                        }
                    }

                    @media print {
                        @page { 
                            margin: 0.5cm; 
                            size: A4;
                        }
                        
                        * {
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                        }
                        
                        body { 
                            background-color: white !important; 
                            color: black !important; 
                            font-size: 9pt;
                        }
                        
                        .no-print { display: none !important; }
                        
                        .resume-container { 
                            box-shadow: none !important; 
                            max-width: 100% !important; 
                            width: 100% !important; 
                            margin: 0 !important; 
                            border: none !important;
                            border-radius: 0 !important;
                        }
                        
                        .glass-panel {
                            background: white !important;
                            border: none !important;
                            backdrop-filter: none !important;
                        }
                        
                        header {
                            padding: 1.5rem 0 !important;
                            margin-bottom: 1rem !important;
                            background: white !important;
                            border-bottom: 2px solid #eee;
                            position: relative !important;
                        }

                        header * {
                            background: transparent !important;
                            color: black !important;
                        }

                        header .particle-1, header .particle-2, header .particle-3 {
                            display: none !important;
                        }

                        header .animate-spin-slow {
                            animation: none !important;
                        }
                        
                        h1 { font-size: 20pt !important; margin-bottom: 0 !important; color: black !important; }
                        h2 { font-size: 13pt !important; border-bottom: 1px solid #ccc !important; margin-bottom: 0.5rem !important; padding-bottom: 2px !important; color: black !important; margin-top: 1rem !important; }
                        h3 { font-size: 10pt !important; color: black !important; margin-bottom: 0 !important; }
                        p, li, span { font-size: 8.5pt !important; color: #333 !important; }
                        
                        .print-break-inside-avoid { 
                            break-inside: avoid; 
                            page-break-inside: avoid; 
                        }
                        
                        .timeline-line, .timeline-dot { display: none !important; }
                        .timeline-container { padding-left: 0 !important; }
                        .timeline-content { margin-left: 0 !important; padding-left: 0 !important; }
                        .timeline-date { font-weight: bold !important; color: #000 !important; }
                        
                        .print-grid {
                            display: grid !important;
                            grid-template-columns: 35% 65% !important; /* Swapped for print too */
                            gap: 1.5rem !important;
                        }
                        
                        i { display: none !important; }
                        
                        .print-main-col { width: 100% !important; }
                        .print-sidebar-col { width: 100% !important; }
                    }
                    `}
                </style>

                <div className="fixed top-4 right-4 z-50 no-print">
                    <Switch
                        checked={mode === 'dark'}
                        onChange={toggleTheme}
                        size="small"
                    />
                </div>

                <div className="py-6 px-4 md:px-8 lg:py-10">
                    <div
                        ref={containerRef}
                        className="max-w-7xl mx-auto glass-panel shadow-2xl rounded-3xl overflow-hidden resume-container relative"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        
                        {/* Animated Grid Background */}
                        <div className="absolute inset-0 grid-bg pointer-events-none z-0 opacity-30 dark:opacity-20"></div>

                        <header className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-black dark:via-slate-900 dark:to-slate-800 text-white">
                            {/* Enhanced Background Effects */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
                            <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(99,102,241,0.05)_60deg,transparent_120deg,rgba(147,51,234,0.05)_180deg,transparent_240deg,rgba(59,130,246,0.05)_300deg,transparent_360deg)]"></div>

                            {/* Animated Particles */}
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="particle-1"></div>
                                <div className="particle-2"></div>
                                <div className="particle-3"></div>
                            </div>

                            <div className="relative z-10 p-8 md:p-12">
                                <div className="max-w-6xl mx-auto">
                                    <div className="grid md:grid-cols-12 gap-8 items-center">

                                        {/* Profile Picture Section */}
                                        <div className="md:col-span-4 flex justify-center md:justify-start">
                                            <div className="relative group">
                                                {/* Enhanced Profile Picture Container */}
                                                <div className="w-48 h-48 md:w-56 md:h-56 relative">
                                                    {/* Animated Border */}
                                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 animate-spin-slow opacity-75"></div>
                                                    <div className="absolute inset-1 rounded-full bg-gradient-to-r from-slate-900 to-blue-900 dark:from-black dark:to-slate-900"></div>

                                                    {/* Profile Image */}
                                                    <div className="absolute inset-3 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/20 group-hover:ring-white/40 transition-all duration-500">
                                                        <img
                                                            src={BannerContent.displayPic}
                                                            alt={BannerContent.name}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiM0Qjc3QkUiLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSI4MCIgcj0iMzAiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuOCIvPjxwYXRoIGQ9Ik00MCA1MEgxNjBDMTcwIDUwIDE4MCA2MiAxODAgODJWMTIwQzE4MCA0MDAgeCAUiIODUiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuOCIvPjwvc3ZnPg==';
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Status Indicator */}
                                                    <div className="absolute bottom-6 right-6 w-6 h-6 bg-green-400 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="md:col-span-8 text-center md:text-left space-y-6">

                                            {/* Name and Title */}
                                            <div className="space-y-3">
                                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-cyan-100">
                                                    {BannerContent.name}
                                                </h1>
                                                <div className="flex items-center justify-center md:justify-start gap-3">
                                                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                                                    <p className="text-xl md:text-2xl font-semibold text-blue-200 tracking-wide">
                                                        {BannerContent.role}
                                                    </p>
                                                    <div className="w-12 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400"></div>
                                                </div>
                                            </div>

                                            {/* Contact Information */}
                                            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-slate-300">
                                                <a href={`mailto:${BannerContent.email}`} className="group flex items-center gap-2 hover:text-white transition-colors duration-300">
                                                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/40 transition-colors">
                                                        <i className="fas fa-envelope text-sm"></i>
                                                    </div>
                                                    <span className="font-medium">{BannerContent.email}</span>
                                                </a>
                                                <a href={`tel:${BannerContent.phone}`} className="group flex items-center gap-2 hover:text-white transition-colors duration-300">
                                                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/40 transition-colors">
                                                        <i className="fas fa-phone text-sm"></i>
                                                    </div>
                                                    <span className="font-medium">{BannerContent.phone}</span>
                                                </a>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                                                        <i className="fas fa-map-marker-alt text-sm"></i>
                                                    </div>
                                                    <span className="font-medium">{BannerContent.location}</span>
                                                </div>
                                            </div>

                                            {/* Social Links and Actions */}
                                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                                {BannerContent.linkedin && (
                                                    <a href={BannerContent.linkedin} target="_blank" rel="noopener noreferrer"
                                                       className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1">
                                                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                                        <div className="relative flex items-center gap-2">
                                                            <i className="fab fa-linkedin text-lg"></i>
                                                            <span>LinkedIn</span>
                                                        </div>
                                                    </a>
                                                )}
                                                {BannerContent.github && (
                                                    <a href={BannerContent.github} target="_blank" rel="noopener noreferrer"
                                                       className="group relative overflow-hidden bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/25 hover:-translate-y-1">
                                                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                                        <div className="relative flex items-center gap-2">
                                                            <i className="fab fa-github text-lg"></i>
                                                            <span>GitHub</span>
                                                        </div>
                                                    </a>
                                                )}
                                                <a href={trailheadStats.profileUrl} target="_blank" rel="noopener noreferrer"
                                                   className="group relative overflow-hidden bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-1">
                                                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                                    <div className="relative flex items-center gap-2">
                                                        <i className="fas fa-mountain text-lg"></i>
                                                        <span>Trailblazer</span>
                                                    </div>
                                                </a>

                                                {/* Print Button */}
                                                <button onClick={() => window.print()}
                                                        className="no-print group relative overflow-hidden bg-gradient-to-r from-white to-slate-100 text-slate-900 hover:from-slate-100 hover:to-slate-200 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-white/25 hover:-translate-y-1">
                                                    <div className="absolute inset-0 bg-slate-900/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                                    <div className="relative flex items-center gap-2">
                                                        <i className="fas fa-download text-lg"></i>
                                                        <span>Download PDF</span>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <main className="p-6 md:p-10 relative z-10">
                            {/* Swipe indicators for mobile */}
                            {isSwipeMode && (
                                <div className="swipe-indicators lg:hidden mb-6">
                                    {sections.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`swipe-dot ${index === currentSection ? 'active' : ''}`}
                                            onClick={() => setCurrentSection(index)}
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 print-grid">
                                {/* Mobile: Show sections based on currentSection, Desktop: Show both */}
                                <div className={`lg:col-span-8 print-main-col order-1 lg:order-2 ${
                                    isSwipeMode && currentSection !== 0 ? 'hidden lg:block' : ''
                                }`}>
                                    {/* Experience Section */}
                                    <section className="print-break-inside-avoid mb-10">
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                                <i className="fas fa-briefcase text-xl"></i>
                                            </div>
                                            <h2 className="text-2xl font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                                                Professional Experience
                                            </h2>
                                        </div>

                                        <div className="timeline-container">
                                            <div className="timeline-line no-print"></div>
                                            {ExperienceData.map((exp, index) => (
                                                <div className="relative pl-8 mb-10 group" key={index}>
                                                    <div className="timeline-dot no-print"></div>

                                                    <div className="hover-card p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50">
                                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                                                            <div className="flex items-center gap-4">
                                                                {exp.logo && (
                                                                    <div className="w-12 h-12 rounded-lg bg-white p-1 shadow-sm flex-shrink-0 overflow-hidden">
                                                                        <img
                                                                            src={exp.logo}
                                                                            alt={exp.company}
                                                                            className="w-full h-full object-contain"
                                                                            onError={(e) => {
                                                                                const target = e.target as HTMLImageElement;
                                                                                target.style.display = 'none';
                                                                            }}
                                                                        />
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                                                                    <div className="text-blue-600 dark:text-blue-400 font-semibold text-lg">{exp.company}</div>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-xs font-bold uppercase tracking-wide">
                                                                    {exp.duration}
                                                                </span>
                                                                <div className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-end gap-1">
                                                                    <i className="fas fa-map-marker-alt text-xs"></i> {exp.location}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                                                            {exp.experience.map((item, i) => (
                                                                <li key={i} className="flex gap-3 items-start">
                                                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></span>
                                                                    <span className="leading-relaxed" dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-800 dark:text-slate-200">$1</strong>') }}></span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                {/* Left Column - Skills & Info */}
                                <div className={`lg:col-span-4 print-sidebar-col space-y-10 order-2 lg:order-1 ${
                                    isSwipeMode && currentSection !== 1 ? 'hidden lg:block' : ''
                                }`}>
                                    
                                    {/* Trailblazer Status */}
                                    <section className="print-break-inside-avoid hover-card p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border border-blue-100 dark:border-slate-700">
                                        <div className="flex items-center gap-3 mb-4">
                                            <i className="fas fa-mountain text-blue-600 dark:text-blue-400 text-xl"></i>
                                            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                                                Trailblazer Status
                                            </h2>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-md border-2 border-yellow-400">
                                                <i className="fas fa-star text-3xl text-yellow-400"></i>
                                            </div>
                                            <div>
                                                <div className="font-bold text-lg text-slate-900 dark:text-white">{trailheadStats.rank}</div>
                                                <div className="text-sm text-slate-600 dark:text-slate-400">{trailheadStats.badges} Badges • {trailheadStats.points} Points</div>
                                                <a href={trailheadStats.profileUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline mt-1 inline-block">View Profile</a>
                                            </div>
                                        </div>
                                    </section>

                                    {/* Technical Skills */}
                                    <section className="print-break-inside-avoid">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                                                <i className="fas fa-code"></i>
                                            </div>
                                            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                                                Technical Skills
                                            </h2>
                                        </div>
                                        <div className="space-y-6">
                                            {SkillsData.map((category, index) => (
                                                <div key={index} className="hover-card p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                                                    <h3 className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                        {category.type}
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {category.skills.map((skill, i) => (
                                                            <span key={i} className="skill-tag px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-md transition-all duration-200 cursor-default">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Core Competencies */}
                                    <section className="print-break-inside-avoid">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                                <i className="fas fa-brain"></i>
                                            </div>
                                            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                                                Core Competencies
                                            </h2>
                                        </div>
                                        <div className="grid gap-4">
                                            {CoreCompetencies.map((comp, index) => (
                                                <div key={index} className="hover-card p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                                        <i className={comp.icon}></i>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-slate-800 dark:text-slate-100">{comp.title}</h3>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">{comp.subtitle}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Education */}
                                    <section className="print-break-inside-avoid">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                                                <i className="fas fa-graduation-cap"></i>
                                            </div>
                                            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                                                Education
                                            </h2>
                                        </div>
                                        {EducationData.map((edu, index) => (
                                            <div key={index} className="hover-card p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                                                <div className="flex items-center gap-3 mb-2">
                                                    {edu.logo && (
                                                        <img
                                                            src={edu.logo}
                                                            alt="University"
                                                            className="w-8 h-8 object-contain"
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.style.display = 'none';
                                                            }}
                                                        />
                                                    )}
                                                    <h3 className="font-bold text-slate-900 dark:text-slate-100 leading-tight">{edu.university}</h3>
                                                </div>
                                                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">{edu.course}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{edu.duration}</p>
                                                {edu.details && <p className="text-xs text-slate-600 dark:text-slate-300 italic">{edu.details}</p>}
                                            </div>
                                        ))}
                                    </section>

                                    {/* Certifications */}
                                    <section className="print-break-inside-avoid">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-1.5 bg-teal-100 dark:bg-teal-900/30 rounded-lg text-teal-600 dark:text-teal-400">
                                                <i className="fas fa-certificate"></i>
                                            </div>
                                            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                                                Certifications
                                            </h2>
                                        </div>
                                        <div className="space-y-3">
                                            {CertificationsData.map((cert, index) => (
                                                <div key={index} className="hover-card p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 dark:bg-slate-700 ${cert.color}`}>
                                                        <i className={`${cert.icon}`}></i>
                                                    </div>
                                                    <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100">{cert.title}</h4>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Languages */}
                                    <section className="print-break-inside-avoid">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-1.5 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-pink-600 dark:text-pink-400">
                                                <i className="fas fa-language"></i>
                                            </div>
                                            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                                                Languages
                                            </h2>
                                        </div>
                                        <div className="space-y-5 bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 hover-card">
                                            {LanguagesData.map((lang, index) => (
                                                <div key={index}>
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">{lang.language}</span>
                                                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{lang.level}</span>
                                                    </div>
                                                    <div className="language-progress">
                                                        <div
                                                            className="language-progress-bar"
                                                            style={{ width: `${lang.percentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>


                            </div>
                        </main>
                    </div>
                    
                    <footer className="text-center mt-12 text-slate-500 dark:text-slate-400 text-sm no-print">
                        <p>© {new Date().getFullYear()} {BannerContent.name}. All rights reserved.</p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Resume;
