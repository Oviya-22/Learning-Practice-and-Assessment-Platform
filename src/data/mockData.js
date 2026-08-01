export const MOCK_USER = {
  id: 'usr_001',
  name: 'Alex Rivera',
  email: 'alex.rivera@LearnSphere.edu',
  role: 'student', // 'student' | 'faculty' | 'admin' | 'superadmin'
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  xp: 3450,
  level: 12,
  streakDays: 14,
  completedCoursesCount: 4,
  enrolledCoursesCount: 6,
  certificatesCount: 4,
  skills: ['React', 'Python', 'Machine Learning', 'TailwindCSS', 'Data Structures', 'TypeScript'],
  bio: 'Computer Science enthusiast passionate about AI systems, cloud architecture, and full-stack web applications.',
  phone: '+1 (555) 234-5678',
  twoFactorEnabled: true,
  emailNotifications: true,
  pushNotifications: true,
};

export const MOCK_ROLES_INFO = {
  student: {
    title: 'Student Portal',
    badge: 'Learner',
    color: 'from-blue-500 to-indigo-600',
  },
  faculty: {
    title: 'Faculty Portal',
    badge: 'Instructor',
    color: 'from-emerald-500 to-teal-600',
  },
  admin: {
    title: 'Admin Dashboard',
    badge: 'Administrator',
    color: 'from-purple-500 to-pink-600',
  },
  superadmin: {
    title: 'Super Admin Control Center',
    badge: 'System Admin',
    color: 'from-amber-500 to-rose-600',
  },
};

