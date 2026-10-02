/**
 * CAMPUS SKILL GAP ANALYZER - Database & Pre-loaded Career Intelligence
 */

const SKILL_DATABASE = [
  // ECE / Hardware / Embedded Skills
  { id: 'embedded_c', name: 'Embedded C', category: 'Technical', dept: 'ECE' },
  { id: 'microcontrollers', name: 'Microcontrollers', category: 'Technical', dept: 'ECE' },
  { id: 'verilog', name: 'Verilog', category: 'Technical', dept: 'ECE' },
  { id: 'vlsi', name: 'VLSI Design', category: 'Technical', dept: 'ECE' },
  { id: 'digital_electronics', name: 'Digital Electronics', category: 'Technical', dept: 'ECE' },
  { id: 'rtos', name: 'RTOS (Real-Time OS)', category: 'Technical', dept: 'ECE' },
  { id: 'pcb_design', name: 'PCB Design', category: 'Technical', dept: 'ECE' },
  { id: 'matlab', name: 'MATLAB', category: 'Technical', dept: 'ECE' },
  { id: 'arduino', name: 'Arduino', category: 'Technical', dept: 'ECE' },
  { id: 'iot', name: 'IoT Architecture', category: 'Technical', dept: 'ECE' },
  { id: 'fpga', name: 'FPGA Prototyping', category: 'Technical', dept: 'ECE' },
  { id: 'rtl_design', name: 'RTL Design', category: 'Technical', dept: 'ECE' },

  // Software & Web Skills
  { id: 'python', name: 'Python', category: 'Technical', dept: 'CSE' },
  { id: 'c', name: 'C', category: 'Technical', dept: 'CSE' },
  { id: 'cpp', name: 'C++', category: 'Technical', dept: 'CSE' },
  { id: 'java', name: 'Java', category: 'Technical', dept: 'CSE' },
  { id: 'javascript', name: 'JavaScript', category: 'Technical', dept: 'CSE' },
  { id: 'html_css', name: 'HTML & CSS', category: 'Technical', dept: 'CSE' },
  { id: 'sql', name: 'SQL & Relational DB', category: 'Technical', dept: 'CSE' },
  { id: 'git', name: 'Git & GitHub', category: 'Technical', dept: 'CSE' },
  { id: 'react', name: 'React.js', category: 'Technical', dept: 'CSE' },
  { id: 'node', name: 'Node.js', category: 'Technical', dept: 'CSE' },
  { id: 'dsa', name: 'Data Structures & Algorithms', category: 'Technical', dept: 'CSE' },
  { id: 'cloud', name: 'Cloud Computing (AWS/GCP)', category: 'Technical', dept: 'CSE' },
  { id: 'cybersecurity', name: 'Cybersecurity Fundamentals', category: 'Technical', dept: 'CSE' },

  // AI & Data Skills
  { id: 'machine_learning', name: 'Machine Learning', category: 'Technical', dept: 'AI & ML' },
  { id: 'ai', name: 'Artificial Intelligence', category: 'Technical', dept: 'AI & ML' },
  { id: 'data_analysis', name: 'Data Analysis & Pandas', category: 'Technical', dept: 'AI & ML' },
  { id: 'deep_learning', name: 'Deep Learning & PyTorch', category: 'Technical', dept: 'AI & ML' },

  // Soft Skills
  { id: 'communication', name: 'Communication', category: 'Soft', dept: 'General' },
  { id: 'teamwork', name: 'Teamwork & Collaboration', category: 'Soft', dept: 'General' },
  { id: 'leadership', name: 'Leadership', category: 'Soft', dept: 'General' },
  { id: 'problem_solving', name: 'Problem Solving', category: 'Soft', dept: 'General' },
  { id: 'time_management', name: 'Time Management', category: 'Soft', dept: 'General' },
  { id: 'presentation', name: 'Presentation Skills', category: 'Soft', dept: 'General' },
  { id: 'critical_thinking', name: 'Critical Thinking', category: 'Soft', dept: 'General' }
];

