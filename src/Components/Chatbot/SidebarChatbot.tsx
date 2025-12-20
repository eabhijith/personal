import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Chip,
  Fade,
  CircularProgress,
  Switch,
  FormControlLabel
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// Extended knowledge base from ABOUT_EXTENDED.md
const extendedKnowledgeBase = {
  personal: {
    name: "Abhijith Eanuga",
    role: "Senior Systems Architect & AI Specialist",
    location: "Berlin, Germany",
    email: "eabhijith@gmail.com",
    phone: "+49 15510521709",
    linkedin: "https://linkedin.com/in/eabhijith",
    github: "https://github.com/eabhijith",
    website: "https://eabhijith.github.io/personal/",
    huggingface: "https://huggingface.co/eabhijith"
  },
  philosophy: "I believe in the transformative power of AI-driven architecture. My approach combines deep technical expertise with strategic thinking to build systems that don't just solve today's problems but anticipate tomorrow's opportunities.",
  experience: {
    current: {
      company: "Zalando SE",
      role: "Senior Systems Architect & AI Specialist",
      duration: "Aug 2020 – Present",
      location: "Berlin, Germany",
      achievements: [
        "Architected Agentforce-powered customer service automation, reducing response times by 60%",
        "Implemented RAG system for product recommendations using 50M+ product vectors",
        "Built ML pipeline processing 10TB+ daily customer interaction data",
        "Led cross-functional team of 12 engineers across 4 countries"
      ],
      projects: [
        "AI-Powered Size Recommendation: Built ML model using TensorFlow.js achieving 92% accuracy",
        "Conversational Commerce: Implemented chatbot handling 100K+ monthly customer queries",
        "Real-time Personalization: Created recommendation engine using GraphQL and Redis",
        "Cloud Migration: Migrated legacy systems to Kubernetes, improving performance by 40%"
      ]
    },
    previous: [
      {
        company: "Adidas",
        role: "Senior Technical Specialist",
        duration: "Feb 2020 – Jul 2020",
        type: "Contract",
        achievements: [
          "Developed predictive analytics for inventory management using Python and scikit-learn",
          "Implemented GraphQL federation for microservices architecture",
          "Built real-time customer behavior tracking with Kafka and Elasticsearch",
          "Optimized checkout flow resulting in 25% conversion improvement"
        ]
      },
      {
        company: "Infosys Limited",
        role: "Technology Analyst",
        duration: "Jul 2016 – Jan 2020",
        achievements: [
          "Led digital transformation for Fortune 500 bank",
          "Migrated monolith to 50+ microservices using Spring Boot",
          "Built secure API layer handling 1M+ daily requests",
          "Automated deployment reducing release time from weeks to hours"
        ]
      }
    ]
  },
  education: {
    degree: "Master of Science in Data Science",
    university: "University of Missouri-Kansas City (UMKC)",
    duration: "Aug 2019 – Mar 2021",
    specialization: "Machine Learning & Predictive Analytics",
    thesis: "Improving E-commerce Recommendation Systems using Hybrid Deep Learning Approaches - Achieved 15% improvement in recommendation accuracy over traditional collaborative filtering"
  },
  skills: {
    programming: {
      python: { level: "9/10", experience: "5+ years", technologies: ["ML/AI", "Django", "Flask"] },
      javascript: { level: "9/10", experience: "5+ years", technologies: ["React", "Node.js", "TensorFlow.js"] },
      java: { level: "8/10", experience: "4+ years", technologies: ["Spring Boot", "Microservices", "Enterprise applications"] },
      apex: { level: "9/10", experience: "4+ years", technologies: ["Salesforce development", "Lightning Platform"] },
      go: { level: "7/10", experience: "2+ years", technologies: ["Microservices", "CLI tools", "Docker containers"] },
      sql: { level: "9/10", experience: "6+ years", technologies: ["PostgreSQL", "MySQL", "Snowflake", "BigQuery"] }
    },
    ai_ml: ["TensorFlow", "PyTorch", "Scikit-learn", "Hugging Face Transformers", "LangChain", "MLOps tools"],
    cloud: ["AWS", "Google Cloud Platform", "Kubernetes", "Docker", "Terraform", "GitLab CI/CD"],
    specializations: ["Agentic AI", "RAG Systems", "Salesforce Agentforce", "Cloud Architecture", "Vector Databases"]
  },
  certifications: [
    "Salesforce Certified System Architect",
    "Salesforce Agentforce Specialist",
    "Platform Development Lifecycle and Deployment Designer",
    "Identity and Access Management Designer",
    "AWS Certified Cloud Practitioner",
    "TensorFlow Developer Certificate",
    "Machine Learning Engineering for Production (MLOps)"
  ],
  projects: [
    {
      name: "AI-Powered Resume Assistant",
      description: "Built an intelligent chatbot that answers questions about professional background",
      tech: ["TensorFlow.js", "React", "WebGL"],
      impact: "Implemented on personal website, handling 500+ monthly interactions"
    },
    {
      name: "Cloud Cost Optimizer",
      description: "Open-source tool for AWS cost optimization",
      tech: ["Python", "AWS SDK", "Docker", "Terraform"],
      impact: "Used by 50+ companies, saving average of 30% on cloud costs",
      github: "https://github.com/eabhijith/cloud-cost-optimizer"
    },
    {
      name: "Salesforce DevOps Toolkit",
      description: "Custom CI/CD solution for Salesforce development teams",
      tech: ["Node.js", "Salesforce DX", "GitLab CI", "Jest"],
      impact: "100+ downloads on Salesforce AppExchange"
    }
  ],
  recognition: [
    "Salesforce MVP (2022-2024) - Community leadership and technical excellence",
    "AWS Community Builder (2023) - Machine Learning & AI track",
    "Google Developer Expert (Candidate) - Cloud Platform"
  ],
  speaking: [
    "Salesforce Trailhead DX 2023: Building Intelligent Agents with Agentforce",
    "AWS re:Invent 2022: Serverless AI Applications at Scale",
    "Google Cloud Next 2022: ML Pipeline Automation for E-commerce"
  ],
  patents: [
    "US Patent Pending: Method for Intelligent Customer Service Routing using AI",
    "Research Paper: Hybrid Recommendation Systems for E-commerce - IEEE ICMLA 2021"
  ]
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  enhanced?: boolean;
}