export const MOCK_COURSES = [
  {
    id: 'crs_01',
    title: 'Modern Full-Stack Development with React & Node.js',
    category: 'Web Development',
    difficulty: 'Intermediate',
    instructor: 'Dr. Sarah Jenkins',
    instructorTitle: 'Senior Software Architect @ TechCorp',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    ratingCount: 1420,
    duration: '24 Hours',
    totalLessons: 42,
    completedLessons: 18,
    progressPercent: 43,
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=600&q=80',
    description: 'Master full-stack engineering with modern React 19, Node.js, Express, PostgreSQL, state management, and production cloud deployment.',
    prerequisites: ['HTML/CSS Fundamentals', 'Basic JavaScript ES6+'],
    learningOutcomes: [
      'Build production-ready full stack web applications',
      'Implement secure JWT authentication and role authorization',
      'Design relational database schemas with Prisma ORM',
      'Deploy containerized apps using Docker & AWS EC2'
    ],
    chapters: [
      {
        id: 'ch_1',
        title: 'Chapter 1: Modern Frontend Architecture',
        lessons: [
          { id: 'les_101', title: '1.1 Introduction to Vite & React Component Design', type: 'video', duration: '18 min', completed: true },
          { id: 'les_102', title: '1.2 Advanced State Management with React Context & Redux Toolkit', type: 'video', duration: '25 min', completed: true },
          { id: 'les_103', title: '1.3 Interactive Code Lab: Building Custom Hooks', type: 'code', duration: '30 min', completed: true },
          { id: 'les_104', title: '1.4 Chapter 1 Study Slides & PDF Reference', type: 'pdf', duration: '15 min', completed: true },
        ]
      },
      {
        id: 'ch_2',
        title: 'Chapter 2: Backend REST & GraphQL API Engineering',
        lessons: [
          { id: 'les_201', title: '2.1 Express.js Middleware Architecture', type: 'video', duration: '22 min', completed: true },
          { id: 'les_202', title: '2.2 Database Modelling & Migrations with PostgreSQL', type: 'video', duration: '34 min', completed: false },
          { id: 'les_203', title: '2.3 Interactive Flashcard Review: API Security Patterns', type: 'flashcards', duration: '15 min', completed: false },
          { id: 'les_204', title: '2.4 Practice Lab: Writing REST Endpoints with Input Validation', type: 'code', duration: '40 min', completed: false },
        ]
      },
      {
        id: 'ch_3',
        title: 'Chapter 3: Production Deployment & CI/CD Pipelines',
        lessons: [
          { id: 'les_301', title: '3.1 Dockerizing Full Stack Applications', type: 'video', duration: '28 min', completed: false },
          { id: 'les_302', title: '3.2 GitHub Actions & Automated Testing Pipelines', type: 'video', duration: '32 min', completed: false },
        ]
      }
    ]
  },
  {
    id: 'crs_02',
    title: 'Applied Artificial Intelligence & Machine Learning Pipeline',
    category: 'Artificial Intelligence',
    difficulty: 'Advanced',
    instructor: 'Prof. Marcus Vance',
    instructorTitle: 'AI Research Director @ AI Labs',
    instructorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    rating: 4.95,
    ratingCount: 2180,
    duration: '36 Hours',
    totalLessons: 54,
    completedLessons: 32,
    progressPercent: 60,
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80',
    description: 'End-to-end Machine Learning pipeline development: PyTorch neural networks, Transformer models, LLM fine-tuning, vector databases, and MLOps deployment.',
    prerequisites: ['Python Programming', 'Linear Algebra & Calculus basics'],
    learningOutcomes: [
      'Train deep neural networks using PyTorch & PyTorch Lightning',
      'Build RAG (Retrieval Augmented Generation) pipelines with vector DBs',
      'Fine-tune HuggingFace Transformers for domain tasks',
      'Deploy real-time inference endpoints with FastAPI & Triton Server'
    ],
    chapters: [
      {
        id: 'ch_201',
        title: 'Module 1: Foundations of Deep Neural Networks',
        lessons: [
          { id: 'les_2001', title: '1.1 Backpropagation & Gradient Descent In-Depth', type: 'video', duration: '30 min', completed: true },
          { id: 'les_2002', title: '1.2 Code Lab: Building PyTorch Tensors from Scratch', type: 'code', duration: '45 min', completed: true },
        ]
      }
    ]
  },
  {
    id: 'crs_03',
    title: 'Cloud Architecture & AWS Certified Solutions Engineer',
    category: 'Cloud & DevOps',
    difficulty: 'Intermediate',
    instructor: 'Elena Rostova',
    instructorTitle: 'Principal Cloud Consultant',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    rating: 4.8,
    ratingCount: 940,
    duration: '28 Hours',
    totalLessons: 38,
    completedLessons: 8,
    progressPercent: 21,
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
    description: 'Comprehensive AWS Solutions Architect preparation covering VPC subnetting, IAM policies, Lambda serverless, ECS/EKS clusters, and high-availability design.',
    prerequisites: ['Basic Linux command line', 'Networking fundamentals'],
    learningOutcomes: [
      'Design multi-region VPC network architectures',
      'Implement Zero-Trust IAM security policies',
      'Deploy serverless microservices with AWS Lambda & API Gateway'
    ],
    chapters: []
  },
  {
    id: 'crs_04',
    title: 'Data Structures, Algorithms & LeetCode Masterclass',
    category: 'Computer Science',
    difficulty: 'Beginner to Advanced',
    instructor: 'David Kim',
    instructorTitle: 'Ex-Google Staff Engineer',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 4.98,
    ratingCount: 3410,
    duration: '40 Hours',
    totalLessons: 65,
    completedLessons: 65,
    progressPercent: 100,
    thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?auto=format&fit=crop&w=600&q=80',
    description: 'Master binary trees, dynamic programming, graph algorithms, two-pointer techniques, and system design patterns for top tech company interviews.',
    prerequisites: ['Any programming language (Python/Java/C++)'],
    learningOutcomes: [
      'Solve Hard LeetCode algorithm problems systematically',
      'Master Big-O time and space complexity analysis',
      'Implement Trie, Heap, Graph, and DP patterns effortlessly'
    ],
    chapters: []
  }
];