const CAREER_DATABASE = [
  // ECE / Core Careers
  {
    id: 'embedded_engineer',
    title: 'Embedded Systems Engineer',
    category: 'ECE / CORE',
    description: 'Design and develop firmware and hardware interfaces for IoT, automotive, robotics, and consumer electronics.',
    salaryRange: '$75,000 - $125,000 / yr',
    demand: 'High Growth (22% YoY)',
    requiredSkills: [
      { id: 'embedded_c', level: 90 },
      { id: 'microcontrollers', level: 90 },
      { id: 'rtos', level: 80 },
      { id: 'digital_electronics', level: 85 },
      { id: 'pcb_design', level: 75 },
      { id: 'c', level: 85 },
      { id: 'git', level: 70 },
      { id: 'problem_solving', level: 85 }
    ],
    recommendedSkills: ['matlab', 'iot', 'python', 'communication'],
    typicalProjects: [
      'Smart Environmental Monitoring System',
      'STM32-based RTOS Task Scheduler',
      'CAN Bus Telemetry Node'
    ],
    learningAreas: [
      'Firmware Architecture & Drivers',
      'Real-Time Operating Systems (FreeRTOS)',
      'Hardware Debugging (JTAG/Oscilloscopes)',
      'Low-Power Microcontroller Optimization'
    ]
  },
  {
    id: 'vlsi_engineer',
    title: 'VLSI Design Engineer',
    category: 'ECE / CORE',
    description: 'Architect silicon chip layouts, integrated circuits, microprocessors, and hardware accelerators.',
    salaryRange: '$90,000 - $145,000 / yr',
    demand: 'Very High (Chipping Industry Boom)',
    requiredSkills: [
      { id: 'vlsi', level: 90 },
      { id: 'verilog', level: 90 },
      { id: 'digital_electronics', level: 90 },
      { id: 'rtl_design', level: 85 },
      { id: 'matlab', level: 75 },
      { id: 'c', level: 70 },
      { id: 'problem_solving', level: 90 }
    ],
    recommendedSkills: ['fpga', 'python', 'critical_thinking'],
    typicalProjects: [
      '32-bit RISC-V CPU Core in Verilog',
      'ASIC Synthesis & Static Timing Analysis Workflow',
      'CMOS Logic Gate Layout Optimization'
    ],
    learningAreas: [
      'HDL Simulation & Testbenches',
      'Logic Synthesis & Place-and-Route',
      'Physical Design & DRC/LVS Verification',
      'SystemVerilog for Design & Verification'
    ]
  },
  {
    id: 'rtl_engineer',
    title: 'RTL Design Engineer',
    category: 'ECE / CORE',
    description: 'Create Register-Transfer Level (RTL) specifications using Verilog/VHDL for complex digital systems.',
    salaryRange: '$85,000 - $140,000 / yr',
    demand: 'High',
    requiredSkills: [
      { id: 'verilog', level: 95 },
      { id: 'rtl_design', level: 90 },
      { id: 'digital_electronics', level: 90 },
      { id: 'fpga', level: 80 },
      { id: 'dsa', level: 70 },
      { id: 'critical_thinking', level: 85 }
    ],
    recommendedSkills: ['c', 'python', 'teamwork'],
    typicalProjects: [
      'Dual-Port SRAM Controller in Verilog',
      'Hardware AXI4 Interface Bus Implementation'
    ],
    learningAreas: ['Finite State Machine Synthesis', 'Pipelining & Timing Closure']
  },
  {
    id: 'iot_engineer',
    title: 'IoT Systems Engineer',
    category: 'ECE / CORE',
    description: 'Connect embedded sensors to edge and cloud networks for smart cities, wearables, and industrial automation.',
    salaryRange: '$70,000 - $115,000 / yr',
    demand: 'High',
    requiredSkills: [
      { id: 'iot', level: 90 },
      { id: 'microcontrollers', level: 85 },
      { id: 'embedded_c', level: 80 },
      { id: 'python', level: 75 },
      { id: 'cloud', level: 75 },
      { id: 'git', level: 70 }
    ],
    recommendedSkills: ['react', 'node', 'communication'],
    typicalProjects: [
      'AWS IoT Core Smart Agriculture Node',
      'LoRaWAN Long-Range Asset Tracker'
    ],
    learningAreas: ['MQTT/HTTP Protocols', 'Edge AI Acceleration', 'Wireless Sensor Networks']
  },

  // Software Careers
  {
    id: 'fullstack_developer',
    title: 'Full Stack Developer',
    category: 'SOFTWARE',
    description: 'Build end-to-end web applications, scalable APIs, microservices, and modern dynamic user interfaces.',
    salaryRange: '$80,000 - $130,000 / yr',
    demand: 'Very High',
    requiredSkills: [
      { id: 'javascript', level: 90 },
      { id: 'react', level: 85 },
      { id: 'node', level: 85 },
      { id: 'html_css', level: 90 },
      { id: 'sql', level: 80 },
      { id: 'git', level: 85 },
      { id: 'dsa', level: 80 },
      { id: 'problem_solving', level: 85 }
    ],
    recommendedSkills: ['python', 'cloud', 'teamwork'],
    typicalProjects: [
      'SaaS Analytics Platform with Auth & Payment',
      'Real-Time Collaborative Code Workspace'
    ],
    learningAreas: ['State Management (Redux/Zustand)', 'REST & GraphQL APIs', 'Database Indexing & ORMs']
  },
  {
    id: 'frontend_developer',
    title: 'Frontend Developer',
    category: 'SOFTWARE',
    description: 'Craft high-performance, responsive visual experiences, user interaction workflows, and accessibility standards.',
    salaryRange: '$75,000 - $120,000 / yr',
    demand: 'High',
    requiredSkills: [
      { id: 'html_css', level: 95 },
      { id: 'javascript', level: 90 },
      { id: 'react', level: 90 },
      { id: 'git', level: 80 },
      { id: 'presentation', level: 75 },
      { id: 'communication', level: 80 }
    ],
    recommendedSkills: ['node', 'dsa'],
    typicalProjects: [
      'Interactive Canvas-Based Dashboard',
      'Component Design System with Tailwind/CSS'
    ],
    learningAreas: ['Web Performance & Core Web Vitals', 'CSS Animations & Canvas/WebGL']
  },
  {
    id: 'backend_developer',
    title: 'Backend Developer',
    category: 'SOFTWARE',
    description: 'Design robust backend microservices, database architectures, security layers, and high-throughput server pipelines.',
    salaryRange: '$85,000 - $135,000 / yr',
    demand: 'High',
    requiredSkills: [
      { id: 'node', level: 90 },
      { id: 'python', level: 85 },
      { id: 'sql', level: 90 },
      { id: 'dsa', level: 85 },
      { id: 'git', level: 85 },
      { id: 'cloud', level: 75 },
      { id: 'problem_solving', level: 90 }
    ],
    recommendedSkills: ['java', 'cybersecurity', 'time_management'],
    typicalProjects: [
      'High-Throughput Rate-Limited API Gateway',
      'Distributed Job Queue System with Redis'
    ],
    learningAreas: ['Database Sharding & Replication', 'Microservice Architecture', 'OAuth2 / JWT Security']
  },
  {
    id: 'software_developer',
    title: 'Software Developer',
    category: 'SOFTWARE',
    description: 'Build core software systems, enterprise applications, algorithms, and cross-platform desktop/server software.',
    salaryRange: '$80,000 - $125,000 / yr',
    demand: 'High',
    requiredSkills: [
      { id: 'dsa', level: 90 },
      { id: 'cpp', level: 85 },
      { id: 'java', level: 85 },
      { id: 'git', level: 85 },
      { id: 'sql', level: 75 },
      { id: 'problem_solving', level: 90 }
    ],
    recommendedSkills: ['python', 'communication'],
    typicalProjects: [
      'Cross-Platform File Sync Utility',
      'Custom Memory Pool Allocator in C++'
    ],
    learningAreas: ['Object-Oriented Design Patterns', 'Memory Management & Multi-threading']
  },
  {
    id: 'python_developer',
    title: 'Python Developer',
    category: 'SOFTWARE',
    description: 'Develop backend web apps, automation suites, enterprise APIs, and data processing utilities using Python.',
    salaryRange: '$75,000 - $120,000 / yr',
    demand: 'High',
    requiredSkills: [
      { id: 'python', level: 95 },
      { id: 'sql', level: 80 },
      { id: 'git', level: 85 },
      { id: 'dsa', level: 80 },
      { id: 'cloud', level: 75 },
      { id: 'problem_solving', level: 85 }
    ],
    recommendedSkills: ['javascript', 'data_analysis', 'communication'],
    typicalProjects: [
      'Automated Data Scraping & Pipeline Engine',
      'FastAPI Microservice for Document Parsing'
    ],
    learningAreas: ['Asyncio & Concurrency', 'Django / FastAPI Frameworks']
  },

  // AI / Data Careers
  {
    id: 'ai_engineer',
    title: 'AI Engineer',
    category: 'AI / DATA',
    description: 'Deploy Large Language Models, Generative AI applications, neural networks, and scalable AI infrastructure.',
    salaryRange: '$95,000 - $160,000 / yr',
    demand: 'Explosive Growth (45% YoY)',
    requiredSkills: [
      { id: 'python', level: 95 },
      { id: 'ai', level: 90 },
      { id: 'machine_learning', level: 90 },
      { id: 'deep_learning', level: 85 },
      { id: 'dsa', level: 80 },
      { id: 'git', level: 85 },
      { id: 'critical_thinking', level: 90 }
    ],
    recommendedSkills: ['cloud', 'sql', 'node'],
    typicalProjects: [
      'RAG-based Enterprise Knowledge Search Engine',
      'Fine-Tuned LLM Agent for Code Debugging'
    ],
    learningAreas: ['Vector Databases (Chroma/Pinecone)', 'Prompt Engineering & Fine-tuning', 'MLOps & Model Serving']
  },
  {
    id: 'ml_engineer',
    title: 'Machine Learning Engineer',
    category: 'AI / DATA',
    description: 'Train prediction models, computer vision systems, feature stores, and automated training pipelines.',
    salaryRange: '$90,000 - $150,000 / yr',
    demand: 'Very High',
    requiredSkills: [
      { id: 'python', level: 95 },
      { id: 'machine_learning', level: 90 },
      { id: 'deep_learning', level: 85 },
      { id: 'data_analysis', level: 90 },
      { id: 'sql', level: 80 },
      { id: 'dsa', level: 85 },
      { id: 'problem_solving', level: 90 }
    ],
    recommendedSkills: ['c', 'cloud', 'git'],
    typicalProjects: [
      'Predictive Maintenance Model for Industrial Gear',
      'Real-Time Computer Vision Object Classifier'
    ],
    learningAreas: ['PyTorch / TensorFlow Pipelines', 'Feature Engineering & Model Evaluation', 'CUDA Optimization']
  },
  {
    id: 'data_analyst',
    title: 'Data Analyst',
    category: 'AI / DATA',
    description: 'Transform complex business datasets into actionable reports, BI dashboards, and statistical insights.',
    salaryRange: '$65,000 - $100,000 / yr',
    demand: 'High',
    requiredSkills: [
      { id: 'sql', level: 90 },
      { id: 'data_analysis', level: 90 },
      { id: 'python', level: 80 },
      { id: 'presentation', level: 85 },
      { id: 'communication', level: 85 },
      { id: 'critical_thinking', level: 85 }
    ],
    recommendedSkills: ['git', 'time_management'],
    typicalProjects: [
      'Customer Churn Cohort Analytics Dashboard',
      'E-Commerce Sales Trend Forecasting Model'
    ],
    learningAreas: ['Advanced SQL Window Functions', 'Tableau / PowerBI Dashboards', 'Statistical Hypothesis Testing']
  },
  {
    id: 'data_scientist',
    title: 'Data Scientist',
    category: 'AI / DATA',
    description: 'Extract statistical insights, build probabilistic algorithms, experiment with predictive models, and drive strategy.',
    salaryRange: '$85,000 - $140,000 / yr',
    demand: 'Very High',
    requiredSkills: [
      { id: 'python', level: 95 },
      { id: 'data_analysis', level: 90 },
      { id: 'machine_learning', level: 85 },
      { id: 'sql', level: 90 },
      { id: 'critical_thinking', level: 90 },
      { id: 'presentation', level: 80 }
    ],
    recommendedSkills: ['git', 'cloud', 'leadership'],
    typicalProjects: [
      'Statistical A/B Testing Experimentation Framework',
      'Algorithmic Customer Lifetime Value Classifier'
    ],
    learningAreas: ['Bayesian Statistics', 'A/B Testing Methodology', 'Unsupervised Clustering']
  },

  // Other Careers
  {
    id: 'cloud_engineer',
    title: 'Cloud Engineer',
    category: 'OTHER',
    description: 'Provision cloud infrastructure (AWS/Azure/GCP), CI/CD pipelines, Docker containers, and Kubernetes clusters.',
    salaryRange: '$85,000 - $135,000 / yr',
    demand: 'High',
    requiredSkills: [
      { id: 'cloud', level: 90 },
      { id: 'git', level: 90 },
      { id: 'python', level: 80 },
      { id: 'sql', level: 75 },
      { id: 'cybersecurity', level: 80 },
      { id: 'problem_solving', level: 85 }
    ],
    recommendedSkills: ['node', 'communication'],
    typicalProjects: [
      'Terraform Infrastructure-as-Code AWS Deployment',
      'Kubernetes Microservice Cluster with Auto-scaling'
    ],
    learningAreas: ['Docker & Container Orchestration', 'CI/CD Pipelines (GitHub Actions)', 'Cloud Network Security']
  },
  {
    id: 'cybersecurity_engineer',
    title: 'Cybersecurity Engineer',
    category: 'OTHER',
    description: 'Protect network perimeters, perform penetration testing, audit threat vectors, and secure corporate infrastructure.',
    salaryRange: '$85,000 - $140,000 / yr',
    demand: 'Very High',
    requiredSkills: [
      { id: 'cybersecurity', level: 95 },
      { id: 'python', level: 80 },
      { id: 'c', level: 75 },
      { id: 'cloud', level: 80 },
      { id: 'git', level: 75 },
      { id: 'critical_thinking', level: 90 }
    ],
    recommendedSkills: ['dsa', 'communication'],
    typicalProjects: [
      'Automated Vulnerability Scanner Script',
      'Network Intrusion Detection System with Snort Rules'
    ],
    learningAreas: ['Ethical Hacking & Metasploit', 'Cryptography & Public Key Infrastructure', 'SIEM & Threat Hunting']
  },
  {
    id: 'product_designer',
    title: 'Product Designer (UI/UX)',
    category: 'OTHER',
    description: 'Craft user experience journeys, interactive prototypes, design systems, and visual micro-interactions.',
    salaryRange: '$70,000 - $115,000 / yr',
    demand: 'High',
    requiredSkills: [
      { id: 'html_css', level: 85 },
      { id: 'presentation', level: 90 },
      { id: 'communication', level: 90 },
      { id: 'critical_thinking', level: 85 },
      { id: 'teamwork', level: 85 }
    ],
    recommendedSkills: ['javascript', 'time_management'],
    typicalProjects: [
      'Dark-Themed SaaS Analytics Design System',
      'Mobile App Accessibility Redesign & Prototype'
    ],
    learningAreas: ['Figma Prototyping & Variables', 'User Research & Usability Testing', 'Design System Architecture']
  },
  {
    id: 'tech_pm',
    title: 'Technical Project Manager',
    category: 'OTHER',
    description: 'Lead engineering teams, sprint planning, roadmaps, cross-department alignment, and technical delivery.',
    salaryRange: '$85,000 - $135,000 / yr',
    demand: 'High',
    requiredSkills: [
      { id: 'leadership', level: 90 },
      { id: 'communication', level: 95 },
      { id: 'teamwork', level: 90 },
      { id: 'time_management', level: 90 },
      { id: 'problem_solving', level: 85 },
      { id: 'git', level: 70 }
    ],
    recommendedSkills: ['python', 'sql', 'presentation'],
    typicalProjects: [
      'Agile Software Release Process Playbook',
      'Cross-Functional Engineering Risk Matrix'
    ],
    learningAreas: ['Scrum & Kanban Frameworks', 'Agile Velocity & Resource Allocation', 'Stakeholder Communication']
  }
];

