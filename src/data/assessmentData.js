// Extended Assessment Question Bank — fetched by assessment module
export const ASSESSMENT_QUESTION_BANK = [
  // ─── SECTION 1: React & UI Architecture ───────────────────────────────────
  {
    id: 'aq_101',
    section: 'React & UI Architecture',
    type: 'mcq',
    marks: 5,
    difficulty: 'Medium',
    question: 'In React 19, what is the primary benefit of Automatic Batching?',
    options: [
      'It updates the DOM synchronously on every setState call',
      'It combines multiple state updates across promises, timeouts, and native events into a single re-render',
      'It requires flushSync() to manually batch updates',
      'It only batches inside class component lifecycle methods'
    ],
    correctAnswer: 1,
    explanation: 'React 19 Automatic Batching merges state updates from any async context into one render pass.'
  },
  {
    id: 'aq_102',
    section: 'React & UI Architecture',
    type: 'mcq',
    marks: 5,
    difficulty: 'Hard',
    question: 'Which React 19 hook is used to generate optimistic UI updates before a server response completes?',
    options: [
      'useEffect',
      'useTransition',
      'useOptimistic',
      'useDeferredValue'
    ],
    correctAnswer: 2,
    explanation: 'useOptimistic allows rendering temporary state immediately while awaiting server confirmation — introduced in React 19.'
  },
  {
    id: 'aq_103',
    section: 'React & UI Architecture',
    type: 'mcq',
    marks: 5,
    difficulty: 'Medium',
    question: 'What is the key difference between useEffect and useLayoutEffect?',
    options: [
      'useEffect can fetch data; useLayoutEffect cannot',
      'useLayoutEffect fires synchronously after DOM mutations, before the browser paints; useEffect fires asynchronously after paint',
      'useLayoutEffect works only in class components',
      'There is no difference — they are aliases'
    ],
    correctAnswer: 1,
    explanation: 'useLayoutEffect is synchronous and fires before the browser renders, making it suitable for DOM measurement tasks.'
  },

  // ─── SECTION 2: Node.js & Backend Architecture ────────────────────────────
  {
    id: 'aq_201',
    section: 'Node.js & Backend',
    type: 'mcq',
    marks: 5,
    difficulty: 'Medium',
    question: 'How does the Node.js Event Loop process non-blocking I/O without blocking the main thread?',
    options: [
      'Spawning a new OS thread per HTTP request',
      'Delegating I/O to libuv worker thread pool and invoking callbacks on completion',
      'Executing JavaScript in multi-threaded CPU mode',
      'Using Python subprocess bridges for async tasks'
    ],
    correctAnswer: 1,
    explanation: 'Node.js leverages the libuv library which manages a thread pool for async I/O operations, callbacks are then queued back to the event loop.'
  },
  {
    id: 'aq_202',
    section: 'Node.js & Backend',
    type: 'mcq',
    marks: 5,
    difficulty: 'Easy',
    question: 'Which HTTP status code is returned when a JWT token provided in the Authorization header is expired or invalid?',
    options: [
      '400 Bad Request',
      '401 Unauthorized',
      '403 Forbidden',
      '404 Not Found'
    ],
    correctAnswer: 1,
    explanation: '401 Unauthorized is the correct status code for invalid or expired authentication credentials.'
  },
  {
    id: 'aq_203',
    section: 'Node.js & Backend',
    type: 'mcq',
    marks: 5,
    difficulty: 'Hard',
    question: 'In Express.js middleware, what happens if next() is not called inside a middleware function?',
    options: [
      'The request is automatically passed to the next middleware',
      'An error is thrown immediately',
      'The request-response cycle hangs — the client receives no response',
      'Express restarts the server'
    ],
    correctAnswer: 2,
    explanation: 'Not calling next() leaves the request-response cycle pending, which will result in the client timing out with no response.'
  },

  // ─── SECTION 3: PostgreSQL & Database Design ──────────────────────────────
  {
    id: 'aq_301',
    section: 'PostgreSQL & Database Design',
    type: 'mcq',
    marks: 5,
    difficulty: 'Medium',
    question: 'Which SQL isolation level prevents both Dirty Reads AND Phantom Reads completely?',
    options: [
      'Read Uncommitted',
      'Read Committed',
      'Repeatable Read',
      'Serializable'
    ],
    correctAnswer: 3,
    explanation: 'SERIALIZABLE is the strictest isolation level — it prevents dirty reads, non-repeatable reads, and phantom reads.'
  },
  {
    id: 'aq_302',
    section: 'PostgreSQL & Database Design',
    type: 'mcq',
    marks: 5,
    difficulty: 'Easy',
    question: 'What does the acronym ACID stand for in database transaction management?',
    options: [
      'Aggregation, Consistency, Isolation, Durability',
      'Atomicity, Consistency, Isolation, Durability',
      'Atomicity, Concurrency, Integrity, Distribution',
      'Availability, Consistency, Isolation, Delivery'
    ],
    correctAnswer: 1,
    explanation: 'ACID ensures database transactions are processed reliably: Atomicity (all-or-nothing), Consistency (valid state), Isolation (independent), Durability (persistent).'
  },
  {
    id: 'aq_303',
    section: 'PostgreSQL & Database Design',
    type: 'mcq',
    marks: 5,
    difficulty: 'Hard',
    question: 'In PostgreSQL, what is the purpose of the EXPLAIN ANALYZE statement?',
    options: [
      'It validates table schema column constraints',
      'It displays the query execution plan and actual runtime statistics, including loop counts and timing',
      'It creates database indexes automatically',
      'It checks for syntax errors without executing the query'
    ],
    correctAnswer: 1,
    explanation: 'EXPLAIN ANALYZE executes the query and shows the planner\'s chosen execution strategy along with actual time taken per plan node — critical for query performance tuning.'
  },

  // ─── SECTION 4: Data Structures & Algorithms ──────────────────────────────
  {
    id: 'aq_401',
    section: 'Data Structures & Algorithms',
    type: 'mcq',
    marks: 5,
    difficulty: 'Easy',
    question: 'What is the time complexity of searching for an element in a balanced Binary Search Tree?',
    options: [
      'O(1)',
      'O(log N)',
      'O(N)',
      'O(N log N)'
    ],
    correctAnswer: 1,
    explanation: 'Each BST comparison halves the remaining search space, resulting in O(log N) average-case search complexity for balanced trees.'
  },
  {
    id: 'aq_402',
    section: 'Data Structures & Algorithms',
    type: 'mcq',
    marks: 5,
    difficulty: 'Medium',
    question: 'Which graph traversal algorithm is guaranteed to find the shortest path in an unweighted graph?',
    options: [
      'Depth-First Search (DFS)',
      'Dijkstra\'s Algorithm',
      'Breadth-First Search (BFS)',
      'Bellman-Ford Algorithm'
    ],
    correctAnswer: 2,
    explanation: 'BFS explores nodes level-by-level, guaranteeing the first time a node is reached is via the shortest unweighted path.'
  },
  {
    id: 'aq_403',
    section: 'Data Structures & Algorithms',
    type: 'mcq',
    marks: 5,
    difficulty: 'Hard',
    question: 'Kadane\'s Algorithm solves the Maximum Subarray Problem. What are its time and space complexities?',
    options: [
      'O(N²) time, O(N) space',
      'O(N log N) time, O(1) space',
      'O(N) time, O(1) space',
      'O(N) time, O(N) space'
    ],
    correctAnswer: 2,
    explanation: 'Kadane\'s algorithm runs in linear O(N) time using only O(1) extra space by maintaining just two running variables.'
  },

  // ─── SECTION 5: Web Security ─────────────────────────────────────────────
  {
    id: 'aq_501',
    section: 'Web Security',
    type: 'mcq',
    marks: 5,
    difficulty: 'Medium',
    question: 'What is the correct way to prevent Cross-Site Request Forgery (CSRF) attacks in web APIs?',
    options: [
      'Using HTTPS/TLS encryption only',
      'Validating CSRF tokens or using SameSite cookie attributes',
      'Encoding all query string parameters',
      'Using bcrypt for password hashing'
    ],
    correctAnswer: 1,
    explanation: 'CSRF attacks are mitigated using synchronizer tokens (CSRF tokens) in forms, or SameSite=Strict/Lax cookie policies which prevent cross-origin cookie inclusion.'
  },
  {
    id: 'aq_502',
    section: 'Web Security',
    type: 'mcq',
    marks: 5,
    difficulty: 'Easy',
    question: 'What does Content-Security-Policy (CSP) HTTP header protect against?',
    options: [
      'SQL Injection attacks on database queries',
      'Man-in-the-Middle network packet interception',
      'Cross-Site Scripting (XSS) attacks by restricting allowed script sources',
      'Brute-force password dictionary attacks'
    ],
    correctAnswer: 2,
    explanation: 'CSP headers instruct browsers to only execute scripts from whitelisted origins, effectively preventing injected malicious scripts from running.'
  },

  // ─── SECTION 6: Cloud & DevOps ───────────────────────────────────────────
  {
    id: 'aq_601',
    section: 'Cloud & DevOps',
    type: 'mcq',
    marks: 5,
    difficulty: 'Medium',
    question: 'In Docker, what is the primary difference between CMD and ENTRYPOINT in a Dockerfile?',
    options: [
      'CMD sets env variables; ENTRYPOINT sets exposed ports',
      'CMD provides overridable defaults; ENTRYPOINT defines the primary non-overridable executable',
      'ENTRYPOINT only works in root mode containers',
      'CMD runs before the container starts; ENTRYPOINT runs after'
    ],
    correctAnswer: 1,
    explanation: 'CMD arguments are easily overridden via docker run CLI. ENTRYPOINT sets the fixed container entrypoint executable that won\'t be overridden without --entrypoint flag.'
  },
  {
    id: 'aq_602',
    section: 'Cloud & DevOps',
    type: 'mcq',
    marks: 5,
    difficulty: 'Hard',
    question: 'Which AWS service provides a fully managed Kubernetes control plane for container orchestration?',
    options: [
      'AWS ECS (Elastic Container Service)',
      'AWS Lambda with container images',
      'AWS EKS (Elastic Kubernetes Service)',
      'AWS Fargate with EC2 launch type'
    ],
    correctAnswer: 2,
    explanation: 'Amazon EKS manages the Kubernetes control plane, including API server scaling, etcd backups, and infrastructure patching — allowing teams to focus on worker node workloads.'
  },

  // ─── CODING SECTION ───────────────────────────────────────────────────────
  {
    id: 'aq_701',
    section: 'Coding Assessment',
    type: 'code',
    marks: 15,
    difficulty: 'Medium',
    question: 'Implement a `debounce(fn, delay)` utility function that delays invoking fn until after delay ms have passed since the last invocation.',
    language: 'javascript',
    starterCode: `function debounce(fn, delay) {\n  let timerId;\n  return function (...args) {\n    clearTimeout(timerId);\n    timerId = setTimeout(() => {\n      fn.apply(this, args);\n    }, delay);\n  };\n}`,
    explanation: 'Debounce limits the rate a function fires by delaying execution until the specified delay has passed since the last call — useful for search inputs and window resize handlers.'
  },
  {
    id: 'aq_702',
    section: 'Coding Assessment',
    type: 'code',
    marks: 15,
    difficulty: 'Hard',
    question: 'Write an async function `fetchWithRetry(url, retries)` that retries a failed fetch request up to `retries` times with exponential backoff before throwing an error.',
    language: 'javascript',
    starterCode: `async function fetchWithRetry(url, retries = 3) {\n  for (let attempt = 0; attempt <= retries; attempt++) {\n    try {\n      const res = await fetch(url);\n      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);\n      return await res.json();\n    } catch (err) {\n      if (attempt === retries) throw err;\n      await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 200));\n    }\n  }\n}`,
    explanation: 'Exponential backoff waits 200ms, 400ms, 800ms between retries — preventing server overload during transient failures.'
  }
];

