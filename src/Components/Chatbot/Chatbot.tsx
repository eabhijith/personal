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
  CircularProgress
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

// Knowledge base from ABOUT_EXTENDED.md
const knowledgeBase = {
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
      ]
    },
    previous: [
      {
        company: "Adidas",
        role: "Senior Technical Specialist",
        duration: "Feb 2020 – Jul 2020",
        type: "Contract"
      },
      {
        company: "Infosys Limited",
        role: "Technology Analyst",
        duration: "Jul 2016 – Jan 2020"
      }
    ]
  },
  education: {
    degree: "Master of Science in Data Science",
    university: "University of Missouri-Kansas City (UMKC)",
    duration: "Aug 2019 – Mar 2021",
    specialization: "Machine Learning & Predictive Analytics"
  },
  skills: {
    programming: ["Python", "JavaScript/TypeScript", "Java", "Apex", "Go", "SQL"],
    ai_ml: ["TensorFlow", "PyTorch", "Scikit-learn", "Hugging Face Transformers", "LangChain"],
    cloud: ["AWS", "Google Cloud Platform", "Kubernetes", "Docker"],
    specializations: ["Agentic AI", "RAG Systems", "Salesforce Agentforce", "Cloud Architecture"]
  },
  certifications: [
    "Salesforce Certified System Architect",
    "Salesforce Agentforce Specialist",
    "AWS Certified Cloud Practitioner",
    "TensorFlow Developer Certificate"
  ]
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Greeting responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm Abhijith's AI assistant. I can answer questions about his professional background, experience, skills, and projects. What would you like to know?";
    }

    // About/intro questions
    if (message.includes('who are you') || message.includes('about abhijith') || message.includes('introduce')) {
      return `I'm here to help you learn about Abhijith Eanuga. He's a ${knowledgeBase.personal.role} currently working at ${knowledgeBase.experience.current.company} in ${knowledgeBase.personal.location}. He specializes in AI-driven architecture, cloud systems, and has over 10 Salesforce certifications including 4 Architect-level credentials.`;
    }

    // Experience questions
    if (message.includes('experience') || message.includes('work') || message.includes('job')) {
      return `Abhijith currently works as a ${knowledgeBase.experience.current.role} at ${knowledgeBase.experience.current.company} since ${knowledgeBase.experience.current.duration}. His key achievements include: ${knowledgeBase.experience.current.achievements.slice(0, 2).join(', ')}. He previously worked at Adidas as a Senior Technical Specialist and at Infosys Limited as a Technology Analyst.`;
    }

    // Skills questions
    if (message.includes('skills') || message.includes('technologies') || message.includes('programming')) {
      return `Abhijith's core technical skills include:

**Programming Languages**: ${knowledgeBase.skills.programming.join(', ')}

**AI/ML Technologies**: ${knowledgeBase.skills.ai_ml.join(', ')}

**Cloud & DevOps**: ${knowledgeBase.skills.cloud.join(', ')}

**Specializations**: ${knowledgeBase.skills.specializations.join(', ')}`;
    }

    // Education questions
    if (message.includes('education') || message.includes('degree') || message.includes('university')) {
      return `Abhijith holds a ${knowledgeBase.education.degree} from ${knowledgeBase.education.university} (${knowledgeBase.education.duration}), with specialization in ${knowledgeBase.education.specialization}. His thesis focused on "Improving E-commerce Recommendation Systems using Hybrid Deep Learning Approaches."`;
    }

    // AI/ML specific questions
    if (message.includes('ai') || message.includes('machine learning') || message.includes('ml') || message.includes('artificial intelligence')) {
      return `Abhijith is an AI specialist with deep expertise in Agentic AI & LLM Integration. He's implemented Salesforce Agentforce solutions, built RAG systems using vector databases, and has experience with prompt engineering and model fine-tuning. He's also certified in TensorFlow and has experience with PyTorch, Hugging Face Transformers, and LangChain.`;
    }

    // Salesforce questions
    if (message.includes('salesforce') || message.includes('agentforce') || message.includes('crm')) {
      return `Abhijith has extensive Salesforce expertise with 10+ certifications including 4 Architect-level credentials. He's a Salesforce Agentforce Specialist and has implemented enterprise-grade AI agents using the Agentforce platform. His Salesforce experience includes Lightning Platform development, Omni-Channel implementation, and building custom AppExchange solutions.`;
    }

    // Contact/location questions
    if (message.includes('contact') || message.includes('reach') || message.includes('location') || message.includes('where')) {
      return `Abhijith is based in ${knowledgeBase.personal.location}. You can reach him at:

📧 Email: ${knowledgeBase.personal.email}
📱 Phone: ${knowledgeBase.personal.phone}
💼 LinkedIn: ${knowledgeBase.personal.linkedin}
🐱 GitHub: ${knowledgeBase.personal.github}
🤗 Hugging Face: ${knowledgeBase.personal.huggingface}`;
    }

    // Certifications
    if (message.includes('certification') || message.includes('certified')) {
      return `Abhijith holds numerous certifications including: ${knowledgeBase.certifications.join(', ')} and many more. He has 10+ Salesforce certifications with 4 Architect-level credentials, demonstrating his expertise in enterprise architecture and AI systems.`;
    }

    // Projects
    if (message.includes('project') || message.includes('portfolio') || message.includes('work samples')) {
      return `Some of Abhijith's notable projects include:

**AI-Powered Resume Assistant**: Built an intelligent chatbot using TensorFlow.js and React for client-side inference (like this one!)

**Cloud Cost Optimizer**: Open-source AWS cost optimization tool used by 50+ companies, saving an average of 30% on cloud costs

**Salesforce DevOps Toolkit**: Custom CI/CD solution for Salesforce teams with 100+ downloads on AppExchange

You can find more projects on his GitHub: ${knowledgeBase.personal.github}`;
    }

    // Default response
    return `I can help you learn about Abhijith's professional background! Try asking me about:

🔹 His work experience and current role
🔹 Technical skills and expertise
🔹 Education and certifications
🔹 AI/ML and Salesforce experience
🔹 Projects and achievements
🔹 Contact information

What specific aspect would you like to know more about?`;
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

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "Tell me about Abhijith's experience",
    "What are his technical skills?",
    "What certifications does he have?",
    "Tell me about his AI/ML experience",
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
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
          }
        }}
        onClick={() => setOpen(true)}
      >
        <ChatIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            height: '600px',
            maxHeight: '80vh',
            borderRadius: 2,
          }
        }}
      >
        <DialogTitle
          sx={{
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <SmartToyIcon />
            <Typography variant="h6">Ask me about Abhijith</Typography>
          </Box>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {messages.length === 0 ? (
            <Box p={3}>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Hi! I'm Abhijith's AI assistant. I can answer questions about his professional background, experience, and skills. Try asking me something, or click on one of these quick questions:
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
                      maxWidth="80%"
                      flexDirection={message.sender === 'user' ? 'row-reverse' : 'row'}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.300'
                        }}
                      >
                        {message.sender === 'user' ? <PersonIcon /> : <SmartToyIcon />}
                      </Avatar>
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          backgroundColor: message.sender === 'user' ? 'primary.main' : 'grey.100',
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
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'grey.300' }}>
                    <SmartToyIcon />
                  </Avatar>
                  <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <CircularProgress size={16} />
                      <Typography variant="body2" color="text.secondary">
                        Thinking...
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
                placeholder="Ask me anything about Abhijith..."
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
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
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

export default Chatbot;