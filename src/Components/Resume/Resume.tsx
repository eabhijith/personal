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

interface ResumeProps {
    toggleTheme?: () => void;
    mode?: 'light' | 'dark';
}

const Resume: React.FC<ResumeProps> = ({ toggleTheme, mode = 'light' }) => {
    const [currentSection, setCurrentSection] = useState(0);
    const [isSwipeMode, setIsSwipeMode] = useState(false);
    const [showAIChat, setShowAIChat] = useState(false);
    const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
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


    // Simple AI chat function using Hugging Face API (free tier)
    const sendMessage = async (message: string) => {
        if (!message.trim()) return;

        const newUserMessage = { role: 'user' as const, content: message };
        setChatMessages(prev => [...prev, newUserMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // For now, provide predefined responses based on common questions
            // This can be replaced with actual API calls later
            let response = '';
            const lowerMessage = message.toLowerCase();

            if (lowerMessage.includes('experience') || lowerMessage.includes('work')) {
                response = "Abhijith has extensive experience as a Senior Systems Architect and AI Specialist. He has worked with companies like Zalando, Adidas, Infosys, and LemonOne, focusing on Salesforce platform development, AI integration, and cloud solutions. His experience spans over multiple years in system architecture and development.";
            } else if (lowerMessage.includes('skills') || lowerMessage.includes('technical')) {
                response = "His technical skills are quite comprehensive, including AI & Machine Learning (Salesforce Agentforce, HuggingFace Transformers, RAG), programming languages (Python, JavaScript/TypeScript, Apex), cloud platforms (AWS, GCP), and Salesforce expertise. He's particularly strong in full-stack development with the MERN stack.";
            } else if (lowerMessage.includes('education') || lowerMessage.includes('degree')) {
                response = "Abhijith holds a Master of Science in Data Science from the University of Missouri-Kansas City (UMKC), completed from Aug 2019 to Mar 2021, with a specialization in Machine Learning & Predictive Analytics.";
            } else if (lowerMessage.includes('certifications') || lowerMessage.includes('certified')) {
                response = "He holds 10+ Salesforce certifications including 4 Architect certifications (System Architect, Platform Development Lifecycle & Deployment, Identity & Access Management, Platform Integration), 2 Developer certifications, and specialties in Agentforce, AI Associate, and AWS Cloud Practitioner.";
            } else if (lowerMessage.includes('location') || lowerMessage.includes('where')) {
                response = "Abhijith is currently located in Berlin, Germany. You can reach him at eabhijith@gmail.com or +49 15510521709.";
            } else {
                response = "I can help you learn more about Abhijith's background! Ask me about his experience, skills, education, certifications, or any specific aspects of his professional profile. What would you like to know?";
            }

            setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
        } catch (error) {
            console.error('AI Chat Error:', error);
            setChatMessages(prev => [...prev, {
                role: 'assistant',
                content: 'I apologize, but I encountered an error. Please try asking your question again!'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleAIChat = () => {
        setShowAIChat(!showAIChat);
        if (!showAIChat && chatMessages.length === 0) {
            setChatMessages([{
                role: 'assistant',
                content: "Hi! I'm an AI assistant that can help you learn more about Abhijith's professional background. Feel free to ask me about his experience, skills, education, certifications, or any other aspects of his resume!"
            }]);
        }
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
                            margin: 0.6cm;
                            size: A4 portrait;
                        }

                        * {
                            -webkit-print-color-adjust: exact !important;
                            print-color-adjust: exact !important;
                            color-adjust: exact !important;
                            box-shadow: none !important;
                            border-radius: 0 !important;
                        }

                        html, body {
                            height: auto !important;
                            background: white !important;
                            color: #000 !important;
                            font-family: 'Arial', 'Helvetica', sans-serif !important;
                            font-size: 9pt !important;
                            line-height: 1.3 !important;
                            margin: 0 !important;
                            padding: 0 !important;
                        }

                        /* HIDE UNWANTED ELEMENTS */
                        .no-print, .fixed, button, footer, nav, .MuiSwitch-root,
                        .timeline-line, .timeline-dot, .MuiTimeline-root,
                        .grid-bg, .glass-panel::before, .MuiTimelineDot-root,
                        .MuiTimelineConnector-root, .MuiTimelineSeparator-root {
                            display: none !important;
                        }

                        /* RESET MAIN CONTAINERS */
                        .min-h-screen, main, .resume-container {
                            height: auto !important;
                            min-height: auto !important;
                            background: white !important;
                            padding: 0 !important;
                            margin: 0 !important;
                            border: none !important;
                            border-radius: 0 !important;
                            box-shadow: none !important;
                            backdrop-filter: none !important;
                        }

                        .glass-panel {
                            background: white !important;
                            border: none !important;
                            backdrop-filter: none !important;
                            border-radius: 0 !important;
                        }

                        /* COMPACT HEADER */
                        header {
                            background: #2d3748 !important;
                            color: white !important;
                            padding: 8pt !important;
                            margin: 0 0 6pt 0 !important;
                            page-break-inside: avoid !important;
                            border-radius: 0 !important;
                        }

                        header .flex {
                            display: flex !important;
                            flex-direction: row !important;
                            align-items: center !important;
                            gap: 10pt !important;
                        }

                        /* FIX PROFILE PICTURE - SQUARE NOT CIRCLE */
                        header img, header .w-24, header .w-28, header .w-32 {
                            width: 24pt !important;
                            height: 24pt !important;
                            border: 1pt solid white !important;
                            border-radius: 0 !important;
                            flex-shrink: 0 !important;
                            object-fit: cover !important;
                        }

                        header h1 {
                            font-size: 14pt !important;
                            font-weight: bold !important;
                            margin: 0 0 1pt 0 !important;
                            color: white !important;
                        }

                        header .text-blue-300, header .text-base, header .text-lg {
                            font-size: 9pt !important;
                            color: #e2e8f0 !important;
                            margin: 0 0 2pt 0 !important;
                        }

                        header .text-sm {
                            font-size: 7pt !important;
                            color: #cbd5e1 !important;
                            line-height: 1.2 !important;
                        }

                        header a {
                            color: #e2e8f0 !important;
                            text-decoration: none !important;
                            font-size: 7pt !important;
                        }

                        /* COMPACT LAYOUT FOR ONE PAGE */
                        .print-grid {
                            display: grid !important;
                            grid-template-columns: 60% 40% !important;
                            gap: 10pt !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            height: auto !important;
                        }

                        .print-main-col, .print-sidebar-col {
                            width: 100% !important;
                            padding: 0 !important;
                            margin: 0 !important;
                        }

                        /* COMPACT SECTIONS */
                        h2 {
                            font-size: 10pt !important;
                            border-bottom: 1pt solid #3b82f6 !important;
                            margin: 6pt 0 3pt 0 !important;
                            padding-bottom: 1pt !important;
                            color: #1e293b !important;
                            font-weight: bold !important;
                            text-transform: uppercase !important;
                            letter-spacing: 0.5pt !important;
                        }

                        h2:first-of-type {
                            margin-top: 0 !important;
                        }

                        h3 {
                            font-size: 9pt !important;
                            color: #1e293b !important;
                            margin: 2pt 0 1pt 0 !important;
                            font-weight: bold !important;
                        }

                        p, li, span, div, .MuiTypography-root {
                            font-size: 8pt !important;
                            color: #374151 !important;
                            line-height: 1.2 !important;
                            margin: 0 !important;
                            padding: 0 !important;
                        }

                        /* EXPERIENCE SECTION - COMPACT */
                        .print\\:block {
                            display: block !important;
                        }

                        .print\\:hidden {
                            display: none !important;
                        }

                        .print\\:block .mb-6 {
                            margin: 0 0 4pt 0 !important;
                            padding: 0 0 3pt 0 !important;
                            border-bottom: 0.5pt solid #e5e7eb !important;
                            page-break-inside: avoid !important;
                        }

                        .print\\:block .mb-6:last-child {
                            border-bottom: none !important;
                            margin-bottom: 0 !important;
                        }

                        /* CARDS AND CONTAINERS - MINIMAL */
                        .MuiCard-root, .hover-card, .bg-white, .dark\\:bg-slate-800 {
                            background: white !important;
                            border: none !important;
                            margin: 0 0 2pt 0 !important;
                            padding: 0 !important;
                            border-radius: 0 !important;
                            box-shadow: none !important;
                            page-break-inside: avoid !important;
                        }

                        .MuiCardContent-root {
                            padding: 0 !important;
                        }

                        /* COMPANY LOGOS - FIX CIRCLES */
                        .MuiAvatar-root, .MuiAvatar-root img {
                            width: 12pt !important;
                            height: 12pt !important;
                            border-radius: 0 !important;
                            border: 0.5pt solid #ccc !important;
                            margin-right: 4pt !important;
                            object-fit: contain !important;
                            background: white !important;
                        }

                        /* REMOVE ALL TAILWIND SPACING */
                        .gap-12, .gap-8, .gap-6, .gap-4, .gap-3, .gap-2, .gap-1,
                        .mb-10, .mb-8, .mb-6, .mb-4, .mb-3, .mb-2, .mb-1,
                        .mt-12, .mt-10, .mt-8, .mt-6, .mt-4, .mt-3, .mt-2, .mt-1,
                        .p-10, .p-8, .p-6, .p-4, .p-3, .p-2, .p-1,
                        .py-10, .py-8, .py-6, .py-4, .py-3, .py-2, .py-1,
                        .px-10, .px-8, .px-6, .px-4, .px-3, .px-2, .px-1 {
                            gap: 0 !important;
                            margin: 0 !important;
                            padding: 0 !important;
                        }

                        /* SKILLS AND CHIPS - COMPACT */
                        .MuiChip-root {
                            font-size: 7pt !important;
                            height: auto !important;
                            padding: 1pt 3pt !important;
                            margin: 1pt !important;
                            background: #f3f4f6 !important;
                            color: #374151 !important;
                            border: 0.5pt solid #d1d5db !important;
                        }

                        .MuiChip-label {
                            padding: 0 !important;
                        }

                        /* HIDE DECORATIVE ELEMENTS */
                        i, .fa-briefcase, .fa-code, .fa-certificate, .fa-graduation-cap,
                        .fa-star, .fa-language, .fa-cloud, .fab, .fas,
                        .bg-blue-100, .bg-slate-100, .bg-orange-100, .bg-purple-100, .bg-pink-100,
                        .dark\\:bg-blue-900\\/30, .dark\\:bg-slate-800\\/50, .dark\\:bg-orange-900\\/30,
                        .dark\\:bg-purple-900\\/30, .dark\\:bg-pink-900\\/30 {
                            display: none !important;
                        }

                        /* ENSURE CLEAN BACKGROUNDS */
                        .bg-slate-50, .dark\\:bg-slate-950, .bg-white, .dark\\:bg-slate-800 {
                            background: white !important;
                            color: #000 !important;
                        }

                        /* COMPACT LISTS */
                        ul, ol {
                            margin: 0 !important;
                            padding: 0 0 0 8pt !important;
                        }

                        li {
                            margin: 0 0 1pt 0 !important;
                            padding: 0 !important;
                            line-height: 1.2 !important;
                        }

                        /* PREVENT SECTION OVERLAP */
                        .print-break-inside-avoid, section {
                            page-break-inside: avoid !important;
                            break-inside: avoid !important;
                            margin: 0 0 6pt 0 !important;
                            overflow: visible !important;
                        }

                        /* TEXT COLOR FIXES */
                        .text-slate-500, .text-slate-400, .text-slate-600, .text-gray-600 {
                            color: #6b7280 !important;
                        }

                        .text-blue-600 {
                            color: #2563eb !important;
                        }

                        /* COMPACT EXPERIENCE LAYOUT */
                        .company-header {
                            margin-bottom: 2pt !important;
                        }

                        .experience-bullet {
                            display: none !important;
                        }

                        /* ENSURE SINGLE PAGE FIT */
                        .resume-container {
                            max-height: none !important;
                            overflow: visible !important;
                        }

                        /* LANGUAGE PROGRESS BARS - SIMPLE */
                        .language-progress-bar, .language-progress-bg {
                            display: none !important;
                        }

                        /* SOCIAL LINKS IN HEADER - COMPACT */
                        header .gap-4 {
                            gap: 4pt !important;
                        }

                        header .rounded-full {
                            border-radius: 0 !important;
                            padding: 1pt 3pt !important;
                            font-size: 6pt !important;
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

                    {/* AI Chat Interface */}
                    {showAIChat && (
                        <div className="fixed bottom-4 right-4 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-2xl z-50 no-print" style={{boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'}}>
                            <div className="p-4 border-b-2 border-slate-200 dark:border-slate-600">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <i className="fas fa-robot text-white text-sm"></i>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">AI Resume Assistant</h3>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">Ask me about Abhijith's background</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowAIChat(false)}
                                        className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300 transition-colors"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="h-64 overflow-y-auto p-3 space-y-2">
                                {chatMessages.map((msg, index) => (
                                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                                            msg.role === 'user'
                                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                                : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                                        }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-2xl">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                                                <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-4 border-t border-gray-200 dark:border-slate-600">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage(inputMessage)}
                                        placeholder="Ask about experience, skills, education..."
                                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        disabled={isLoading}
                                    />
                                    <button
                                        onClick={() => sendMessage(inputMessage)}
                                        disabled={isLoading || !inputMessage.trim()}
                                        className="px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 text-white rounded-lg transition-all duration-200 text-sm"
                                    >
                                        <i className="fas fa-paper-plane"></i>
                                    </button>
                                </div>
                                <p className="text-xs text-slate-400 mt-2">This AI assistant uses predefined responses about the resume content.</p>
                            </div>
                        </div>
                    )}

                    <footer className="text-center mt-12 text-slate-500 dark:text-slate-400 text-sm no-print">
                        <p>© {new Date().getFullYear()} {BannerContent.name}. All rights reserved.</p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Resume;