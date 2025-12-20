import React, { useState, useRef, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Card, CardContent, Typography, Chip, Box, Avatar } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import { BannerContent } from '../Data/banner';
import { ExperienceData } from '../Data/experience';
import { EducationData } from '../Data/education';
import { SkillsData } from '../Data/skills';
import { CoreCompetencies } from '../Data/coreCompetencies';
import { LanguagesData } from '../Data/languages';
import SidebarChatbot from '../Chatbot/SidebarChatbot';

interface ResumeProps {
    toggleTheme?: () => void;
    mode?: 'light' | 'dark';
}

const Resume: React.FC<ResumeProps> = ({ toggleTheme, mode = 'light' }) => {
    const [currentSection, setCurrentSection] = useState(0);
    const [isSwipeMode, setIsSwipeMode] = useState(false);
    const [showAIChat, setShowAIChat] = useState(false);
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


    const toggleAIChat = () => {
        setShowAIChat(!showAIChat);
    };

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
                            background: linear-gradient(to bottom, #6b7280 0%, #9ca3af 50%, #d1d5db 100%);
                            border-radius: 4px;
                            box-shadow: 0 0 10px rgba(107, 114, 128, 0.3);
                        }
                        .dark .timeline-line {
                            background: linear-gradient(to bottom, #6b7280 0%, #9ca3af 50%, #d1d5db 100%);
                            box-shadow: 0 0 10px rgba(107, 114, 128, 0.2);
                        }
                        .timeline-dot {
                            position: absolute;
                            left: 8px;
                            top: 24px;
                            width: 26px;
                            height: 26px;
                            border-radius: 50%;
                            background: linear-gradient(135deg, #6b7280, #9ca3af);
                            border: 3px solid white;
                            z-index: 10;
                            box-shadow: 0 4px 12px rgba(107, 114, 128, 0.4);
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
                            background: linear-gradient(135deg, #6b7280, #9ca3af);
                        }
                        .group:hover .timeline-dot {
                            transform: scale(1.3) rotate(180deg);
                            box-shadow: 0 6px 20px rgba(107, 114, 128, 0.6);
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
                            background: linear-gradient(90deg, #6b7280 0%, #9ca3af 50%, #d1d5db 100%);
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
                            margin: 0.4cm;
                            size: A4 portrait;
                        }

                        * {
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                            color-adjust: exact !important;
                        }

                        html, body {
                            background: white !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            height: auto !important;
                            overflow: visible !important;
                        }

                        /* HIDE ONLY INTERACTIVE ELEMENTS */
                        .no-print, .fixed, button[title="Print Resume"],
                        .MuiSwitch-root, button[title="AI Resume Assistant"] {
                            display: none !important;
                        }

                        /* PRESERVE EXACT SCREEN LAYOUT */
                        .py-6.px-4 {
                            padding: 0 !important;
                        }

                        .max-w-7xl {
                            max-width: none !important;
                            margin: 0 !important;
                        }

                        .resume-container {
                            transform: scale(0.85) !important;
                            transform-origin: top center !important;
                            width: 117.65% !important;
                            margin: 0 auto !important;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
                            border-radius: 24px !important;
                            overflow: visible !important;
                            height: auto !important;
                        }

                        /* PRESERVE GLASS PANEL EXACTLY */
                        .glass-panel {
                            background: rgba(255, 255, 255, 0.95) !important;
                            border: 1px solid rgba(229, 231, 235, 0.2) !important;
                            backdrop-filter: none !important;
                            border-radius: 24px !important;
                            overflow: hidden !important;
                        }

                        /* PRESERVE HEADER DESIGN EXACTLY */
                        header {
                            background: linear-gradient(to right, #1e293b, #334155) !important;
                            color: white !important;
                            border-radius: 24px 24px 0 0 !important;
                            padding: 1rem 2rem !important;
                        }

                        /* PRESERVE GRID LAYOUT EXACTLY */
                        .print-grid {
                            display: grid !important;
                            grid-template-columns: 65% 35% !important;
                            gap: 3rem !important;
                            padding: 0 2rem 2rem 2rem !important;
                            margin: 0 !important;
                        }

                        .print-main-col {
                            width: 100% !important;
                            padding: 0 !important;
                            margin: 0 !important;
                        }

                        .print-sidebar-col {
                            width: 100% !important;
                            padding: 0 !important;
                            margin: 0 !important;
                        }

                        /* PRESERVE ALL SPACINGS EXACTLY */
                        .space-y-10 > * + * {
                            margin-top: 2.5rem !important;
                        }

                        .space-y-6 > * + * {
                            margin-top: 1.5rem !important;
                        }

                        .space-y-4 > * + * {
                            margin-top: 1rem !important;
                        }

                        .mb-10 {
                            margin-bottom: 2.5rem !important;
                        }

                        .mb-8 {
                            margin-bottom: 2rem !important;
                        }

                        .mb-6 {
                            margin-bottom: 1.5rem !important;
                        }

                        .mb-4 {
                            margin-bottom: 1rem !important;
                        }

                        .gap-12 {
                            gap: 3rem !important;
                        }

                        .gap-6 {
                            gap: 1.5rem !important;
                        }

                        .gap-4 {
                            gap: 1rem !important;
                        }

                        .gap-3 {
                            gap: 0.75rem !important;
                        }

                        /* KEEP PROFILE PICTURE CIRCULAR */
                        header img, header .rounded-full {
                            border-radius: 50% !important;
                        }

                        /* PRESERVE TIMELINE DESIGN EXACTLY */
                        .MuiTimeline-root {
                            display: block !important;
                            padding-left: 0 !important;
                        }

                        .MuiTimelineDot-root {
                            background: white !important;
                            border: 3px solid #6b7280 !important;
                            box-shadow: 0 4px 16px rgba(107, 114, 128, 0.2) !important;
                            width: 56px !important;
                            height: 56px !important;
                        }

                        .MuiTimelineConnector-root {
                            background: #e2e8f0 !important;
                            width: 2px !important;
                        }

                        /* PRESERVE CARD DESIGN EXACTLY */
                        .MuiCard-root {
                            background: white !important;
                            border: 1px solid #e5e7eb !important;
                            border-radius: 12px !important;
                            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
                            margin-bottom: 1rem !important;
                        }

                        .MuiCard-root::before {
                            content: "" !important;
                            position: absolute !important;
                            top: 0 !important;
                            left: 0 !important;
                            right: 0 !important;
                            height: 3px !important;
                            background: linear-gradient(90deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%) !important;
                            border-radius: 12px 12px 0 0 !important;
                        }

                        .MuiCardContent-root {
                            padding: 1.5rem !important;
                        }

                        /* PRESERVE AVATAR/LOGO DESIGN EXACTLY */
                        .MuiAvatar-root {
                            border-radius: 50% !important;
                            border: 1px solid #f1f5f9 !important;
                            width: 40px !important;
                            height: 40px !important;
                        }

                        .MuiAvatar-root img {
                            object-fit: contain !important;
                            padding: 2px !important;
                        }

                        /* PRESERVE CHIP STYLING EXACTLY */
                        .MuiChip-root {
                            border-radius: 16px !important;
                            background: #f3f4f6 !important;
                            border: 1px solid #d1d5db !important;
                            margin: 0.25rem !important;
                            height: auto !important;
                            font-size: 0.875rem !important;
                        }

                        /* PRESERVE SECTION ICONS */
                        .fa-briefcase, .fa-code, .fa-certificate,
                        .fa-graduation-cap, .fa-star, .fa-language, .fa-cloud {
                            display: inline !important;
                            color: inherit !important;
                        }

                        /* PRESERVE COLORED BACKGROUNDS EXACTLY */
                        .bg-blue-100 {
                            background: #dbeafe !important;
                        }

                        .bg-slate-100 {
                            background: #f1f5f9 !important;
                        }

                        .bg-orange-100 {
                            background: #fed7aa !important;
                        }

                        .bg-purple-100 {
                            background: #e9d5ff !important;
                        }

                        .bg-pink-100 {
                            background: #fce7f3 !important;
                        }

                        .dark\\:bg-blue-900\\/30 {
                            background: rgba(30, 58, 138, 0.1) !important;
                        }

                        .dark\\:bg-slate-800\\/50 {
                            background: rgba(30, 41, 59, 0.1) !important;
                        }

                        /* PRESERVE ALL COLORS EXACTLY */
                        .bg-gradient-to-r {
                            background: linear-gradient(to right, #1e293b, #334155) !important;
                        }

                        .text-blue-300 {
                            color: #93c5fd !important;
                        }

                        .text-slate-300 {
                            color: #cbd5e1 !important;
                        }

                        .text-blue-600 {
                            color: #2563eb !important;
                        }

                        .dark\\:text-blue-400 {
                            color: #60a5fa !important;
                        }

                        /* PRESERVE HOVER EFFECTS (STATIC STATE) */
                        .hover-card {
                            transform: none !important;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
                        }

                        /* PRESERVE ANIMATED BACKGROUND */
                        .grid-bg {
                            display: block !important;
                            opacity: 0.3 !important;
                        }

                        /* PRESERVE SOCIAL MEDIA BUTTON STYLING EXACTLY */
                        .bg-blue-700 {
                            background: #1d4ed8 !important;
                        }

                        .bg-gray-900 {
                            background: #111827 !important;
                        }

                        .bg-gradient-to-br {
                            background: linear-gradient(to bottom right, #f59e0b, #f97316) !important;
                        }

                        .bg-purple-700 {
                            background: #7c3aed !important;
                        }

                        .bg-blue-600 {
                            background: #2563eb !important;
                        }

                        /* PRESERVE ROUNDED ELEMENTS EXACTLY */
                        .rounded-full {
                            border-radius: 9999px !important;
                        }

                        .rounded-lg {
                            border-radius: 8px !important;
                        }

                        .rounded-md {
                            border-radius: 6px !important;
                        }

                        .rounded-3xl {
                            border-radius: 24px !important;
                        }

                        /* PRESERVE PADDING EXACTLY */
                        .p-2 {
                            padding: 0.5rem !important;
                        }

                        .p-4 {
                            padding: 1rem !important;
                        }

                        .p-6 {
                            padding: 1.5rem !important;
                        }

                        .py-4 {
                            padding-top: 1rem !important;
                            padding-bottom: 1rem !important;
                        }

                        .px-4 {
                            padding-left: 1rem !important;
                            padding-right: 1rem !important;
                        }

                        /* HIDE AI CHAT IF OPEN */
                        .fixed.bottom-4.right-4 {
                            display: none !important;
                        }

                        /* ENSURE PROPER PAGE BREAKS */
                        .print-break-inside-avoid {
                            break-inside: avoid !important;
                            page-break-inside: avoid !important;
                        }

                        /* PRESERVE TYPOGRAPHY EXACTLY */
                        body {
                            font-size: 1rem !important;
                            line-height: 1.5 !important;
                        }

                        h1 {
                            font-size: 1.875rem !important;
                            line-height: 2.25rem !important;
                        }

                        h2 {
                            font-size: 1.5rem !important;
                            line-height: 2rem !important;
                        }

                        h3 {
                            font-size: 1.125rem !important;
                            line-height: 1.75rem !important;
                        }

                        .text-sm {
                            font-size: 0.875rem !important;
                            line-height: 1.25rem !important;
                        }

                        .text-xs {
                            font-size: 0.75rem !important;
                            line-height: 1rem !important;
                        }

                        /* PRESERVE SECTION HEADERS EXACTLY */
                        .flex.items-center.gap-3.mb-8 h2 {
                            font-size: 1.5rem !important;
                            font-weight: 700 !important;
                            text-transform: uppercase !important;
                            letter-spacing: 0.1em !important;
                            color: #1e293b !important;
                        }
                    }
                    `}
                </style>

                <div className="fixed top-4 right-4 z-50 no-print flex flex-col gap-2">
                    <button
                        onClick={() => window.print()}
                        className="bg-white/90 dark:bg-slate-800/90 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-slate-600/50 rounded-md p-1.5 transition-all duration-200 hover:shadow-sm backdrop-blur-sm"
                        title="Print Resume"
                    >
                        <i className="fas fa-print text-xs"></i>
                    </button>

                    <div className="bg-white/90 dark:bg-slate-800/90 border border-gray-200/50 dark:border-slate-600/50 rounded-md p-2 backdrop-blur-sm flex items-center justify-center">
                        <Switch
                            checked={mode === 'dark'}
                            onChange={toggleTheme}
                            size="small"
                        />
                    </div>

                    <button
                        onClick={toggleAIChat}
                        className={`${showAIChat ? 'bg-slate-700' : 'bg-slate-800'} hover:bg-slate-900 text-white border border-slate-600 rounded-md p-1.5 transition-all duration-200 hover:shadow-sm backdrop-blur-sm`}
                        title="AI Resume Assistant"
                    >
                        <i className="fas fa-robot text-xs"></i>
                    </button>
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

                        <header className="bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black text-white p-4 md:p-6 relative z-10">
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-3 border-white/20 shadow-lg overflow-hidden flex-shrink-0 relative group order-2 md:order-2">
                                    <img
                                        src={BannerContent.displayPic}
                                        alt={BannerContent.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onLoad={() => console.log('Profile image loaded successfully:', BannerContent.displayPic)}
                                        onError={(e) => {
                                            console.error('Profile image failed to load:', BannerContent.displayPic);
                                            console.log('Image element:', e.target);
                                        }}
                                    />
                                </div>
                                <div className="text-center md:text-left flex-grow order-1 md:order-1">
                                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">{BannerContent.name}</h1>
                                    <p className="text-blue-300 text-base font-medium mb-2">{BannerContent.role}</p>

                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-300">
                                        <a href={`mailto:${BannerContent.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                                            <i className="fas fa-envelope"></i> {BannerContent.email}
                                        </a>
                                        <a href={`tel:${BannerContent.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                                            <i className="fas fa-phone"></i> {BannerContent.phone}
                                        </a>
                                        <span className="flex items-center gap-2">
                                            <i className="fas fa-map-marker-alt"></i> {BannerContent.location}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 pt-4 border-t border-white/10">
                                        {BannerContent.linkedin && (
                                            <a href={BannerContent.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-600 px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:-translate-y-0.5">
                                                <i className="fab fa-linkedin"></i> LinkedIn
                                            </a>
                                        )}
                                        {BannerContent.github && (
                                            <a href={BannerContent.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white bg-gray-900 hover:bg-black px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:-translate-y-0.5">
                                                <i className="fab fa-github"></i> GitHub
                                            </a>
                                        )}
                                        {BannerContent.huggingface && (
                                            <a href={BannerContent.huggingface} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:-translate-y-0.5">
                                                <i className="fas fa-robot"></i> HuggingFace
                                            </a>
                                        )}
                                        {BannerContent.website && (
                                            <a href={BannerContent.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white bg-purple-700 hover:bg-purple-600 px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:-translate-y-0.5">
                                                <i className="fas fa-briefcase"></i> Portfolio
                                            </a>
                                        )}
                                        <a href={trailheadStats.profileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-4 py-2 rounded-full text-sm font-medium transition-all hover:shadow-lg hover:-translate-y-0.5">
                                            <div className="flex items-center justify-center w-6 h-6 bg-yellow-400 rounded-full">
                                                <i className="fas fa-cloud text-indigo-600 text-xs"></i>
                                            </div>
                                            <div className="text-left">
                                                <div className="text-xs font-bold">{trailheadStats.rank}</div>
                                            </div>
                                        </a>
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
                                {/* LEFT COLUMN - Professional Experience & Technical Skills */}
                                <div className={`lg:col-span-8 print-main-col order-1 lg:order-1 ${
                                    isSwipeMode && currentSection !== 0 ? 'hidden lg:block' : ''
                                }`}>
                                    {/* Experience Section with Material-UI Timeline */}
                                    <section className="print-break-inside-avoid mb-10">
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                                                <i className="fas fa-briefcase text-xl"></i>
                                            </div>
                                            <h2 className="text-2xl font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                                                Professional Experience
                                            </h2>
                                        </div>

                                        <Timeline
                                            className="no-print"
                                            sx={{
                                                '& .MuiTimelineItem-root': {
                                                    '&:before': {
                                                        display: 'none', // Remove default spacing
                                                    },
                                                    minHeight: 'auto',
                                                },
                                                '& .MuiTimelineSeparator-root': {
                                                    marginRight: '16px', // Tight spacing between dot and content
                                                },
                                                '& .MuiTimelineContent-root': {
                                                    paddingLeft: '0px !important', // Remove default padding
                                                    paddingRight: '0px !important',
                                                },
                                                paddingLeft: '0px', // Remove timeline's left padding
                                            }}
                                        >
                                            {ExperienceData.map((exp, index) => (
                                                <TimelineItem key={index}>
                                                    <TimelineSeparator>
                                                        <TimelineDot
                                                            sx={{
                                                                bgcolor: 'white',
                                                                width: 56,
                                                                height: 56,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                boxShadow: '0 4px 16px rgba(107, 114, 128, 0.2)',
                                                                border: '3px solid #6b7280',
                                                                marginLeft: 0,
                                                                marginRight: 0,
                                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                '&:hover': {
                                                                    transform: 'scale(1.05)',
                                                                    boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
                                                                }
                                                            }}
                                                        >
                                                            {exp.logo ? (
                                                                <Avatar
                                                                    src={exp.logo}
                                                                    alt={exp.company}
                                                                    sx={{
                                                                        width: 40,
                                                                        height: 40,
                                                                        border: '1px solid #f1f5f9',
                                                                        '& img': {
                                                                            objectFit: 'contain',
                                                                            padding: '2px'
                                                                        }
                                                                    }}
                                                                    onError={(e) => {
                                                                        console.error('Company logo failed:', exp.company, exp.logo);
                                                                    }}
                                                                >
                                                                    <BusinessIcon sx={{ color: '#64748b' }} />
                                                                </Avatar>
                                                            ) : (
                                                                <WorkIcon sx={{ color: '#64748b', fontSize: '24px' }} />
                                                            )}
                                                        </TimelineDot>
                                                        {index < ExperienceData.length - 1 && (
                                                            <TimelineConnector
                                                                sx={{
                                                                    bgcolor: '#e2e8f0',
                                                                    width: 2,
                                                                    marginLeft: '1px'
                                                                }}
                                                            />
                                                        )}
                                                    </TimelineSeparator>
                                                    <TimelineContent sx={{ py: '12px', px: 0, flex: 1 }}>
                                                        <Card
                                                            elevation={0}
                                                            sx={{
                                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                '&:hover': {
                                                                    transform: 'translateY(-4px)',
                                                                    boxShadow: '0 16px 32px rgba(107, 114, 128, 0.15)',
                                                                    borderColor: '#6b7280',
                                                                    '& .company-header': {
                                                                        transform: 'scale(1.02)',
                                                                    },
                                                                    '& .experience-bullet': {
                                                                        transform: 'scale(1.2)',
                                                                        backgroundColor: '#6b7280',
                                                                    }
                                                                },
                                                                borderRadius: 3,
                                                                border: '1px solid',
                                                                borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                                width: '100%',
                                                                backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                                backgroundImage: (theme) => theme.palette.mode === 'dark'
                                                                    ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
                                                                    : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                                                position: 'relative',
                                                                overflow: 'hidden',
                                                                '&::before': {
                                                                    content: '""',
                                                                    position: 'absolute',
                                                                    top: 0,
                                                                    left: 0,
                                                                    right: 0,
                                                                    height: '3px',
                                                                    background: 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
                                                                    opacity: 0.8,
                                                                    transition: 'all 0.3s ease'
                                                                },
                                                                '&:hover::before': {
                                                                    height: '4px',
                                                                    opacity: 1,
                                                                    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)',
                                                                }
                                                            }}
                                                        >
                                                            <CardContent sx={{ p: 3, pt: 4 }}>
                                                                <Box className="company-header" sx={{ mb: 3, transition: 'transform 0.3s ease' }}>
                                                                    <div className="flex justify-between items-start mb-2">
                                                                        <div className="flex-1">
                                                                            <Typography
                                                                                variant="h6"
                                                                                component="h3"
                                                                                sx={{
                                                                                    fontWeight: 700,
                                                                                    mb: 0.5,
                                                                                    fontSize: '1.125rem',
                                                                                    color: (theme) => theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937',
                                                                                    lineHeight: 1.3,
                                                                                }}
                                                                            >
                                                                                {exp.role}
                                                                            </Typography>
                                                                            <Typography
                                                                                variant="subtitle1"
                                                                                sx={{
                                                                                    color: (theme) => theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280',
                                                                                    fontWeight: 600,
                                                                                    fontSize: '0.95rem',
                                                                                    mb: 1
                                                                                }}
                                                                            >
                                                                                {exp.company}
                                                                            </Typography>
                                                                        </div>
                                                                        <Box sx={{ textAlign: 'right', ml: 2 }}>
                                                                            <Typography
                                                                                variant="body2"
                                                                                sx={{
                                                                                    color: (theme) => theme.palette.mode === 'dark' ? '#d1d5db' : '#374151',
                                                                                    fontWeight: 600,
                                                                                    fontSize: '0.875rem',
                                                                                    mb: 0.5
                                                                                }}
                                                                            >
                                                                                {exp.duration}
                                                                            </Typography>
                                                                            <Typography
                                                                                variant="caption"
                                                                                sx={{
                                                                                    color: (theme) => theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    gap: 0.5,
                                                                                    justifyContent: 'flex-end',
                                                                                    fontSize: '0.8rem'
                                                                                }}
                                                                            >
                                                                                <Box
                                                                                    component="span"
                                                                                    sx={{
                                                                                        width: 4,
                                                                                        height: 4,
                                                                                        borderRadius: '50%',
                                                                                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#6b7280' : '#9ca3af',
                                                                                        display: 'inline-block'
                                                                                    }}
                                                                                />
                                                                                {exp.location}
                                                                            </Typography>
                                                                        </Box>
                                                                    </div>
                                                                </Box>

                                                                <Box sx={{ mt: 2 }}>
                                                                    {exp.experience.map((item, i) => (
                                                                        <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 2, alignItems: 'flex-start' }}>
                                                                            <Box
                                                                                className="experience-bullet"
                                                                                sx={{
                                                                                    width: 6,
                                                                                    height: 6,
                                                                                    borderRadius: '50%',
                                                                                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280',
                                                                                    flexShrink: 0,
                                                                                    mt: 0.75,
                                                                                    transition: 'all 0.3s ease',
                                                                                    boxShadow: (theme) => theme.palette.mode === 'dark'
                                                                                        ? '0 0 8px rgba(156, 163, 175, 0.3)'
                                                                                        : '0 0 8px rgba(107, 114, 128, 0.3)',
                                                                                }}
                                                                            />
                                                                            <Typography
                                                                                variant="body2"
                                                                                sx={{
                                                                                    lineHeight: 1.6,
                                                                                    fontSize: '0.875rem',
                                                                                    color: (theme) => theme.palette.mode === 'dark' ? '#e5e7eb' : '#374151',
                                                                                    '& strong': {
                                                                                        color: (theme) => theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937',
                                                                                        fontWeight: 700
                                                                                    }
                                                                                }}
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                                                                }}
                                                                            />
                                                                        </Box>
                                                                    ))}
                                                                </Box>
                                                            </CardContent>
                                                        </Card>
                                                    </TimelineContent>
                                                </TimelineItem>
                                            ))}
                                        </Timeline>

                                        {/* Print version without MUI Timeline */}
                                        <div className="print:block hidden">
                                            {ExperienceData.map((exp, index) => (
                                                <div key={index} className="mb-6 pb-4 border-b border-gray-200">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <h3 className="font-bold text-lg">{exp.role}</h3>
                                                            <p className="text-blue-600 font-medium">{exp.company}</p>
                                                        </div>
                                                        <div className="text-right text-sm">
                                                            <p className="font-medium">{exp.duration}</p>
                                                            <p className="text-gray-500">{exp.location}</p>
                                                        </div>
                                                    </div>
                                                    <ul className="text-sm space-y-1 mt-2">
                                                        {exp.experience.map((item, i) => (
                                                            <li key={i} className="flex gap-2">
                                                                <span>•</span>
                                                                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Technical Skills Section - MOVED TO LEFT COLUMN */}
                                    <section className="print-break-inside-avoid mb-10">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-lg text-slate-600 dark:text-slate-300">
                                                <i className="fas fa-code"></i>
                                            </div>
                                            <h2 className="text-2xl font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                                                Technical Skills
                                            </h2>
                                        </div>
                                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                            {SkillsData.map((category, index) => (
                                                <Card
                                                    key={index}
                                                    elevation={0}
                                                    sx={{
                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        '&:hover': {
                                                            transform: 'translateY(-4px)',
                                                            boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                                                            '& .skill-header': {
                                                                transform: 'scale(1.02)',
                                                            },
                                                            '& .MuiChip-root': {
                                                                transform: 'translateY(-1px)',
                                                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                                            }
                                                        },
                                                        borderRadius: 3,
                                                        border: (theme) => theme.palette.mode === 'dark'
                                                            ? '1px solid #475569'
                                                            : '1px solid #e2e8f0',
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                        background: (theme) => theme.palette.mode === 'dark'
                                                            ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
                                                            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                                        '&::before': {
                                                            content: '""',
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            right: 0,
                                                            height: '4px',
                                                            background: index === 0 ? 'linear-gradient(90deg, #3b82f6, #1d4ed8)' :
                                                                       index === 1 ? 'linear-gradient(90deg, #10b981, #059669)' :
                                                                       index === 2 ? 'linear-gradient(90deg, #8b5cf6, #7c3aed)' :
                                                                       index === 3 ? 'linear-gradient(90deg, #f59e0b, #d97706)' :
                                                                       'linear-gradient(90deg, #06b6d4, #0891b2)',
                                                            transition: 'all 0.3s ease'
                                                        },
                                                        '&:hover::before': {
                                                            height: '6px',
                                                            boxShadow: index === 0 ? '0 2px 8px rgba(59, 130, 246, 0.3)' :
                                                                       index === 1 ? '0 2px 8px rgba(16, 185, 129, 0.3)' :
                                                                       index === 2 ? '0 2px 8px rgba(139, 92, 246, 0.3)' :
                                                                       index === 3 ? '0 2px 8px rgba(245, 158, 11, 0.3)' :
                                                                       '0 2px 8px rgba(6, 182, 212, 0.3)',
                                                        }
                                                    }}
                                                >
                                                    <CardContent sx={{ p: 3, pt: 4 }}>
                                                        <Box className="skill-header" sx={{ mb: 3, transition: 'transform 0.3s ease' }}>
                                                            <Typography
                                                                variant="subtitle1"
                                                                component="h3"
                                                                sx={{
                                                                    fontWeight: 700,
                                                                    fontSize: '0.875rem',
                                                                    textTransform: 'uppercase',
                                                                    letterSpacing: '0.05em',
                                                                    color: index === 0 ? '#1e40af' :
                                                                           index === 1 ? '#065f46' :
                                                                           index === 2 ? '#6b21a8' :
                                                                           index === 3 ? '#92400e' :
                                                                           '#0e7490',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 1
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        width: 8,
                                                                        height: 8,
                                                                        borderRadius: '50%',
                                                                        background: index === 0 ? 'linear-gradient(45deg, #3b82f6, #1d4ed8)' :
                                                                                    index === 1 ? 'linear-gradient(45deg, #10b981, #059669)' :
                                                                                    index === 2 ? 'linear-gradient(45deg, #8b5cf6, #7c3aed)' :
                                                                                    index === 3 ? 'linear-gradient(45deg, #f59e0b, #d97706)' :
                                                                                    'linear-gradient(45deg, #06b6d4, #0891b2)',
                                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                                    }}
                                                                />
                                                                {category.type}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                            {category.skills.map((skill, i) => (
                                                                <Chip
                                                                    key={i}
                                                                    label={skill}
                                                                    size="small"
                                                                    variant="outlined"
                                                                    sx={{
                                                                        fontSize: '0.75rem',
                                                                        fontWeight: 500,
                                                                        height: '28px',
                                                                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                                                        borderColor: (theme) => theme.palette.mode === 'dark' ? '#475569' : '#d1d5db',
                                                                        color: (theme) => theme.palette.mode === 'dark' ? '#e2e8f0' : '#374151',
                                                                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#334155' : '#f9fafb',
                                                                        '&:hover': {
                                                                            borderColor: index === 0 ? '#3b82f6' :
                                                                                         index === 1 ? '#10b981' :
                                                                                         index === 2 ? '#8b5cf6' :
                                                                                         index === 3 ? '#f59e0b' :
                                                                                         '#06b6d4',
                                                                            backgroundColor: index === 0 ? '#dbeafe' :
                                                                                            index === 1 ? '#d1fae5' :
                                                                                            index === 2 ? '#e9d5ff' :
                                                                                            index === 3 ? '#fef3c7' :
                                                                                            '#cffafe',
                                                                            color: index === 0 ? '#1e40af' :
                                                                                   index === 1 ? '#065f46' :
                                                                                   index === 2 ? '#6b21a8' :
                                                                                   index === 3 ? '#92400e' :
                                                                                   '#0e7490',
                                                                            transform: 'scale(1.05)',
                                                                        }
                                                                    }}
                                                                />
                                                            ))}
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                {/* RIGHT COLUMN - Skills & Info (MOVED FROM LEFT) */}
                                <div className={`lg:col-span-4 print-sidebar-col space-y-10 order-2 lg:order-2 ${
                                    isSwipeMode && currentSection !== 1 ? 'hidden lg:block' : ''
                                }`}>



                                    {/* Certifications */}
                                    <section className="print-break-inside-avoid">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-lg text-slate-600 dark:text-slate-300">
                                                <i className="fas fa-certificate"></i>
                                            </div>
                                            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                                                Certifications
                                            </h2>
                                        </div>

                                        {/* Grouped by certification type */}
                                        <div className="space-y-4">
                                            {/* Salesforce Architect Certifications */}
                                            <Card
                                                elevation={0}
                                                sx={{
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                                                        '& .cert-header': {
                                                            transform: 'scale(1.02)',
                                                        }
                                                    },
                                                    borderRadius: 3,
                                                    border: '1px solid',
                                                    borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                <CardContent sx={{ p: 3, pt: 4 }}>
                                                    <Box className="cert-header" sx={{ transition: 'transform 0.3s ease', mb: 2 }}>
                                                        <div className="flex items-center gap-3 mb-3">
                                                            <Box
                                                                sx={{
                                                                    width: 32,
                                                                    height: 32,
                                                                    borderRadius: '50%',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#f3f4f6',
                                                                    color: (theme) => theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280',
                                                                    border: '2px solid',
                                                                    borderColor: (theme) => theme.palette.mode === 'dark' ? '#4b5563' : '#d1d5db'
                                                                }}
                                                            >
                                                                <i className="fas fa-network-wired text-sm"></i>
                                                            </Box>
                                                            <Typography
                                                                variant="h6"
                                                                component="h3"
                                                                sx={{
                                                                    fontWeight: 700,
                                                                    fontSize: '0.95rem',
                                                                    color: (theme) => theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937',
                                                                }}
                                                            >
                                                                Salesforce Architect (4)
                                                            </Typography>
                                                        </div>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontSize: '0.8rem',
                                                                color: (theme) => theme.palette.mode === 'dark' ? '#d1d5db' : '#4b5563',
                                                                lineHeight: 1.5
                                                            }}
                                                        >
                                                            System Architect • Platform Development Lifecycle & Deployment • Identity & Access Management • Platform Integration
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>

                                            {/* Salesforce Developer Certifications */}
                                            <Card
                                                elevation={0}
                                                sx={{
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                                                        '& .cert-header': {
                                                            transform: 'scale(1.02)',
                                                        }
                                                    },
                                                    borderRadius: 3,
                                                    border: '1px solid',
                                                    borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                <CardContent sx={{ p: 3, pt: 4 }}>
                                                    <Box className="cert-header" sx={{ transition: 'transform 0.3s ease', mb: 2 }}>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <Box
                                                                sx={{
                                                                    width: 32,
                                                                    height: 32,
                                                                    borderRadius: '50%',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#f3f4f6',
                                                                    color: (theme) => theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280',
                                                                    border: '2px solid',
                                                                    borderColor: (theme) => theme.palette.mode === 'dark' ? '#4b5563' : '#d1d5db'
                                                                }}
                                                            >
                                                                <i className="fas fa-code text-sm"></i>
                                                            </Box>
                                                            <Typography
                                                                variant="h6"
                                                                component="h3"
                                                                sx={{
                                                                    fontWeight: 700,
                                                                    fontSize: '0.95rem',
                                                                    color: (theme) => theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937',
                                                                }}
                                                            >
                                                                Salesforce Developer (2)
                                                            </Typography>
                                                        </div>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontSize: '0.8rem',
                                                                color: (theme) => theme.palette.mode === 'dark' ? '#d1d5db' : '#4b5563',
                                                                lineHeight: 1.5
                                                            }}
                                                        >
                                                            Platform Developer II • Platform Developer I
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>

                                            {/* Specialties */}
                                            <Card
                                                elevation={0}
                                                sx={{
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                                                        '& .cert-header': {
                                                            transform: 'scale(1.02)',
                                                        }
                                                    },
                                                    borderRadius: 3,
                                                    border: '1px solid',
                                                    borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                <CardContent sx={{ p: 3, pt: 4 }}>
                                                    <Box className="cert-header" sx={{ transition: 'transform 0.3s ease', mb: 2 }}>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <Box
                                                                sx={{
                                                                    width: 32,
                                                                    height: 32,
                                                                    borderRadius: '50%',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#f3f4f6',
                                                                    color: (theme) => theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280',
                                                                    border: '2px solid',
                                                                    borderColor: (theme) => theme.palette.mode === 'dark' ? '#4b5563' : '#d1d5db'
                                                                }}
                                                            >
                                                                <i className="fas fa-robot text-sm"></i>
                                                            </Box>
                                                            <Typography
                                                                variant="h6"
                                                                component="h3"
                                                                sx={{
                                                                    fontWeight: 700,
                                                                    fontSize: '0.95rem',
                                                                    color: (theme) => theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937',
                                                                }}
                                                            >
                                                                Specialties & Cloud (4)
                                                            </Typography>
                                                        </div>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontSize: '0.8rem',
                                                                color: (theme) => theme.palette.mode === 'dark' ? '#d1d5db' : '#4b5563',
                                                                lineHeight: 1.5
                                                            }}
                                                        >
                                                            Agentforce Specialist • AI Associate • All-Star Ranger • AWS Cloud Practitioner
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
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
                                        <div className="space-y-4">
                                            {EducationData.map((edu, index) => (
                                                <Card
                                                    key={index}
                                                    elevation={0}
                                                    sx={{
                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        '&:hover': {
                                                            transform: 'translateY(-4px)',
                                                            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                                                            '& .education-header': {
                                                                transform: 'scale(1.02)',
                                                            }
                                                        },
                                                        borderRadius: 3,
                                                        border: '1px solid',
                                                        borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    <CardContent sx={{ p: 3, pt: 4 }}>
                                                        <Box className="education-header" sx={{ transition: 'transform 0.3s ease' }}>
                                                            <div className="flex items-center gap-3 mb-2">
                                                                {edu.logo && (
                                                                    <img
                                                                        src={edu.logo}
                                                                        alt="University"
                                                                        className="w-8 h-8 object-contain"
                                                                        onLoad={() => console.log('University logo loaded:', edu.university)}
                                                                        onError={(e) => {
                                                                            console.error('University logo failed:', edu.university, edu.logo);
                                                                            const target = e.target as HTMLImageElement;
                                                                            target.style.display = 'none';
                                                                        }}
                                                                    />
                                                                )}
                                                                <Typography
                                                                    variant="h6"
                                                                    component="h3"
                                                                    sx={{
                                                                        fontWeight: 700,
                                                                        fontSize: '1rem',
                                                                        color: (theme) => theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937',
                                                                        lineHeight: 1.3,
                                                                    }}
                                                                >
                                                                    {edu.university}
                                                                </Typography>
                                                            </div>
                                                            <Typography
                                                                variant="subtitle1"
                                                                sx={{
                                                                    color: (theme) => theme.palette.mode === 'dark' ? '#e5e7eb' : '#374151',
                                                                    fontWeight: 600,
                                                                    fontSize: '0.875rem',
                                                                    mb: 0.5
                                                                }}
                                                            >
                                                                {edu.course}
                                                            </Typography>
                                                            <Typography
                                                                variant="caption"
                                                                sx={{
                                                                    color: (theme) => theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280',
                                                                    fontSize: '0.75rem',
                                                                    mb: 1,
                                                                    display: 'block'
                                                                }}
                                                            >
                                                                {edu.duration}
                                                            </Typography>
                                                            {edu.details && (
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        color: (theme) => theme.palette.mode === 'dark' ? '#d1d5db' : '#4b5563',
                                                                        fontSize: '0.75rem',
                                                                        fontStyle: 'italic',
                                                                        lineHeight: 1.4
                                                                    }}
                                                                >
                                                                    {edu.details}
                                                                </Typography>
                                                            )}
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Core Competencies */}
                                    <section className="print-break-inside-avoid">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                                <i className="fas fa-star"></i>
                                            </div>
                                            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                                                Core Competencies
                                            </h2>
                                        </div>
                                        <div className="space-y-4">
                                            {CoreCompetencies.map((competency, index) => (
                                                <Card
                                                    key={index}
                                                    elevation={0}
                                                    sx={{
                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        '&:hover': {
                                                            transform: 'translateY(-4px)',
                                                            boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                                                            '& .competency-header': {
                                                                transform: 'scale(1.02)',
                                                            }
                                                        },
                                                        borderRadius: 3,
                                                        border: '1px solid',
                                                        borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                        position: 'relative',
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    <CardContent sx={{ p: 3, pt: 4 }}>
                                                        <Box className="competency-header" sx={{ transition: 'transform 0.3s ease' }}>
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <Box
                                                                    sx={{
                                                                        width: 32,
                                                                        height: 32,
                                                                        borderRadius: '50%',
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#f3f4f6',
                                                                        color: (theme) => theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280',
                                                                        border: '2px solid',
                                                                        borderColor: (theme) => theme.palette.mode === 'dark' ? '#4b5563' : '#d1d5db'
                                                                    }}
                                                                >
                                                                    <i className={`${competency.icon} text-sm`}></i>
                                                                </Box>
                                                                <div className="flex-1">
                                                                    <Typography
                                                                        variant="h6"
                                                                        component="h3"
                                                                        sx={{
                                                                            fontWeight: 700,
                                                                            fontSize: '0.95rem',
                                                                            color: (theme) => theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937',
                                                                            lineHeight: 1.2,
                                                                            mb: 0.5
                                                                        }}
                                                                    >
                                                                        {competency.title}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            fontSize: '0.8rem',
                                                                            color: (theme) => theme.palette.mode === 'dark' ? '#d1d5db' : '#4b5563',
                                                                            lineHeight: 1.3
                                                                        }}
                                                                    >
                                                                        {competency.subtitle}
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
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

                    {/* Enhanced AI Chatbot */}
                    <SidebarChatbot
                        isOpen={showAIChat}
                        onClose={() => setShowAIChat(false)}
                        isDark={mode === 'dark'}
                    />

                    <footer className="text-center mt-12 text-slate-500 dark:text-slate-400 text-sm no-print">
                        <p>© {new Date().getFullYear()} {BannerContent.name}. All rights reserved.</p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Resume;