const PROJECT_RECOMMENDATIONS = [
  // ECE / Embedded Projects
  {
    id: 'proj_smart_env',
    title: 'Smart Environmental Monitoring System',
    targetCareerId: 'embedded_engineer',
    difficulty: 'Intermediate',
    estimatedDuration: '4 Weeks (25 Hours)',
    requiredSkills: ['embedded_c', 'microcontrollers', 'pcb_design'],
    skillsGained: ['Embedded C', 'ADC & SPI Protocols', 'Sensor Calibration', 'Power Management'],
    description: 'Build a low-power wireless sensor system using STM32/ESP32 that measures temperature, humidity, and air quality index, logging data via MQTT.',
    architecture: 'Sensor Nodes (DHT22, MQ135) → STM32 Microcontroller → SPI OLED Display → Wi-Fi Module → MQTT Broker Dashboard.',
    steps: [
      'Design circuit schematic in EasyEDA/KiCad',
      'Write bare-metal drivers in Embedded C for I2C and SPI',
      'Implement FreeRTOS tasks for sensor sampling and telemetry',
      'Test power consumption in deep-sleep mode'
    ]
  },
  {
    id: 'proj_rtos_scheduler',
    title: 'FreeRTOS Custom Task Scheduler Node',
    targetCareerId: 'embedded_engineer',
    difficulty: 'Advanced',
    estimatedDuration: '5 Weeks (35 Hours)',
    requiredSkills: ['rtos', 'embedded_c', 'c'],
    skillsGained: ['RTOS Mutex & Semaphores', 'Context Switching', 'Priority Inversion Prevention'],
    description: 'Implement a multi-tasking firmware project on ARM Cortex-M microcontrollers demonstrating preemptive priority scheduling, queues, and interrupt handlers.',
    architecture: 'ARM Cortex-M4 Board → FreeRTOS Kernel → DMA UART Driver → Memory Buffer Queue.',
    steps: [
      'Configure System Timer (SysTick) for microsecond precision',
      'Create 4 concurrent tasks with inter-task messaging queues',
      'Handle ISR priority masking and low-latency buffer flushing'
    ]
  },
  {
    id: 'proj_riscv_cpu',
    title: '32-bit RISC-V CPU Core in Verilog',
    targetCareerId: 'vlsi_engineer',
    difficulty: 'Advanced',
    estimatedDuration: '6 Weeks (45 Hours)',
    requiredSkills: ['verilog', 'vlsi', 'rtl_design'],
    skillsGained: ['Verilog HDL', 'Pipelined Architecture', 'Hazard Detection', 'ALU Design'],
    description: 'Design a single-cycle and 5-stage pipelined RV32I RISC-V processor core, verified using ModelSim testbenches.',
    architecture: 'Instruction Fetch → Decode → Execute (ALU) → Memory Access → Writeback.',
    steps: [
      'Write Verilog modules for 32-bit ALU and Register File',
      'Implement hazard detection unit for branch prediction',
      'Run compliance test suite and generate VCD waveform trace'
    ]
  },

  // Software & Web Projects
  {
    id: 'proj_saas_analytics',
    title: 'Full-Stack Developer Analytics Platform',
    targetCareerId: 'fullstack_developer',
    difficulty: 'Intermediate',
    estimatedDuration: '4 Weeks (30 Hours)',
    requiredSkills: ['javascript', 'react', 'node', 'sql'],
    skillsGained: ['React Hooks', 'Express REST API', 'PostgreSQL Queries', 'JWT Auth'],
    description: 'Create a dark-themed analytics dashboard featuring authentication, database persistence, interactive charts, and PDF report export.',
    architecture: 'React Frontend → Node.js REST API → PostgreSQL Database + Redis Cache.',
    steps: [
      'Setup Node.js Express server with JWT authentication',
      'Build responsive React dashboard with Chart.js visualization',
      'Optimize database queries with indexes and joins'
    ]
  },
  {
    id: 'proj_rate_limiter',
    title: 'Distributed API Gateway & Rate Limiter',
    targetCareerId: 'backend_developer',
    difficulty: 'Advanced',
    estimatedDuration: '3 Weeks (20 Hours)',
    requiredSkills: ['node', 'sql', 'dsa', 'git'],
    skillsGained: ['Token Bucket Algorithm', 'Redis Caching', 'Middleware Design'],
    description: 'Engineered a high-performance HTTP reverse proxy gateway with sliding window rate limiting to mitigate DDoS vectors.',
    architecture: 'Incoming Traffic → Node Proxy → Redis Cache (Sliding Window) → Upstream Services.',
    steps: [
      'Implement sliding window algorithm in Node/Redis',
      'Benchmark throughput using autocannon with 10,000 req/sec'
    ]
  },

  // AI & Data Projects
  {
    id: 'proj_rag_ai',
    title: 'Enterprise RAG Knowledge Search Bot',
    targetCareerId: 'ai_engineer',
    difficulty: 'Intermediate',
    estimatedDuration: '3 Weeks (25 Hours)',
    requiredSkills: ['python', 'ai', 'machine_learning'],
    skillsGained: ['Vector Embeddings', 'LangChain/LlamaIndex', 'Prompt Optimization'],
    description: 'Build an AI assistant that ingests PDF textbooks/documentation, generates vector embeddings, and answers complex queries accurately.',
    architecture: 'PDF Ingestion → Text Chunking → OpenAI/Local Embeddings → ChromaDB → LLM Synthesizer.',
    steps: [
      'Chunk document text into 500-token overlapping chunks',
      'Store vector representations in local vector database',
      'Construct prompt context for grounded factual responses'
    ]
  },
  {
    id: 'proj_predictive_maint',
    title: 'Industrial Sensor Predictive Failure Model',
    targetCareerId: 'ml_engineer',
    difficulty: 'Intermediate',
    estimatedDuration: '4 Weeks (28 Hours)',
    requiredSkills: ['python', 'machine_learning', 'data_analysis'],
    skillsGained: ['RandomForest & XGBoost', 'Feature Engineering', 'ROC-AUC Metrics'],
    description: 'Train a Machine Learning pipeline on vibration and temperature time-series sensor data to predict machine breakdowns 48 hours in advance.',
    architecture: 'Sensor CSV Data → Pandas Cleaning → XGBoost Classifier → FastApi Prediction Endpoint.',
    steps: [
      'Clean noisy sensor telemetry data and compute rolling statistical features',
      'Train XGBoost classifier achieving >92% recall on failure flags'
    ]
  }
];