export const MOCK_PRACTICE_QUESTIONS = [
  {
    id: 'pq_101',
    type: 'mcq',
    difficulty: 'Medium',
    topic: 'React Hooks & Virtual DOM',
    question: 'Which statement accurately describes how React virtual DOM batching works in React 19?',
    options: [
      'React updates the real DOM synchronously after every setState call inside event handlers',
      'React automatically batches state updates across multiple asynchronous operations such as promises and setTimeouts',
      'React requires manual calling of ReactDOM.flushSync() to combine consecutive setState calls',
      'React only batches state updates inside class lifecycle methods'
    ],
    correctAnswer: 1,
    explanation: 'React 19 (and React 18+) features Automatic Batching, which automatically combines multiple state updates inside promises, timeouts, native event handlers, and fetch callbacks into a single re-render for optimal UI performance.'
  },
  {
    id: 'pq_102',
    type: 'code',
    difficulty: 'Hard',
    topic: 'Algorithms - Dynamic Programming',
    question: 'Implement a function `maxSubArray(nums)` that finds the contiguous subarray with the largest sum and returns its sum (Kadane’s Algorithm).',
    starterCode: `function maxSubArray(nums) {\n  // Write your solution here\n  let maxSoFar = nums[0];\n  let currentMax = nums[0];\n  \n  for (let i = 1; i < nums.length; i++) {\n    currentMax = Math.max(nums[i], currentMax + nums[i]);\n    maxSoFar = Math.max(maxSoFar, currentMax);\n  }\n  \n  return maxSoFar;\n}`,
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6' },
      { input: '[1]', expected: '1' },
      { input: '[5,4,-1,7,8]', expected: '23' }
    ],
    explanation: 'Kadane’s algorithm uses dynamic programming by maintaining a running currentMax at each position and updating maxSoFar in O(n) time and O(1) space.'
  },
  {
    id: 'pq_103',
    type: 'fill_in',
    difficulty: 'Easy',
    topic: 'Web Security',
    question: 'The HTTP header `Content-Security-Policy` (CSP) prevents ___________ attacks by restricting the sources from which scripts can execute.',
    correctAnswer: 'Cross-Site Scripting',
    acceptableAnswers: ['Cross-Site Scripting', 'XSS', 'cross site scripting', 'cross-site scripting'],
    explanation: 'Content Security Policy (CSP) protects web applications against XSS (Cross-Site Scripting) attacks by enforcing an explicit allowlist of authorized script and resource sources.'
  },
  {
    id: 'pq_104',
    type: 'matching',
    difficulty: 'Medium',
    topic: 'Database Management Systems',
    question: 'Match each Database Normalization form with its core requirement:',
    pairs: [
      { term: '1NF (First Normal Form)', match: 'Eliminate repeating groups and ensure atomic column values' },
      { term: '2NF (Second Normal Form)', match: 'Ensure all non-key attributes are fully functionally dependent on the primary key' },
      { term: '3NF (Third Normal Form)', match: 'Eliminate transitive dependencies between non-key fields' },
      { term: 'BCNF (Boyce-Codd Normal Form)', match: 'Ensure every determinant is a candidate key' }
    ],
    explanation: 'Database normalization incrementally removes data redundancy and prevents insertion, update, and deletion anomalies across relational table schemas.'
  }
];

export const MOCK_ASSESSMENTS = [
  {
    id: 'asm_01',
    title: 'Full-Stack Engineering Mid-Term Certification Exam',
    type: 'Mid Exam',
    courseId: 'crs_01',
    durationMinutes: 45,
    totalQuestions: 20,
    totalMarks: 100,
    passPercentage: 75,
    proctoringEnabled: true,
    negativeMarking: true,
    status: 'Available',
    sections: ['React & UI Architecture', 'Node.js & Express REST APIs', 'PostgreSQL & Database Design'],
    description: 'Comprehensive mid-term evaluation covering full-stack concepts, state management, REST security, and query optimization.',
    questions: [
      {
        id: 'q_1',
        type: 'mcq',
        marks: 5,
        question: 'In Node.js, how does the Event Loop handle I/O bound operations without blocking the main execution thread?',
        options: [
          'By spawning a new OS thread for every single HTTP request automatically',
          'By delegating non-blocking operations to libuv worker thread pool and executing callbacks on completion',
          'By running JavaScript synchronously in multi-threaded hardware CPU mode',
          'By disabling asynchronous callbacks completely'
        ],
        correctAnswer: 1
      },
      {
        id: 'q_2',
        type: 'mcq',
        marks: 5,
        question: 'Which HTTP status code is most appropriate when a JWT token supplied in the Authorization header is expired or tampered with?',
        options: [
          '400 Bad Request',
          '401 Unauthorized',
          '403 Forbidden',
          '404 Not Found'
        ],
        correctAnswer: 1
      },
      {
        id: 'q_3',
        type: 'code',
        marks: 15,
        question: 'Write a utility function `debounce(fn, delay)` in JavaScript that limits how often a function can fire.',
        starterCode: 'function debounce(fn, delay) {\n  let timerId;\n  return function (...args) {\n    clearTimeout(timerId);\n    timerId = setTimeout(() => {\n      fn.apply(this, args);\n    }, delay);\n  };\n}',
        correctAnswer: 'debounce'
      }
    ]
  },
  {
    id: 'asm_02',
    title: 'AI Pipeline & Neural Network Coding Contest',
    type: 'Coding Contest',
    courseId: 'crs_02',
    durationMinutes: 90,
    totalQuestions: 4,
    totalMarks: 200,
    passPercentage: 80,
    proctoringEnabled: true,
    status: 'Upcoming',
    sections: ['PyTorch Tensors', 'Transformers & Self-Attention', 'RAG Optimizations'],
    description: 'High-speed algorithmic contest testing tensor manipulation, custom loss functions, and memory-efficient matrix operations.'
  }
];

