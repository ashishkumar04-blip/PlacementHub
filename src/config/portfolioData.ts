import { Project, SkillCategory, ExperienceItem, EducationItem, CertificateItem, SystemStatus } from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Ashish Kumar Pal',
  role: 'Computer Science Engineer & Software Developer',
  tagline: 'Bridging embedded hardware systems, C/C++ microcontrollers, and modern full-stack web engineering.',
  location: 'Phagwara, Punjab / India',
  availability: 'Open to Software Engineering & Systems Roles',
  email: 'kumarpalashish04@gmail.com',
  phone: '+91-7657827942',
  github: 'https://github.com/ashishkumar04',
  linkedin: 'https://linkedin.com/in/ashish-kumar-pal-a1b689381/',
  bio: `Computer Science and Engineering undergraduate at Lovely Professional University. Passionate about building robust software systems, exploring embedded electronics, developing full-stack web applications with Python & Node.js, and mastering Data Structures and Algorithms.`,
  principles: [
    {
      title: 'First-Principles Engineering',
      desc: 'Understanding both the hardware signals (voltage, sensors) and software abstractions (C++, Python, JS).',
    },
    {
      title: 'Continuous Mastery & DSA',
      desc: 'Relentlessly refining core computer science foundations, algorithm design, and structured problem-solving.',
    },
    {
      title: 'Clean, Maintainable Code',
      desc: 'Writing structured, documented, and modular code across embedded microcontrollers and modern web frameworks.',
    },
  ],
};

export const SYSTEM_META: SystemStatus = {
  status: 'ONLINE',
  location: 'IST (UTC+5:30)',
  timeZone: 'Asia/Kolkata',
  currentFocus: 'Python, DSA, Embedded Systems & Full-Stack Development',
  nodeVersion: 'v24.19.0',
  latencyMs: 12,
};

export const EDUCATION_LIST: EducationItem[] = [
  {
    institution: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    degree: 'Bachelor of Technology — Computer Science and Engineering',
    grade: 'CGPA: 7.2',
    period: 'Aug 2025 — Present',
  },
  {
    institution: 'Delhi Public School',
    location: 'India',
    degree: 'Higher Secondary Education (Class XII)',
    grade: 'Percentage: 87.1%',
    period: 'May 2022 — Mar 2024',
  },
  {
    institution: 'Delhi Public School',
    location: 'India',
    degree: 'Secondary Education (Class X)',
    grade: 'Percentage: 85.0%',
    period: 'Jun 2021 — Mar 2022',
  },
];

export const CERTIFICATES_LIST: CertificateItem[] = [
  {
    title: 'Introduction to Artificial Intelligence',
    issuer: 'Infosys Springboard',
    date: 'March 2026',
  },
  {
    title: 'Computer Programming (150 Hours Intensive Track)',
    issuer: 'iamNeo, an NIIT Venture',
    date: 'Jan — May 2026',
  },
  {
    title: 'Python Skill Up Certification',
    issuer: 'GeeksforGeeks',
    date: '2026',
  },
];

export const ACHIEVEMENTS_LIST = [
  'Successfully developed and demonstrated an academic piezoelectric energy-harvesting project converting mechanical pressure to stored electrical energy.',
  'Actively practicing programming and deepening problem-solving competencies in Python, Data Structures & Algorithms, web development, and application architecture.',
  'Completed 150+ hours of rigorous computer programming certification with iamNeo (NIIT Venture).',
];