const ROADMAP_TEMPLATES = {
  embedded_engineer: [
    {
      phase: 1,
      phaseTitle: 'PHASE 1 — FOUNDATION',
      weeks: 'Weeks 1–3',
      skillId: 'embedded_c',
      skillName: 'Embedded C Fundamentals',
      topics: ['Pointers & Memory Allocation', 'Bitwise Manipulation & Registers', 'Volatile Keyword & Struct Alignment'],
      difficulty: 'Beginner → Intermediate',
      estHours: 18,
      recommendedResource: 'Book: Making Embedded Systems / Bare-metal C Guide',
      project: 'Build a C Memory Allocator Simulator'
    },
    {
      phase: 2,
      phaseTitle: 'PHASE 2 — SKILL BUILDING',
      weeks: 'Weeks 4–7',
      skillId: 'microcontrollers',
      skillName: 'Microcontroller Peripheral Drivers',
      topics: ['GPIO, USART, SPI, I2C Protocols', 'Hardware Timers & Interrupt Service Routines (ISR)', 'ADC/DAC Sampling & DMA'],
      difficulty: 'Intermediate',
      estHours: 24,
      recommendedResource: 'Interactive: STM32 CubeIDE / ESP-IDF Labs',
      project: 'SPI OLED Driver & Sensor Data Logger'
    },
    {
      phase: 3,
      phaseTitle: 'PHASE 3 — PRACTICAL APPLICATION',
      weeks: 'Weeks 8–10',
      skillId: 'rtos',
      skillName: 'Real-Time Operating Systems (RTOS)',
      topics: ['Preemptive Task Scheduling', 'Semaphores & Mutex Locks', 'Event Groups & Message Queues'],
      difficulty: 'Intermediate → Advanced',
      estHours: 22,
      recommendedResource: 'Documentation: Mastering the FreeRTOS Kernel',
      project: 'FreeRTOS Multi-Tasking Weather Station Node'
    },
    {
      phase: 4,
      phaseTitle: 'PHASE 4 — PROJECT + INTERVIEW',
      weeks: 'Weeks 11–12',
      skillId: 'pcb_design',
      skillName: 'Capstone Hardware System & Capstone Project',
      topics: ['KiCad Schematic & Board Layout', 'Hardware Debugging with Oscilloscope', 'Technical Interview Prep & Code Review'],
      difficulty: 'Advanced',
      estHours: 20,
      recommendedResource: 'Portfolio Build: Github + Technical Article',
      project: 'Smart Environmental Monitoring System'
    }
  ],
  fullstack_developer: [
    {
      phase: 1,
      phaseTitle: 'PHASE 1 — FOUNDATION',
      weeks: 'Weeks 1–3',
      skillId: 'javascript',
      skillName: 'Modern ES6+ JavaScript & Async Patterns',
      topics: ['Promises & Async/Await', 'DOM Manipulation & Event Loop', 'Closures & Functional Logic'],
      difficulty: 'Beginner → Intermediate',
      estHours: 16,
      recommendedResource: 'Course: JavaScript Info / MDN Web Docs',
      project: 'Interactive Task Management Dashboard'
    },
    {
      phase: 2,
      phaseTitle: 'PHASE 2 — SKILL BUILDING',
      weeks: 'Weeks 4–7',
      skillId: 'react',
      skillName: 'Frontend Architecture with React',
      topics: ['Custom Hooks & Component Lifecycle', 'State Management & Context API', 'API Integration & UI Libraries'],
      difficulty: 'Intermediate',
      estHours: 25,
      recommendedResource: 'React Official Docs & Deep Dive',
      project: 'SaaS Analytics Dynamic UI'
    },
    {
      phase: 3,
      phaseTitle: 'PHASE 3 — PRACTICAL APPLICATION',
      weeks: 'Weeks 8–10',
      skillId: 'node',
      skillName: 'Backend & Relational Database Design',
      topics: ['Node.js Express Microservices', 'SQL Joins, Indexing & Transactions', 'RESTful API Architecture & Authentication'],
      difficulty: 'Intermediate → Advanced',
      estHours: 24,
      recommendedResource: 'Book: Designing Data-Intensive Applications',
      project: 'Secure Node.js & Postgres API Server'
    },
    {
      phase: 4,
      phaseTitle: 'PHASE 4 — PROJECT + INTERVIEW',
      weeks: 'Weeks 11–12',
      skillId: 'git',
      skillName: 'Production Deployment & Full-Stack Capstone',
      topics: ['Docker Containerization', 'CI/CD Pipeline with GitHub Actions', 'System Design Interview Drills'],
      difficulty: 'Advanced',
      estHours: 20,
      recommendedResource: 'System Design Primer',
      project: 'Full-Stack Developer Analytics Platform'
    }
  ],
  ai_engineer: [
    {
      phase: 1,
      phaseTitle: 'PHASE 1 — FOUNDATION',
      weeks: 'Weeks 1–3',
      skillId: 'python',
      skillName: 'Python for Data & Vector Math',
      topics: ['NumPy & Vectorized Computations', 'Pandas Data Wrangling', 'Object-Oriented AI Pipelines'],
      difficulty: 'Beginner → Intermediate',
      estHours: 18,
      recommendedResource: 'Python Data Science Handbook',
      project: 'Data Cleaning & Vectorization Tool'
    },
    {
      phase: 2,
      phaseTitle: 'PHASE 2 — SKILL BUILDING',
      weeks: 'Weeks 4–7',
      skillId: 'machine_learning',
      skillName: 'Machine Learning Models & Evaluation',
      topics: ['Supervised Learning (Regression/Trees)', 'Model Validation & Cross-Validation', 'Scikit-Learn Workflows'],
      difficulty: 'Intermediate',
      estHours: 26,
      recommendedResource: 'Andrew Ng Machine Learning Specialization',
      project: 'Predictive Churn Classifier'
    },
    {
      phase: 3,
      phaseTitle: 'PHASE 3 — PRACTICAL APPLICATION',
      weeks: 'Weeks 8–10',
      skillId: 'ai',
      skillName: 'LLMs, RAG & Vector Databases',
      topics: ['ChromaDB Vector Indexing', 'LangChain Framework & Agents', 'Prompt Architecture & Guardrails'],
      difficulty: 'Intermediate → Advanced',
      estHours: 24,
      recommendedResource: 'DeepLearning.AI Building RAG Apps',
      project: 'RAG Knowledge Search Engine'
    },
    {
      phase: 4,
      phaseTitle: 'PHASE 4 — PROJECT + INTERVIEW',
      weeks: 'Weeks 11–12',
      skillId: 'deep_learning',
      skillName: 'Fine-Tuning & MLOps Capstone',
      topics: ['PyTorch Model Fine-tuning', 'FastAPI AI Endpoint Deployment', 'AI Portfolio Presentation'],
      difficulty: 'Advanced',
      estHours: 20,
      recommendedResource: 'HuggingFace Course',
      project: 'Enterprise RAG Knowledge Search Bot'
    }
  ]
};

