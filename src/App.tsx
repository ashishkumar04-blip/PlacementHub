import React, { useState } from 'react';
import { PlacementProvider, usePlacement } from './context/PlacementContext';
import { DemoRoleBar } from './components/common/DemoRoleBar';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { CompanyHub } from './pages/CompanyHub';
import { InterviewExperienceModal } from './pages/InterviewExperienceModal';
import { MentorDirectory } from './pages/MentorDirectory';
import { PreparationTracker } from './pages/PreparationTracker';
import { ApplicationTracker } from './pages/ApplicationTracker';
import { ResourceLibrary } from './pages/ResourceLibrary';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';
import { MentorDashboard } from './pages/MentorDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

const MainLayout: React.FC = () => {
  const {
    activePage,
    setActivePage,
    selectedExperience,
    setSelectedExperience,
    switchRole
  } = usePlacement();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // If on Landing Page or Auth Page, show simplified layout without sidebar
  if (activePage === 'landing') {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <DemoRoleBar />
        <LandingPage />
        {selectedExperience && (
          <InterviewExperienceModal
            experience={selectedExperience}
            onClose={() => setSelectedExperience(null)}
          />
        )}
      </div>
    );
  }

  if (activePage === 'auth') {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <DemoRoleBar />
        <AuthPage />
      </div>
    );
  }

  // Handle direct Ask Mentor action from modal
  const handleAskMentorFromModal = (mentorId: string, mentorName: string, company: string) => {
    setActivePage('mentor-directory');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Sticky Top Presentation Bar */}
      <DemoRoleBar />

      {/* Main SaaS Navbar */}
      <Navbar
        isMobileSidebarOpen={isMobileSidebarOpen}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* Body with Sidebar & Content */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <Sidebar
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0 overflow-y-auto">
          {activePage === 'student-dashboard' && <StudentDashboard />}
          {activePage === 'company-hub' && (
            <CompanyHub
              onOpenSubmitModal={() => {
                switchRole('mentor');
                setActivePage('mentor-dashboard');
              }}
              onAskMentor={handleAskMentorFromModal}
            />
          )}
          {activePage === 'mentor-directory' && <MentorDirectory />}
          {activePage === 'my-prep' && <PreparationTracker />}
          {activePage === 'application-tracker' && <ApplicationTracker />}
          {activePage === 'resources' && <ResourceLibrary />}
          {activePage === 'analytics' && <AnalyticsDashboard />}
          {activePage === 'mentor-dashboard' && <MentorDashboard />}
          {activePage === 'admin-dashboard' && <AdminDashboard />}
        </main>
      </div>

      {/* Global Interview Experience Modal */}
      {selectedExperience && (
        <InterviewExperienceModal
          experience={selectedExperience}
          onClose={() => setSelectedExperience(null)}
          onAskMentor={handleAskMentorFromModal}
        />
      )}
    </div>
  );
};

export function App() {
  return (
    <PlacementProvider>
      <MainLayout />
    </PlacementProvider>
  );
}

export default App;
