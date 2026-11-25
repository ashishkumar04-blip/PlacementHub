export type Role = 'student' | 'mentor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  college?: string;
  branch?: string;
  gradYear?: number;
  company?: string;
  jobRole?: string;
  verified?: boolean;
}

export type ApplicationStatus =
  | 'Interested'
  | 'Applied'
  | 'Online Assessment'
  | 'Technical Interview'
  | 'HR Interview'
  | 'Selected'
  | 'Rejected';

export interface CompanyApplication {
  id: string;
  companyName: string;
  companyLogo?: string;
  jobRole: string;
  appliedDate: string;
  status: ApplicationStatus;
  interviewDate?: string;
  ctc?: string;
  location?: string;
  notes?: string;
  link?: string;
  updatedAt: string;
}

export interface CodingQuestion {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  description: string;
  sampleInputOutput?: string;
  approachTip?: string;
}

export interface InterviewRound {
  roundNumber: number;
  roundName: string; // e.g. "Online Assessment", "Technical Interview 1", "Technical Interview 2", "HR Interview"
  duration: string;
  platform?: string; // e.g. "HackerEarth", "Google Meet", "HireVue"
  details: string;
  codingQuestions?: CodingQuestion[];
  keyTopics: string[];
  tips: string;
}

export interface CompanyExperience {
  id: string;
  companyName: string;
  companyLogo?: string;
  jobRole: string;
  placementYear: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isVerified: boolean;
  status: 'published' | 'pending_review' | 'rejected';
  mentorId: string;
  mentorName: string;
  mentorRole: string;
  mentorCompany: string;
  mentorAvatar: string;
  ctcOffered: string;
  overallRating: number; // 1-5
  summary: string;
  rounds: InterviewRound[];
  preparationTips: string[];
  submittedAt: string;
  tags: string[];
}

export interface MentorProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company: string;
  jobRole: string;
  placementYear: number;
  college: string;
  bio: string;
  specializations: string[];
  isVerified: boolean;
  verificationBadgeType?: 'Silver' | 'Gold' | 'Official Senior';
  rating: number;
  menteesCount: number;
  availableForMentorship: boolean;
  linkedinUrl?: string;
}

export interface MentorshipRequest {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  studentCollege: string;
  mentorId: string;
  mentorName: string;
  targetCompany: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
  responseNote?: string;
}

export interface MentorQuestion {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  mentorId: string;
  mentorName: string;
  companyTag?: string;
  subject: string;
  question: string;
  answer?: string;
  answeredAt?: string;
  status: 'answered' | 'unanswered';
  createdAt: string;
}

export type SubjectCategory =
  | 'Data Structures and Algorithms'
  | 'Object-Oriented Programming'
  | 'DBMS'
  | 'Operating Systems'
  | 'Computer Networks'
  | 'Aptitude and Logical Reasoning'
  | 'Technical Interview Practice'
  | 'HR Interview Preparation';

export interface PrepTask {
  id: string;
  category: SubjectCategory;
  title: string;
  description?: string;
  completed: boolean;
  targetDate: string;
  priority: 'High' | 'Medium' | 'Low';
  resourceLink?: string;
}

export interface PlacementResource {
  id: string;
  title: string;
  category:
    | 'Company Preparation Guides'
    | 'Coding Practice Questions'
    | 'Previous Interview Experiences'
    | 'Technical Interview Tips'
    | 'Resume Preparation Guidance'
    | 'Aptitude Resources';
  description: string;
  company?: string;
  isVerified: boolean;
  contributorName: string;
  contributorRole: string;
  submissionYear: number;
  downloadsCount: number;
  format: 'PDF' | 'Markdown' | 'Interactive Sheet' | 'Video Guide';
  linkUrl: string;
}

export interface UpcomingInterview {
  id: string;
  companyName: string;
  role: string;
  roundName: string;
  date: string;
  time: string;
  meetingLink: string;
  interviewerName?: string;
}
