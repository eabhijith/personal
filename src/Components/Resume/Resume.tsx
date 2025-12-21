import React, { useState, useRef, useEffect } from 'react';
import Switch from '@mui/material/Switch';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Card, CardContent, Typography, Chip, Box, Avatar, Collapse, IconButton, Button, LinearProgress, Rating, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LaunchIcon from '@mui/icons-material/Launch';
import CloseIcon from '@mui/icons-material/Close';
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
    const [expandedExperience, setExpandedExperience] = useState<{[key: number]: boolean}>({});
    const [expandedSkills, setExpandedSkills] = useState<{[key: number]: boolean}>({});
    const [expandedEducation, setExpandedEducation] = useState<{[key: number]: boolean}>({});
    const [expandedCertifications, setExpandedCertifications] = useState(false);
    const [showAllProjects, setShowAllProjects] = useState(false);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
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

    // Detailed project information
    const projectDetails = {
        'n8n': {
            title: 'n8n Workflow Automation Platform',
            subtitle: '2024-Current • Probabilistic AI Agent Workflows',
            overview: 'Advanced workflow automation platform designed for enterprise-scale data cleansing and processing. Built sophisticated probabilistic flow systems that leverage AI agents for intelligent decision-making and data transformation.',
            keyFeatures: [
                'Probabilistic Flow Engine - Built custom probability-based routing system for data processing workflows',
                'AI Agent Integration - Deployed multiple AI agents for different data validation and transformation tasks',
                'Real-time Data Cleansing - Automated data quality checks with instant correction and validation',
                'Smart Error Handling - Intelligent error detection and automatic retry mechanisms',
                'Scalable Processing - Designed to handle large-scale data operations with parallel processing capabilities'
            ],
            technicalHighlights: [
                'Custom n8n nodes for probabilistic decision making',
                'Integration with multiple AI/ML APIs for data analysis',
                'Real-time monitoring and alerting system',
                'RESTful API endpoints for external system integration',
                'Automated workflow versioning and rollback capabilities'
            ],
            technologies: ['n8n', 'Node.js', 'JavaScript', 'AI/ML APIs', 'REST APIs', 'Docker', 'MongoDB', 'Redis'],
            achievements: [
                '90% reduction in manual data processing time',
                'Improved data quality accuracy by 85%',
                'Automated 70+ repetitive data workflows',
                'Reduced operational costs by 60%'
            ]
        },
        'llm-finetuning': {
            title: 'LLM Fine-tuning & Model Steering Research',
            subtitle: '2024-Current • Advanced AI Model Optimization',
            overview: 'Cutting-edge research and implementation of Large Language Model optimization techniques. Focus on LoRA (Low-Rank Adaptation) for efficient fine-tuning and advanced model steering methodologies for improved AI behavior alignment.',
            keyFeatures: [
                'LoRA Implementation - Efficient fine-tuning with 99% parameter reduction while maintaining performance',
                'Model Steering Research - Advanced techniques for controlling AI model behavior and response patterns',
                'Custom Training Pipelines - Built automated training workflows for various model architectures',
                'Performance Optimization - Memory-efficient training methods for large-scale model deployment',
                'Behavior Analysis Tools - Comprehensive evaluation frameworks for model performance assessment'
            ],
            technicalHighlights: [
                'Custom LoRA adapters for domain-specific fine-tuning',
                'Advanced gradient manipulation techniques',
                'Distributed training across multiple GPUs',
                'Custom loss functions for behavior steering',
                'Automated hyperparameter optimization'
            ],
            technologies: ['PyTorch', 'HuggingFace Transformers', 'LoRA', 'Python', 'CUDA', 'Weights & Biases', 'Docker', 'Kubernetes'],
            achievements: [
                '75% reduction in fine-tuning computational costs',
                'Improved model alignment scores by 40%',
                'Successfully fine-tuned 15+ different model architectures',
                'Published 3 research papers on model steering techniques'
            ]
        },
        'gcp-chatbot': {
            title: 'GCP Workspace RAG Chatbot Integration',
            subtitle: '2023-2024 • AI Knowledge Assistant',
            overview: 'Enterprise-grade Retrieval-Augmented Generation (RAG) chatbot integrated with Google Cloud Platform Workspace. Leverages Amazon Bedrock knowledge base for intelligent document retrieval and contextual responses across organizational data sources.',
            keyFeatures: [
                'Workspace Integration - Seamless integration with Google Workspace suite (Gmail, Drive, Docs, Sheets)',
                'RAG Architecture - Advanced retrieval system for accurate, context-aware responses',
                'Multi-source Data Access - Unified access to various organizational knowledge repositories',
                'Real-time Collaboration - Live assistance during meetings and document editing',
                'Enterprise Security - Full compliance with organizational security and privacy policies'
            ],
            technicalHighlights: [
                'Custom Google Workspace add-on architecture',
                'Amazon Bedrock knowledge base integration',
                'Vector embeddings for semantic search',
                'Real-time document processing pipeline',
                'Advanced caching mechanisms for improved performance'
            ],
            technologies: ['Google Cloud Platform', 'Amazon Bedrock', 'Python', 'Google Apps Script', 'Vector Databases', 'OpenAI API', 'Docker', 'Kubernetes'],
            achievements: [
                '60% faster information retrieval times',
                'Improved employee productivity by 40%',
                'Deployed to 500+ users across organization',
                '95% user satisfaction rating'
            ]
        },
        'agentforce': {
            title: 'Salesforce Agentforce Automation Platform',
            subtitle: '2023-2024 • Multi-language Email Automation',
            overview: 'Advanced AI-powered automation platform built on Salesforce Agentforce. Features comprehensive email translation, sentiment analysis, and intelligent routing capabilities for global customer service operations.',
            keyFeatures: [
                'Multi-language Translation - Real-time translation of incoming and outgoing emails across 25+ languages',
                'Sentiment Analysis Engine - Advanced AI-powered sentiment detection with confidence scoring',
                'Flex Prompt Templates - Dynamic AI response generation based on context and customer history',
                'Intelligent Routing - Smart case assignment based on complexity, language, and agent expertise',
                'Automated Workflows - End-to-end automation of customer service processes'
            ],
            technicalHighlights: [
                'Custom Agentforce action implementations',
                'Integration with translation APIs',
                'Real-time sentiment analysis pipeline',
                'Advanced prompt engineering techniques',
                'Custom Lightning Web Components for admin interface'
            ],
            technologies: ['Salesforce Agentforce', 'Apex', 'LWC', 'Einstein AI', 'Translation APIs', 'REST APIs', 'SOQL', 'Lightning Platform'],
            achievements: [
                'Reduced response time from hours to minutes',
                'Improved customer satisfaction by 45%',
                'Automated 80% of routine customer inquiries',
                'Supported 25+ languages with 95% accuracy'
            ]
        },
        'einstein-chatbot': {
            title: 'Einstein Chat Bot for Experience Cloud',
            subtitle: 'Jul 2023 - Sep 2023 • Zalando SE',
            overview: 'Designed and developed an advanced Einstein Bot for Experience Cloud with intelligent features including article search and automated intent generation. Built custom chat window implementation and comprehensive reporting capabilities.',
            keyFeatures: [
                'Smart Article Search - Intelligent search functionality to find relevant knowledge articles',
                'Intent Generation - Automated intent detection and response generation',
                'Custom Chat Window - Built tailored chat interface for Experience Cloud integration',
                'Reporting Features - Comprehensive analytics and conversation tracking',
                'Experience Cloud Integration - Seamless integration with Salesforce Experience Cloud'
            ],
            technicalHighlights: [
                'Custom Einstein Bot dialog flows and intents',
                'Experience Cloud component development',
                'Knowledge article integration and search optimization',
                'Custom chat UI/UX implementation',
                'Analytics and reporting dashboard creation'
            ],
            technologies: ['Einstein Analytics', 'Experience Cloud', 'Salesforce', 'Apex', 'Lightning Web Components', 'SOQL'],
            achievements: [
                'Improved customer self-service resolution by 40%',
                'Reduced support ticket volume by 30%',
                'Implemented across multiple Experience Cloud sites',
                'Enhanced user engagement with intelligent responses'
            ]
        },
        'campaign-portal': {
            title: 'Global Campaign Portal Design',
            subtitle: 'May 2019 - Jan 2020 • Leading Sports Brand (Infosys)',
            overview: 'Built comprehensive campaign management portal with multi-level KPI calculations and advanced analytics. Developed 30+ Lightning components with timeline views and integrated 3rd party systems for seamless business flow.',
            keyFeatures: [
                'Multi-level KPI Calculations - Complex performance metrics across campaign hierarchies',
                'Timeline Views - Visual campaign timeline management and tracking',
                '30+ Lightning Components - Custom components for campaign management workflows',
                '3rd Party Integrations - Seamless integration with external marketing systems',
                'Advanced Analytics - Comprehensive reporting and data visualization'
            ],
            technicalHighlights: [
                'Complex Apex batch processing for KPI calculations',
                'Custom Lightning Web Components architecture',
                'Real-time data synchronization with external systems',
                'Advanced SOQL optimization for large datasets',
                'Custom reporting and dashboard frameworks'
            ],
            technologies: ['Lightning Components', 'Apex', 'KPI Analytics', 'Batch Jobs', 'SOQL', 'Lightning Web Components', 'Salesforce Integration'],
            achievements: [
                'Managed campaigns worth $50M+ in marketing spend',
                'Reduced campaign setup time by 60%',
                'Improved KPI calculation accuracy by 85%',
                'Streamlined workflow for 200+ marketing users'
            ]
        },
        'cicd-pipeline': {
            title: 'CI/CD Pipeline Management',
            subtitle: 'Jan 2019 - Apr 2019 • LemonOne',
            overview: 'Designed and implemented comprehensive automated CI/CD pipeline with Jenkins integration, Bitbucket automation, and code quality assurance processes using PMD for enhanced development workflows.',
            keyFeatures: [
                'Automated CI/CD Pipeline - End-to-end automation from code commit to deployment',
                'Jenkins Integration - Robust build and deployment automation',
                'Bitbucket Automation - Automated code review and merge processes',
                'Code Quality Gates - PMD integration for code quality enforcement',
                'Deployment Orchestration - Automated multi-environment deployment management'
            ],
            technicalHighlights: [
                'Jenkins pipeline scripting and job configuration',
                'Bitbucket webhook integration and automation',
                'PMD rule customization and code quality metrics',
                'Automated testing integration and reporting',
                'Multi-environment deployment strategies'
            ],
            technologies: ['Jenkins', 'Bitbucket', 'PMD', 'DevOps', 'Shell Scripting', 'Git', 'Automated Testing'],
            achievements: [
                'Reduced deployment time from hours to minutes',
                'Improved code quality scores by 70%',
                'Automated 90% of manual deployment processes',
                'Zero-downtime deployment implementation'
            ]
        },
        'support-process': {
            title: 'Global Campaign Support Process Design',
            subtitle: 'Feb 2019 - Apr 2019 • Adidas',
            overview: 'Designed comprehensive 3-tier support structure (L1, L2, L3) with ServiceNow integration, advanced error monitoring, and proactive issue identification for campaign portal management system.',
            keyFeatures: [
                '3-Tier Support Structure - Comprehensive L1, L2, L3 support hierarchy',
                'ServiceNow Integration - Seamless ticketing and case management',
                'Error Monitoring - Real-time system health and error tracking',
                'Proactive Issue Identification - Automated issue detection and alerting',
                'Support Process Documentation - Comprehensive operational procedures'
            ],
            technicalHighlights: [
                'ServiceNow workflow configuration and customization',
                'Real-time monitoring and alerting systems',
                'Automated escalation procedures and SLA management',
                'Integration with Salesforce monitoring tools',
                'Custom reporting and analytics dashboards'
            ],
            technologies: ['3-Tier Support', 'Service Now', 'Reports & Dashboards', 'Monitoring Tools', 'SLA Management'],
            achievements: [
                'Reduced average resolution time by 50%',
                'Improved first-call resolution rate to 80%',
                'Implemented proactive monitoring preventing 60% of issues',
                'Established 24/7 global support coverage'
            ]
        },
        'react-integration': {
            title: 'Campaign Portal with React Integration',
            subtitle: 'Aug 2018 - Dec 2018 • Adidas',
            overview: 'Successfully transitioned from traditional systems to modern Salesforce-based solution. Developed React-based calendar integration with Lightning components and implemented complex Excel-based functionalities within Salesforce.',
            keyFeatures: [
                'React-Lightning Integration - Seamless React component integration with Lightning',
                'Advanced Calendar System - Interactive calendar with campaign scheduling',
                'Excel Functionality Migration - Complex spreadsheet features ported to Salesforce',
                'System Migration - Complete transition from legacy systems',
                'Hybrid Architecture - Modern frontend with Salesforce backend integration'
            ],
            technicalHighlights: [
                'React component development and Lightning integration',
                'Custom calendar component with advanced scheduling features',
                'Complex data migration and transformation processes',
                'Lightning Web Component architecture implementation',
                'Advanced JavaScript and React state management'
            ],
            technologies: ['React', 'Lightning Components', 'Calendar Integration', 'JavaScript', 'Apex', 'Lightning Web Components'],
            achievements: [
                'Successfully migrated 100% of legacy functionality',
                'Improved user experience ratings by 90%',
                'Reduced system maintenance overhead by 40%',
                'Enhanced calendar functionality with 50+ new features'
            ]
        },
        'consumer-service': {
            title: 'Consumer Service Operations Leadership',
            subtitle: 'Jan 2017 - Jul 2018 • Leading Sports Brand (Infosys)',
            overview: 'Led CRM operations team for leading sports brand, working on world\'s first Salesforce-based consumer service chatbot, managing production deployments, and integrating mobile applications with Salesforce.',
            keyFeatures: [
                'World\'s First Salesforce Chatbot - Pioneer implementation of Salesforce-based customer service bot',
                'Team Leadership - Led cross-functional CRM operations team',
                'Production Deployment Management - Oversaw critical system deployments',
                'Mobile Integration - Seamless mobile app integration with Salesforce CRM',
                'Wave Analytics Implementation - Advanced analytics and reporting solutions'
            ],
            technicalHighlights: [
                'Chatbot framework development and implementation',
                'Production deployment orchestration and monitoring',
                'Mobile API development and integration',
                'Wave Analytics dashboard and report creation',
                'Team management and technical leadership'
            ],
            technologies: ['Team Leadership', 'Production Operations', 'Chatbot (World\'s First)', 'Wave Analytics', 'Mobile Integration', 'Salesforce CRM'],
            achievements: [
                'Successfully launched world\'s first Salesforce-based customer service chatbot',
                'Managed team of 15+ technical professionals',
                'Achieved 99.9% system uptime across all deployments',
                'Integrated mobile apps serving 1M+ active users'
            ]
        },
        'supply-chain': {
            title: 'Supply Chain Management Portal',
            subtitle: 'May 2015 - Jul 2015 • Chinese Dairy Company (Infosys)',
            overview: 'Drove development and Go-Live rollouts for comprehensive supplier chain management portal. Implemented single sign-on authentication, enhanced supplier loyalty point system, and managed complex system migration from local vendor systems.',
            keyFeatures: [
                'Supplier Chain Management - Complete supplier lifecycle management portal',
                'Single Sign-On Implementation - Seamless authentication across systems',
                'Loyalty Point System - Enhanced supplier rewards and engagement program',
                'System Migration - Complex migration from legacy vendor systems',
                'Go-Live Rollout Management - Comprehensive deployment and change management'
            ],
            technicalHighlights: [
                'Service Cloud configuration and customization',
                'SSO implementation and security architecture',
                'Complex data migration and transformation',
                'Loyalty points calculation engine development',
                'Integration with multiple supplier systems'
            ],
            technologies: ['Service Cloud', 'Single Sign-On', 'Supplier Loyalty System', 'Data Migration', 'System Integration'],
            achievements: [
                'Successfully migrated 500+ supplier accounts',
                'Implemented SSO reducing login issues by 95%',
                'Launched loyalty program increasing supplier engagement by 60%',
                'Completed Go-Live rollout on schedule with zero critical issues'
            ]
        },
        'database-migration': {
            title: 'Database Administration & Migration',
            subtitle: 'Jan 2015 - Mar 2015 • Infosys',
            overview: 'Led comprehensive technical transition from traditional RDBMS to MongoDB. Successfully migrated entire system data, developed automation batches for seamless database migration, and created integrated systems for migration automation.',
            keyFeatures: [
                'RDBMS to MongoDB Migration - Complete database platform transition',
                'Data Migration Automation - Automated migration processes and validation',
                'System Integration - Integrated migration tools and monitoring systems',
                'Batch Processing Development - Custom automation for large-scale data migration',
                'Migration Validation - Comprehensive data integrity and validation processes'
            ],
            technicalHighlights: [
                'Database schema design and optimization for MongoDB',
                'Complex data transformation and migration scripting',
                'Automation batch development and scheduling',
                'Data validation and integrity checking systems',
                'Performance optimization for large-scale migrations'
            ],
            technologies: ['Oracle', 'MongoDB', 'Database Migration', 'Automation', 'Data Transformation', 'Batch Processing'],
            achievements: [
                'Successfully migrated 10TB+ of critical business data',
                'Achieved 99.99% data integrity during migration',
                'Reduced migration time by 80% through automation',
                'Zero data loss during complete system transition'
            ]
        },
        'hybrid-rag': {
            title: 'Hybrid RAG System with AWS Bedrock',
            subtitle: '2024 • Enterprise-scale AI System',
            overview: 'Enterprise-scale AI system for intelligent document processing and retrieval. Architected a hybrid-cloud RAG (Retrieval-Augmented Generation) system that significantly improved query response times and accuracy across multiple data sources.',
            keyFeatures: [
                'Hybrid-Cloud Architecture - Seamlessly integrated on-premise and cloud-based data sources',
                'AWS Bedrock Integration - Leveraged advanced LLM capabilities for enhanced document understanding',
                'Intelligent Document Processing - Automated extraction and indexing of diverse document formats',
                'Multi-Source Retrieval - Unified access to distributed knowledge repositories',
                'Real-time Query Processing - Optimized pipeline for sub-second response times'
            ],
            technicalHighlights: [
                'Custom RAG pipeline with vector embeddings and semantic search',
                'AWS Bedrock model integration and fine-tuning',
                'Distributed data processing with Apache Spark',
                'Real-time indexing and document ingestion pipeline',
                'Advanced caching mechanisms for improved performance'
            ],
            technologies: ['AWS Bedrock', 'Python', 'TensorFlow', 'GCP', 'Apache Spark', 'Vector Databases', 'Docker', 'Kubernetes'],
            achievements: [
                'Reduced query response time by 60%',
                'Improved document retrieval accuracy by 40%',
                'Processed 10TB+ of enterprise documents',
                'Achieved 99.5% system uptime across hybrid infrastructure'
            ]
        }
    };

    const handleProjectClick = (projectId: string) => {
        setSelectedProject(projectId);
    };

    const handleCloseProject = () => {
        setSelectedProject(null);
    };

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
                            transform: scale(0.72) !important;
                            transform-origin: top center !important;
                            width: 138.89% !important;
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
                            grid-template-columns: 58% 42% !important;
                            gap: 0.75rem !important;
                            padding: 0 0.75rem 0.75rem 0.75rem !important;
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
                                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{BannerContent.name}</h1>
                                    <p className="text-blue-300 text-base font-medium mb-3">{BannerContent.role}</p>

                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-300 mb-4">
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

                                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4 pt-4 border-t border-white/10 text-sm">
                                        {BannerContent.linkedin && (
                                            <a href={BannerContent.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white bg-blue-700 hover:bg-blue-600 px-4 py-1.5 rounded-full font-medium transition-all hover:shadow-lg hover:-translate-y-0.5">
                                                <i className="fab fa-linkedin"></i> LinkedIn
                                            </a>
                                        )}
                                        {BannerContent.github && (
                                            <a href={BannerContent.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white bg-gray-900 hover:bg-black px-4 py-1.5 rounded-full font-medium transition-all hover:shadow-lg hover:-translate-y-0.5">
                                                <i className="fab fa-github"></i> GitHub
                                            </a>
                                        )}
                                        {BannerContent.huggingface && (
                                            <a href={BannerContent.huggingface} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 px-4 py-1.5 rounded-full font-medium transition-all hover:shadow-lg hover:-translate-y-0.5">
                                                <i className="fas fa-robot"></i> HuggingFace
                                            </a>
                                        )}
                                        {BannerContent.website && (
                                            <a href={BannerContent.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white bg-purple-700 hover:bg-purple-600 px-4 py-1.5 rounded-full font-medium transition-all hover:shadow-lg hover:-translate-y-0.5">
                                                <i className="fas fa-briefcase"></i> Portfolio
                                            </a>
                                        )}
                                        <a href={trailheadStats.profileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-4 py-2 rounded-full font-medium transition-all hover:shadow-lg hover:-translate-y-0.5">
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
                                {/* LEFT COLUMN - Professional Experience & Projects */}
                                <div className={`lg:col-span-8 print-main-col order-1 lg:order-1 ${
                                    isSwipeMode && currentSection !== 0 ? 'hidden lg:block' : ''
                                }`}>
                                    {/* Experience Section with Material-UI Timeline */}
                                    <section className="print-break-inside-avoid mb-10">
                                        <div className="flex items-center gap-3 mb-6">
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
                                                                    {/* Show first 2 items initially */}
                                                                    {exp.experience.slice(0, 2).map((item, i) => (
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

                                                                    {/* Collapsible content for remaining items */}
                                                                    <Collapse in={expandedExperience[index]} timeout="auto" unmountOnExit>
                                                                        {exp.experience.slice(2).map((item, i) => (
                                                                            <Box key={i + 2} sx={{ display: 'flex', gap: 1.5, mb: 2, alignItems: 'flex-start' }}>
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
                                                                    </Collapse>

                                                                    {/* Show View More/Less button if there are more than 2 items */}
                                                                    {exp.experience.length > 2 && (
                                                                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                                                            <Button
                                                                                onClick={() => setExpandedExperience(prev => ({ ...prev, [index]: !prev[index] }))}
                                                                                startIcon={expandedExperience[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                                                sx={{
                                                                                    fontSize: '0.75rem',
                                                                                    textTransform: 'none',
                                                                                    color: (theme) => theme.palette.mode === 'dark' ? '#60a5fa' : '#3b82f6',
                                                                                    '&:hover': {
                                                                                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1e40af20' : '#3b82f620'
                                                                                    }
                                                                                }}
                                                                            >
                                                                                {expandedExperience[index] ? 'View Less' : `View ${exp.experience.length - 2} More`}
                                                                            </Button>
                                                                        </Box>
                                                                    )}
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

                                    {/* Projects/Portfolio Section */}
                                    <section className="print-break-inside-avoid mb-10">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                                <i className="fas fa-code-branch text-xl"></i>
                                            </div>
                                            <h2 className="text-2xl font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                                                Key Projects
                                            </h2>
                                        </div>

                                        <div className="space-y-6">
                                            {/* Featured Projects with expandable details */}
                                            <Card
                                                elevation={0}
                                                sx={{
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: '0 16px 32px rgba(0, 0, 0, 0.12)',
                                                    },
                                                    borderRadius: 3,
                                                    border: '1px solid',
                                                    borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    '&::before': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        height: '4px',
                                                        background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)',
                                                    }
                                                }}
                                            >
                                                <CardContent sx={{ p: 4 }}>
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                                                                Hybrid RAG System with AWS Bedrock
                                                            </h3>
                                                            <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                                                                Enterprise-scale AI system for intelligent document processing and retrieval
                                                            </p>
                                                        </div>
                                                        <Button
                                                            size="small"
                                                            startIcon={<LaunchIcon />}
                                                            sx={{ fontSize: '0.75rem' }}
                                                            onClick={() => handleProjectClick('hybrid-rag')}
                                                        >
                                                            View Details
                                                        </Button>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        <Chip label="AWS Bedrock" size="small" sx={{ fontSize: '0.7rem' }} />
                                                        <Chip label="Python" size="small" sx={{ fontSize: '0.7rem' }} />
                                                        <Chip label="TensorFlow" size="small" sx={{ fontSize: '0.7rem' }} />
                                                        <Chip label="GCP" size="small" sx={{ fontSize: '0.7rem' }} />
                                                    </div>
                                                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                        Architected a hybrid-cloud RAG system reducing query response time by 60% and improving accuracy by 40% across multiple data sources.
                                                    </p>
                                                </CardContent>
                                            </Card>

                                            <Card
                                                elevation={0}
                                                sx={{
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: '0 16px 32px rgba(0, 0, 0, 0.12)',
                                                    },
                                                    borderRadius: 3,
                                                    border: '1px solid',
                                                    borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    '&::before': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        height: '4px',
                                                        background: 'linear-gradient(90deg, #10b981, #059669)',
                                                    }
                                                }}
                                            >
                                                <CardContent sx={{ p: 4 }}>
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                                                                Salesforce Agentforce Automation Platform
                                                            </h3>
                                                            <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                                                                Multi-language email automation with AI-powered sentiment analysis and translation
                                                            </p>
                                                        </div>
                                                        <Button
                                                            size="small"
                                                            startIcon={<LaunchIcon />}
                                                            sx={{ fontSize: '0.75rem' }}
                                                            onClick={() => handleProjectClick('agentforce')}
                                                        >
                                                            View Details
                                                        </Button>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        <Chip label="Agentforce" size="small" sx={{ fontSize: '0.7rem' }} />
                                                        <Chip label="Flex Prompt Templates" size="small" sx={{ fontSize: '0.7rem' }} />
                                                        <Chip label="Sentiment Analysis" size="small" sx={{ fontSize: '0.7rem' }} />
                                                        <Chip label="Translation AI" size="small" sx={{ fontSize: '0.7rem' }} />
                                                    </div>
                                                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                        Automated translation of incoming and outgoing emails with comprehensive sentiment analysis. Built with Agentforce flex prompt templates for dynamic AI responses and multi-language communication workflows.
                                                    </p>
                                                </CardContent>
                                            </Card>

                                            {/* Expanded Project List */}
                                            <Collapse in={showAllProjects} timeout="auto" unmountOnExit>
                                                <div className="space-y-6 mt-6">
                                                    {/* n8n Workflow Automation - MOST RECENT */}
                                                    <Card
                                                        elevation={0}
                                                        sx={{
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)' },
                                                            borderRadius: 3, border: '1px solid',
                                                            borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                            position: 'relative', overflow: 'hidden',
                                                            '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #14b8a6, #0d9488)' }
                                                        }}
                                                    >
                                                        <CardContent sx={{ p: 3 }}>
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div>
                                                                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" onClick={() => handleProjectClick('n8n')}>n8n Workflow Automation Platform</h4>
                                                                    <p className="text-sm text-slate-500 dark:text-slate-400">2024-Current • Probabilistic AI Agent Workflows</p>
                                                                </div>
                                                                <Button
                                                                    size="small"
                                                                    startIcon={<LaunchIcon />}
                                                                    sx={{ fontSize: '0.65rem', height: '28px' }}
                                                                    onClick={() => handleProjectClick('n8n')}
                                                                >
                                                                    View Details
                                                                </Button>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 mb-2">
                                                                <Chip label="n8n" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Data Cleansing" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Probabilistic Flows" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="AI Agents" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                            </div>
                                                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                                Designed and implemented advanced n8n workflow automation for data cleansing activities. Built probabilistic flow systems involving AI agents for intelligent data processing, validation, and transformation pipelines.
                                                            </p>
                                                        </CardContent>
                                                    </Card>

                                                    {/* LLM Fine-tuning and Model Steering */}
                                                    <Card
                                                        elevation={0}
                                                        sx={{
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)' },
                                                            borderRadius: 3, border: '1px solid',
                                                            borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                            position: 'relative', overflow: 'hidden',
                                                            '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #ec4899, #be185d)' }
                                                        }}
                                                    >
                                                        <CardContent sx={{ p: 3 }}>
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div>
                                                                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" onClick={() => handleProjectClick('llm-finetuning')}>LLM Fine-tuning & Model Steering Research</h4>
                                                                    <p className="text-sm text-slate-500 dark:text-slate-400">2024-Current • Advanced AI Model Optimization</p>
                                                                </div>
                                                                <Button
                                                                    size="small"
                                                                    startIcon={<LaunchIcon />}
                                                                    sx={{ fontSize: '0.65rem', height: '28px' }}
                                                                    onClick={() => handleProjectClick('llm-finetuning')}
                                                                >
                                                                    View Details
                                                                </Button>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 mb-2">
                                                                <Chip label="LoRA Fine-tuning" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Model Steering" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="PyTorch" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="HuggingFace Transformers" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                            </div>
                                                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                                Implemented LoRA (Low-Rank Adaptation) techniques for efficient LLM fine-tuning with reduced computational overhead. Currently researching advanced model steering methodologies to improve AI behavior alignment and response quality.
                                                            </p>
                                                        </CardContent>
                                                    </Card>

                                                    {/* Google Cloud Platform RAG Chatbot */}
                                                    <Card
                                                        elevation={0}
                                                        sx={{
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)' },
                                                            borderRadius: 3, border: '1px solid',
                                                            borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                            position: 'relative', overflow: 'hidden',
                                                            '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #4285f4, #34a853)' }
                                                        }}
                                                    >
                                                        <CardContent sx={{ p: 3 }}>
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div>
                                                                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" onClick={() => handleProjectClick('gcp-chatbot')}>GCP Workspace RAG Chatbot Integration</h4>
                                                                    <p className="text-sm text-slate-500 dark:text-slate-400">2023-2024 • AI Knowledge Assistant</p>
                                                                </div>
                                                                <Button
                                                                    size="small"
                                                                    startIcon={<LaunchIcon />}
                                                                    sx={{ fontSize: '0.65rem', height: '28px' }}
                                                                    onClick={() => handleProjectClick('gcp-chatbot')}
                                                                >
                                                                    View Details
                                                                </Button>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 mb-2">
                                                                <Chip label="Google Cloud Platform" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Workspace Add-on" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Amazon Bedrock" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Knowledge Base RAG" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                            </div>
                                                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                                Built comprehensive RAG chatbot integrated with Google Cloud Platform Workspace as an add-on. Leveraged Amazon Bedrock knowledge base for intelligent document retrieval and contextual responses across organizational data sources.
                                                            </p>
                                                        </CardContent>
                                                    </Card>

                                                    {/* Einstein Chat Bot for Experience Cloud */}
                                                    <Card
                                                        elevation={0}
                                                        sx={{
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)' },
                                                            borderRadius: 3, border: '1px solid',
                                                            borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                            position: 'relative', overflow: 'hidden',
                                                            '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #f59e0b, #d97706)' }
                                                        }}
                                                    >
                                                        <CardContent sx={{ p: 3 }}>
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div>
                                                                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" onClick={() => handleProjectClick('einstein-chatbot')}>Einstein Chat Bot for Experience Cloud</h4>
                                                                    <p className="text-sm text-slate-500 dark:text-slate-400">Jul 2023 - Sep 2023 • Zalando SE</p>
                                                                </div>
                                                                <Button
                                                                    size="small"
                                                                    startIcon={<LaunchIcon />}
                                                                    sx={{ fontSize: '0.65rem', height: '28px' }}
                                                                    onClick={() => handleProjectClick('einstein-chatbot')}
                                                                >
                                                                    View Details
                                                                </Button>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 mb-2">
                                                                <Chip label="Einstein Analytics" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Experience Cloud" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Salesforce" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                            </div>
                                                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                                Designed Einstein Bot for Experience Cloud with smart features including article search and indent generation. Developed custom chat window implementation and explored reporting features.
                                                            </p>
                                                        </CardContent>
                                                    </Card>

                                                    {/* Global Campaign Portal */}
                                                    <Card
                                                        elevation={0}
                                                        sx={{
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)' },
                                                            borderRadius: 3, border: '1px solid',
                                                            borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                            position: 'relative', overflow: 'hidden',
                                                            '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #8b5cf6, #7c3aed)' }
                                                        }}
                                                    >
                                                        <CardContent sx={{ p: 3 }}>
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div>
                                                                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" onClick={() => handleProjectClick('campaign-portal')}>Global Campaign Portal Design</h4>
                                                                    <p className="text-sm text-slate-500 dark:text-slate-400">May 2019 - Jan 2020 • Leading Sports Brand (Infosys)</p>
                                                                </div>
                                                                <Button
                                                                    size="small"
                                                                    startIcon={<LaunchIcon />}
                                                                    sx={{ fontSize: '0.65rem', height: '28px' }}
                                                                    onClick={() => handleProjectClick('campaign-portal')}
                                                                >
                                                                    View Details
                                                                </Button>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 mb-2">
                                                                <Chip label="Lightning Components" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Apex" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="KPI Analytics" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Batch Jobs" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                            </div>
                                                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                                Built comprehensive campaign management portal with multi-level KPI calculations. Developed 30+ Lightning components, timeline views, and integrated with 3rd party systems for seamless business flow.
                                                            </p>
                                                        </CardContent>
                                                    </Card>

                                                    {/* CI/CD Pipeline */}
                                                    <Card
                                                        elevation={0}
                                                        sx={{
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)' },
                                                            borderRadius: 3, border: '1px solid',
                                                            borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                            position: 'relative', overflow: 'hidden',
                                                            '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #06b6d4, #0891b2)' }
                                                        }}
                                                    >
                                                        <CardContent sx={{ p: 3 }}>
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div>
                                                                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" onClick={() => handleProjectClick('cicd-pipeline')}>CI/CD Pipeline Management</h4>
                                                                    <p className="text-sm text-slate-500 dark:text-slate-400">Jan 2019 - Apr 2019 • LemonOne</p>
                                                                </div>
                                                                <Button
                                                                    size="small"
                                                                    startIcon={<LaunchIcon />}
                                                                    sx={{ fontSize: '0.65rem', height: '28px' }}
                                                                    onClick={() => handleProjectClick('cicd-pipeline')}
                                                                >
                                                                    View Details
                                                                </Button>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 mb-2">
                                                                <Chip label="Jenkins" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Bitbucket" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="PMD" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="DevOps" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                            </div>
                                                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                                Designed and implemented automated CI/CD pipeline with Jenkins, integrated Bitbucket for automated deployments, and established code review processes with PMD for quality assurance.
                                                            </p>
                                                        </CardContent>
                                                    </Card>

                                                    {/* Support Process Design */}
                                                    <Card
                                                        elevation={0}
                                                        sx={{
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)' },
                                                            borderRadius: 3, border: '1px solid',
                                                            borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                            position: 'relative', overflow: 'hidden',
                                                            '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #ef4444, #dc2626)' }
                                                        }}
                                                    >
                                                        <CardContent sx={{ p: 3 }}>
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div>
                                                                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" onClick={() => handleProjectClick('support-process')}>Global Campaign Support Process Design</h4>
                                                                    <p className="text-sm text-slate-500 dark:text-slate-400">Feb 2019 - Apr 2019 • Adidas</p>
                                                                </div>
                                                                <Button
                                                                    size="small"
                                                                    startIcon={<LaunchIcon />}
                                                                    sx={{ fontSize: '0.65rem', height: '28px' }}
                                                                    onClick={() => handleProjectClick('support-process')}
                                                                >
                                                                    View Details
                                                                </Button>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 mb-2">
                                                                <Chip label="3-Tier Support" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Service Now" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Reports & Dashboards" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                            </div>
                                                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                                Designed comprehensive 3-tier support structure (L1, L2, L3) with ServiceNow integration, error monitoring, and proactive issue identification for campaign portal management system.
                                                            </p>
                                                        </CardContent>
                                                    </Card>

                                                    {/* Campaign Portal React Integration */}
                                                    <Card
                                                        elevation={0}
                                                        sx={{
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)' },
                                                            borderRadius: 3, border: '1px solid',
                                                            borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                            position: 'relative', overflow: 'hidden',
                                                            '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #22c55e, #16a34a)' }
                                                        }}
                                                    >
                                                        <CardContent sx={{ p: 3 }}>
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div>
                                                                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" onClick={() => handleProjectClick('react-integration')}>Campaign Portal with React Integration</h4>
                                                                    <p className="text-sm text-slate-500 dark:text-slate-400">Aug 2018 - Dec 2018 • Adidas</p>
                                                                </div>
                                                                <Button
                                                                    size="small"
                                                                    startIcon={<LaunchIcon />}
                                                                    sx={{ fontSize: '0.65rem', height: '28px' }}
                                                                    onClick={() => handleProjectClick('react-integration')}
                                                                >
                                                                    View Details
                                                                </Button>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 mb-2">
                                                                <Chip label="React" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Lightning Components" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Calendar Integration" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                            </div>
                                                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                                Transitioned from traditional systems to Salesforce-based solution. Developed React-based calendar integrated with Lightning components and implemented complex Excel-based functionalities in Salesforce.
                                                            </p>
                                                        </CardContent>
                                                    </Card>

                                                    {/* Consumer Service Operations */}
                                                    <Card
                                                        elevation={0}
                                                        sx={{
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)' },
                                                            borderRadius: 3, border: '1px solid',
                                                            borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                            position: 'relative', overflow: 'hidden',
                                                            '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #f97316, #ea580c)' }
                                                        }}
                                                    >
                                                        <CardContent sx={{ p: 3 }}>
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div>
                                                                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" onClick={() => handleProjectClick('consumer-service')}>Consumer Service Operations Leadership</h4>
                                                                    <p className="text-sm text-slate-500 dark:text-slate-400">Jan 2017 - Jul 2018 • Leading Sports Brand (Infosys)</p>
                                                                </div>
                                                                <Button
                                                                    size="small"
                                                                    startIcon={<LaunchIcon />}
                                                                    sx={{ fontSize: '0.65rem', height: '28px' }}
                                                                    onClick={() => handleProjectClick('consumer-service')}
                                                                >
                                                                    View Details
                                                                </Button>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 mb-2">
                                                                <Chip label="Team Leadership" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Production Operations" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Chatbot (World's First)" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Wave Analytics" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                            </div>
                                                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                                Led CRM operations team for leading sports brand. Worked on world's first Salesforce-based consumer service chatbot, managed production deployments, and integrated mobile applications with Salesforce.
                                                            </p>
                                                        </CardContent>
                                                    </Card>

                                                    {/* Supply Chain Management */}
                                                    <Card
                                                        elevation={0}
                                                        sx={{
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)' },
                                                            borderRadius: 3, border: '1px solid',
                                                            borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                            position: 'relative', overflow: 'hidden',
                                                            '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #a855f7, #9333ea)' }
                                                        }}
                                                    >
                                                        <CardContent sx={{ p: 3 }}>
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div>
                                                                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" onClick={() => handleProjectClick('supply-chain')}>Supply Chain Management Portal</h4>
                                                                    <p className="text-sm text-slate-500 dark:text-slate-400">May 2015 - Jul 2015 • Chinese Dairy Company (Infosys)</p>
                                                                </div>
                                                                <Button
                                                                    size="small"
                                                                    startIcon={<LaunchIcon />}
                                                                    sx={{ fontSize: '0.65rem', height: '28px' }}
                                                                    onClick={() => handleProjectClick('supply-chain')}
                                                                >
                                                                    View Details
                                                                </Button>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 mb-2">
                                                                <Chip label="Service Cloud" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Single Sign-On" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Supplier Loyalty System" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                            </div>
                                                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                                Drove development and Go-Live rollouts for supplier chain management portal. Implemented single sign-on, enhanced supplier loyalty point system, and managed system migration from local vendor systems.
                                                            </p>
                                                        </CardContent>
                                                    </Card>

                                                    {/* Database Administration */}
                                                    <Card
                                                        elevation={0}
                                                        sx={{
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                            '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)' },
                                                            borderRadius: 3, border: '1px solid',
                                                            borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                            position: 'relative', overflow: 'hidden',
                                                            '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #6366f1, #4f46e5)' }
                                                        }}
                                                    >
                                                        <CardContent sx={{ p: 3 }}>
                                                            <div className="flex items-start justify-between mb-2">
                                                                <div>
                                                                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400" onClick={() => handleProjectClick('database-migration')}>Database Administration & Migration</h4>
                                                                    <p className="text-sm text-slate-500 dark:text-slate-400">Jan 2015 - Mar 2015 • Infosys</p>
                                                                </div>
                                                                <Button
                                                                    size="small"
                                                                    startIcon={<LaunchIcon />}
                                                                    sx={{ fontSize: '0.65rem', height: '28px' }}
                                                                    onClick={() => handleProjectClick('database-migration')}
                                                                >
                                                                    View Details
                                                                </Button>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 mb-2">
                                                                <Chip label="Oracle" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="MongoDB" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Database Migration" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                                <Chip label="Automation" size="small" sx={{ fontSize: '0.65rem', height: '20px' }} />
                                                            </div>
                                                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                                Led technical transition from RDBMS to MongoDB. Migrated entire system data, developed automation batches for database migration, and created integrated systems for migration automation.
                                                            </p>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </Collapse>

                                            {!showAllProjects && (
                                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                                    <Button
                                                        onClick={() => setShowAllProjects(true)}
                                                        startIcon={<ExpandMoreIcon />}
                                                        sx={{
                                                            textTransform: 'none',
                                                            color: (theme) => theme.palette.mode === 'dark' ? '#60a5fa' : '#3b82f6',
                                                            fontSize: '0.9rem'
                                                        }}
                                                    >
                                                        View All Historical Projects (11+ Projects)
                                                    </Button>
                                                </Box>
                                            )}

                                            {showAllProjects && (
                                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                                    <Button
                                                        onClick={() => setShowAllProjects(false)}
                                                        startIcon={<ExpandLessIcon />}
                                                        sx={{
                                                            textTransform: 'none',
                                                            color: (theme) => theme.palette.mode === 'dark' ? '#60a5fa' : '#3b82f6',
                                                            fontSize: '0.9rem'
                                                        }}
                                                    >
                                                        Show Less Projects
                                                    </Button>
                                                </Box>
                                            )}
                                        </div>
                                    </section>
                                </div>

                                {/* RIGHT COLUMN - Certifications, Technical Skills, Education & More */}
                                <div className={`lg:col-span-4 print-sidebar-col space-y-6 order-2 lg:order-2 ${
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
                                            <Button
                                                onClick={() => setExpandedCertifications(!expandedCertifications)}
                                                size="small"
                                                startIcon={expandedCertifications ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                                sx={{
                                                    fontSize: '0.7rem',
                                                    textTransform: 'none',
                                                    minWidth: 'auto',
                                                    color: (theme) => theme.palette.mode === 'dark' ? '#60a5fa' : '#3b82f6'
                                                }}
                                            >
                                                {expandedCertifications ? 'Less' : '10+'}
                                            </Button>
                                        </div>

                                        <div className="space-y-3">
                                            {/* Summary view */}
                                            <Card
                                                elevation={0}
                                                sx={{
                                                    borderRadius: 3,
                                                    border: '1px solid',
                                                    borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                }}
                                            >
                                                <CardContent sx={{ p: 3 }}>
                                                    <Typography variant="body2" sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#d1d5db' : '#4b5563', lineHeight: 1.5 }}>
                                                        <strong>10+ Salesforce Certifications</strong> including 4 Architect-level credentials • AWS Cloud Practitioner • Agentforce Specialist • All-Star Ranger
                                                    </Typography>
                                                </CardContent>
                                            </Card>

                                            {/* Expanded detailed view */}
                                            <Collapse in={expandedCertifications} timeout="auto" unmountOnExit>
                                                <div className="space-y-3 mt-3">
                                                    <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0', backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff' }}>
                                                        <CardContent sx={{ p: 2.5 }}>
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <Box sx={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#f3f4f6', color: (theme) => theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                                                    <i className="fas fa-network-wired text-xs"></i>
                                                                </Box>
                                                                <Typography variant="h6" component="h3" sx={{ fontWeight: 700, fontSize: '0.9rem', color: (theme) => theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                                                                    Salesforce Architect (4)
                                                                </Typography>
                                                            </div>
                                                            <Typography variant="body2" sx={{ fontSize: '0.75rem', color: (theme) => theme.palette.mode === 'dark' ? '#d1d5db' : '#4b5563', lineHeight: 1.4 }}>
                                                                System Architect • Platform Development Lifecycle & Deployment • Identity & Access Management • Platform Integration
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>

                                                    <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0', backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff' }}>
                                                        <CardContent sx={{ p: 2.5 }}>
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <Box sx={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#f3f4f6', color: (theme) => theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                                                    <i className="fas fa-code text-xs"></i>
                                                                </Box>
                                                                <Typography variant="h6" component="h3" sx={{ fontWeight: 700, fontSize: '0.9rem', color: (theme) => theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                                                                    Salesforce Developer (2)
                                                                </Typography>
                                                            </div>
                                                            <Typography variant="body2" sx={{ fontSize: '0.75rem', color: (theme) => theme.palette.mode === 'dark' ? '#d1d5db' : '#4b5563', lineHeight: 1.4 }}>
                                                                Platform Developer II • Platform Developer I
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>

                                                    <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0', backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff' }}>
                                                        <CardContent sx={{ p: 2.5 }}>
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <Box sx={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#f3f4f6', color: (theme) => theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                                                    <i className="fas fa-robot text-xs"></i>
                                                                </Box>
                                                                <Typography variant="h6" component="h3" sx={{ fontWeight: 700, fontSize: '0.9rem', color: (theme) => theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                                                                    Specialties & Cloud (4)
                                                                </Typography>
                                                            </div>
                                                            <Typography variant="body2" sx={{ fontSize: '0.75rem', color: (theme) => theme.palette.mode === 'dark' ? '#d1d5db' : '#4b5563', lineHeight: 1.4 }}>
                                                                Agentforce Specialist • AI Associate • All-Star Ranger • AWS Cloud Practitioner
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </Collapse>
                                        </div>
                                    </section>

                                    {/* Technical Skills Section - MOVED FROM LEFT COLUMN */}
                                    <section className="print-break-inside-avoid">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-1.5 bg-slate-100 dark:bg-slate-800/50 rounded-lg text-slate-600 dark:text-slate-300">
                                                <i className="fas fa-code"></i>
                                            </div>
                                            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                                                Technical Skills
                                            </h2>
                                        </div>
                                        <div className="grid grid-cols-1 gap-3">
                                            {SkillsData.map((category, index) => (
                                                <Card
                                                    key={index}
                                                    elevation={0}
                                                    sx={{
                                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                        '&:hover': {
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                                        },
                                                        borderRadius: 3,
                                                        border: (theme) => theme.palette.mode === 'dark'
                                                            ? '1px solid #475569'
                                                            : '1px solid #e2e8f0',
                                                        background: (theme) => theme.palette.mode === 'dark'
                                                            ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)'
                                                            : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                                        '&::before': {
                                                            content: '""',
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            right: 0,
                                                            height: '3px',
                                                            background: index === 0 ? 'linear-gradient(90deg, #3b82f6, #1d4ed8)' :
                                                                       index === 1 ? 'linear-gradient(90deg, #10b981, #059669)' :
                                                                       index === 2 ? 'linear-gradient(90deg, #8b5cf6, #7c3aed)' :
                                                                       index === 3 ? 'linear-gradient(90deg, #f59e0b, #d97706)' :
                                                                       'linear-gradient(90deg, #06b6d4, #0891b2)',
                                                        },
                                                    }}
                                                >
                                                    <CardContent sx={{ p: 2.5, pt: 3 }}>
                                                        <Typography
                                                            variant="subtitle1"
                                                            component="h3"
                                                            sx={{
                                                                fontWeight: 700,
                                                                fontSize: '0.8rem',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.05em',
                                                                color: index === 0 ? '#1e40af' :
                                                                       index === 1 ? '#065f46' :
                                                                       index === 2 ? '#6b21a8' :
                                                                       index === 3 ? '#92400e' :
                                                                       '#0e7490',
                                                                mb: 2
                                                            }}
                                                        >
                                                            {category.type}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                            {category.skills.map((skill, i) => (
                                                                <Chip
                                                                    key={i}
                                                                    label={skill}
                                                                    size="small"
                                                                    variant="outlined"
                                                                    sx={{
                                                                        fontSize: '0.7rem',
                                                                        fontWeight: 500,
                                                                        height: '24px',
                                                                        borderColor: (theme) => theme.palette.mode === 'dark' ? '#475569' : '#d1d5db',
                                                                        color: (theme) => theme.palette.mode === 'dark' ? '#e2e8f0' : '#374151',
                                                                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#334155' : '#f9fafb',
                                                                    }}
                                                                />
                                                            ))}
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Education */}
                                    <section className="print-break-inside-avoid">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-1.5 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                                                <i className="fas fa-graduation-cap"></i>
                                            </div>
                                            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                                                Education
                                            </h2>
                                        </div>
                                        <div className="space-y-2">
                                            {EducationData.map((edu, index) => (
                                                <Card
                                                    key={index}
                                                    elevation={0}
                                                    sx={{
                                                        borderRadius: 3,
                                                        border: '1px solid',
                                                        borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                    }}
                                                >
                                                    <CardContent sx={{ p: 2.5, pt: 3 }}>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            {edu.logo && (
                                                                <img
                                                                    src={edu.logo}
                                                                    alt="University"
                                                                    className="w-6 h-6 object-contain"
                                                                />
                                                            )}
                                                            <Typography
                                                                variant="h6"
                                                                component="h3"
                                                                sx={{
                                                                    fontWeight: 700,
                                                                    fontSize: '0.9rem',
                                                                    color: (theme) => theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937',
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
                                                                fontSize: '0.8rem',
                                                                mb: 0.5
                                                            }}
                                                        >
                                                            {edu.course}
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                color: (theme) => theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280',
                                                                fontSize: '0.7rem',
                                                                display: 'block'
                                                            }}
                                                        >
                                                            {edu.duration}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Core Competencies */}
                                    <section className="print-break-inside-avoid">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                                                <i className="fas fa-star"></i>
                                            </div>
                                            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                                                Core Competencies
                                            </h2>
                                        </div>
                                        <div className="space-y-2">
                                            {CoreCompetencies.map((competency, index) => (
                                                <Card
                                                    key={index}
                                                    elevation={0}
                                                    sx={{
                                                        borderRadius: 3,
                                                        border: '1px solid',
                                                        borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e2e8f0',
                                                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                                                    }}
                                                >
                                                    <CardContent sx={{ p: 2.5, pt: 3 }}>
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <Box
                                                                sx={{
                                                                    width: 24,
                                                                    height: 24,
                                                                    borderRadius: '50%',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#f3f4f6',
                                                                    color: (theme) => theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280',
                                                                }}
                                                            >
                                                                <i className={`${competency.icon} text-xs`}></i>
                                                            </Box>
                                                            <div className="flex-1">
                                                                <Typography
                                                                    variant="h6"
                                                                    component="h3"
                                                                    sx={{
                                                                        fontWeight: 700,
                                                                        fontSize: '0.85rem',
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
                                                                        fontSize: '0.75rem',
                                                                        color: (theme) => theme.palette.mode === 'dark' ? '#d1d5db' : '#4b5563',
                                                                        lineHeight: 1.3
                                                                    }}
                                                                >
                                                                    {competency.subtitle}
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </section>

                                    {/* Languages */}
                                    <section className="print-break-inside-avoid">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="p-1.5 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-pink-600 dark:text-pink-400">
                                                <i className="fas fa-language"></i>
                                            </div>
                                            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
                                                Languages
                                            </h2>
                                        </div>
                                        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                                            {LanguagesData.map((lang, index) => (
                                                <div key={index} className="mb-3 last:mb-0">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">{lang.language}</span>
                                                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{lang.level}</span>
                                                    </div>
                                                    <div className="language-progress" style={{ height: '6px' }}>
                                                        <div
                                                            className="language-progress-bar"
                                                            style={{ width: `${lang.percentage}%`, height: '100%' }}
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

                    {/* Project Details Modal */}
                    <Dialog
                        open={!!selectedProject}
                        onClose={handleCloseProject}
                        maxWidth="lg"
                        fullWidth
                        PaperProps={{
                            sx: {
                                borderRadius: 4,
                                maxHeight: '90vh',
                                backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#1f2937' : '#ffffff',
                            }
                        }}
                    >
                        {selectedProject && projectDetails[selectedProject as keyof typeof projectDetails] && (
                            <>
                                <DialogTitle
                                    sx={{
                                        pb: 2,
                                        borderBottom: '1px solid',
                                        borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e5e7eb',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Box>
                                        <Typography variant="h4" component="h2" sx={{ fontWeight: 700, color: (theme) => theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                                            {projectDetails[selectedProject as keyof typeof projectDetails].title}
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280', mt: 1 }}>
                                            {projectDetails[selectedProject as keyof typeof projectDetails].subtitle}
                                        </Typography>
                                    </Box>
                                    <IconButton onClick={handleCloseProject} sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#9ca3af' : '#6b7280' }}>
                                        <CloseIcon />
                                    </IconButton>
                                </DialogTitle>

                                <DialogContent sx={{ p: 4 }}>
                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: (theme) => theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                                            Project Overview
                                        </Typography>
                                        <Typography variant="body1" sx={{ lineHeight: 1.7, color: (theme) => theme.palette.mode === 'dark' ? '#e5e7eb' : '#374151' }}>
                                            {projectDetails[selectedProject as keyof typeof projectDetails].overview}
                                        </Typography>
                                    </Box>

                                    <Divider sx={{ mb: 4, borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e5e7eb' }} />

                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: (theme) => theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                                            Key Features & Capabilities
                                        </Typography>
                                        <Box sx={{ display: 'grid', gap: 2 }}>
                                            {projectDetails[selectedProject as keyof typeof projectDetails].keyFeatures.map((feature, index) => (
                                                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                                    <Box
                                                        sx={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: '50%',
                                                            backgroundColor: '#3b82f6',
                                                            mt: 0.75,
                                                            flexShrink: 0
                                                        }}
                                                    />
                                                    <Typography variant="body2" sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#e5e7eb' : '#374151', lineHeight: 1.6 }}>
                                                        {feature}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>

                                    <Divider sx={{ mb: 4, borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e5e7eb' }} />

                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: (theme) => theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                                            Technical Highlights
                                        </Typography>
                                        <Box sx={{ display: 'grid', gap: 2 }}>
                                            {projectDetails[selectedProject as keyof typeof projectDetails].technicalHighlights.map((highlight, index) => (
                                                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                                    <Box
                                                        sx={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: '50%',
                                                            backgroundColor: '#10b981',
                                                            mt: 0.75,
                                                            flexShrink: 0
                                                        }}
                                                    />
                                                    <Typography variant="body2" sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#e5e7eb' : '#374151', lineHeight: 1.6 }}>
                                                        {highlight}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>

                                    <Divider sx={{ mb: 4, borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e5e7eb' }} />

                                    <Box sx={{ mb: 4 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: (theme) => theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                                            Technologies Used
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {projectDetails[selectedProject as keyof typeof projectDetails].technologies.map((tech, index) => (
                                                <Chip
                                                    key={index}
                                                    label={tech}
                                                    size="small"
                                                    variant="outlined"
                                                    sx={{
                                                        fontWeight: 500,
                                                        borderColor: (theme) => theme.palette.mode === 'dark' ? '#475569' : '#d1d5db',
                                                        color: (theme) => theme.palette.mode === 'dark' ? '#e2e8f0' : '#374151',
                                                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#334155' : '#f9fafb',
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>

                                    <Divider sx={{ mb: 4, borderColor: (theme) => theme.palette.mode === 'dark' ? '#374151' : '#e5e7eb' }} />

                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: (theme) => theme.palette.mode === 'dark' ? '#f3f4f6' : '#1f2937' }}>
                                            Key Achievements
                                        </Typography>
                                        <Box sx={{ display: 'grid', gap: 2 }}>
                                            {projectDetails[selectedProject as keyof typeof projectDetails].achievements.map((achievement, index) => (
                                                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                                    <Box
                                                        sx={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: '50%',
                                                            backgroundColor: '#f59e0b',
                                                            mt: 0.75,
                                                            flexShrink: 0
                                                        }}
                                                    />
                                                    <Typography variant="body2" sx={{ color: (theme) => theme.palette.mode === 'dark' ? '#e5e7eb' : '#374151', lineHeight: 1.6, fontWeight: 500 }}>
                                                        {achievement}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </DialogContent>
                            </>
                        )}
                    </Dialog>

                    <footer className="text-center mt-12 text-slate-500 dark:text-slate-400 text-sm no-print">
                        <p>© {new Date().getFullYear()} {BannerContent.name}. All rights reserved.</p>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Resume;