const DEFAULT_ROADMAP_GENERIC = [
  {
    phase: 1,
    phaseTitle: 'PHASE 1 — FOUNDATION',
    weeks: 'Weeks 1–3',
    skillId: 'c',
    skillName: 'Core Programming Logic',
    topics: ['Variables, Loops, Functions', 'Data Types & Control Flow', 'Basic Problem Solving'],
    difficulty: 'Beginner',
    estHours: 15,
    recommendedResource: 'Standard Documentation & Practice Drills',
    project: 'Console Utility Project'
  },
  {
    phase: 2,
    phaseTitle: 'PHASE 2 — SKILL BUILDING',
    weeks: 'Weeks 4–7',
    skillId: 'git',
    skillName: 'Version Control & System Architecture',
    topics: ['Git Branching & Pull Requests', 'Modular Code Structure', 'Debugging Tools'],
    difficulty: 'Intermediate',
    estHours: 20,
    recommendedResource: 'Git Pro Book & Interactive Drills',
    project: 'Collaborative Open Source Contribution'
  },
  {
    phase: 3,
    phaseTitle: 'PHASE 3 — PRACTICAL APPLICATION',
    weeks: 'Weeks 8–10',
    skillId: 'problem_solving',
    skillName: 'Domain Specific Engineering',
    topics: ['Core Domain Algorithms', 'Optimization Techniques', 'Integration Testing'],
    difficulty: 'Intermediate → Advanced',
    estHours: 25,
    recommendedResource: 'Domain Case Studies & Code katas',
    project: 'Domain Benchmark Suite'
  },
  {
    phase: 4,
    phaseTitle: 'PHASE 4 — PROJECT + INTERVIEW',
    weeks: 'Weeks 11–12',
    skillId: 'communication',
    skillName: 'Capstone Project & Interview Readiness',
    topics: ['End-to-End System Build', 'Documentation & Video Demo', 'Mock Technical Interviews'],
    difficulty: 'Advanced',
    estHours: 20,
    recommendedResource: 'Interview Preparation Handbook',
    project: 'Comprehensive Target Role Capstone'
  }
];

