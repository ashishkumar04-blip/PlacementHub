import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  User,
  CompanyExperience,
  MentorProfile,
  MentorshipRequest,
  MentorQuestion,
  PrepTask,
  CompanyApplication,
  PlacementResource,
  ApplicationStatus,
  SubjectCategory,
  UpcomingInterview
} from '../types/placement';
import {
  initialUsers,
  initialCompanies,
  initialMentors,
  initialMentorshipRequests,
  initialMentorQuestions,
  initialPrepTasks,
  initialApplications,
  initialResources,
  upcomingInterviews as mockUpcomingInterviews
} from '../data/mockData';

export type NavigationPage =
  | 'landing'
  | 'auth'
  | 'student-dashboard'
  | 'company-hub'
  | 'mentor-directory'
  | 'my-prep'
  | 'application-tracker'
  | 'resources'
  | 'analytics'
  | 'mentor-dashboard'
  | 'admin-dashboard';

interface PlacementContextType {
  activeRole: Role;
  currentUser: User;
  activePage: NavigationPage;
  setActivePage: (page: NavigationPage) => void;
  switchRole: (role: Role) => void;
  
  // Companies & Experiences
  companies: CompanyExperience[];
  selectedExperience: CompanyExperience | null;
  setSelectedExperience: (exp: CompanyExperience | null) => void;
  submitInterviewExperience: (experienceData: Partial<CompanyExperience>) => void;
  verifyInterviewExperience: (expId: string, approve: boolean) => void;

  // Mentors
  mentors: MentorProfile[];
  verifyMentor: (mentorId: string, approve: boolean) => void;
  mentorshipRequests: MentorshipRequest[];
  sendMentorshipRequest: (mentorId: string, mentorName: string, targetCompany: string, message: string) => void;
  respondMentorshipRequest: (requestId: string, status: 'accepted' | 'declined', note?: string) => void;

  // Q&A
  mentorQuestions: MentorQuestion[];
  askMentorQuestion: (mentorId: string, mentorName: string, subject: string, question: string, companyTag?: string) => void;
  answerMentorQuestion: (questionId: string, answer: string) => void;

  // Preparation Tasks
  prepTasks: PrepTask[];
  toggleTask: (taskId: string) => void;
  addTask: (task: { category: SubjectCategory; title: string; description?: string; targetDate: string; priority: 'High' | 'Medium' | 'Low' }) => void;
  deleteTask: (taskId: string) => void;
  categoryProgress: Record<SubjectCategory, { total: number; completed: number; percentage: number }>;
  overallProgress: number;

  // Applications
  applications: CompanyApplication[];
  addApplication: (app: Omit<CompanyApplication, 'id' | 'updatedAt'>) => void;
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  updateApplicationNotes: (appId: string, notes: string) => void;
  deleteApplication: (appId: string) => void;

  // Resources
  resources: PlacementResource[];
  verifyResource: (resourceId: string, approve: boolean) => void;

  // Upcoming Interviews
  upcomingInterviews: UpcomingInterview[];

  // Utility
  resetDemoData: () => void;
  notificationMessage: string | null;
  showNotification: (msg: string) => void;
}

const PlacementContext = createContext<PlacementContextType | undefined>(undefined);

const STORAGE_KEYS = {
  ROLE: 'ph_active_role',
  COMPANIES: 'ph_companies',
  MENTORS: 'ph_mentors',
  REQUESTS: 'ph_mentorship_requests',
  QUESTIONS: 'ph_mentor_questions',
  TASKS: 'ph_prep_tasks',
  APPLICATIONS: 'ph_applications',
  RESOURCES: 'ph_resources'
};

