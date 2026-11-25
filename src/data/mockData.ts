import {
  User,
  CompanyExperience,
  MentorProfile,
  MentorshipRequest,
  MentorQuestion,
  PrepTask,
  CompanyApplication,
  PlacementResource,
  UpcomingInterview
} from '../types/placement';

export const initialUsers: { student: User; mentor: User; admin: User } = {
  student: {
    id: 'user-aman',
    name: 'Aman Sharma',
    email: 'aman.sharma@college.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    college: 'Delhi Technological University (DTU)',
    branch: 'Computer Science & Engineering',
    gradYear: 2025,
  },
  mentor: {
    id: 'mentor-priya',
    name: 'Priya Nair',
    email: 'priya.nair@microsoft.com',
    role: 'mentor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    company: 'Microsoft',
    jobRole: 'Software Engineer II (Azure Cloud)',
    college: 'NIT Trichy (Batch of 2023)',
    gradYear: 2023,
    verified: true,
  },
  admin: {
    id: 'admin-sharma',
    name: 'Prof. Rajesh Sharma',
    email: 'placement.cell@college.edu',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    college: 'University Placement & Training Directorate',
    jobRole: 'Chief Placement Coordinator',
  },
};

export const initialCompanies: CompanyExperience[] = [
  {
    id: 'exp-google-swe-2024',
    companyName: 'Google',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    jobRole: 'Software Engineer (SWE-1)',
    placementYear: 2024,
    difficulty: 'Hard',
    isVerified: true,
    status: 'published',
    mentorId: 'mentor-rohan',
    mentorName: 'Rohan Verma',
    mentorRole: 'Software Engineer @ Google',
    mentorCompany: 'Google India',
    mentorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    ctcOffered: '₹34.5 LPA (Base + Stocks + Bonus)',
    overallRating: 4.8,
    summary:
      'Cracked Google on-campus through structured preparation in Graph Algorithms, Dynamic Programming, and rigorous CS fundamentals.',
    rounds: [
      {
        roundNumber: 1,
        roundName: 'Online Assessment',
        duration: '60 minutes',
        platform: 'Google Internal OA Platform',
        details: '2 complex algorithmic coding challenges focusing on dynamic programming on trees and greedy intervals.',
        keyTopics: ['Dynamic Programming', 'Segment Trees', 'Greedy Optimization'],
        tips: 'Time complexity is strictly tested. Focus on edge cases like empty inputs, boundary limits, and large 64-bit integer values.',
        codingQuestions: [
          {
            title: 'Subtree Sum with Prime Constraints',
            difficulty: 'Hard',
            topics: ['Tree DP', 'Number Theory'],
            description: 'Given a tree with N weighted nodes, find the maximum path sum where node weights along the path are pairwise co-prime.',
            sampleInputOutput: 'Input: N=5, Edges=[[1,2],[1,3]...], Weights=[2,3,5,7,11] -> Output: 28',
            approachTip: 'Use post-order DFS combined with prime factorization states memoized per subtree.'
          },
          {
            title: 'Optimal Server Load Balancing',
            difficulty: 'Medium',
            topics: ['Sliding Window', 'Prefix Sums'],
            description: 'Balance request spikes across k distributed microservices with minimal variance.',
            approachTip: 'Binary search over maximum permitted load with greedy interval verification in O(N log M).'
          }
        ]
      },
      {
        roundNumber: 2,
        roundName: 'Technical Interview 1',
        duration: '45 minutes',
        platform: 'Google Meet + Google Docs',
        details: 'Pure Data Structures and Algorithms with live code typing on Google Docs without IDE auto-complete.',
        keyTopics: ['Graph Traversals (BFS/DFS)', 'Topological Sort', 'Cycle Detection'],
        tips: 'Think aloud right from the beginning. Google interviewers care deeply about how you communicate tradeoffs before writing code.',
        codingQuestions: [
          {
            title: 'Alien Dictionary Order Reconstruct',
            difficulty: 'Medium',
            topics: ['Topological Sort', 'DAG'],
            description: 'Given a sorted dictionary of alien language words, derive the unique character alphabet ordering if valid.',
            approachTip: 'Construct directed adjacency list between adjacent mismatching characters and detect cycles using Kahn’s Algorithm.'
          }
        ]
      },
      {
        roundNumber: 3,
        roundName: 'Technical Interview 2',
        duration: '45 minutes',
        platform: 'Google Meet + Google Docs',
        details: 'Focus on System Design basics, Multi-threading concepts, and complex string algorithms.',
        keyTopics: ['Concurrency', 'Trie', 'Memory Cache Design (LRU)'],
        tips: 'Be prepared to explain thread safety, mutex locks, and big-O memory footprints.',
        codingQuestions: [
          {
            title: 'Concurrent Thread-Safe LRU Cache',
            difficulty: 'Hard',
            topics: ['Hash Map', 'Doubly Linked List', 'Locks'],
            description: 'Implement a high-throughput Least Recently Used cache with read-write locking to prevent race conditions.',
            approachTip: 'Use ReadWriteLock with double-checked locking idiom and doubly linked list pointer updates.'
          }
        ]
      },
      {
        roundNumber: 4,
        roundName: 'Googleyness & Leadership (HR)',
        duration: '45 minutes',
        platform: 'Google Meet',
        details: 'Behavioral assessment of ambiguity handling, constructive disagreement with teammates, and integrity.',
        keyTopics: ['STAR Method', 'Inclusive Collaboration', 'Handling Ambiguity'],
        tips: 'Ground every story in real college projects, hackathons, or club leadership. Never blame peers when discussing past failures.'
      }
    ],
    preparationTips: [
      'Solve at least 250+ LeetCode Medium/Hard questions with special emphasis on Graphs and Dynamic Programming.',
      'Practice writing clean code on plain text editors (Google Docs) without linting or auto-complete.',
      'Prepare 4 structured STAR stories: Technical conflict, difficult deadline, project failure, leadership moment.'
    ],
    submittedAt: '2024-03-15',
    tags: ['Tier-1 Tech', 'High CTC', 'Algorithms', 'DSA']
  },
  {
    id: 'exp-microsoft-swe-2024',
    companyName: 'Microsoft',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
    jobRole: 'Software Engineer',
    placementYear: 2024,
    difficulty: 'Medium',
    isVerified: true,
    status: 'published',
    mentorId: 'mentor-priya',
    mentorName: 'Priya Nair',
    mentorRole: 'Software Engineer II @ Microsoft',
    mentorCompany: 'Microsoft',
    mentorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    ctcOffered: '₹28 LPA (Base + Performance Bonus + Stock Grants)',
    overallRating: 4.7,
    summary:
      'Microsoft interview process was extremely structured, placing strong emphasis on clean Object-Oriented Design, edge case testing, and collaborative problem solving.',
    rounds: [
      {
        roundNumber: 1,
        roundName: 'Online Assessment',
        duration: '90 minutes',
        platform: 'Codility',
        details: '3 algorithmic problems testing string manipulation, bit manipulation, and tree traversals.',
        keyTopics: ['Bitwise XOR', 'Binary Trees', 'Strings'],
        tips: 'Codility tests for high code correctness and time complexity. Avoid unnecessary quadratic loops.',
        codingQuestions: [
          {
            title: 'Min Flips to Make Binary String Alternating',
            difficulty: 'Medium',
            topics: ['Greedy', 'Sliding Window'],
            description: 'Find minimum bit flips needed to transform a circular binary string into an alternating sequence.',
            approachTip: 'Compare with expected target templates 0101... and 1010... using rolling window.'
          }
        ]
      },
      {
        roundNumber: 2,
        roundName: 'Technical Interview 1',
        duration: '60 minutes',
        platform: 'Microsoft Teams',
        details: 'Deep dive into Linked Lists and Binary Search Trees with live unit testing implementation.',
        keyTopics: ['Linked Lists', 'BST Lowest Common Ancestor', 'Edge Cases'],
        tips: 'Always write your own test cases (null pointers, single node, skewed trees) before declaring you are done.',
        codingQuestions: [
          {
            title: 'Clone a Linked List with Random Pointers',
            difficulty: 'Medium',
            topics: ['Linked List', 'Hash Map'],
            description: 'Deep copy a complex list where each node has a next and arbitrary random pointer in O(1) auxiliary space.',
            approachTip: 'Interleave copied nodes within original list nodes, assign random pointers, then decouple.'
          }
        ]
      },
      {
        roundNumber: 3,
        roundName: 'Technical Interview 2',
        duration: '60 minutes',
        platform: 'Microsoft Teams',
        details: 'In-depth review of resume projects, DBMS indexing, ACID properties, and Low-Level Design (LLD).',
        keyTopics: ['OOP Design Patterns', 'SQL Query Optimization', 'REST API Architecture'],
        tips: 'Demonstrate SOLID principles. For instance, design a Parking Lot or Elevator system with clean class diagrams.',
        codingQuestions: [
          {
            title: 'Design an Extensible Notification Service (LLD)',
            difficulty: 'Medium',
            topics: ['Observer Pattern', 'Factory Pattern'],
            description: 'Design classes to support Email, SMS, and Push notifications with priority queuing and rate limiting.',
            approachTip: 'Apply Factory Pattern for channel instantiations and Observer Pattern for event publishers.'
          }
        ]
      },
      {
        roundNumber: 4,
        roundName: 'AA (As Appropriate / Partner Interview)',
        duration: '45 minutes',
        platform: 'Microsoft Teams',
        details: 'Conducted by a Principal Engineering Manager assessing cultural alignment, growth mindset, and learning agility.',
        keyTopics: ['Growth Mindset', 'Teamwork', 'Project Impact'],
        tips: 'Be passionate about why Microsoft tools and products inspire you. Show how you learn new frameworks rapidly.'
      }
    ],
    preparationTips: [
      'Master OOP principles (Abstraction, Encapsulation, Polymorphism, Inheritance) and be ready to write clean code.',
      'Revise SQL queries (Joins, Group By, Subqueries) and Indexing mechanisms (B-Trees vs Hash Indexing).',
      'Study Microsoft core values: Inclusivity, Customer Obsession, and Growth Mindset.'
    ],
    submittedAt: '2024-02-20',
    tags: ['Product-Based', 'High CTC', 'Cloud & Systems', 'OOP']
  },
  {
    id: 'exp-amazon-sde-2024',
    companyName: 'Amazon',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    jobRole: 'SDE-1 (Software Development Engineer)',
    placementYear: 2024,
    difficulty: 'Hard',
    isVerified: true,
    status: 'published',
    mentorId: 'mentor-sneha',
    mentorName: 'Sneha Patel',
    mentorRole: 'SDE-1 @ Amazon',
    mentorCompany: 'Amazon Web Services',
    mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    ctcOffered: '₹31.5 LPA (Base + Relocation + Stock RSUs)',
    overallRating: 4.6,
    summary:
      'Amazon interviews are unique because 50% of the evaluation hinges on Amazon Leadership Principles (Customer Obsession, Ownership, Dive Deep) alongside algorithmic problem-solving.',
    rounds: [
      {
        roundNumber: 1,
        roundName: 'Online Assessment (OA 1 & 2)',
        duration: '105 minutes',
        platform: 'Amazon Assessment Portal',
        details: '2 coding problems + 1 Work Simulation / Work Styles survey assessing Amazon Leadership Principles.',
        keyTopics: ['Arrays', 'Heaps / Priority Queues', 'Work Simulation'],
        tips: 'Do not rush the work simulation survey! Consistency in your LP answers matters just as much as coding test cases.',
        codingQuestions: [
          {
            title: 'K Closest Delivery Points to Warehouse',
            difficulty: 'Medium',
            topics: ['Max-Heap', 'Geometry Distance'],
            description: 'Find K closest coordinates to origin (0,0) among N customer locations in O(N log K).',
            approachTip: 'Maintain a Max-Heap of size K. When capacity is exceeded, pop the farthest point.'
          }
        ]
      },
      {
        roundNumber: 2,
        roundName: 'Technical Interview 1',
        duration: '60 minutes',
        platform: 'Amazon Chime',
        details: '20 minutes LP questions + 40 minutes Trees & Dynamic Programming problem.',
        keyTopics: ['Customer Obsession LP', 'Binary Tree Maximum Path Sum', 'Complexity'],
        tips: 'Format behavioral answers in STAR format: Situation, Task, Action, Result. Quantify your results (% improvement, speed up).',
        codingQuestions: [
          {
            title: 'Binary Tree Maximum Path Sum',
            difficulty: 'Hard',
            topics: ['Binary Tree', 'DFS / Post-order'],
            description: 'Find path with maximum sum between any two nodes in a binary tree (can start and end at any node).',
            approachTip: 'Compute max gain through left and right subtrees recursively, updating global maximum sum at each node.'
          }
        ]
      },
      {
        roundNumber: 3,
        roundName: 'Technical Interview 2',
        duration: '60 minutes',
        platform: 'Amazon Chime',
        details: '20 minutes Ownership & Dive Deep LP + 40 minutes Graph algorithms / Matrix BFS.',
        keyTopics: ['Ownership LP', 'Graph BFS', 'Rotten Oranges / Shortest Path'],
        tips: 'State time and space complexity immediately after presenting brute force and optimal solutions.',
        codingQuestions: [
          {
            title: 'Rotten Oranges / Virus Infection Matrix',
            difficulty: 'Medium',
            topics: ['Multi-source BFS', 'Grid'],
            description: 'Determine minimum minutes elapsed until no fresh fruit remains in an N x M grid.',
            approachTip: 'Initialize queue with all initially rotten fruit positions and perform level-order multi-source BFS.'
          }
        ]
      },
      {
        roundNumber: 4,
        roundName: 'Bar Raiser Round',
        duration: '60 minutes',
        platform: 'Amazon Chime',
        details: 'Conducted by an independent Amazonian outside the hiring team to evaluate long-term potential and cultural bar raising.',
        keyTopics: ['Bias for Action', 'Have Backbone; Disagree and Commit', 'System Design basics'],
        tips: 'Be honest about mistakes and explain what retrospective lessons you carried forward into future projects.'
      }
    ],
    preparationTips: [
      'Thoroughly memorize and prepare 2 detailed real-life stories for all 16 Amazon Leadership Principles.',
      'Practice BFS/DFS on grids and dynamic programming on trees.',
      'Always ask clarifying questions regarding data range and null conditions.'
    ],
    submittedAt: '2024-01-18',
    tags: ['Big Tech', 'Leadership Principles', 'Competitive Coding', 'AWS']
  },
  {
    id: 'exp-infosys-sp-2024',
    companyName: 'Infosys',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg',
    jobRole: 'Specialist Programmer (Power Programmer)',
    placementYear: 2024,
    difficulty: 'Medium',
    isVerified: true,
    status: 'published',
    mentorId: 'mentor-vikram',
    mentorName: 'Vikram Rao',
    mentorRole: 'Specialist Programmer @ Infosys',
    mentorCompany: 'Infosys Ltd',
    mentorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    ctcOffered: '₹9.5 LPA (Specialist Programmer Cadre)',
    overallRating: 4.4,
    summary:
      'Selected through the InfyTQ / HackWithInfy grand challenge. The SP technical round was heavy on advanced DSA (Segment Trees, Trie) and database fundamentals.',
    rounds: [
      {
        roundNumber: 1,
        roundName: 'Online Assessment (HackWithInfy Round 1)',
        duration: '180 minutes',
        platform: 'HackerEarth',
        details: '3 competitive programming problems ranging from Easy-Medium to Hard.',
        keyTopics: ['Dynamic Programming', 'Disjoint Set Union (DSU)', 'Bitmasking'],
        tips: 'Solving 2 complete problems and 1 partial problem safely qualifies you for the Specialist Programmer interview tier.'
      },
      {
        roundNumber: 2,
        roundName: 'Technical Interview 1',
        duration: '45 minutes',
        platform: 'Infosys Webex',
        details: 'Live coding on Trie structures and Graph connected components + DBMS joins.',
        keyTopics: ['Trie Auto-complete', 'SQL Group By / Having', 'OS Paging'],
        tips: 'Be prepared to write raw SQL queries on paper/notepad without workbench assistance.'
      },
      {
        roundNumber: 3,
        roundName: 'Technical & Managerial Interview',
        duration: '30 minutes',
        platform: 'Infosys Webex',
        details: 'Project architecture discussion, cloud deployment experience, and career goals.',
        keyTopics: ['Project Architecture', 'Git version control', 'Scalability'],
        tips: 'Highlight any full-stack projects, deployed websites, or published papers.'
      },
      {
        roundNumber: 4,
        roundName: 'HR Discussion',
        duration: '15 minutes',
        platform: 'Infosys Webex',
        details: 'Verification of academic criteria, relocation flexibility, and service agreement orientation.',
        keyTopics: ['Relocation flexibility', 'Communication skills'],
        tips: 'Be articulate, positive, and clear regarding joining preferences.'
      }
    ],
    preparationTips: [
      'Participate actively in HackWithInfy and InfyTQ certifications early in the 3rd year.',
      'Revise Operating Systems (Deadlock detection, paging, virtual memory) thoroughly.',
      'Be clear on ACID properties and normalization forms (1NF, 2NF, 3NF, BCNF).'
    ],
    submittedAt: '2024-02-28',
    tags: ['Service-to-Product Cadre', 'Mass & Elite Tier', 'Competitive Coding']
  },
  {
    id: 'exp-tcs-digital-2024',
    companyName: 'TCS',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg',
    jobRole: 'TCS Digital / Prime Cadre',
    placementYear: 2024,
    difficulty: 'Medium',
    isVerified: true,
    status: 'published',
    mentorId: 'mentor-anjali',
    mentorName: 'Anjali Deshmukh',
    mentorRole: 'Digital Engineer @ TCS',
    mentorCompany: 'Tata Consultancy Services',
    mentorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    ctcOffered: '₹7.5 - 9.0 LPA (Digital/Prime Tier)',
    overallRating: 4.3,
    summary:
      'Cleared TCS NQT with a high percentile to unlock the Digital/Prime interview stream. Interviewers tested core computer science, basic system architecture, and Java/C++ fundamentals.',
    rounds: [
      {
        roundNumber: 1,
        roundName: 'National Qualifier Test (NQT)',
        duration: '165 minutes',
        platform: 'TCS iON Portal',
        details: 'Cognitive (Aptitude, Verbal, Logical) + Advanced Coding (2 problems).',
        keyTopics: ['Quantitative Aptitude', 'Data Interpretation', 'Array / String Manipulation'],
        tips: 'Speed and accuracy in the cognitive section are vital before accessing the advanced coding section.'
      },
      {
        roundNumber: 2,
        roundName: 'Technical Interview (TR)',
        duration: '40 minutes',
        platform: 'MS Teams',
        details: 'Questions on Java Collections, polymorphism, SQL sub-queries, and final year capstone project.',
        keyTopics: ['OOP in Java', 'HashMap vs TreeMap', 'SQL Indexing', 'Capstone Project'],
        tips: 'Know every line of code in your resume project. Expect questions on how you would scale it.'
      },
      {
        roundNumber: 3,
        roundName: 'Managerial Round (MR)',
        duration: '20 minutes',
        platform: 'MS Teams',
        details: 'Scenario-based workplace questions, handling tight deadlines, and learning modern tech stacks.',
        keyTopics: ['Adaptability', 'Problem Solving Scenarios'],
        tips: 'Demonstrate willingness to work with emerging technologies like Generative AI and Cloud.'
      },
      {
        roundNumber: 4,
        roundName: 'HR Interview',
        duration: '15 minutes',
        platform: 'MS Teams',
        details: 'Document verification, background checks, willingness to relocate to TCS campuses.',
        keyTopics: ['Communication', 'Relocation & Shifts'],
        tips: 'Show high enthusiasm and confirm readiness for pan-India deployment.'
      }
    ],
    preparationTips: [
      'Practice TCS NQT mock tests with strict timer controls for aptitude.',
      'Revise OOP concepts and standard Java Collections methods.',
      'Prepare a crisp 2-minute elevator pitch for your capstone project.'
    ],
    submittedAt: '2024-03-01',
    tags: ['TCS Digital', 'NQT Elite', 'Campus Drive']
  },
  {
    id: 'exp-accenture-ae-2024',
    companyName: 'Accenture',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg',
    jobRole: 'Advanced Application Engineering Analyst (AAEA)',
    placementYear: 2024,
    difficulty: 'Medium',
    isVerified: true,
    status: 'published',
    mentorId: 'mentor-kunal',
    mentorName: 'Kunal Singhania',
    mentorRole: 'Associate Software Engineer @ Accenture',
    mentorCompany: 'Accenture Technology',
    mentorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    ctcOffered: '₹6.5 LPA (AAEA Role)',
    overallRating: 4.2,
    summary:
      'Accenture campus hiring for the Advanced role involves Cognitive Assessment, Technical MCQs, Coding, and an AI-assisted Communication Test followed by a virtual interview.',
    rounds: [
      {
        roundNumber: 1,
        roundName: 'Cognitive & Technical Assessment',
        duration: '90 minutes',
        platform: 'Aon Cocubes / Mettl',
        details: 'Critical thinking, English ability, Pseudo-code, Cloud fundamentals, and Network security MCQs.',
        keyTopics: ['Pseudo-code analysis', 'Cloud Computing basics', 'Logical Reasoning'],
        tips: 'Pseudo-code questions test bitwise operations and loop increments. Practice tracing loops by hand.'
      },
      {
        roundNumber: 2,
        roundName: 'Coding Assessment',
        duration: '45 minutes',
        platform: 'Aon Cocubes',
        details: '2 coding problems focused on string parsing, math, and matrix traversal.',
        keyTopics: ['String Parsing', 'Array Math'],
        tips: 'Both questions must compile without syntax errors to qualify for the high package tier.'
      },
      {
        roundNumber: 3,
        roundName: 'Communication Assessment (AI Proctored)',
        duration: '20 minutes',
        platform: 'Pearson / Versant',
        details: 'Automated speaking assessment evaluating pronunciation, fluency, sentence mastery, and listening recall.',
        keyTopics: ['English Fluency', 'Pronunciation', 'Story Retelling'],
        tips: 'Wear a clear noise-cancelling headset and speak with steady, audible pacing.'
      },
      {
        roundNumber: 4,
        roundName: 'Virtual Technical + HR Interview',
        duration: '25 minutes',
        platform: 'Microsoft Teams',
        details: 'Combined panel discussion on project contributions, cloud concepts, and team collaboration.',
        keyTopics: ['Project Highlights', 'Conflict Resolution', 'SDLC Models'],
        tips: 'Emphasize your practical hands-on experience and familiarity with Agile methodologies.'
      }
    ],
    preparationTips: [
      'Practice solving pseudo-code trace tables under time pressure.',
      'Take 2 mock Versant English tests to master conversational cadence.',
      'Have clear examples of teamwork and adaptability ready.'
    ],
    submittedAt: '2024-03-10',
    tags: ['Accenture AAEA', 'Consulting & Tech', 'Campus Placement']
  },
  {
    id: 'exp-gs-quant-2024',
    companyName: 'Goldman Sachs',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg',
    jobRole: 'Software Engineer (Engineering Division)',
    placementYear: 2024,
    difficulty: 'Hard',
    isVerified: true,
    status: 'published',
    mentorId: 'mentor-rohan',
    mentorName: 'Rohan Verma',
    mentorRole: 'Ex-Goldman Sachs Analyst',
    mentorCompany: 'Google India',
    mentorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    ctcOffered: '₹26 LPA + Performance Bonus',
    overallRating: 4.9,
    summary:
      'Goldman Sachs engineering interviews place tremendous weight on computational speed, mathematical probability, low-level OS threading, and clean C++/Java fundamentals.',
    rounds: [
      {
        roundNumber: 1,
        roundName: 'Online Assessment (Aptitude + Math + Coding)',
        duration: '135 minutes',
        platform: 'HackerRank',
        details: 'Quant math & probability questions, advanced CS theory MCQs, and 2 algorithmic coding problems.',
        keyTopics: ['Probability & Permutations', 'Dynamic Programming', 'Math Puzzles'],
        tips: 'The quantitative math section requires fast mental calculation. Do not spend too much time on a single MCQ.'
      },
      {
        roundNumber: 2,
        roundName: 'Technical Round 1 (Algorithms & Data Structures)',
        duration: '60 minutes',
        platform: 'Zoom + CoderPad',
        details: 'Fast live coding on CoderPad. Tested string matching (KMP/Rabin-Karp) and interval scheduling.',
        keyTopics: ['String Hashing', 'Interval Trees', 'Time-Space Tradeoffs'],
        tips: 'Interviewers look for mathematically rigorous proofs of why your approach avoids worst-case regressions.'
      },
      {
        roundNumber: 3,
        roundName: 'Technical Round 2 (Systems, Memory & OS)',
        duration: '60 minutes',
        platform: 'Zoom + CoderPad',
        details: 'Deep exploration of virtual memory, page replacement algorithms, garbage collection in JVM, and thread synchronization.',
        keyTopics: ['Operating Systems', 'Memory Management', 'Deadlocks', 'Java Memory Model'],
        tips: 'Be prepared to explain cache coherency, volatile variables, and atomic instructions.'
      },
      {
        roundNumber: 4,
        roundName: 'Senior Leadership & Cultural Fit',
        duration: '45 minutes',
        platform: 'Zoom',
        details: 'Discussion with an Executive Director on financial ethics, interest in fintech systems, and risk management.',
        keyTopics: ['High-stakes Integrity', 'FinTech Motivation', 'Resilience under Pressure'],
        tips: 'Show curiosity about high-frequency trading latency and mission-critical financial software resilience.'
      }
    ],
    preparationTips: [
      'Practice 50+ probability and combinatorics puzzles (Brainstellar, Heard on the Street).',
      'Study Operating Systems and Computer Architecture with special attention to memory hierarchy.',
      'Practice coding on CoderPad with zero auto-completion and execute against custom test cases.'
    ],
    submittedAt: '2024-02-12',
    tags: ['FinTech', 'High Package', 'Math & Systems', 'Tier-1']
  },
  // Pending review experience for Admin verification demo
  {
    id: 'exp-amazon-intern-pending',
    companyName: 'Amazon',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    jobRole: 'SDE Summer Intern',
    placementYear: 2025,
    difficulty: 'Medium',
    isVerified: false,
    status: 'pending_review',
    mentorId: 'mentor-sneha',
    mentorName: 'Sneha Patel',
    mentorRole: 'SDE-1 @ Amazon',
    mentorCompany: 'Amazon Web Services',
    mentorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    ctcOffered: '₹1.10 Lakh/month Stipend',
    overallRating: 4.5,
    summary:
      'Recently completed the 6-month winter internship drive for AWS S3 Storage team. Two technical rounds focused on Trees, Binary Search, and Customer Obsession.',
    rounds: [
      {
        roundNumber: 1,
        roundName: 'Online Assessment',
        duration: '90 minutes',
        platform: 'Amazon HackerRank',
        details: '2 coding challenges on sliding window and priority queues.',
        keyTopics: ['Sliding Window', 'Priority Queue'],
        tips: 'Clean variable naming and passing all edge test cases within memory limits.'
      },
      {
        roundNumber: 2,
        roundName: 'Technical Round 1',
        duration: '60 minutes',
        platform: 'Amazon Chime',
        details: 'Design an inverted index search for documentation retrieval.',
        keyTopics: ['Hash Table', 'Trie', 'Search Indexing'],
        tips: 'Discuss scale of documents and how tokenization works.'
      }
    ],
    preparationTips: [
      'Master Leetcode top 75 Amazon tagged questions.',
      'Prepare STAR answers for Customer Obsession and Ownership.'
    ],
    submittedAt: '2024-11-20',
    tags: ['Internship', 'AWS', 'Under Review']
  }
];