const COLLEGE_INSIGHTS_DATA = {
  totalStudents: 1420,
  analyzedStudents: 1180,
  avgReadinessScore: 62.4,
  mostCommonGaps: [
    { skill: 'Communication & Presentation', gapPercentage: 42, count: 596 },
    { skill: 'SQL & Database Design', gapPercentage: 38, count: 539 },
    { skill: 'Git & Version Control', gapPercentage: 35, count: 497 },
    { skill: 'Python / Scripting', gapPercentage: 31, count: 440 },
    { skill: 'Embedded C / Real-Time Systems', gapPercentage: 29, count: 412 },
    { skill: 'Problem Solving & DSA', gapPercentage: 27, count: 383 }
  ],
  mostSelectedCareers: [
    { title: 'Software Developer', percentage: 28, count: 330 },
    { title: 'Embedded Systems Engineer', percentage: 22, count: 260 },
    { title: 'Data Analyst / Scientist', percentage: 19, count: 224 },
    { title: 'AI & ML Engineer', percentage: 16, count: 188 },
    { title: 'VLSI & Hardware Engineer', percentage: 15, count: 178 }
  ],
  departmentBreakdown: [
    { dept: 'ECE', students: 420, avgReadiness: 64, topGap: 'Embedded C / RTOS' },
    { dept: 'CSE', students: 480, avgReadiness: 68, topGap: 'System Architecture' },
    { dept: 'EEE', students: 190, avgReadiness: 58, topGap: 'Microcontrollers' },
    { dept: 'AI & ML', students: 160, avgReadiness: 66, topGap: 'Model Deployment' },
    { dept: 'Mechanical', students: 130, avgReadiness: 52, topGap: 'Python / Automation' }
  ]
};

