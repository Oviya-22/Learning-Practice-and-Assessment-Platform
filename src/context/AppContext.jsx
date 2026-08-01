import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USER, MOCK_COURSES, MOCK_NOTIFICATIONS } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState('student'); // 'student' | 'faculty' | 'admin' | 'superadmin'
  const [currentView, setCurrentView] = useState('landing');
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ ...MOCK_USER, role: 'student' });
  
  // Selection states
  const [activeCourse, setActiveCourse] = useState(MOCK_COURSES[0]);
  const [activeLesson, setActiveLesson] = useState(MOCK_COURSES[0].chapters[0]?.lessons[0] || null);
  
  // UI states
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [toasts, setToasts] = useState([]);
  
  // Exam simulator state
  const [isExamActive, setIsExamActive] = useState(false);
  const [proctorWarnings, setProctorWarnings] = useState(0);
  const [activeExam, setActiveExam] = useState(null);

  // Sync user role state
  useEffect(() => {
    setUser(prev => ({ ...prev, role: currentRole }));
  }, [currentRole]);

  // Toast notification helper
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentView,
        setCurrentView,
        theme,
        toggleTheme,
        user,
        setUser,
        activeCourse,
        setActiveCourse,
        activeLesson,
        setActiveLesson,
        searchOpen,
        setSearchOpen,
        notificationsOpen,
        setNotificationsOpen,
        aiTutorOpen,
        setAiTutorOpen,
        notifications,
        markNotificationAsRead,
        markAllNotificationsRead,
        toasts,
        addToast,
        removeToast,
        isExamActive,
        setIsExamActive,
        proctorWarnings,
        setProctorWarnings,
        activeExam,
        setActiveExam,
      }}
    >
      <div className={theme === 'dark' ? 'dark min-h-screen bg-[#0b0f19]' : 'min-h-screen bg-slate-50'}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