export const initialMentors: MentorProfile[] = [
  {
    id: 'mentor-priya',
    name: 'Priya Nair',
    email: 'priya.nair@microsoft.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    company: 'Microsoft',
    jobRole: 'Software Engineer II (Azure Cloud)',
    placementYear: 2023,
    college: 'NIT Trichy',
    bio: 'Placed at Microsoft in 2023. Passionate about helping juniors crack cloud engineering and SDE interviews with structured Low-Level Design & System Architecture preparation.',
    specializations: ['Object-Oriented Design', 'Azure Cloud', 'System Design Basics', 'Resume Review'],
    isVerified: true,
    verificationBadgeType: 'Gold',
    rating: 4.9,
    menteesCount: 38,
    availableForMentorship: true,
    linkedinUrl: 'https://linkedin.com/in/priya-nair-demo'
  },
  {
    id: 'mentor-rohan',
    name: 'Rohan Verma',
    email: 'rohan.verma@google.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    company: 'Google',
    jobRole: 'Software Engineer (Google Search)',
    placementYear: 2024,
    college: 'Delhi Technological University (DTU)',
    bio: 'Candidate Master on Codeforces. Experienced with Tier-1 on-campus and off-campus tech drives. Expert in Graph algorithms, DP, and Competitive Programming.',
    specializations: ['Advanced DSA', 'Competitive Programming', 'Googleyness', 'Mock Coding'],
    isVerified: true,
    verificationBadgeType: 'Gold',
    rating: 4.95,
    menteesCount: 52,
    availableForMentorship: true,
    linkedinUrl: 'https://linkedin.com/in/rohan-verma-demo'
  },
  {
    id: 'mentor-sneha',
    name: 'Sneha Patel',
    email: 'sneha.patel@amazon.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    company: 'Amazon',
    jobRole: 'SDE-1 (AWS Serverless)',
    placementYear: 2024,
    college: 'BITS Pilani',
    bio: 'Cracked Amazon SDE-1 through off-campus application. Here to guide you through Amazon Leadership Principles, high-impact resume crafting, and DSA drills.',
    specializations: ['Amazon LPs', 'High-Impact Resumes', 'BFS/DFS & Heaps', 'Off-Campus Strategies'],
    isVerified: true,
    verificationBadgeType: 'Gold',
    rating: 4.85,
    menteesCount: 29,
    availableForMentorship: true,
    linkedinUrl: 'https://linkedin.com/in/sneha-patel-demo'
  },
  {
    id: 'mentor-vikram',
    name: 'Vikram Rao',
    email: 'vikram.rao@infosys.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    company: 'Infosys',
    jobRole: 'Specialist Programmer (AI Practice)',
    placementYear: 2023,
    college: 'VIT Vellore',
    bio: 'HackWithInfy Top 50 Ranker. Specialist Programmer mentorship covering transition from service-level mindset to elite product coding standards.',
    specializations: ['HackWithInfy', 'DBMS & SQL', 'Operating Systems', 'Fast Track Coding'],
    isVerified: true,
    verificationBadgeType: 'Silver',
    rating: 4.75,
    menteesCount: 41,
    availableForMentorship: true,
    linkedinUrl: 'https://linkedin.com/in/vikram-rao-demo'
  },
  {
    id: 'mentor-anjali',
    name: 'Anjali Deshmukh',
    email: 'anjali.d@tcs.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    company: 'TCS',
    jobRole: 'Digital Engineer (Data & AI)',
    placementYear: 2023,
    college: 'Pune Institute of Computer Technology (PICT)',
    bio: 'Helped 60+ college students achieve TCS Digital and Prime selections. Focused on Aptitude speed tricks, Java Collections, and confident interview demeanor.',
    specializations: ['TCS NQT Preparation', 'Quantitative Aptitude', 'Java Collections', 'Interview Anxiety Management'],
    isVerified: true,
    verificationBadgeType: 'Silver',
    rating: 4.8,
    menteesCount: 64,
    availableForMentorship: true,
    linkedinUrl: 'https://linkedin.com/in/anjali-deshmukh-demo'
  },
  // Pending verification mentor for Admin review demo
  {
    id: 'mentor-karan-pending',
    name: 'Karan Mehra',
    email: 'karan.mehra@atlassian.com',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    company: 'Atlassian',
    jobRole: 'Associate Software Engineer',
    placementYear: 2024,
    college: 'IIT Roorkee',
    bio: 'Recently joined Atlassian India. Looking to mentor students in Low-Level Design and Distributed Systems fundamentals.',
    specializations: ['Atlassian Craft Demon', 'LLD', 'Full Stack System Design'],
    isVerified: false,
    verificationBadgeType: 'Official Senior',
    rating: 5.0,
    menteesCount: 0,
    availableForMentorship: false,
    linkedinUrl: 'https://linkedin.com/in/karan-mehra-demo'
  }
];

