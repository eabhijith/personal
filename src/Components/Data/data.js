export const ExperienceData = [
  {
    company: "Zalando SE",
    duration: "Aug 2020 – Present",
    location: "Berlin, Germany",
    role: "Senior Specialist (AI & Automation)",
    logo: require('../Assets/zalando.jpg'),
    experience: [
      "Agentic AI & Prompt Engineering: Leveraging Salesforce Agentforce and Prompt Builder to architect autonomous agents that streamline complex customer and internal workflows.",
      "Probabilistic Automations: Integrated n8n with external Model Context Protocol (MCP) to create dynamic, probabilistic flow automations, enabling smarter system-to-system context exchange.",
      "LLM Steering & Custom ML: Fine-tuning model behavior through steering techniques and building custom classification models in SageMaker Studio for automated data categorisation.",
      "Hybrid Cloud RAG: Engineered a cross-cloud RAG system utilizing AWS Bedrock Knowledge Bases integrated seamlessly with Google Cloud Platform (GCP).",
      "Optimization: Reduced training compute costs by 60% through LoRA (Low-Rank Adaptation) fine-tuning on domain-specific datasets."
    ]
  },
  {
    company: "LemonOne SE",
    duration: "Feb 2020 – July 2020",
    location: "Berlin",
    role: "Senior Technical Specialist",
    logo: null, // Placeholder since asset is missing
    experience: [
      "MERN Full Stack Developer: Built and maintained full-stack applications using MongoDB, Express, React, and Node.js.",
      "Integration Specialist: Led system integrations ensuring seamless data flow between disparate platforms.",
      "SFDX Development: Specialized in Salesforce DX (SFDX) based development workflows and consultancy.",
      "CI/CD Dev Lead: Orchestrated CI/CD pipelines to automate deployment and ensure code quality."
    ]
  },
  {
    company: "adidas AG",
    duration: "Mar 2017 – Jan 2020",
    location: "Herzogenaurach",
    role: "External Technology Specialist",
    logo: require('../Assets/adidas.jpg'),
    experience: [
      "Lead Architect for Salesforce Service Cloud, delivering omnichannel support (Chat, WhatsApp, Social) for global customer service operations.",
      "Transformed global campaign management by building a custom Salesforce Lightning portal, replacing legacy spreadsheet workflows with automated tracking.",
      "Developed and maintained CI/CD pipelines (Jenkins/Gearset) to ensure high-velocity deployment cycles across complex sandbox environments."
    ]
  },
  {
    company: "Infosys",
    duration: "Jan 2015 – Feb 2017",
    location: "Mysuru",
    role: "Senior Systems Engineer",
    logo: require('../Assets/infosys.jpg'),
    experience: [
      "Specialized in enterprise-scale CRM implementations, customized Apex/Visualforce development, and seamless third-party systems integration."
    ]
  }
];

export const EducationData = [
  {
    university: "University of Missouri-Kansas City (UMKC)",
    duration: "Graduated March 2021",
    course: "Master of Science in Data Sciences",
    details: "Specialization in Machine Learning & Predictive Analytics",
    logo: require("../Assets/UMKC.jpeg"),
  }
];

export const SkillsData = [
  {
    type: "AI & Agentic Systems",
    skills: [
      "Agentforce",
      "Prompt Builder",
      "LLM Steering",
      "LoRA Fine-tuning",
      "RAG / Bedrock"
    ]
  },
  {
    type: "Automation & Cloud",
    skills: [
      "n8n / MCP",
      "AWS & GCP Hybrid",
      "SageMaker Studio",
      "Kubernetes / Docker",
      "GitLab CI/CD"
    ]
  },
  {
    type: "Salesforce Ecosystem",
    skills: [
      "Service Cloud",
      "LWC / Apex",
      "Omni-Channel",
      "MERN Stack"
    ]
  }
];

export const CoreCompetencies = [
    {
        title: "Agentic Workflows",
        subtitle: "Designing autonomous systems",
        icon: "fas fa-robot"
    },
    {
        title: "Probabilistic Logic",
        subtitle: "Non-linear flow automation",
        icon: "fas fa-project-diagram"
    },
    {
        title: "Hybrid Solutions",
        subtitle: "Connecting CRM to AI/Cloud",
        icon: "fas fa-cloud-upload-alt"
    }
];

export const LanguagesData = [
    {
        language: "English",
        level: "Professional",
        percentage: 100
    },
    {
        language: "German",
        level: "Learning",
        percentage: 25
    }
];