const SAMPLE_STUDENT_PROFILE = {
  id: 'usr_default',
  fullName: 'Arjun Sharma',
  email: 'arjun.sharma@campus.edu',
  collegeName: 'National Institute of Technology',
  department: 'ECE',
  yearOfStudy: '3rd Year',
  semester: '6th Semester',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  targetCareerId: 'embedded_engineer',
  skills: [
    { id: 'python', name: 'Python', level: 80, category: 'Technical' },
    { id: 'c', name: 'C', level: 75, category: 'Technical' },
    { id: 'embedded_c', name: 'Embedded C', level: 40, category: 'Technical' },
    { id: 'verilog', name: 'Verilog', level: 20, category: 'Technical' },
    { id: 'digital_electronics', name: 'Digital Electronics', level: 60, category: 'Technical' },
    { id: 'microcontrollers', name: 'Microcontrollers', level: 42, category: 'Technical' },
    { id: 'pcb_design', name: 'PCB Design', level: 35, category: 'Technical' },
    { id: 'git', name: 'Git & GitHub', level: 70, category: 'Technical' },
    { id: 'communication', name: 'Communication', level: 65, category: 'Soft' },
    { id: 'problem_solving', name: 'Problem Solving', level: 75, category: 'Soft' }
  ],
  progress: {
    skillsImproved: 6,
    learningHours: 28,
    completedTasks: 8,
    completedProjects: 2,
    readinessHistory: [
      { date: 'Week 1', score: 48 },
      { date: 'Week 2', score: 52 },
      { date: 'Week 3', score: 57 },
      { date: 'Week 4', score: 64 }
    ]
  },
  completedRoadmapTaskIds: ['task_1_1', 'task_1_2'],
  achievements: [
    { id: 'ach_1', title: 'First Analysis', icon: '🎯', desc: 'Completed initial skill gap assessment' },
    { id: 'ach_2', title: 'Embedded Pioneer', icon: '⚡', desc: 'Added 5 core hardware skills' },
    { id: 'ach_3', title: 'Roadmap Initiated', icon: '🚀', desc: 'Completed Phase 1 tasks' }
  ]
};