export const initialMentorshipRequests: MentorshipRequest[] = [
  {
    id: 'req-1',
    studentId: 'user-aman',
    studentName: 'Aman Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    studentCollege: 'DTU CSE 4th Year',
    mentorId: 'mentor-priya',
    mentorName: 'Priya Nair',
    targetCompany: 'Microsoft',
    message:
      'Hi Priya Maam, I am in my 7th semester preparing for Microsoft on-campus drive. My DSA is solid but I need guidance on the Low-Level Design and Partner interview rounds.',
    status: 'accepted',
    createdAt: '2024-11-22',
    responseNote:
      'Hi Aman, happy to mentor you! Lets focus on your OOP design patterns and review your projects this weekend.'
  },
  {
    id: 'req-2',
    studentId: 'user-aman',
    studentName: 'Aman Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    studentCollege: 'DTU CSE 4th Year',
    mentorId: 'mentor-rohan',
    mentorName: 'Rohan Verma',
    targetCompany: 'Google',
    message:
      'Hello Rohan Sir! I am practicing LeetCode DP and Graph topics. Could you provide a quick roadmap on how to manage time during Google 45-minute live coding interviews?',
    status: 'pending',
    createdAt: '2024-11-24'
  }
];

export const initialMentorQuestions: MentorQuestion[] = [
  {
    id: 'q-1',
    studentId: 'user-aman',
    studentName: 'Aman Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    mentorId: 'mentor-priya',
    mentorName: 'Priya Nair',
    companyTag: 'Microsoft',
    subject: 'Low-Level Design in SDE-1 interviews',
    question:
      'Do Microsoft interviewers expect full working code for LLD questions like Parking Lot or Elevator, or are class diagrams and method signatures enough?',
    answer:
      'For SDE-1, they generally expect you to write clean, compilable class skeletons with appropriate design patterns (like Factory and Strategy), proper use of interfaces, and thread-safety considerations. You dont need a database layer, but the core business logic should be demonstrable.',
    answeredAt: '2024-11-23 18:30',
    status: 'answered',
    createdAt: '2024-11-23 11:15'
  },
  {
    id: 'q-2',
    studentId: 'user-aman',
    studentName: 'Aman Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    mentorId: 'mentor-sneha',
    mentorName: 'Sneha Patel',
    companyTag: 'Amazon',
    subject: 'Handling Amazon Leadership Principles without prior internship experience',
    question:
      'If I do not have a previous industry internship, can I use my major academic project and hackathon experiences to answer LP questions like "Bias for Action" and "Customer Obsession"?',
    answer:
      'Absolutely! For university campus drives, interviewers know you are a student. Frame your academic capstone projects, open-source pull requests, or technical club leadership into the STAR format. For Customer Obsession, explain how your app users or hackathon judges interacted with your solution.',
    answeredAt: '2024-11-24 14:10',
    status: 'answered',
    createdAt: '2024-11-24 09:20'
  },
  {
    id: 'q-3',
    studentId: 'user-aman',
    studentName: 'Aman Sharma',
    studentAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    mentorId: 'mentor-priya',
    mentorName: 'Priya Nair',
    companyTag: 'Microsoft',
    subject: 'Azure SDK project relevance in interview',
    question:
      'I built a full-stack project using Azure Blob Storage and Cosmos DB. Should I highlight Azure architecture during Round 3?',
    status: 'unanswered',
    createdAt: '2024-11-25 16:45'
  }
];

