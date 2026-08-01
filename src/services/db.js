// Client-side Database Service for LearnSphere

const INITIAL_USERS = [
  {
    id: 'usr_001',
    name: 'Oviya S',
    email: 'oviyas.cs24@bitsathy.ac.in',
    password: 'oviya',
    role: 'student',
    initials: 'OS',
    xp: 4200,
    level: 15,
    streakDays: 21,
    skills: ['React', 'Python', 'AI & ML', 'Data Structures'],
    joined: '2025-08-01',
    status: 'Active'
  },
  {
    id: 'usr_002',
    name: 'Saruthi V',
    email: 'saruthiv.cs24@bitsathy.ac.in',
    password: 'saruthi',
    role: 'student',
    initials: 'SV',
    xp: 3800,
    level: 14,
    streakDays: 18,
    skills: ['Full-Stack', 'Node.js', 'PostgreSQL', 'C++'],
    joined: '2025-08-01',
    status: 'Active'
  },
  {
    id: 'usr_003',
    name: 'Alex Rivera',
    email: 'alex.rivera@LearnSphere.edu',
    password: 'Password123!',
    role: 'student',
    initials: 'AR',
    xp: 3450,
    level: 12,
    streakDays: 14,
    skills: ['React', 'Python', 'Machine Learning', 'TypeScript'],
    joined: '2025-11-10',
    status: 'Active'
  },
  {
    id: 'usr_004',
    name: 'Dr. Sarah Jenkins',
    email: 'sarah.jenkins@LearnSphere.edu',
    password: 'FacultyPass123!',
    role: 'faculty',
    initials: 'SJ',
    title: 'Senior Software Architect',
    joined: '2024-03-15',
    status: 'Active'
  },
  {
    id: 'usr_005',
    name: 'Administrator HQ',
    email: 'admin@LearnSphere.edu',
    password: 'AdminPass123!',
    role: 'admin',
    initials: 'AD',
    title: 'Platform Administrator',
    joined: '2023-09-01',
    status: 'Active'
  },
  {
    id: 'usr_006',
    name: 'Super Admin Control',
    email: 'superadmin@LearnSphere.edu',
    password: 'SuperAdmin123!',
    role: 'superadmin',
    initials: 'SA',
    title: 'System Security Director',
    joined: '2023-01-01',
    status: 'Active'
  }
];