interface SidebarChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  isDark?: boolean;
}

const SidebarChatbot: React.FC<SidebarChatbotProps> = ({ isOpen, onClose, isDark = false }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [enhancedMode, setEnhancedMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize without welcome message - let quick questions show instead
  useEffect(() => {
    // Don't auto-add welcome message - let the quick questions interface show
    // Users can see available options immediately without needing to read a message first
  }, [isOpen, enhancedMode]);

  const calculateSimilarity = (text1: string, text2: string): number => {
    const words1 = text1.toLowerCase().split(/\W+/);
    const words2 = text2.toLowerCase().split(/\W+/);
    const common = words1.filter(word => words2.includes(word));
    return common.length / Math.max(words1.length, words2.length);
  };

  const findMostRelevant = (query: string, context: any): any => {
    const results: Array<{ key: string; value: string; score: number }> = [];

    const searchInObject = (obj: any, prefix = ''): void => {
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
          const score = calculateSimilarity(query, value);
          results.push({ key: fullKey, value, score });
        } else if (Array.isArray(value)) {
          // Process array items directly without nested functions
          for (let index = 0; index < value.length; index++) {
            const item = value[index];
            if (typeof item === 'string') {
              const score = calculateSimilarity(query, item);
              results.push({ key: `${fullKey}[${index}]`, value: item, score });
            } else if (typeof item === 'object' && item !== null) {
              searchInObject(item, `${fullKey}[${index}]`);
            }
          }
        } else if (typeof value === 'object' && value !== null) {
          searchInObject(value, fullKey);
        }
      }
    };

    searchInObject(context);

    // Find the best result after collecting all scores
    if (results.length === 0) return null;

    return results.reduce((best, current) =>
      current.score > best.score ? current : best
    );
  };

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (enhancedMode) {
      // Use enhanced AI-like processing
      const relevantContent = findMostRelevant(userMessage, extendedKnowledgeBase);
      if (relevantContent && relevantContent.score > 0.2) {
        return `Based on my analysis, here's what I found most relevant to your question:\n\n${relevantContent.value}\n\n[Enhanced AI Mode - Confidence: ${Math.round(relevantContent.score * 100)}%]`;
      }
    }

    // Standard responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return `Hello! I'm Abhijith's AI assistant${enhancedMode ? ' (Enhanced Mode)' : ''}. I can answer detailed questions about his professional background, experience, skills, projects, and achievements. What would you like to know?`;
    }

    if (message.includes('philosophy') || message.includes('approach') || message.includes('believe')) {
      return `Abhijith's professional philosophy: "${extendedKnowledgeBase.philosophy}"\n\nHe follows an "AI-First, Human-Centric" approach, ensuring technology amplifies human intelligence rather than replacing it.`;
    }

    if (message.includes('tensorflow') || message.includes('machine learning') || message.includes('deep learning')) {
      return `Abhijith has extensive ML/AI expertise:\n\n🧠 **AI/ML Technologies**: ${extendedKnowledgeBase.skills.ai_ml.join(', ')}\n\n🏆 **Notable AI Projects**:\n• Built ML model with TensorFlow.js achieving 92% accuracy for size recommendations\n• Implemented RAG system using 50M+ product vectors\n• Created AI-powered customer service automation\n\n📜 **AI Certifications**: TensorFlow Developer Certificate, MLOps specialization`;
    }

    if (message.includes('project') || message.includes('portfolio') || message.includes('github')) {
      const projectDetails = extendedKnowledgeBase.projects.map(project =>
        `**${project.name}**: ${project.description}\n• Tech: ${project.tech.join(', ')}\n• Impact: ${project.impact}${project.github ? `\n• GitHub: ${project.github}` : ''}`
      ).join('\n\n');

      return `Here are Abhijith's notable projects:\n\n${projectDetails}\n\nYou can find more on his GitHub: ${extendedKnowledgeBase.personal.github}`;
    }

    if (message.includes('award') || message.includes('recognition') || message.includes('achievement') || message.includes('mvp')) {
      return `🏆 **Industry Recognition**:\n${extendedKnowledgeBase.recognition.join('\n')}\n\n🎤 **Speaking Engagements**:\n${extendedKnowledgeBase.speaking.join('\n')}\n\n📝 **Patents & Publications**:\n${extendedKnowledgeBase.patents.join('\n')}`;
    }

    if (message.includes('skill') || message.includes('technology') || message.includes('programming')) {
      const skillDetails = Object.entries(extendedKnowledgeBase.skills.programming).map(([lang, details]) =>
        `**${lang.charAt(0).toUpperCase() + lang.slice(1)}**: ${details.level} - ${details.experience} (${details.technologies.join(', ')})`
      ).join('\n');

      return `**Programming Languages & Proficiency**:\n${skillDetails}\n\n**AI/ML**: ${extendedKnowledgeBase.skills.ai_ml.join(', ')}\n\n**Cloud & DevOps**: ${extendedKnowledgeBase.skills.cloud.join(', ')}\n\n**Specializations**: ${extendedKnowledgeBase.skills.specializations.join(', ')}`;
    }

    if (message.includes('experience') || message.includes('work') || message.includes('zalando') || message.includes('current')) {
      const current = extendedKnowledgeBase.experience.current;
      return `**Current Role**: ${current.role} at ${current.company} (${current.duration})\n\n**Key Achievements**:\n${current.achievements.map(a => `• ${a}`).join('\n')}\n\n**Major Projects**:\n${current.projects.map(p => `• ${p}`).join('\n')}`;
    }

    if (message.includes('education') || message.includes('degree') || message.includes('university') || message.includes('thesis')) {
      const edu = extendedKnowledgeBase.education;
      return `**Education**: ${edu.degree}\n**University**: ${edu.university}\n**Duration**: ${edu.duration}\n**Specialization**: ${edu.specialization}\n\n**Thesis**: ${edu.thesis}`;
    }

    if (message.includes('salesforce') || message.includes('agentforce') || message.includes('crm')) {
      return `Abhijith is a **Salesforce MVP (2022-2024)** with 10+ certifications including 4 Architect-level credentials:\n\n📜 **Architect Certifications**:\n• System Architect\n• Platform Development Lifecycle Designer\n• Identity and Access Management Designer\n• Platform Integration Architecture Designer\n\n🤖 **Agentforce Specialist**: Built enterprise-grade AI agents, implemented customer service automation reducing response times by 60%`;
    }

    if (message.includes('contact') || message.includes('reach') || message.includes('hire')) {
      const personal = extendedKnowledgeBase.personal;
      return `**Contact Abhijith**:\n\n📧 **Email**: ${personal.email}\n📱 **Phone**: ${personal.phone}\n📍 **Location**: ${personal.location}\n\n**Professional Profiles**:\n💼 LinkedIn: ${personal.linkedin}\n🐱 GitHub: ${personal.github}\n🤗 Hugging Face: ${personal.huggingface}\n🌐 Website: ${personal.website}`;
    }

    return `I can provide detailed information about Abhijith's professional background! Try asking about:\n\n🎯 **Specific Topics**:\n• Technical skills and proficiency levels\n• Current projects at Zalando SE\n• AI/ML expertise and TensorFlow.js experience\n• Salesforce certifications and Agentforce specialization\n• Awards, recognition, and speaking engagements\n• Open source projects and GitHub contributions\n• Patents and published research\n\n💡 **Try enabling Enhanced Mode** for AI-powered semantic search!\n\nWhat would you like to know more about?`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(input),
        sender: 'bot',
        timestamp: new Date(),
        enhanced: enhancedMode
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, enhancedMode ? 1500 : 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "Tell me about his experience and work history",
    "What are his technical skills and expertise?",
    "What certifications does he have?",
    "What's his educational background?",
    "Tell me about his AI/ML experience",
    "Show me his projects and achievements",
    "What awards and recognition has he received?",
    "How can I contact him?",
    "Where is he located?"
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed bottom-4 right-4 w-80 max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 rounded-xl shadow-2xl z-50 no-print"
      style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
    >
      {/* Header */}
      <div className={`p-4 border-b-2 ${isDark ? 'border-slate-600 bg-slate-800' : 'border-slate-200 bg-white'} rounded-t-xl`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 ${enhancedMode ? 'bg-gradient-to-r from-purple-500 to-pink-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'} rounded-full flex items-center justify-center`}>
              {enhancedMode ? (
                <AutoAwesomeIcon sx={{ color: 'white', fontSize: '16px' }} />
              ) : (
                <SmartToyIcon sx={{ color: 'white', fontSize: '16px' }} />
              )}
            </div>
            <div>
              <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                AI Resume Assistant {enhancedMode && '(Enhanced)'}
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Ask me about Abhijith's background
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FormControlLabel
              control={
                <Switch
                  checked={enhancedMode}
                  onChange={(e) => setEnhancedMode(e.target.checked)}
                  size="small"
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: enhancedMode ? '#9c27b0' : '#2196f3'
                    }
                  }}
                />
              }
              label={<span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>AI</span>}
            />
            <IconButton
              onClick={onClose}
              size="small"
              sx={{ color: isDark ? '#94a3b8' : '#64748b' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 ? (
          <Box p={2}>
            <Typography variant="body2" color="text.secondary" mb={2} textAlign="center">
              Hi! I'm Abhijith's AI assistant. What can I help you with?
            </Typography>
            <Typography variant="caption" color="text.secondary" mb={2} display="block" textAlign="center">
              Click on any question below to get started:
            </Typography>
            <Box display="flex" flexDirection="column" gap={1} maxHeight="200px" overflow="auto">
              {quickQuestions.map((question, index) => (
                <Chip
                  key={index}
                  label={question}
                  onClick={() => setInput(question)}
                  variant="outlined"
                  size="small"
                  sx={{
                    justifyContent: 'flex-start',
                    height: 'auto',
                    py: 0.75,
                    px: 1,
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: enhancedMode ? 'rgba(156, 39, 176, 0.1)' : 'rgba(33, 150, 243, 0.1)',
                      borderColor: enhancedMode ? '#9c27b0' : '#2196f3',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }
                  }}
                />
              ))}
            </Box>
            <Typography variant="caption" color="text.secondary" mt={2} display="block" textAlign="center">
              💡 {enhancedMode ? 'Enhanced AI mode is enabled for smarter responses' : 'Toggle AI mode for enhanced semantic search'}
            </Typography>
          </Box>
        ) : (
          messages.map((message) => (
            <Fade in={true} key={message.id}>
              <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start gap-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar
                    sx={{
                      width: 24,
                      height: 24,
                      bgcolor: message.sender === 'user'
                        ? 'primary.main'
                        : message.enhanced
                          ? '#9c27b0'
                          : '#64748b'
                    }}
                  >
                    {message.sender === 'user' ? (
                      <PersonIcon sx={{ fontSize: '14px' }} />
                    ) : message.enhanced ? (
                      <AutoAwesomeIcon sx={{ fontSize: '14px' }} />
                    ) : (
                      <SmartToyIcon sx={{ fontSize: '14px' }} />
                    )}
                  </Avatar>
                  <div
                    className={`p-3 rounded-2xl text-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : message.enhanced
                          ? 'bg-purple-50 text-slate-800 border border-purple-200'
                          : isDark
                            ? 'bg-slate-700 text-slate-200'
                            : 'bg-slate-100 text-slate-800'
                    }`}
                    style={{ whiteSpace: 'pre-wrap' }}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            </Fade>
          ))
        )}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2">
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: enhancedMode ? '#9c27b0' : '#64748b'
                }}
              >
                {enhancedMode ? (
                  <AutoAwesomeIcon sx={{ fontSize: '14px' }} />
                ) : (
                  <SmartToyIcon sx={{ fontSize: '14px' }} />
                )}
              </Avatar>
              <div className={`p-3 rounded-2xl ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                <div className="flex items-center gap-1">
                  <CircularProgress size={12} />
                  <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {enhancedMode ? 'Analyzing with AI...' : 'Thinking...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className={`p-4 border-t ${isDark ? 'border-slate-600' : 'border-gray-200'} rounded-b-xl`}>
        <div className="flex gap-2">
          <TextField
            fullWidth
            multiline
            maxRows={3}
            placeholder={enhancedMode
              ? "Ask me anything - AI will find the most relevant information..."
              : "Ask about experience, skills, education..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            size="small"
            disabled={isTyping}
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: '0.875rem',
                backgroundColor: isDark ? '#374151' : 'white'
              }
            }}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            sx={{
              bgcolor: enhancedMode ? '#9c27b0' : 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: enhancedMode ? '#7b1fa2' : 'primary.dark'
              },
              '&:disabled': {
                bgcolor: isDark ? '#4b5563' : '#e5e7eb',
                color: isDark ? '#6b7280' : '#9ca3af'
              }
            }}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </div>
        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-2`}>
          {enhancedMode
            ? 'Enhanced AI mode with semantic search and intelligent content matching'
            : 'This AI assistant uses advanced knowledge base about Abhijith\'s professional background'
          }
        </p>
      </div>
    </div>
  );
};

export default SidebarChatbot;