export const initialPrepTasks: PrepTask[] = [
  // 1. Data Structures and Algorithms
  {
    id: 'task-dsa-1',
    category: 'Data Structures and Algorithms',
    title: 'Solve Blind 75 Top LeetCode Patterns (Arrays & Two Pointers)',
    description: 'Complete 3Sum, Container With Most Water, Best Time to Buy and Sell Stock.',
    completed: true,
    targetDate: '2024-11-15',
    priority: 'High',
    resourceLink: 'https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions'
  },
  {
    id: 'task-dsa-2',
    category: 'Data Structures and Algorithms',
    title: 'Master Binary Tree Traversals (Iterative & Recursive)',
    description: 'Inorder, Preorder, Postorder without recursion using explicit Stack.',
    completed: true,
    targetDate: '2024-11-20',
    priority: 'High'
  },
  {
    id: 'task-dsa-3',
    category: 'Data Structures and Algorithms',
    title: 'Dynamic Programming Patterns: 0/1 Knapsack & Longest Common Subsequence',
    description: 'Solve Coin Change, Edit Distance, and Partition Equal Subset Sum.',
    completed: false,
    targetDate: '2024-12-05',
    priority: 'High'
  },
  {
    id: 'task-dsa-4',
    category: 'Data Structures and Algorithms',
    title: 'Graph Algorithms: Dijkstra, Bellman-Ford & Kahn’s Topological Sort',
    description: 'Practice Course Schedule I & II and Network Delay Time.',
    completed: false,
    targetDate: '2024-12-10',
    priority: 'High'
  },

  // 2. Object-Oriented Programming
  {
    id: 'task-oop-1',
    category: 'Object-Oriented Programming',
    title: 'Review 4 Pillars of OOP with Real-world C++/Java Code Snippets',
    description: 'Polymorphism (Runtime vs Compile-time), Encapsulation, Abstraction, Inheritance.',
    completed: true,
    targetDate: '2024-11-18',
    priority: 'High'
  },
  {
    id: 'task-oop-2',
    category: 'Object-Oriented Programming',
    title: 'Implement SOLID Design Principles in an Example Project',
    description: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion.',
    completed: true,
    targetDate: '2024-11-22',
    priority: 'Medium'
  },
  {
    id: 'task-oop-3',
    category: 'Object-Oriented Programming',
    title: 'Design Patterns: Factory, Singleton, Observer, and Strategy',
    description: 'Be prepared to draw UML diagrams and write thread-safe singletons.',
    completed: false,
    targetDate: '2024-12-08',
    priority: 'High'
  },

  // 3. DBMS
  {
    id: 'task-dbms-1',
    category: 'DBMS',
    title: 'Master SQL Joins, Aggregate Functions, and Correlated Subqueries',
    description: 'Write complex queries involving INNER, LEFT, RIGHT, FULL OUTER joins and GROUP BY HAVING.',
    completed: true,
    targetDate: '2024-11-16',
    priority: 'High'
  },
  {
    id: 'task-dbms-2',
    category: 'DBMS',
    title: 'ACID Properties, Transaction Isolation Levels & Dirty Read Scenarios',
    description: 'Understand Read Committed, Repeatable Read, and Serializable isolation anomalies.',
    completed: false,
    targetDate: '2024-12-02',
    priority: 'High'
  },
  {
    id: 'task-dbms-3',
    category: 'DBMS',
    title: 'Database Normalization (1NF, 2NF, 3NF, BCNF) and De-normalization Tradeoffs',
    description: 'Practice functional dependency decomposition on previous placement question papers.',
    completed: false,
    targetDate: '2024-12-07',
    priority: 'Medium'
  },

  // 4. Operating Systems
  {
    id: 'task-os-1',
    category: 'Operating Systems',
    title: 'Process vs Thread, Context Switching, and IPC Mechanisms',
    description: 'Explain pipes, message queues, shared memory, and sockets.',
    completed: true,
    targetDate: '2024-11-19',
    priority: 'High'
  },
  {
    id: 'task-os-2',
    category: 'Operating Systems',
    title: 'CPU Scheduling Algorithms & Deadlock Prevention (Banker’s Algorithm)',
    description: 'Compare FCFS, SJF, Round Robin, Priority scheduling and 4 necessary conditions for deadlock.',
    completed: true,
    targetDate: '2024-11-24',
    priority: 'Medium'
  },
  {
    id: 'task-os-3',
    category: 'Operating Systems',
    title: 'Virtual Memory, Paging, Page Fault Handling, and LRU Page Replacement',
    description: 'Solve numericals on Translation Lookaside Buffer (TLB) hit ratios and inverted page tables.',
    completed: false,
    targetDate: '2024-12-06',
    priority: 'High'
  },

  // 5. Computer Networks
  {
    id: 'task-cn-1',
    category: 'Computer Networks',
    title: 'OSI 7 Layers vs TCP/IP Protocol Suite Deep-dive',
    description: 'Functions and protocols at each layer (HTTP, DNS, TCP, UDP, IP, ARP, Ethernet).',
    completed: true,
    targetDate: '2024-11-21',
    priority: 'High'
  },
  {
    id: 'task-cn-2',
    category: 'Computer Networks',
    title: 'TCP 3-Way Handshake, 4-Way Connection Termination & Congestion Control',
    description: 'Understand SYN, ACK, FIN flags, Slow Start, Congestion Avoidance, and Fast Retransmit.',
    completed: false,
    targetDate: '2024-12-04',
    priority: 'High'
  },
  {
    id: 'task-cn-3',
    category: 'Computer Networks',
    title: 'DNS Resolution Lifecycle & What happens when you type google.com in browser',
    description: 'Browser cache -> OS resolver -> Recursive DNS -> Root -> TLD -> Authoritative server -> TLS Handshake.',
    completed: false,
    targetDate: '2024-12-09',
    priority: 'High'
  },

  // 6. Aptitude and Logical Reasoning
  {
    id: 'task-apt-1',
    category: 'Aptitude and Logical Reasoning',
    title: 'Quantitative Aptitude: Time, Speed & Distance, Work & Wages, Percentages',
    description: 'Solve 50 previous campus placement aptitude problems from IndiaBIX.',
    completed: true,
    targetDate: '2024-11-14',
    priority: 'High'
  },
  {
    id: 'task-apt-2',
    category: 'Aptitude and Logical Reasoning',
    title: 'Logical Reasoning: Syllogisms, Blood Relations, and Seating Arrangements',
    description: 'Target circular seating and floor puzzle problem sets.',
    completed: true,
    targetDate: '2024-11-23',
    priority: 'Medium'
  },
  {
    id: 'task-apt-3',
    category: 'Aptitude and Logical Reasoning',
    title: 'Verbal Ability & Reading Comprehension under 2-minute per question timer',
    description: 'Error spotting, sentence correction, and critical reasoning passages.',
    completed: false,
    targetDate: '2024-12-03',
    priority: 'Medium'
  },

  // 7. Technical Interview Practice
  {
    id: 'task-tip-1',
    category: 'Technical Interview Practice',
    title: 'Structure 2-minute elevator pitch for Capstone Final Year Project',
    description: 'Highlight problem statement, architecture choices, challenges faced, and live demo link.',
    completed: true,
    targetDate: '2024-11-20',
    priority: 'High'
  },
  {
    id: 'task-tip-2',
    category: 'Technical Interview Practice',
    title: 'Live Mock Coding Practice on Plain Google Docs without Auto-complete',
    description: 'Practice verbalizing problem decomposition and testing boundary conditions out loud.',
    completed: false,
    targetDate: '2024-12-01',
    priority: 'High'
  },
  {
    id: 'task-tip-3',
    category: 'Technical Interview Practice',
    title: 'Review System Design 101: Load Balancing, Caching & Database Sharding',
    description: 'Explain CDN, vertical vs horizontal scaling, and CAP theorem.',
    completed: false,
    targetDate: '2024-12-11',
    priority: 'Medium'
  },

  // 8. HR Interview Preparation
  {
    id: 'task-hr-1',
    category: 'HR Interview Preparation',
    title: 'Prepare STAR Stories for Top 5 Behavioral Questions',
    description: 'Tell me about a time you handled a difficult peer, handled failure, met a strict deadline.',
    completed: true,
    targetDate: '2024-11-21',
    priority: 'High'
  },
  {
    id: 'task-hr-2',
    category: 'HR Interview Preparation',
    title: 'Formulate thoughtful questions to ask the interviewer at the end of round',
    description: 'Questions about team engineering culture, deployment cadence, mentorship culture.',
    completed: true,
    targetDate: '2024-11-25',
    priority: 'Medium'
  },
  {
    id: 'task-hr-3',
    category: 'HR Interview Preparation',
    title: 'Research company core values and recent tech news for target companies',
    description: 'Google, Microsoft, Amazon, and TCS strategic pillars and product announcements.',
    completed: false,
    targetDate: '2024-12-04',
    priority: 'Medium'
  }
];