export const MOCK_ASSIGNMENTS = [
  {
    id: 'asg_101',
    title: 'Build a Real-Time Collaborative Task Dashboard',
    courseName: 'Modern Full-Stack Development',
    deadline: '2026-08-15',
    totalPoints: 100,
    submittedCount: 28,
    totalStudents: 32,
    status: 'Submitted',
    grade: '95/100',
    feedback: 'Outstanding work on the WebSocket real-time sync layer! Smooth optimistic UI updates and robust error boundaries.',
    rubrics: [
      { criteria: 'Frontend UI & Component Design', points: 30 },
      { criteria: 'Backend API & Database Schema', points: 30 },
      { criteria: 'Real-time WebSockets integration', points: 25 },
      { criteria: 'Documentation & Test Coverage', points: 15 }
    ]
  },
  {
    id: 'asg_102',
    title: 'Fine-Tuning Llama 3 on Domain Dataset',
    courseName: 'Applied AI & Machine Learning',
    deadline: '2026-08-22',
    totalPoints: 100,
    submittedCount: 14,
    totalStudents: 32,
    status: 'Pending',
    grade: 'Not Graded',
    rubrics: [
      { criteria: 'Dataset Tokenization & Preprocessing', points: 25 },
      { criteria: 'LoRA / QLoRA Hyperparameter Tuning', points: 35 },
      { criteria: 'Evaluation Metrics (BLEU / ROUGE)', points: 25 },
      { criteria: 'Model Deployment Endpoint', points: 15 }
    ]
  }
];

export const MOCK_CERTIFICATES = [
  {
    id: 'CERT-LQ-2026-9812',
    studentName: 'Alex Rivera',
    courseName: 'Data Structures, Algorithms & LeetCode Masterclass',
    issueDate: 'July 14, 2026',
    instructor: 'David Kim, Ex-Google Staff Engineer',
    verificationUrl: 'https://LearnSphere.edu/verify/CERT-LQ-2026-9812',
    skillsVerified: ['Binary Trees', 'Dynamic Programming', 'Graph Theory', 'System Design'],
    grade: 'Distinction (98%)',
    digitalSignature: 'SHA256: 8f9b1c2e4a6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f'
  },
  {
    id: 'CERT-LQ-2026-4401',
    studentName: 'Alex Rivera',
    courseName: 'Foundations of Cloud Computing & Microservices',
    issueDate: 'May 02, 2026',
    instructor: 'Elena Rostova, Cloud Architect',
    verificationUrl: 'https://LearnSphere.edu/verify/CERT-LQ-2026-4401',
    skillsVerified: ['AWS VPC', 'Docker Containers', 'CI/CD Pipelines'],
    grade: 'Pass with Honors (94%)',
    digitalSignature: 'SHA256: 3a2b1c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b'
  }
];