export const PROJECTS: Project[] = [
  {
    id: 'footstep-generator',
    title: 'Footstep Electricity Generator',
    tagline: 'Piezoelectric Mechanical-to-Electrical Energy Harvesting Prototype',
    category: 'hardware',
    featured: true,
    year: '2025',
    role: 'Hardware & Embedded Developer',
    problem:
      'Harvesting kinetic and mechanical footstep energy from pedestrian transit zones to generate sustainable micro-power for low-energy sensors without external power lines.',
    architecture:
      'Integrated an array of piezoelectric ceramic transducers with a full-wave bridge rectifier, smoothing capacitors, and an Arduino microcontroller to detect, convert, stabilize, and monitor harvested voltage in real time.',
    architectureNodes: [
      { name: 'Piezoelectric Transducers', role: 'Mechanical Sensor', tech: 'PZT Ceramic Elements' },
      { name: 'Full-Wave Bridge Rectifier', role: 'AC to DC Conversion', tech: 'Diode Rectifier Bridge' },
      { name: 'Smoothing & Storage Stage', role: 'Voltage Stabilization', tech: 'Capacitor & Resistor Network' },
      { name: 'Arduino ADC Sampling', role: 'Microcontroller Telemetry', tech: 'Arduino UNO / C++' },
      { name: 'Output Load / LED Indicator', role: 'Power Delivery', tech: 'Regulated DC Output' },
    ],
    challenge:
      'Piezoelectric elements generate high-voltage AC pulses with low current upon physical impact, which can damage standard microcontrollers without proper voltage clamping and rectification.',
    solution:
      'Engineered a conditioning circuit utilizing a full-wave diode bridge and parallel electrolytic capacitors to smooth out transient spikes into stable DC voltage suitable for ADC monitoring and storage.',
    results: [
      'Successfully demonstrated electrical energy generation directly from human movement impact',
      'Stabilized intermittent kinetic voltage into clean DC power using capacitor-rectifier circuitry',
      'Integrated Arduino analog input telemetry to measure generated voltage curves in real time',
    ],
    metrics: [
      { label: 'Energy Source', value: 'Kinetic / Impact' },
      { label: 'Hardware', value: 'Arduino & PZT' },
      { label: 'Circuit', value: 'Rectified DC' },
    ],
    stack: ['Arduino', 'Piezoelectric Sensors', 'C/C++', 'Circuit Design', 'Analog Electronics'],
    githubUrl: 'https://github.com/ashishkumar04',
    codeSnippet: {
      filename: 'piezo_voltage_monitor.ino',
      language: 'cpp',
      description: 'Arduino C++ analog sampling and voltage threshold telemetry loop',
      code: `const int PIEZO_PIN = A0;
const int STATUS_LED = 13;
const float VOLTAGE_REF = 5.0;

void setup() {
  pinMode(STATUS_LED, OUTPUT);
  Serial.begin(9600);
  Serial.println("Footstep Energy Harvester Initialized.");
}

void loop() {
  int sensorValue = analogRead(PIEZO_PIN);
  float voltage = (sensorValue / 1023.0) * VOLTAGE_REF;

  if (voltage > 0.3) {
    digitalWrite(STATUS_LED, HIGH);
    Serial.print("[KINETIC PULSE] Harvested Voltage: ");
    Serial.print(voltage);
    Serial.println(" V");
    delay(50);
  } else {
    digitalWrite(STATUS_LED, LOW);
  }
}`,
    },
  },
  {
    id: 'pulse-engine',
    title: 'Pulse DSP Web Synthesizer',
    tagline: 'Interactive JavaScript WebAudio Oscillator & 60 FPS Waveform Visualizer',
    category: 'web',
    featured: true,
    year: '2026',
    role: 'Frontend & Audio Developer',
    problem:
      'Demonstrating browser-native digital signal processing and sound synthesis with zero external dependencies and real-time canvas frequency visualization.',
    architecture:
      'Utilizes the WebAudio API with OscillatorNode, GainNode, and AnalyserNode connected to an HTML5 Canvas rendering mathematical waveforms (Sine, Square, Sawtooth, Triangle) at 60 FPS.',
    architectureNodes: [
      { name: 'Musical Keyboard / Sliders', role: 'Input Events', tech: 'JavaScript / Event Loop' },
      { name: 'WebAudio OscillatorNode', role: 'DSP Generator', tech: 'WebAudio API' },
      { name: 'Master Gain & Filter', role: 'Signal Conditioning', tech: 'GainNode' },
      { name: 'FFT Frequency Analyser', role: 'Spectral Analysis', tech: 'AnalyserNode (512-bin)' },
      { name: 'Canvas Visualizer HUD', role: 'Waveform Rendering', tech: 'HTML5 Canvas 2D' },
    ],
    challenge:
      'Mapping musical note frequencies accurately across a chromatic octave while rendering responsive 60fps oscilloscope lines without animation stutter.',
    solution:
      'Constructed a mathematical note-frequency lookup table and optimized the requestAnimationFrame render loop with zero memory allocation inside the frame tick.',
    results: [
      'Interactive polyphonic musical keyboard supporting C4 through C5 notes on standard computer keyboard',
      'Real-time frequency modulation and interactive canvas pitch sweeping',
      'Silky 60fps visualizer performance across desktop and mobile browsers',
    ],
    metrics: [
      { label: 'Waveform Modes', value: '4 Synthesizers' },
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Dependencies', value: 'Pure JS/HTML5' },
    ],
    stack: ['JavaScript', 'HTML5 Canvas', 'WebAudio API', 'CSS3', 'Tailwind CSS'],
    githubUrl: 'https://github.com/ashishkumar04',
    liveDemoUrl: '#dsp-workbench',
  },
  {
    id: 'fullstack-web-engine',
    title: 'Full-Stack Node.js & MySQL Application',
    tagline: 'Relational Database Architecture & RESTful API Backend Service',
    category: 'systems',
    featured: true,
    year: '2026',
    role: 'Full-Stack Developer',
    problem:
      'Designing a structured relational data model with normalized MySQL tables, parameter-sanitized SQL queries, and modular Node.js controller pipelines.',
    architecture:
      'Layered MVC backend built with Node.js and Express, connected to a MySQL database with connection pooling, structured schema migrations, and REST endpoints for CRUD transactions.',
    architectureNodes: [
      { name: 'Frontend Viewport', role: 'Client Interface', tech: 'HTML5 / CSS / Bootstrap' },
      { name: 'Express REST Router', role: 'API Gateway', tech: 'Node.js / Express' },
      { name: 'Controller & Business Logic', role: 'Service Layer', tech: 'JavaScript ES6+' },
      { name: 'MySQL Connection Pool', role: 'Database Connection', tech: 'mysql2 Driver' },
      { name: 'Relational Storage', role: 'ACID Persistence', tech: 'MySQL 8.x' },
    ],
    challenge:
      'Ensuring data integrity across multi-table operations and preventing SQL injection vulnerabilities under variable client query parameters.',
    solution:
      'Implemented parameterized prepared statements and transaction rollbacks for concurrent relational operations.',
    results: [
      'Built fully normalized database schemas with foreign key constraints and indexed queries',
      'Created modular REST APIs with robust HTTP status code handling and payload validation',
      'Designed responsive client interfaces styled with CSS and Bootstrap',
    ],
    metrics: [
      { label: 'Database', value: 'MySQL Relational' },
      { label: 'Architecture', value: 'Layered MVC' },
      { label: 'API Type', value: 'RESTful JSON' },
    ],
    stack: ['Node.js', 'JavaScript', 'MySQL', 'Express', 'HTML5', 'Bootstrap'],
    githubUrl: 'https://github.com/ashishkumar04',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    description: 'Core languages for systems development, algorithmic problem-solving, and software applications.',
    skills: [
      { name: 'Python', level: 'Primary', highlight: true, context: 'Application logic, scripting, DSA, and AI foundations (GeeksforGeeks certified)' },
      { name: 'C & C++', level: 'Advanced', highlight: true, context: 'Microcontroller programming (Arduino), memory management, low-level data structures' },
      { name: 'JavaScript', level: 'Advanced', highlight: true, context: 'Modern ES6+, DOM manipulation, asynchronous event loops, WebAudio API' },
    ],
  },
  {
    title: 'Web Technologies & Frameworks',
    description: 'Building responsive user interfaces, structured layouts, and backend services.',
    skills: [
      { name: 'Node.js', level: 'Proficient', highlight: true, context: 'Backend server development, REST APIs, asynchronous I/O pipelines' },
      { name: 'HTML5 & CSS3', level: 'Advanced', highlight: true, context: 'Semantic page structure, responsive layouts, modern Flexbox & Grid' },
      { name: 'Bootstrap & Tailwind CSS', level: 'Proficient', context: 'Rapid UI prototyping, mobile-first responsive design tokens' },
    ],
  },
  {
    title: 'Databases & Developer Tools',
    description: 'Relational persistence, version control workflows, and IDE environments.',
    skills: [
      { name: 'MySQL', level: 'Proficient', highlight: true, context: 'Relational schema design, SQL queries, table normalization, CRUD operations' },
      { name: 'Git & GitHub', level: 'Proficient', highlight: true, context: 'Branching strategies, version control, open source collaboration' },
      { name: 'VS Code', level: 'Proficient', context: 'Custom extensions, debugging workflows, embedded toolchains' },
      { name: 'Arduino IDE & Electronics', level: 'Proficient', context: 'Sensor integration, breadboard prototyping, ADC signal processing' },
    ],
  },
  {
    title: 'Soft Skills & Professional Competencies',
    description: 'Collaborative attributes that drive successful engineering execution.',
    skills: [
      { name: 'Problem Solving & DSA', level: 'Active Practice', highlight: true, context: 'Analytical breakdown of complex problems and algorithmic efficiency' },
      { name: 'Team Collaboration', level: 'Competent', context: 'Cross-functional teamwork on academic projects and peer programming' },
      { name: 'Time Management', level: 'Competent', context: 'Balancing academic coursework, certification tracks, and project milestones' },
      { name: 'Adaptability', level: 'Competent', context: 'Quickly absorbing new tech stacks, hardware platforms, and software paradigms' },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: 'Aug 2025 — Present',
    role: 'B.Tech in Computer Science and Engineering',
    company: 'Lovely Professional University',
    location: 'Phagwara, Punjab',
    type: 'Academic',
    description: [
      'Pursuing Bachelor of Technology with focus on Computer Science, Data Structures & Algorithms, and Systems.',
      'Maintained consistent academic performance (CGPA: 7.2).',
      'Developed and demonstrated academic hardware and software projects.',
    ],
    technologies: ['Python', 'C++', 'JavaScript', 'Node.js', 'MySQL', 'Git'],
    impactMetric: 'CGPA 7.2 · Computer Science & Engineering',
  },
  {
    period: '2026',
    role: '150-Hour Computer Programming Certification',
    company: 'iamNeo, an NIIT Venture',
    location: 'India',
    type: 'Leadership',
    description: [
      'Completed comprehensive 150-hour rigorous programming curriculum focusing on core software paradigms.',
      'Solved algorithmic coding challenges across data structures and computational logic.',
      'Earned professional certification (Jan – May 2026).',
    ],
    technologies: ['C', 'C++', 'Python', 'Data Structures', 'Algorithms'],
    impactMetric: '150 Hours of Intensive Computer Programming Track',
  },
  {
    period: '2025',
    role: 'Academic Embedded Project Lead',
    company: 'Footstep Electricity Generator Project',
    location: 'LPU / Punjab',
    type: 'Academic',
    description: [
      'Designed and engineered working prototype using piezoelectric ceramic transducers and Arduino microcontroller.',
      'Constructed diode bridge rectification and capacitor voltage smoothing circuit to harvest kinetic impact energy.',
      'Documented and successfully presented technical project demonstration.',
    ],
    technologies: ['Arduino', 'C++', 'Piezoelectric Sensors', 'Circuit Design'],
    impactMetric: 'Demonstrated Kinetic Energy Harvesting Prototype',
  },
];