export const INITIAL_QUESTION_BANK = [
  // MCQs
  {
    id: 'q_101',
    type: 'mcq',
    category: 'React & UI Architecture',
    difficulty: 'Medium',
    question: 'Which statement accurately describes how React 19 Automatic Batching functions?',
    options: [
      'React updates the DOM synchronously after every setState call inside event handlers',
      'React automatically batches state updates across promises, timeouts, and native event handlers into a single re-render',
      'React requires manual calling of ReactDOM.flushSync() to combine consecutive setState calls',
      'React only batches state updates inside class lifecycle methods'
    ],
    correctAnswer: 1,
    explanation: 'Automatic Batching in React 19 combines multiple state updates inside promises, timeouts, native event handlers, and fetch callbacks into a single re-render for optimal UI performance.'
  },
  {
    id: 'q_102',
    type: 'mcq',
    category: 'Web Security',
    difficulty: 'Easy',
    question: 'Which HTTP status code should be returned when a JWT token is expired or fails HMAC verification?',
    options: [
      '400 Bad Request',
      '401 Unauthorized',
      '403 Forbidden',
      '404 Not Found'
    ],
    correctAnswer: 1,
    explanation: '401 Unauthorized indicates that the request lacks valid authentication credentials for the requested resource.'
  },
  {
    id: 'q_103',
    type: 'mcq',
    category: 'Node.js & Backend Architecture',
    difficulty: 'Medium',
    question: 'How does the Node.js Event Loop handle non-blocking asynchronous I/O operations?',
    options: [
      'By spawning a new hardware thread for every HTTP connection automatically',
      'By delegating non-blocking tasks to the libuv thread pool and triggering callbacks upon completion',
      'By executing JavaScript synchronously on multi-core CPUs',
      'By disabling callback queues during high traffic'
    ],
    correctAnswer: 1,
    explanation: 'Node.js relies on libuv to delegate asynchronous system I/O operations to worker threads and places callbacks onto the event loop queue.'
  },
  {
    id: 'q_104',
    type: 'mcq',
    category: 'Database Management',
    difficulty: 'Hard',
    question: 'Which isolation level prevents Dirty Reads, Non-Repeatable Reads, and Phantom Reads completely in SQL relational databases?',
    options: [
      'Read Uncommitted',
      'Read Committed',
      'Repeatable Read',
      'Serializable'
    ],
    correctAnswer: 3,
    explanation: 'Serializable is the highest isolation level. It executes transactions in a sequence that guarantees complete protection against phantom reads and concurrency anomalies.'
  },
  {
    id: 'q_105',
    type: 'mcq',
    category: 'Data Structures & Algorithms',
    difficulty: 'Medium',
    question: 'What is the time complexity of searching for an element in a balanced Binary Search Tree (BST)?',
    options: [
      'O(1)',
      'O(log N)',
      'O(N)',
      'O(N log N)'
    ],
    correctAnswer: 1,
    explanation: 'In a balanced BST, each comparison eliminates half of the remaining nodes, resulting in O(log N) search time complexity.'
  },
  {
    id: 'q_106',
    type: 'mcq',
    category: 'Cloud Computing & DevOps',
    difficulty: 'Medium',
    question: 'In Docker, what is the key difference between CMD and ENTRYPOINT in a Dockerfile?',
    options: [
      'CMD sets defaults that can be overridden by CLI arguments, while ENTRYPOINT configures the primary container executable',
      'CMD is used for environment variables while ENTRYPOINT is used for ports',
      'ENTRYPOINT can only be executed in root mode',
      'CMD cannot accept parameters'
    ],
    correctAnswer: 0,
    explanation: 'CMD provides default arguments for an executing container that are easily overridden, whereas ENTRYPOINT specifies the main container executable command.'
  },
  {
    id: 'q_107',
    type: 'mcq',
    category: 'Python Programming',
    difficulty: 'Easy',
    question: 'In Python, what is the output of `type( (1,) )`?',
    options: [
      '<class "int">',
      '<class "tuple">',
      '<class "list">',
      '<class "set">'
    ],
    correctAnswer: 1,
    explanation: 'A trailing comma inside parentheses designates a single-element tuple in Python.'
  },
  {
    id: 'q_108',
    type: 'mcq',
    category: 'C++ Systems Programming',
    difficulty: 'Hard',
    question: 'What is RAII (Resource Acquisition Is Initialization) in C++?',
    options: [
      'A design pattern where resource allocation is bound to object lifetime via constructors and destructors',
      'A method for dynamically allocating heap memory without delete',
      'A runtime garbage collection thread mechanism',
      'A compiler flag for speed optimization'
    ],
    correctAnswer: 0,
    explanation: 'RAII ensures that resources (memory, file handles, sockets) are safely released when the owning object goes out of scope during stack unwinding.'
  },

  // Coding Questions (Multi-Language)
  {
    id: 'q_201',
    type: 'code',
    category: 'Algorithms & Problem Solving',
    difficulty: 'Medium',
    question: 'Implement Kadane’s Algorithm to find the maximum sum of a contiguous subarray.',
    languages: {
      javascript: {
        starterCode: `function maxSubArray(nums) {\n  let maxSoFar = nums[0];\n  let currentMax = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentMax = Math.max(nums[i], currentMax + nums[i]);\n    maxSoFar = Math.max(maxSoFar, currentMax);\n  }\n  return maxSoFar;\n}`,
        testCases: [{ input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6' }]
      },
      python: {
        starterCode: `def max_sub_array(nums):\n    max_so_far = nums[0]\n    current_max = nums[0]\n    for i in range(1, len(nums)):\n        current_max = max(nums[i], current_max + nums[i])\n        max_so_far = max(max_so_far, current_max)\n    return max_so_far`,
        testCases: [{ input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6' }]
      },
      cpp: {
        starterCode: `#include <vector>\n#include <algorithm>\n\nint maxSubArray(std::vector<int>& nums) {\n    int maxSoFar = nums[0];\n    int currentMax = nums[0];\n    for (size_t i = 1; i < nums.size(); ++i) {\n        currentMax = std::max(nums[i], currentMax + nums[i]);\n        maxSoFar = std::max(maxSoFar, currentMax);\n    }\n    return maxSoFar;\n}`,
        testCases: [{ input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6' }]
      },
      java: {
        starterCode: `public class Solution {\n    public static int maxSubArray(int[] nums) {\n        int maxSoFar = nums[0];\n        int currentMax = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            currentMax = Math.max(nums[i], currentMax + nums[i]);\n            maxSoFar = Math.max(maxSoFar, currentMax);\n        }\n        return maxSoFar;\n    }\n}`,
        testCases: [{ input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6' }]
      },
      typescript: {
        starterCode: `function maxSubArray(nums: number[]): number {\n  let maxSoFar = nums[0];\n  let currentMax = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentMax = Math.max(nums[i], currentMax + nums[i]);\n    maxSoFar = Math.max(maxSoFar, currentMax);\n  }\n  return maxSoFar;\n}`,
        testCases: [{ input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6' }]
      }
    },
    explanation: 'Kadane’s algorithm runs in linear O(N) time and O(1) space by computing maximum subarray sum ending at each position.'
  },
  {
    id: 'q_202',
    type: 'code',
    category: 'Data Structures - Strings',
    difficulty: 'Easy',
    question: 'Write a function to check whether a given string is a valid Palindrome (ignoring non-alphanumeric characters and case).',
    languages: {
      javascript: {
        starterCode: `function isPalindrome(s) {\n  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return clean === clean.split('').reverse().join('');\n}`,
        testCases: [{ input: '"A man, a plan, a canal: Panama"', expected: 'true' }]
      },
      python: {
        starterCode: `def is_palindrome(s: str) -> bool:\n    clean = [ch.lower() for ch in s if ch.isalnum()]\n    return clean == clean[::-1]`,
        testCases: [{ input: '"A man, a plan, a canal: Panama"', expected: 'True' }]
      },
      cpp: {
        starterCode: `#include <string>\n#include <cctype>\n\nbool isPalindrome(std::string s) {\n    int left = 0, right = s.length() - 1;\n    while (left < right) {\n        while (left < right && !isalnum(s[left])) left++;\n        while (left < right && !isalnum(s[right])) right--;\n        if (tolower(s[left]) != tolower(s[right])) return false;\n        left++; right--;\n    }\n    return true;\n}`,
        testCases: [{ input: '"A man, a plan, a canal: Panama"', expected: 'true' }]
      },
      java: {
        starterCode: `public class Solution {\n    public static boolean isPalindrome(String s) {\n        String clean = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();\n        String rev = new StringBuilder(clean).reverse().toString();\n        return clean.equals(rev);\n    }\n}`,
        testCases: [{ input: '"A man, a plan, a canal: Panama"', expected: 'true' }]
      },
      typescript: {
        starterCode: `function isPalindrome(s: string): boolean {\n  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return clean === clean.split('').reverse().join('');\n}`,
        testCases: [{ input: '"A man, a plan, a canal: Panama"', expected: 'true' }]
      }
    },
    explanation: 'Two-pointer approach compares alphanumeric characters from both ends towards center in O(N) time.'
  }
];

// Database Initialization helper (ensures new initial users are synced)
export const initDatabase = () => {
  const existingUsers = localStorage.getItem('LearnSphere_users');
  if (!existingUsers) {
    localStorage.setItem('LearnSphere_users', JSON.stringify(INITIAL_USERS));
  } else {
    // Check if new accounts exist, merge if not
    const parsed = JSON.parse(existingUsers);
    const hasOviya = parsed.some(u => u.email === 'oviyas.cs24@bitsathy.ac.in');
    if (!hasOviya) {
      localStorage.setItem('LearnSphere_users', JSON.stringify(INITIAL_USERS));
    }
  }

  if (!localStorage.getItem('LearnSphere_questions')) {
    localStorage.setItem('LearnSphere_questions', JSON.stringify(INITIAL_QUESTION_BANK));
  }
};

export const getDBUsers = () => {
  initDatabase();
  return JSON.parse(localStorage.getItem('LearnSphere_users'));
};

export const saveDBUsers = (users) => {
  localStorage.setItem('LearnSphere_users', JSON.stringify(users));
};

export const getDBQuestions = () => {
  initDatabase();
  return JSON.parse(localStorage.getItem('LearnSphere_questions'));
};