export const MOCK_GAMIFICATION = {
  userXP: 3450,
  userLevel: 12,
  nextLevelXP: 4000,
  streakDays: 14,
  badges: [
    { id: 'b1', name: '7-Day Streak', icon: '🔥', description: 'Maintained a 7-day consecutive study streak', unlocked: true, unlockedAt: '2026-07-20' },
    { id: 'b2', name: 'Code Ninja', icon: '⚡', description: 'Solved 50+ live coding lab challenges', unlocked: true, unlockedAt: '2026-07-25' },
    { id: 'b3', name: 'Exam Ace', icon: '🎯', description: 'Scored 95%+ on a timed certification assessment', unlocked: true, unlockedAt: '2026-07-28' },
    { id: 'b4', name: 'AI Scholar', icon: '🧠', description: 'Asked 100+ insightful questions to the AI Tutor', unlocked: true, unlockedAt: '2026-08-01' },
    { id: 'b5', name: 'Master Architect', icon: '🏛️', description: 'Completed 3 advanced technical learning paths', unlocked: false }
  ],
  leaderboard: [
    { rank: 1, name: 'Sophia Chen', xp: 5820, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80', streak: 42, role: 'Student' },
    { rank: 2, name: 'Alex Rivera (You)', xp: 3450, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', streak: 14, role: 'Student' },
    { rank: 3, name: 'Liam Patel', xp: 3210, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80', streak: 19, role: 'Student' },
    { rank: 4, name: 'Emily Zhang', xp: 2980, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80', streak: 8, role: 'Student' },
    { rank: 5, name: 'Marcus Thorne', xp: 2840, avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80', streak: 11, role: 'Student' }
  ]
};

export const MOCK_NOTIFICATIONS = [
  { id: 'not_1', title: 'Assignment Graded', message: 'Your submission for "Build a Real-Time Collaborative Task Dashboard" received a score of 95/100.', time: '10 min ago', read: false, type: 'assignment' },
  { id: 'not_2', title: 'Upcoming Assessment', message: 'Full-Stack Engineering Mid-Term Exam is scheduled for tomorrow at 2:00 PM.', time: '2 hours ago', read: false, type: 'exam' },
  { id: 'not_3', title: 'New Badge Unlocked!', message: 'Congratulations! You unlocked the "AI Scholar" badge.', time: '1 day ago', read: true, type: 'badge' },
  { id: 'not_4', title: 'Certificate Issued', message: 'Your official completion certificate for Data Structures Masterclass is now ready.', time: '3 days ago', read: true, type: 'certificate' }
];

export const MOCK_USERS_ADMIN = [
  { id: 'usr_101', name: 'Alex Rivera', email: 'alex.rivera@LearnSphere.edu', role: 'student', status: 'Active', joined: '2025-11-10', lastLogin: '2 mins ago' },
  { id: 'usr_102', name: 'Dr. Sarah Jenkins', email: 's.jenkins@LearnSphere.edu', role: 'faculty', status: 'Active', joined: '2024-03-15', lastLogin: '1 hour ago' },
  { id: 'usr_103', name: 'Prof. Marcus Vance', email: 'm.vance@LearnSphere.edu', role: 'faculty', status: 'Active', joined: '2024-01-20', lastLogin: 'Yesterday' },
  { id: 'usr_104', name: 'David Kim', email: 'd.kim@LearnSphere.edu', role: 'faculty', status: 'Active', joined: '2024-06-12', lastLogin: '3 days ago' },
  { id: 'usr_105', name: 'Administrator Portal', email: 'admin@LearnSphere.edu', role: 'admin', status: 'Active', joined: '2023-09-01', lastLogin: 'Just now' },
  { id: 'usr_106', name: 'Super Admin HQ', email: 'superadmin@LearnSphere.edu', role: 'superadmin', status: 'Active', joined: '2023-01-01', lastLogin: 'Just now' },
  { id: 'usr_107', name: 'John Doe', email: 'johndoe@test.com', role: 'student', status: 'Suspended', joined: '2026-02-14', lastLogin: '10 days ago' }
];

export const MOCK_AUDIT_LOGS = [
  { id: 'log_01', timestamp: '2026-08-01 10:45:12', user: 'superadmin@LearnSphere.edu', action: 'ROLE_PERMISSION_UPDATE', ip: '192.168.1.100', details: 'Updated Faculty role to allow custom question bank exports.' },
  { id: 'log_02', timestamp: '2026-08-01 10:30:00', user: 'admin@LearnSphere.edu', action: 'USER_STATUS_CHANGE', ip: '192.168.1.105', details: 'Set user John Doe (usr_107) status to Suspended.' },
  { id: 'log_03', timestamp: '2026-08-01 09:15:44', user: 's.jenkins@LearnSphere.edu', action: 'COURSE_PUBLISHED', ip: '172.16.0.45', details: 'Published new course "Modern Full-Stack Development".' },
  { id: 'log_04', timestamp: '2026-08-01 08:00:21', user: 'alex.rivera@LearnSphere.edu', action: 'EXAM_SUBMISSION', ip: '10.0.0.12', details: 'Submitted Full-Stack Engineering Mid-Term Exam (Score: 92/100).' }
];

export const MOCK_SYSTEM_HEALTH = {
  cpuUsage: 24,
  memoryUsage: 58,
  activeWebsockets: 1420,
  apiLatencyMs: 42,
  databaseConnections: 85,
  uptime: '99.98%',
  status: 'All Systems Operational'
};