export const ASSESSMENT_LIST = [
  {
    id: 'exam_01',
    title: 'Full-Stack Engineering Certification Mid-Term Exam',
    type: 'Mid Exam',
    courseId: 'crs_01',
    durationMinutes: 60,
    totalMarks: 100,
    passPercentage: 70,
    proctoringEnabled: true,
    negativeMarking: false,
    status: 'Available',
    sections: ['React & UI Architecture', 'Node.js & Backend', 'PostgreSQL & Database Design'],
    description: 'Mid-term evaluation covering full-stack concepts from React 19 hooks, Node.js architecture, and PostgreSQL performance tuning.',
    questionIds: ['aq_101', 'aq_102', 'aq_103', 'aq_201', 'aq_202', 'aq_301', 'aq_401', 'aq_402', 'aq_501', 'aq_502', 'aq_601']
  },
  {
    id: 'exam_02',
    title: 'Data Structures & Algorithms Championship Contest',
    type: 'Coding Contest',
    courseId: 'crs_04',
    durationMinutes: 90,
    totalMarks: 120,
    passPercentage: 75,
    proctoringEnabled: true,
    negativeMarking: false,
    status: 'Available',
    sections: ['Data Structures & Algorithms', 'Coding Assessment'],
    description: 'Championship test featuring algorithmic complexity, graph traversal, dynamic programming, and live coding challenges.',
    questionIds: ['aq_401', 'aq_402', 'aq_403', 'aq_701', 'aq_702']
  },
  {
    id: 'exam_03',
    title: 'Cloud & DevOps Engineering Final Assessment',
    type: 'Final Exam',
    courseId: 'crs_03',
    durationMinutes: 45,
    totalMarks: 80,
    passPercentage: 70,
    proctoringEnabled: true,
    negativeMarking: true,
    status: 'Upcoming',
    sections: ['Cloud & DevOps', 'Web Security'],
    description: 'Final exam covering Docker containerization, AWS EKS/ECS architecture, security headers, and CI/CD pipelines.',
    questionIds: ['aq_501', 'aq_502', 'aq_601', 'aq_602']
  }
];
