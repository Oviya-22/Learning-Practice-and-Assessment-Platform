import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { ToastContainer } from './components/common/Toast';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { SearchModal } from './components/common/SearchModal';
import { FloatingAITutor } from './components/ai/FloatingAITutor';

// Pages
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { CourseCatalog } from './pages/student/CourseCatalog';
import { CourseDetail } from './pages/student/CourseDetail';
import { LearningView } from './pages/student/LearningView';
import { PracticeEngine } from './pages/student/PracticeEngine';
import { ExamInterface } from './components/assessment/ExamInterface';
import { CertificatesPage } from './pages/student/CertificatesPage';
import { GamificationHub } from './pages/student/GamificationHub';
import { FacultyDashboard } from './pages/faculty/FacultyDashboard';
import { CourseBuilder } from './pages/faculty/CourseBuilder';
import { UserManagement } from './pages/admin/UserManagement';
import { AuditLogs } from './pages/superadmin/AuditLogs';
import { ReportsPage } from './pages/ReportsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { AssignmentsPage } from './pages/student/AssignmentsPage';
import { AssessmentsPage } from './pages/student/AssessmentsPage';

const MainContent = () => {
  const { currentRole, currentView, setCurrentView, setActiveExam } = useApp();

  // Fullscreen view overrides (Landing, Auth, Exam Session)
  if (currentView === 'landing') return <LandingPage />;
  if (currentView === 'login') return <Login />;
  if (currentView === 'register') return <Register />;
  if (currentView === 'forgot-password') return <ForgotPassword />;
  if (currentView === 'exam-session') return <ExamInterface />;

  const renderRoleView = () => {
    switch (currentView) {
      case 'dashboard':
        if (currentRole === 'faculty') return <FacultyDashboard />;
        if (currentRole === 'admin') return <UserManagement />;
        if (currentRole === 'superadmin') return <AuditLogs />;
        return <StudentDashboard />;

      case 'courses':
        return <CourseCatalog />;

      case 'course-detail':
        return <CourseDetail />;

      case 'learning-view':
      case 'learning-path':
        return <LearningView />;

      case 'practice':
        return <PracticeEngine />;

      case 'assessments':
        return <AssessmentsPage />;

      case 'assignments':
        return <AssignmentsPage />;

      case 'certificates':
        return <CertificatesPage />;

      case 'leaderboard':
        return <GamificationHub />;

      case 'faculty-course-create':
        return <CourseBuilder />;

      case 'admin-users':
        return <UserManagement />;

      case 'superadmin-logs':
      case 'superadmin-permissions':
        return <AuditLogs />;

      case 'reports':
        return <ReportsPage />;

      case 'profile':
        return <ProfilePage />;

      case 'settings':
        return <SettingsPage />;

      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="flex flex-1 min-h-[calc(100vh-65px)]">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {renderRoleView()}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <MainContent />
        <FloatingAITutor />
        <NotificationDrawer />
        <SearchModal />
        <ToastContainer />
      </div>
    </AppProvider>
  );
}