export const initialApplications: CompanyApplication[] = [
  {
    id: 'app-google',
    companyName: 'Google',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    jobRole: 'Software Engineer (SWE-1)',
    appliedDate: '2024-10-15',
    status: 'Technical Interview',
    interviewDate: '2024-12-05',
    ctc: '₹34.5 LPA',
    location: 'Bangalore / Hyderabad',
    notes: 'Round 1 technical interview scheduled on Dec 5th. Need to revise Graph BFS and Trie prefix matching.',
    link: 'https://careers.google.com',
    updatedAt: '2024-11-24'
  },
  {
    id: 'app-microsoft',
    companyName: 'Microsoft',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
    jobRole: 'Software Engineer',
    appliedDate: '2024-10-20',
    status: 'Online Assessment',
    interviewDate: '2024-11-30',
    ctc: '₹28.0 LPA',
    location: 'Hyderabad / Noida',
    notes: 'Codility OA link received. Complete by Nov 30 evening. Prepare string manipulation and bitwise ops.',
    link: 'https://careers.microsoft.com',
    updatedAt: '2024-11-25'
  },
  {
    id: 'app-amazon',
    companyName: 'Amazon',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    jobRole: 'SDE-1',
    appliedDate: '2024-11-01',
    status: 'Applied',
    ctc: '₹31.5 LPA',
    location: 'Bangalore / Hyderabad',
    notes: 'Applied via campus portal. Referral submitted through senior mentor Sneha Patel.',
    link: 'https://amazon.jobs',
    updatedAt: '2024-11-20'
  },
  {
    id: 'app-goldman',
    companyName: 'Goldman Sachs',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg',
    jobRole: 'Software Engineer',
    appliedDate: '2024-10-10',
    status: 'HR Interview',
    interviewDate: '2024-12-02',
    ctc: '₹26.0 LPA',
    location: 'Bangalore',
    notes: 'Cleared 2 technical rounds! Executive Director interview scheduled on Monday.',
    link: 'https://goldmansachs.com/careers',
    updatedAt: '2024-11-25'
  },
  {
    id: 'app-tcs',
    companyName: 'TCS',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg',
    jobRole: 'TCS Digital Engineer',
    appliedDate: '2024-09-15',
    status: 'Selected',
    ctc: '₹7.5 LPA',
    location: 'Pan India',
    notes: 'Offer letter received! Great backup tier offer in hand. Validated with placement cell.',
    link: 'https://tcs.com/careers',
    updatedAt: '2024-11-10'
  },
  {
    id: 'app-accenture',
    companyName: 'Accenture',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg',
    jobRole: 'AAEA Analyst',
    appliedDate: '2024-09-25',
    status: 'Selected',
    ctc: '₹6.5 LPA',
    location: 'Gurgaon / Bangalore',
    notes: 'Selected after Versant English and virtual panel. Joining scheduled for July 2025.',
    link: 'https://accenture.com/careers',
    updatedAt: '2024-11-12'
  },
  {
    id: 'app-uber',
    companyName: 'Uber',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png',
    jobRole: 'Software Engineer - Backend',
    appliedDate: '2024-10-05',
    status: 'Rejected',
    ctc: '₹38.0 LPA',
    location: 'Bangalore',
    notes: 'Eliminated after OA round due to timeout on the 2nd hard graph problem. Valuable lesson on interval trees.',
    link: 'https://uber.com/careers',
    updatedAt: '2024-10-25'
  },
  {
    id: 'app-atlassian',
    companyName: 'Atlassian',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Atlassian-Logo.svg/1200px-Atlassian-Logo.svg.png',
    jobRole: 'Associate Software Engineer',
    appliedDate: '2024-11-20',
    status: 'Interested',
    ctc: '₹35.0 LPA',
    location: 'Remote / Bangalore',
    notes: 'Drive opening next week. Resume ready with ATS score 92. Need to connect with mentor Karan.',
    link: 'https://atlassian.com/careers',
    updatedAt: '2024-11-24'
  }
];