export const PlacementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Active role
  const [activeRole, setActiveRole] = useState<Role>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved as Role) || 'student';
  });

  // Current page
  const [activePage, setActivePage] = useState<NavigationPage>('student-dashboard');

  // Selected experience modal
  const [selectedExperience, setSelectedExperience] = useState<CompanyExperience | null>(null);

  // Notification toast
  const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
  const showNotification = (msg: string) => {
    setNotificationMessage(msg);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 4000);
  };

  // State with LocalStorage fallbacks
  const [companies, setCompanies] = useState<CompanyExperience[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMPANIES);
    return saved ? JSON.parse(saved) : initialCompanies;
  });

  const [mentors, setMentors] = useState<MentorProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MENTORS);
    return saved ? JSON.parse(saved) : initialMentors;
  });

  const [mentorshipRequests, setMentorshipRequests] = useState<MentorshipRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    return saved ? JSON.parse(saved) : initialMentorshipRequests;
  });

  const [mentorQuestions, setMentorQuestions] = useState<MentorQuestion[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    return saved ? JSON.parse(saved) : initialMentorQuestions;
  });

  const [prepTasks, setPrepTasks] = useState<PrepTask[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
    return saved ? JSON.parse(saved) : initialPrepTasks;
  });

  const [applications, setApplications] = useState<CompanyApplication[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [resources, setResources] = useState<PlacementResource[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.RESOURCES);
    return saved ? JSON.parse(saved) : initialResources;
  });

  const [upcomingInterviews] = useState<UpcomingInterview[]>(mockUpcomingInterviews);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, activeRole);
  }, [activeRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MENTORS, JSON.stringify(mentors));
  }, [mentors]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(mentorshipRequests));
  }, [mentorshipRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(mentorQuestions));
  }, [mentorQuestions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(prepTasks));
  }, [prepTasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
  }, [resources]);

  // Derived current user
  const currentUser = initialUsers[activeRole];

  // Role Switcher
  const switchRole = (newRole: Role) => {
    setActiveRole(newRole);
    if (newRole === 'student') {
      setActivePage('student-dashboard');
      showNotification('Switched to Student mode (Aman Sharma)');
    } else if (newRole === 'mentor') {
      setActivePage('mentor-dashboard');
      showNotification('Switched to Mentor mode (Priya Nair @ Microsoft)');
    } else if (newRole === 'admin') {
      setActivePage('admin-dashboard');
      showNotification('Switched to Admin mode (Prof. Rajesh Sharma - Placement Cell)');
    }
  };

  // Preparation Progress Calculations
  const categoriesList: SubjectCategory[] = [
    'Data Structures and Algorithms',
    'Object-Oriented Programming',
    'DBMS',
    'Operating Systems',
    'Computer Networks',
    'Aptitude and Logical Reasoning',
    'Technical Interview Practice',
    'HR Interview Preparation'
  ];

  const categoryProgress: Record<SubjectCategory, { total: number; completed: number; percentage: number }> =
    categoriesList.reduce((acc, cat) => {
      const catTasks = prepTasks.filter((t) => t.category === cat);
      const total = catTasks.length;
      const completed = catTasks.filter((t) => t.completed).length;
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
      acc[cat] = { total, completed, percentage };
      return acc;
    }, {} as Record<SubjectCategory, { total: number; completed: number; percentage: number }>);

  const totalTasks = prepTasks.length;
  const totalCompleted = prepTasks.filter((t) => t.completed).length;
  const overallProgress = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  // Task actions
  const toggleTask = (taskId: string) => {
    setPrepTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  const addTask = (newTask: {
    category: SubjectCategory;
    title: string;
    description?: string;
    targetDate: string;
    priority: 'High' | 'Medium' | 'Low';
  }) => {
    const task: PrepTask = {
      id: `task-${Date.now()}`,
      completed: false,
      ...newTask
    };
    setPrepTasks((prev) => [task, ...prev]);
    showNotification(`New task added to ${newTask.category}`);
  };

  const deleteTask = (taskId: string) => {
    setPrepTasks((prev) => prev.filter((t) => t.id !== taskId));
    showNotification('Task deleted');
  };

  // Application actions
  const addApplication = (appData: Omit<CompanyApplication, 'id' | 'updatedAt'>) => {
    const newApp: CompanyApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setApplications((prev) => [newApp, ...prev]);
    showNotification(`Application added for ${appData.companyName}`);
  };

  const updateApplicationStatus = (appId: string, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((a) =>
        a.id === appId
          ? { ...a, status, updatedAt: new Date().toISOString().split('T')[0] }
          : a
      )
    );
    showNotification(`Application status updated to "${status}"`);
  };

  const updateApplicationNotes = (appId: string, notes: string) => {
    setApplications((prev) =>
      prev.map((a) =>
        a.id === appId
          ? { ...a, notes, updatedAt: new Date().toISOString().split('T')[0] }
          : a
      )
    );
    showNotification('Application notes saved');
  };

  const deleteApplication = (appId: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== appId));
    showNotification('Application removed from tracker');
  };

  // Mentorship Requests
  const sendMentorshipRequest = (
    mentorId: string,
    mentorName: string,
    targetCompany: string,
    message: string
  ) => {
    const req: MentorshipRequest = {
      id: `req-${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentAvatar: currentUser.avatar,
      studentCollege: currentUser.college || 'Engineering Undergraduate',
      mentorId,
      mentorName,
      targetCompany,
      message,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setMentorshipRequests((prev) => [req, ...prev]);
    showNotification(`Mentorship request sent to ${mentorName}`);
  };

  const respondMentorshipRequest = (
    requestId: string,
    status: 'accepted' | 'declined',
    note?: string
  ) => {
    setMentorshipRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, status, responseNote: note } : r
      )
    );
    showNotification(`Mentorship request marked as ${status}`);
  };

  // Q&A
  const askMentorQuestion = (
    mentorId: string,
    mentorName: string,
    subject: string,
    question: string,
    companyTag?: string
  ) => {
    const newQ: MentorQuestion = {
      id: `q-${Date.now()}`,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentAvatar: currentUser.avatar,
      mentorId,
      mentorName,
      subject,
      question,
      companyTag,
      status: 'unanswered',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setMentorQuestions((prev) => [newQ, ...prev]);
    showNotification(`Question submitted to ${mentorName}`);
  };

  const answerMentorQuestion = (questionId: string, answer: string) => {
    setMentorQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answer,
              answeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
              status: 'answered'
            }
          : q
      )
    );
    showNotification('Answer submitted to student');
  };

  // Submit Experience (Mentor submits, goes to Admin verification queue)
  const submitInterviewExperience = (experienceData: Partial<CompanyExperience>) => {
    const newExp: CompanyExperience = {
      id: `exp-${Date.now()}`,
      companyName: experienceData.companyName || 'Tech Company',
      companyLogo: experienceData.companyLogo || 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=100&auto=format&fit=crop&q=80',
      jobRole: experienceData.jobRole || 'Software Engineer',
      placementYear: experienceData.placementYear || 2024,
      difficulty: experienceData.difficulty || 'Medium',
      isVerified: false,
      status: 'pending_review',
      mentorId: currentUser.id,
      mentorName: currentUser.name,
      mentorRole: currentUser.jobRole || 'Senior Engineer',
      mentorCompany: currentUser.company || 'Tech Corp',
      mentorAvatar: currentUser.avatar,
      ctcOffered: experienceData.ctcOffered || 'Competitive Package',
      overallRating: 4.8,
      summary: experienceData.summary || 'Detailed interview experience across rounds.',
      rounds: experienceData.rounds || [],
      preparationTips: experienceData.preparationTips || ['Practice DSA', 'Review projects'],
      submittedAt: new Date().toISOString().split('T')[0],
      tags: experienceData.tags || ['Interview', 'Engineering']
    };
    setCompanies((prev) => [newExp, ...prev]);
    showNotification('Experience submitted! Sent to Admin for verification.');
  };

  // Admin verifies experience
  const verifyInterviewExperience = (expId: string, approve: boolean) => {
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === expId
          ? {
              ...c,
              isVerified: approve,
              status: approve ? 'published' : 'rejected'
            }
          : c
      )
    );
    showNotification(
      approve
        ? 'Interview experience verified and published to Company Hub!'
        : 'Interview experience rejected.'
    );
  };

  // Admin verifies mentor
  const verifyMentor = (mentorId: string, approve: boolean) => {
    setMentors((prev) =>
      prev.map((m) =>
        m.id === mentorId
          ? {
              ...m,
              isVerified: approve,
              availableForMentorship: approve
            }
          : m
      )
    );
    showNotification(
      approve
        ? 'Mentor successfully verified with Official Badge!'
        : 'Mentor verification rejected.'
    );
  };

  // Admin verifies resource
  const verifyResource = (resourceId: string, approve: boolean) => {
    setResources((prev) =>
      prev.map((r) =>
        r.id === resourceId ? { ...r, isVerified: approve } : r
      )
    );
    showNotification(
      approve ? 'Resource verified and published!' : 'Resource disapproved.'
    );
  };

  // Reset demo data to default mock
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEYS.ROLE);
    localStorage.removeItem(STORAGE_KEYS.COMPANIES);
    localStorage.removeItem(STORAGE_KEYS.MENTORS);
    localStorage.removeItem(STORAGE_KEYS.REQUESTS);
    localStorage.removeItem(STORAGE_KEYS.QUESTIONS);
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.RESOURCES);

    setActiveRole('student');
    setActivePage('student-dashboard');
    setCompanies(initialCompanies);
    setMentors(initialMentors);
    setMentorshipRequests(initialMentorshipRequests);
    setMentorQuestions(initialMentorQuestions);
    setPrepTasks(initialPrepTasks);
    setApplications(initialApplications);
    setResources(initialResources);

    showNotification('Demo data reset to fresh initial state!');
  };

  return (
    <PlacementContext.Provider
      value={{
        activeRole,
        currentUser,
        activePage,
        setActivePage,
        switchRole,
        companies,
        selectedExperience,
        setSelectedExperience,
        submitInterviewExperience,
        verifyInterviewExperience,
        mentors,
        verifyMentor,
        mentorshipRequests,
        sendMentorshipRequest,
        respondMentorshipRequest,
        mentorQuestions,
        askMentorQuestion,
        answerMentorQuestion,
        prepTasks,
        toggleTask,
        addTask,
        deleteTask,
        categoryProgress,
        overallProgress,
        applications,
        addApplication,
        updateApplicationStatus,
        updateApplicationNotes,
        deleteApplication,
        resources,
        verifyResource,
        upcomingInterviews,
        resetDemoData,
        notificationMessage,
        showNotification
      }}
    >
      {children}
    </PlacementContext.Provider>
  );
};

export const usePlacement = () => {
  const context = useContext(PlacementContext);
  if (!context) {
    throw new Error('usePlacement must be used within a PlacementProvider');
  }
  return context;
};
