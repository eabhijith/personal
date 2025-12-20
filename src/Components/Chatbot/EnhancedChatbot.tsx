import React, { useState, useRef, useEffect } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  Fade,
  CircularProgress,
  Switch,
  FormControlLabel
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
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

const EnhancedChatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
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

  const calculateSimilarity = (text1: string, text2: string): number => {
    const words1 = text1.toLowerCase().split(/\W+/);
    const words2 = text2.toLowerCase().split(/\W+/);
    const common = words1.filter(word => words2.includes(word));
    return common.length / Math.max(words1.length, words2.length);
  };

  const findMostRelevant = (query: string, context: any): any => {
    let maxScore = 0;
    let mostRelevant = null;

    const searchInObject = (obj: any, prefix = ''): void => {
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === 'string') {
          const score = calculateSimilarity(query, value);
          if (score > maxScore) {
            maxScore = score;
            mostRelevant = { key: fullKey, value, score };
          }
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === 'string') {
              const score = calculateSimilarity(query, item);
              if (score > maxScore) {
                maxScore = score;
                mostRelevant = { key: `${fullKey}[${index}]`, value: item, score };
              }
            } else if (typeof item === 'object') {
              searchInObject(item, `${fullKey}[${index}]`);
            }
          });
        } else if (typeof value === 'object' && value !== null) {
          searchInObject(value, fullKey);
        }
      }
    };

    searchInObject(context);
    return mostRelevant;
  };

  const generateEnhancedResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (enhancedMode) {
      // Use enhanced AI-like processing
      const relevantContent = findMostRelevant(userMessage, extendedKnowledgeBase);

      if (relevantContent && relevantContent.score > 0.2) {
        return `Based on my analysis, here's what I found most relevant to your question:\n\n${relevantContent.value}\n\n[Enhanced AI Mode - Confidence: ${Math.round(relevantContent.score * 100)}%]`;
      }
    }

    return generateStandardResponse(userMessage);
  };

  const generateStandardResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return `Hello! I'm Abhijith's AI assistant${enhancedMode ? ' (Enhanced Mode)' : ''}. I can answer detailed questions about his professional background, experience, skills, projects, and achievements. What would you like to know?`;
    }

    // Philosophy questions
    if (message.includes('philosophy') || message.includes('approach') || message.includes('believe')) {
      return `Abhijith's professional philosophy: "${extendedKnowledgeBase.philosophy}"\n\nHe follows an "AI-First, Human-Centric" approach, ensuring technology amplifies human intelligence rather than replacing it.`;
    }

    // Deep technical questions
    if (message.includes('tensorflow') || message.includes('machine learning') || message.includes('deep learning')) {
      return `Abhijith has extensive ML/AI expertise:\n\n🧠 **AI/ML Technologies**: ${extendedKnowledgeBase.skills.ai_ml.join(', ')}\n\n🏆 **Notable AI Projects**:\n- Built ML model with TensorFlow.js achieving 92% accuracy for size recommendations\n- Implemented RAG system using 50M+ product vectors\n- Created AI-powered customer service automation\n\n📜 **AI Certifications**: TensorFlow Developer Certificate, MLOps specialization\n\nHe's also published research on hybrid recommendation systems achieving 15% improvement over traditional methods.`;
    }

    // Project details
    if (message.includes('project') || message.includes('portfolio') || message.includes('github')) {
      const projectDetails = extendedKnowledgeBase.projects.map(project =>
        `**${project.name}**: ${project.description}\n- Tech: ${project.tech.join(', ')}\n- Impact: ${project.impact}${project.github ? `\n- GitHub: ${project.github}` : ''}`
      ).join('\n\n');

      return `Here are Abhijith's notable projects:\n\n${projectDetails}\n\nYou can find more on his GitHub: ${extendedKnowledgeBase.personal.github}`;
    }

    // Recognition and achievements
    if (message.includes('award') || message.includes('recognition') || message.includes('achievement') || message.includes('mvp')) {
      return `🏆 **Industry Recognition**:\n${extendedKnowledgeBase.recognition.join('\n')}\n\n🎤 **Speaking Engagements**:\n${extendedKnowledgeBase.speaking.join('\n')}\n\n📝 **Patents & Publications**:\n${extendedKnowledgeBase.patents.join('\n')}\n\n💼 **Business Impact**: Led initiatives saving $2M+ annually, improved system performance by 60%, built systems handling 100M+ daily transactions.`;
    }

    // Skills with proficiency levels
    if (message.includes('skill') || message.includes('technology') || message.includes('programming')) {
      const skillDetails = Object.entries(extendedKnowledgeBase.skills.programming).map(([lang, details]) =>
        `**${lang.charAt(0).toUpperCase() + lang.slice(1)}**: ${details.level} - ${details.experience} (${details.technologies.join(', ')})`
      ).join('\n');

      return `**Programming Languages & Proficiency**:\n${skillDetails}\n\n**AI/ML**: ${extendedKnowledgeBase.skills.ai_ml.join(', ')}\n\n**Cloud & DevOps**: ${extendedKnowledgeBase.skills.cloud.join(', ')}\n\n**Specializations**: ${extendedKnowledgeBase.skills.specializations.join(', ')}`;
    }

    // Experience with detailed projects
    if (message.includes('experience') || message.includes('work') || message.includes('zalando') || message.includes('current')) {
      const current = extendedKnowledgeBase.experience.current;
      return `**Current Role**: ${current.role} at ${current.company} (${current.duration})\n\n**Key Achievements**:\n${current.achievements.map(a => `• ${a}`).join('\n')}\n\n**Major Projects**:\n${current.projects.map(p => `• ${p}`).join('\n')}`;
    }

    // Education details
    if (message.includes('education') || message.includes('degree') || message.includes('university') || message.includes('thesis')) {
      const edu = extendedKnowledgeBase.education;
      return `**Education**: ${edu.degree}\n**University**: ${edu.university}\n**Duration**: ${edu.duration}\n**Specialization**: ${edu.specialization}\n\n**Thesis**: ${edu.thesis}`;
    }

    // Salesforce expertise
    if (message.includes('salesforce') || message.includes('agentforce') || message.includes('crm')) {
      return `Abhijith is a **Salesforce MVP (2022-2024)** with 10+ certifications including 4 Architect-level credentials:\n\n📜 **Architect Certifications**:\n• System Architect\n• Platform Development Lifecycle Designer\n• Identity and Access Management Designer\n• Platform Integration Architecture Designer\n\n🤖 **Agentforce Specialist**: Built enterprise-grade AI agents, implemented customer service automation reducing response times by 60%\n\n🏆 **AppExchange**: Developed custom packages with 100+ downloads`;
    }

    // Contact information
    if (message.includes('contact') || message.includes('reach') || message.includes('hire')) {
      const personal = extendedKnowledgeBase.personal;
      return `**Contact Abhijith**:\n\n📧 **Email**: ${personal.email}\n📱 **Phone**: ${personal.phone}\n📍 **Location**: ${personal.location}\n\n**Professional Profiles**:\n💼 LinkedIn: ${personal.linkedin}\n🐱 GitHub: ${personal.github}\n🤗 Hugging Face: ${personal.huggingface}\n🌐 Website: ${personal.website}`;
    }

    // Default enhanced response
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
        text: generateEnhancedResponse(input),
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
    "What's Abhijith's AI/ML experience?",
    "Tell me about his projects at Zalando",
    "What certifications does he have?",
    "Show me his GitHub projects",
    "What awards has he won?",
    "How can I contact him?"
  ];

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          background: enhancedMode
            ? 'linear-gradient(45deg, #9C27B0 30%, #E91E63 90%)'
            : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          '&:hover': {
            background: enhancedMode
              ? 'linear-gradient(45deg, #7B1FA2 30%, #C2185B 90%)'
              : 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
          }
        }}
        onClick={() => setOpen(true)}
      >
        {enhancedMode ? <AutoAwesomeIcon /> : <ChatIcon />}
      </Fab>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            height: '700px',
            maxHeight: '85vh',
            borderRadius: 2,
          }
        }}
      >
        <DialogTitle
          sx={{
            background: enhancedMode
              ? 'linear-gradient(45deg, #9C27B0 30%, #E91E63 90%)'
              : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            {enhancedMode ? <AutoAwesomeIcon /> : <SmartToyIcon />}
            <Typography variant="h6">
              Ask me about Abhijith {enhancedMode && '(Enhanced AI)'}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <FormControlLabel
              control={
                <Switch
                  checked={enhancedMode}
                  onChange={(e) => setEnhancedMode(e.target.checked)}
                  sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: 'white' } }}
                />
              }
              label={<Typography variant="caption" color="white">Enhanced AI</Typography>}
            />
            <IconButton
              onClick={() => setOpen(false)}
              sx={{ color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {messages.length === 0 ? (
            <Box p={3}>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Hi! I'm Abhijith's AI assistant with access to comprehensive professional information.
                {enhancedMode ? ' Enhanced AI mode provides semantic search and intelligent content matching.' : ' Enable Enhanced AI mode for smarter responses!'}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Try these questions:
              </Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                {quickQuestions.map((question, index) => (
                  <Chip
                    key={index}
                    label={question}
                    onClick={() => setInput(question)}
                    variant="outlined"
                    sx={{ justifyContent: 'flex-start', height: 'auto', py: 1 }}
                  />
                ))}
              </Box>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
              {messages.map((message) => (
                <Fade in={true} key={message.id}>
                  <Box
                    display="flex"
                    justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                    mb={2}
                  >
                    <Box
                      display="flex"
                      alignItems="flex-start"
                      gap={1}
                      maxWidth="85%"
                      flexDirection={message.sender === 'user' ? 'row-reverse' : 'row'}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: message.sender === 'user'
                            ? 'primary.main'
                            : message.enhanced
                              ? '#9C27B0'
                              : 'grey.300'
                        }}
                      >
                        {message.sender === 'user' ? <PersonIcon /> :
                         message.enhanced ? <AutoAwesomeIcon /> : <SmartToyIcon />}
                      </Avatar>
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          backgroundColor: message.sender === 'user'
                            ? 'primary.main'
                            : message.enhanced
                              ? '#f3e5f5'
                              : 'grey.100',
                          color: message.sender === 'user' ? 'white' : 'inherit',
                          borderRadius: 2,
                          '& pre': {
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'inherit',
                            fontSize: 'inherit'
                          }
                        }}
                      >
                        <Typography variant="body2" component="pre">
                          {message.text}
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>
                </Fade>
              ))}

              {isTyping && (
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  <Avatar sx={{
                    width: 32,
                    height: 32,
                    bgcolor: enhancedMode ? '#9C27B0' : 'grey.300'
                  }}>
                    {enhancedMode ? <AutoAwesomeIcon /> : <SmartToyIcon />}
                  </Avatar>
                  <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <CircularProgress size={16} />
                      <Typography variant="body2" color="text.secondary">
                        {enhancedMode ? 'Analyzing with AI...' : 'Thinking...'}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              )}

              <div ref={messagesEndRef} />
            </Box>
          )}

          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <Box display="flex" gap={1}>
              <TextField
                fullWidth
                multiline
                maxRows={3}
                placeholder={enhancedMode
                  ? "Ask me anything - AI will find the most relevant information..."
                  : "Ask me anything about Abhijith..."
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                variant="outlined"
                size="small"
              />
              <IconButton
                color="primary"
                onClick={handleSend}
                disabled={!input.trim()}
                sx={{
                  bgcolor: enhancedMode ? '#9C27B0' : 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: enhancedMode ? '#7B1FA2' : 'primary.dark'
                  },
                  '&:disabled': { bgcolor: 'grey.300', color: 'grey.500' }
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EnhancedChatbot;