export const initialResources: PlacementResource[] = [
  {
    id: 'res-1',
    title: 'Top 75 LeetCode Blind Questions with Video Explanations & Python/C++ Solutions',
    category: 'Coding Practice Questions',
    description: 'Curated list of the most essential 75 coding interview questions covering every recurring data structure and algorithmic pattern.',
    isVerified: true,
    contributorName: 'Rohan Verma',
    contributorRole: 'SWE @ Google India',
    submissionYear: 2024,
    downloadsCount: 1420,
    format: 'Interactive Sheet',
    linkUrl: '#'
  },
  {
    id: 'res-2',
    title: 'Microsoft SDE Complete Preparation Blueprint & LLD Cheat Sheet',
    category: 'Company Preparation Guides',
    company: 'Microsoft',
    description: 'Round-by-round guide detailing what Microsoft interviewers look for in Low-Level Design, OOP, and As-Appropriate rounds.',
    isVerified: true,
    contributorName: 'Priya Nair',
    contributorRole: 'SWE II @ Microsoft',
    submissionYear: 2024,
    downloadsCount: 980,
    format: 'PDF',
    linkUrl: '#'
  },
  {
    id: 'res-3',
    title: 'High-Impact ATS-Optimized Tech Resume Template (LaTeX & Word Format)',
    category: 'Resume Preparation Guidance',
    description: 'Battle-tested resume format with proven action verbs and quantifiable metric guidelines that helped 150+ students pass ATS filters.',
    isVerified: true,
    contributorName: 'Prof. Rajesh Sharma',
    contributorRole: 'Placement Cell Directorate',
    submissionYear: 2024,
    downloadsCount: 2310,
    format: 'Markdown',
    linkUrl: '#'
  },
  {
    id: 'res-4',
    title: 'DBMS & SQL Complete Interview Handbook: Normalization to Query Optimization',
    category: 'Technical Interview Tips',
    description: 'Handcrafted notes on indexing, B-Trees vs Hash indexes, transaction isolation levels, and top 30 most-asked SQL join problems.',
    isVerified: true,
    contributorName: 'Vikram Rao',
    contributorRole: 'Specialist Programmer @ Infosys',
    submissionYear: 2024,
    downloadsCount: 840,
    format: 'PDF',
    linkUrl: '#'
  },
  {
    id: 'res-5',
    title: 'Amazon 16 Leadership Principles: Real Examples & STAR Method Templates',
    category: 'Technical Interview Tips',
    company: 'Amazon',
    description: 'Detailed breakdown of all 16 Amazon LPs with student-friendly project examples, common mistakes, and sample follow-up answers.',
    isVerified: true,
    contributorName: 'Sneha Patel',
    contributorRole: 'SDE @ Amazon AWS',
    submissionYear: 2024,
    downloadsCount: 1120,
    format: 'PDF',
    linkUrl: '#'
  },
  {
    id: 'res-6',
    title: 'TCS NQT & Cognizant Quantitative Aptitude Formula Cheat Sheet (100 Formulas)',
    category: 'Aptitude Resources',
    description: 'Speed math shortcuts, percentages, time & distance, probability, and permutations for fast solving under 60 seconds per question.',
    isVerified: true,
    contributorName: 'Anjali Deshmukh',
    contributorRole: 'Digital Engineer @ TCS',
    submissionYear: 2024,
    downloadsCount: 1670,
    format: 'Interactive Sheet',
    linkUrl: '#'
  },
  {
    id: 'res-7',
    title: 'Goldman Sachs Engineering Division Past Interview Question Bank (2022-2024)',
    category: 'Previous Interview Experiences',
    company: 'Goldman Sachs',
    description: 'Collection of 45 verified questions from technical rounds, including math probability puzzles and C++ low-level memory questions.',
    isVerified: true,
    contributorName: 'Rohan Verma',
    contributorRole: 'Ex-Goldman Sachs Intern',
    submissionYear: 2024,
    downloadsCount: 790,
    format: 'PDF',
    linkUrl: '#'
  },
  // Pending review community resource
  {
    id: 'res-8-pending',
    title: 'Operating Systems Multi-threading and Concurrency Crash Course',
    category: 'Technical Interview Tips',
    description: 'Community notes on mutex locks, semaphores, race condition detection, and deadlocks.',
    isVerified: false,
    contributorName: 'Karan Mehra',
    contributorRole: 'Senior Student Contributor',
    submissionYear: 2024,
    downloadsCount: 45,
    format: 'Markdown',
    linkUrl: '#'
  }
];

export const upcomingInterviews: UpcomingInterview[] = [
  {
    id: 'interview-1',
    companyName: 'Microsoft',
    role: 'Software Engineer',
    roundName: 'Online Assessment (Codility)',
    date: 'Tomorrow, Nov 27',
    time: '06:00 PM IST',
    meetingLink: 'https://codility.com/c/demo-session',
    interviewerName: 'Automated Proctor'
  },
  {
    id: 'interview-2',
    companyName: 'Goldman Sachs',
    role: 'Software Engineer',
    roundName: 'HR & Executive Director Round',
    date: 'Mon, Dec 02',
    time: '03:30 PM IST',
    meetingLink: 'https://zoom.us/j/demo-goldman-hr',
    interviewerName: 'Sanjay Chawla (Executive Director)'
  },
  {
    id: 'interview-3',
    companyName: 'Google',
    role: 'Software Engineer (SWE-1)',
    roundName: 'Technical Interview 1 (DSA)',
    date: 'Thu, Dec 05',
    time: '11:00 AM IST',
    meetingLink: 'https://meet.google.com/demo-swe-interview',
    interviewerName: 'Senior SWE Panelist'
  }
];
