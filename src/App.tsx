import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookMarked,
  FlaskConical,
  Microscope,
  Atom,
  Binary,
  Shapes,
  Library,
  Trophy,
  ChevronRight, 
  TrendingUp,
  MessageSquare, 
  Play,
  BarChart3,
  BrainCircuit,
  User,
  CheckCircle2,
  Newspaper,
  Search,
  HelpCircle,
  Map,
  Calendar,
  BookOpen,
  Database,
  Lightbulb,
  Settings,
  ShieldCheck,
  Activity,
  Filter,
  Cpu,
  GitBranch,
  Copy,
  Check,
  UserCircle,
  Save,
  Info,
  X,
  Languages,
  Zap,
  Sun,
  Moon,
  Terminal,
  Joystick,
  Stars,
  Palette,
  Volume2,
  Award,
  Target,
  Globe,
  LogOut
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, ScatterChart, Scatter, ZAxis, PieChart, Pie, Cell, Legend, Label
} from 'recharts';
import { LESSONS, Lesson, THEORY_TOPICS, TheoryTopic } from './constants';
import { TheoryCard } from './components/TheoryCard';
import { getTutorResponse, getProactiveSuggestion } from './services/geminiService';
import { cn } from './lib/utils';
import { analytics } from './services/analytics';
import { notificationService } from './services/notificationService';
import { NewsWidget } from './components/NewsWidget';
import { SandboxView } from './components/learning/Sandbox';
import { SkillTreeView } from './components/learning/SkillTree';
import { StudentCabinet } from './components/StudentCabinet';
import { DataExplorer } from './components/DataExplorer';
import { StudyPlanner } from './components/StudyPlanner';
import { UserGuide } from './components/UserGuide';
import { DetailedCurriculum } from './components/DetailedCurriculum';

import { AuthProvider, useAuth } from './context/AuthContext';
import { useFirebaseProgress } from './hooks/useFirebaseProgress';

import { LanguageProvider, useLanguage } from './lib/i18n';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}

function AppContent() {
  const { language, setLanguage, t } = useLanguage();
  const { user, login, logout, loading: authLoading } = useAuth();
  const { xp, level, completedLessons, loading: progressLoading, completeLesson, resetProgress } = useFirebaseProgress();

  const [activeTab, setActiveTab] = useState<'lecture_hall' | 'theory_hub' | 'research_archive' | 'progress' | 'tutor' | 'settings' | 'news' | 'sandbox' | 'skills' | 'cabinet' | 'data_lab' | 'planner' | 'help' | 'curriculum'>('help');
  const [activeLevel, setActiveLevel] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [lastViewedLesson, setLastViewedLesson] = useState<Lesson | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [tutorMessages, setTutorMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Привет! Я твой персональный наставник по Data Science. С чего начнем сегодня?' }
  ]);
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [analyticsConfig, setAnalyticsConfig] = useState({
    enabled: true,
    trackLessons: true,
    trackTutor: true,
    trackProgress: true,
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return localStorage.getItem('notifications_enabled') === 'true';
  });
  const [theme, setThemeState] = useState<'light' | 'dark' | 'cyberpunk'>(() => {
    return (localStorage.getItem('app_theme') as any) || 'dark';
  });

  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem('sidebar_collapsed') === 'true';
  });

  const toggleSidebar = () => {
    const newState = !isSidebarCollapsed;
    setIsSidebarCollapsed(newState);
    localStorage.setItem('sidebar_collapsed', newState.toString());
  };

  const setTheme = (newTheme: 'light' | 'dark' | 'cyberpunk') => {
    setIsThemeTransitioning(true);
    setTimeout(() => {
      setThemeState(newTheme);
      localStorage.setItem('app_theme', newTheme);
      setTimeout(() => {
        setIsThemeTransitioning(false);
      }, 250);
    }, 250);
  };
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copied, setCopied] = useState(false);
  const [lessonMode, setLessonMode] = useState<'theory' | 'practice'>('theory');

  const playSound = (type: 'switch' | 'click' | 'success') => {
    if (!soundEnabled) return;
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Theme-specific sound profiles
      switch (theme) {
        case 'cyberpunk':
          oscillator.type = 'sawtooth';
          break;
        case 'dark':
        case 'light':
        default:
          oscillator.type = 'triangle';
      }

      if (type === 'switch') {
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);
      } else if (type === 'click') {
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
      } else {
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1046.5, audioContext.currentTime + 0.2);
      }

      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      console.warn('Audio context failed', e);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  // Idle Detection for Proactive Tutor
  useEffect(() => {
    if (!user) return;
    
    let idleTimeout: NodeJS.Timeout;
    
    const resetIdleTimer = () => {
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(async () => {
        // Only trigger if user is on specific tabs context or just generally idle
        if (activeTab === 'tutor' || activeTab === 'lecture_hall') {
          setIsTyping(true);
          const suggestion = await getProactiveSuggestion('idle', { level, xp });
          setTutorMessages(prev => [...prev, { role: 'ai', text: suggestion || 'Система простаивает. Начнем новый проект?' }]);
          setIsTyping(false);
        }
      }, 120000); // 2 minutes of inactivity
    };

    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keypress', resetIdleTimer);
    resetIdleTimer();

    return () => {
      clearTimeout(idleTimeout);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keypress', resetIdleTimer);
    };
  }, [user, activeTab, level, xp]);

  useEffect(() => {
    if (notificationsEnabled) {
      notificationService.registerServiceWorker();
      notificationService.requestPermission();
    }
    localStorage.setItem('notifications_enabled', notificationsEnabled.toString());
  }, [notificationsEnabled]);

  // Система напоминаний
  useEffect(() => {
    if (!notificationsEnabled) return;

    // Напоминание о новом кейсе при входе (через 10 секунд)
    const newCaseTimer = setTimeout(() => {
      const lastVisit = localStorage.getItem('last_visit');
      const now = Date.now();
      
      if (!lastVisit || now - parseInt(lastVisit) > 24 * 60 * 60 * 1000) {
        notificationService.sendNotification('Новые кейсы ждут!', {
          body: 'Загляните в раздел Обучение, там появились интересные задачи по Python.',
          icon: '/icon.png'
        });
      }
      localStorage.setItem('last_visit', now.toString());
    }, 10000);

    // Напоминание о незавершенном уроке (если урок открыт более 15 минут)
    let reminderTimer: NodeJS.Timeout;
    if (selectedLesson) {
      reminderTimer = setTimeout(() => {
        notificationService.sendNotification('Не бросайте на полпути!', {
          body: `Вы изучаете тему "${selectedLesson.title}". Осталось совсем немного до +200 XP!`,
          icon: '/icon.png'
        });
      }, 15 * 60 * 1000);
    }

    return () => {
      clearTimeout(newCaseTimer);
      if (reminderTimer) clearTimeout(reminderTimer);
    };
  }, [notificationsEnabled, selectedLesson]);

  useEffect(() => {
    if (analyticsConfig.enabled) {
      analytics.init();
    }
  }, [analyticsConfig.enabled]);

  useEffect(() => {
    analytics.trackPageView(activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (selectedLesson && analyticsConfig.trackLessons) {
      analytics.trackLessonView(selectedLesson.id, selectedLesson.title);
    }
  }, [selectedLesson, analyticsConfig.trackLessons]);

  const filteredLessons = LESSONS.filter(lesson => 
    ((language === 'en' ? lesson.title_en || lesson.title : lesson.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
    (language === 'en' ? lesson.description_en || lesson.description : lesson.description).toLowerCase().includes(searchQuery.toLowerCase())) &&
    (activeCategory === 'All' || lesson.category === activeCategory) &&
    (activeLevel === 'All' || lesson.difficulty === activeLevel)
  );

  const filteredTheory = THEORY_TOPICS.filter(topic =>
    ((language === 'en' ? topic.title_en : topic.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
    (language === 'en' ? topic.description_en : topic.description).toLowerCase().includes(searchQuery.toLowerCase())) &&
    (activeCategory === 'All' || topic.category === activeCategory) &&
    (activeLevel === 'All' || topic.level === activeLevel)
  );

  const categoryProgress = React.useMemo(() => {
    const categories: Lesson['category'][] = ['Analytics', 'Statistics', 'Python', 'Machine Learning', 'SQL'];
    return categories.map(cat => {
      const totalInCategory = LESSONS.filter(l => l.category === cat).length;
      const completedInCategory = LESSONS.filter(l => l.category === cat && completedLessons.includes(l.id)).length;
      return {
        name: cat,
        progress: totalInCategory > 0 ? Math.round((completedInCategory / totalInCategory) * 100) : 0,
        completed: completedInCategory,
        total: totalInCategory
      };
    }).filter(c => c.total > 0);
  }, [completedLessons]);

  const overallProgress = React.useMemo(() => {
    if (LESSONS.length === 0) return 0;
    return Math.round((completedLessons.length / LESSONS.length) * 100);
  }, [completedLessons]);

  const pieData = React.useMemo(() => [
    { name: 'Пройдено', value: completedLessons.length },
    { name: 'Осталось', value: Math.max(0, LESSONS.length - completedLessons.length) }
  ], [completedLessons]);

  const handleCompleteLesson = async (id: string) => {
    const lesson = LESSONS.find(l => l.id === id);
    if (!completedLessons.includes(id)) {
      completeLesson(id, 200);
      if (analyticsConfig.trackProgress && lesson) {
        analytics.trackLessonComplete(id, language === 'en' ? lesson.title_en || lesson.title : lesson.title, 200);
      }

      // Proactive engagement after lesson complete
      setTimeout(async () => {
        setIsTyping(true);
        const suggestion = await getProactiveSuggestion('lesson_complete', { level, xp }, lesson);
        setTutorMessages(prev => [...prev, { role: 'ai', text: suggestion || 'Готов к новым свершениям?' }]);
        setIsTyping(false);
      }, 2000);
    }
    setSelectedLesson(null);
  };

  const handleResetProgress = () => {
    resetProgress();
    setShowResetConfirm(false);
    analytics.trackCustomEvent('progress_reset', { timestamp: Date.now() });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user' as const, text: input };
    setTutorMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    if (analyticsConfig.trackTutor) {
      analytics.trackTutorMessage('user');
    }

    try {
      const lessonContext = selectedLesson || lastViewedLesson;
      const response = await getTutorResponse(input, { age: 40, level: 'Начинащий', xp }, lessonContext);
      const aiMsg = { role: 'ai' as const, text: response || 'Извини, я задумался. Попробуй еще раз.' };
      setTutorMessages(prev => [...prev, aiMsg]);
      if (analyticsConfig.trackTutor) {
        analytics.trackTutorMessage('ai');
      }
    } catch (error) {
      setTutorMessages(prev => [...prev, { role: 'ai', text: 'Произошла ошибка связи с AI. Проверь ключ API.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (selectedLesson) {
      setLastViewedLesson(selectedLesson);
      setLessonMode('theory'); // Reset mode when opening new lesson
    }
  }, [selectedLesson]);

  if (authLoading || progressLoading) {
    return (
      <div className="min-h-screen bg-bg-app flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        </div>
        <div className="relative">
          <div className="w-16 h-16 border-t-2 border-primary/50 rounded-full animate-spin mb-6" />
          <div className="absolute inset-0 flex items-center justify-center pb-6">
             <Cpu className="w-6 h-6 text-primary" />
          </div>
        </div>
        <p className="text-text-muted font-medium text-sm tracking-widest uppercase animate-pulse">{t('auth.loading')}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-bg-app text-text-main flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        
        <div className="w-24 h-24 bg-accent-soft rounded-3xl flex items-center justify-center text-primary mb-12 border border-border relative group shadow-sm hover:shadow-md transition-all">
            <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <BarChart3 className="w-10 h-10 relative z-10" />
        </div>
        
        <div className="space-y-3 mb-10 relative z-10">
          <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-text-main">{t('auth.title')}</h1>
          <p className="text-text-muted font-medium text-sm md:text-base">{t('auth.subtitle')}</p>
        </div>
        
        <p className="text-text-muted/80 text-center max-w-sm mb-12 leading-relaxed text-sm">
           {t('auth.desc')}
        </p>
        
        <button 
          onClick={login}
          className="group relative bg-primary text-white px-10 py-4 rounded-xl font-semibold shadow-sm hover:shadow-md hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center gap-3 overflow-hidden"
        >
          <User className="w-5 h-5 group-hover:rotate-12 transition-transform" /> 
          <span className="relative z-10">{t('auth.login')}</span>
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={false}
      animate={{ opacity: isThemeTransitioning ? 0 : 1 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-bg-app text-text-main font-sans flex flex-col md:flex-row relative overflow-hidden"
    >
      {/* Immersive Cosmic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[140px] animate-pulse-slow delay-1000" />
        
        {/* Subtle dynamic grid */}
        <div 
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            theme === 'light' ? "opacity-[0.08]" : "opacity-[0.05]"
          )}
          style={{ 
            backgroundImage: `linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)`,
            backgroundSize: `80px 80px`
          }} 
        />
        <div 
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            theme === 'light' ? "opacity-[0.04]" : "opacity-[0.02]"
          )}
          style={{ 
            backgroundImage: `linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)`,
            backgroundSize: `20px 20px`
          }} 
        />

        {/* Global floating particles */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-primary/20 blur-[1px] animate-[float_20s_infinite]"
            style={{ 
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              animationDuration: `${30 + Math.random() * 60}s`,
              animationDelay: `${-Math.random() * 40}s`,
              opacity: 0.1 + Math.random() * 0.3
            }}
          />
        ))}
      </div>

      {/* Sidebar Navigation */}
      <nav className={cn(
        "fixed bottom-0 left-0 right-0 z-50 md:sticky md:top-0 md:h-screen md:flex-col border-t md:border-t-0 md:border-r border-border py-2 px-4 flex justify-between items-center md:items-stretch overflow-y-auto no-scrollbar transition-all duration-300",
        isSidebarCollapsed ? "md:w-[88px] md:py-6 md:px-3" : "md:w-[280px] md:py-8 md:px-4",
        theme === 'light' ? "bg-bg-app md:bg-white" : "bg-bg-app md:bg-card"
      )}>
        <div 
          onClick={() => setActiveTab('help')}
          className={cn("hidden md:flex flex-col gap-1 mb-8 px-2 cursor-pointer group", isSidebarCollapsed && "items-center px-0")}
        >
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 shrink-0 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
               <Atom className="w-5 h-5 animate-spin-slow" />
             </div>
             {!isSidebarCollapsed && (
               <div className="flex flex-col">
                  <span className="font-display font-bold text-xl text-text-main leading-none">EduCore</span>
                  <span className="font-medium text-[10px] text-text-muted mt-1 uppercase tracking-wider">Learning Platform</span>
               </div>
             )}
          </div>
        </div>
        
        <div className="flex gap-2 md:flex-col md:gap-1 mx-0 w-full justify-start overflow-x-auto md:overflow-x-visible no-scrollbar pb-2 md:pb-0">
          <div className="hidden md:block mb-4">
            {!isSidebarCollapsed && <p className="text-[10px] font-semibold text-text-muted/60 uppercase tracking-widest px-4 mb-2">Essential</p>}
            <div className="space-y-1">
              <NavButton 
                active={activeTab === 'help'} 
                onClick={() => {setActiveTab('help'); playSound('click');}} 
                icon={<Map />} 
                label={t('nav.help')} 
                theme={theme}
                playSound={playSound}
                highlight={true}
                isCollapsed={isSidebarCollapsed}
              />
              <NavButton 
                active={activeTab === 'news'} 
                onClick={() => {setActiveTab('news'); playSound('click');}} 
                icon={<Newspaper />} 
                label={t('nav.news')} 
                theme={theme}
                playSound={playSound}
                isCollapsed={isSidebarCollapsed}
              />
            </div>
          </div>

          <div className="hidden md:block w-8 h-px bg-border my-3 mx-4 opacity-40" />

          <div className="hidden md:block mb-4">
            {!isSidebarCollapsed && <p className="text-[10px] font-semibold text-text-muted/60 uppercase tracking-widest px-4 mb-2">Learning</p>}
            <div className="space-y-1">
              <NavButton 
                active={activeTab === 'lecture_hall'} 
                onClick={() => {setActiveTab('lecture_hall'); playSound('click');}} 
                icon={<FlaskConical />} 
                label={language === 'en' ? 'Missions' : 'Миссии'} 
                theme={theme}
                playSound={playSound}
                isCollapsed={isSidebarCollapsed}
              />
              <NavButton 
                active={activeTab === 'theory_hub'} 
                onClick={() => {setActiveTab('theory_hub'); playSound('click');}} 
                icon={<BookMarked />} 
                label={language === 'en' ? 'Theory' : 'Теория'} 
                theme={theme}
                playSound={playSound}
                isCollapsed={isSidebarCollapsed}
              />
              <NavButton 
                active={activeTab === 'data_lab'} 
                onClick={() => {setActiveTab('data_lab'); playSound('click');}} 
                icon={<BarChart3 />} 
                label={language === 'en' ? 'Data Lab' : 'Дата-Лаб'} 
                theme={theme}
                playSound={playSound}
                isCollapsed={isSidebarCollapsed}
              />
              <NavButton 
                active={activeTab === 'sandbox'} 
                onClick={() => {setActiveTab('sandbox'); playSound('click');}} 
                icon={<FlaskConical />} 
                label={language === 'en' ? 'Sandbox' : 'Песочница'} 
                theme={theme}
                playSound={playSound}
                isCollapsed={isSidebarCollapsed}
              />
            </div>
          </div>

          <div className="hidden md:block w-8 h-px bg-border my-3 mx-4 opacity-40" />

          <div className="hidden md:block mb-4">
            {!isSidebarCollapsed && <p className="text-[10px] font-semibold text-text-muted/60 uppercase tracking-widest px-4 mb-2">Growth</p>}
            <div className="space-y-1">
              <NavButton 
                active={activeTab === 'skills'} 
                onClick={() => {setActiveTab('skills'); playSound('click');}} 
                icon={<GitBranch />} 
                label={t('nav.skills')} 
                theme={theme}
                playSound={playSound}
                isCollapsed={isSidebarCollapsed}
              />
              <NavButton 
                active={activeTab === 'progress'} 
                onClick={() => {setActiveTab('progress'); playSound('click');}} 
                icon={<Trophy />} 
                label={language === 'en' ? 'Rank' : 'Рейтинг'} 
                theme={theme}
                playSound={playSound}
                isCollapsed={isSidebarCollapsed}
              />
              <NavButton 
                active={activeTab === 'tutor'} 
                onClick={() => {setActiveTab('tutor'); playSound('click');}} 
                icon={<BrainCircuit />} 
                label={t('nav.tutor')} 
                theme={theme}
                playSound={playSound}
                isCollapsed={isSidebarCollapsed}
              />
            </div>
          </div>

          <div className="hidden md:block w-8 h-px bg-border my-3 mx-4 opacity-40" />
          
          <div className="space-y-1">
            <NavButton 
              active={activeTab === 'cabinet'} 
              onClick={() => {setActiveTab('cabinet'); playSound('click');}} 
              icon={<User />} 
              label={t('nav.cabinet')} 
              theme={theme}
              playSound={playSound}
              isCollapsed={isSidebarCollapsed}
            />
            <NavButton 
              active={activeTab === 'settings'} 
              onClick={() => {setActiveTab('settings'); playSound('click');}} 
              icon={<Settings />} 
              label={t('nav.settings')} 
              theme={theme}
              playSound={playSound}
              isCollapsed={isSidebarCollapsed}
            />
          </div>
        </div>

        <div className="hidden md:block mt-auto space-y-4">
          {!isSidebarCollapsed && (
            <>
           <div className="bg-accent-soft border border-border p-5 rounded-2xl relative overflow-hidden group">
               <div className="flex justify-between items-center mb-3">
                 <p className="text-xs font-medium text-text-main">{t('status.rank')}</p>
                 <span className="text-xs font-semibold text-primary">Level {level}</span>
               </div>
               <div className="h-1.5 bg-border rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-primary transition-all duration-700 ease-out" 
                     style={{ width: `${(xp % 500) / 5}%` }}
                   />
               </div>
               <div className="flex justify-between items-center mt-3">
                  <span className="text-[10px] font-medium text-text-muted">{xp % 500} / 500 XP</span>
                  <span className="text-[10px] font-bold text-text-main">{Math.round((xp % 500) / 5)}%</span>
               </div>
           </div>

           <div className="bg-transparent border border-border p-4 rounded-2xl relative overflow-hidden group">
             <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                   <span className="text-xl font-bold text-text-main leading-none">{completedLessons.length}</span>
                   <div className="text-[10px] text-text-muted font-medium">Completed Lessons</div>
                </div>
                <div className="text-xs font-medium text-text-muted pb-1">/ {LESSONS.length}</div>
             </div>
           </div>
           </>
          )}
          
          {/* Collapsed rank summary */}
          {isSidebarCollapsed && (
            <div className="flex flex-col items-center gap-4 py-4 border-t border-border">
               <div className="flex flex-col items-center justify-center relative w-10 h-10 group cursor-help">
                 <svg className="w-10 h-10 -rotate-90">
                    <circle cx="20" cy="20" r="18" fill="transparent" stroke="var(--color-border)" strokeWidth="2" />
                    <circle cx="20" cy="20" r="18" fill="transparent" stroke="var(--color-primary)" strokeWidth="2" strokeDasharray="113" strokeDashoffset={113 - (113 * ((xp % 500) / 500))} className="transition-all duration-700 ease-out" />
                 </svg>
                 <span className="absolute text-[10px] font-bold text-primary">{level}</span>
                 <div className="absolute left-14 hidden group-hover:flex bg-card border border-border px-3 py-2 rounded-lg text-xs whitespace-nowrap z-50 shadow-sm">
                    {xp % 500} / 500 XP
                 </div>
               </div>
            </div>
          )}
        </div>

        <div className="mt-4 px-2">
            <button 
              onClick={logout}
              className={cn("w-full flex items-center px-6 gap-3 py-3 text-[9px] font-mono text-text-muted hover:text-secondary uppercase tracking-[0.2em] transition-all border border-research-line rounded-xl hover:bg-secondary/5 group",
               isSidebarCollapsed ? "justify-center px-0" : "justify-start")}
              title={isSidebarCollapsed ? t('common.close') : undefined}
            >
              <Settings className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform shrink-0" />
              {!isSidebarCollapsed && <span>{t('common.close')}</span>}
            </button>
            
            <button
               onClick={toggleSidebar}
               className={cn("hidden md:flex w-full mt-2 items-center px-6 gap-3 py-3 text-[9px] font-mono text-text-muted hover:text-primary uppercase tracking-[0.2em] transition-all border border-research-line rounded-xl hover:bg-primary/5 group",
               isSidebarCollapsed ? "justify-center px-0" : "justify-start")}
               title={isSidebarCollapsed ? (language === 'en' ? "Expand Sidebar" : "Развернуть") : (language === 'en' ? "Collapse Sidebar" : "Свернуть")}
            >
               <ChevronRight className={cn("w-3.5 h-3.5 transition-transform duration-300 shrink-0", !isSidebarCollapsed ? "rotate-180" : "rotate-0")} />
               {!isSidebarCollapsed && <span>{language === 'en' ? 'Collapse' : 'Свернуть'}</span>}
            </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 min-h-screen pt-4 pb-28 md:pt-0 md:pb-12 md:px-8 lg:px-12 xl:px-16 w-full relative z-10 flex flex-col">
        {/* Persistent Top Header */}
        <header className="sticky top-0 z-40 bg-bg-app/90 backdrop-blur-xl border-b border-border px-4 md:px-8 py-3 flex items-center justify-between">
           <div className="flex items-center gap-4 md:gap-8 overflow-hidden">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-success" />
                 <span className="text-xs font-semibold text-text-muted mt-0.5">Online</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-border opacity-60" />
              <div className="flex items-center gap-6">
                 <div className="flex flex-col justify-center">
                    <p className="text-sm font-bold text-text-main leading-none">
                      {xp.toLocaleString()} <span className="text-primary font-medium ml-1">XP</span>
                    </p>
                 </div>
                 <div className="flex flex-col justify-center">
                    <p className="text-sm font-bold text-text-main leading-none">
                      Level {level}
                    </p>
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-accent-soft p-1 rounded-xl border border-border">
                 <button 
                  onClick={() => setTheme('dark')}
                  className={cn("p-2 rounded-lg transition-all", theme === 'dark' ? "bg-card text-primary shadow-sm border border-border" : "text-text-muted hover:text-text-main")}
                 >
                    <Moon className="w-4 h-4" />
                 </button>
                 <button 
                  onClick={() => setTheme('light')}
                  className={cn("p-2 rounded-lg transition-all", theme === 'light' ? "bg-card text-primary shadow-sm border border-border" : "text-text-muted hover:text-text-main")}
                 >
                    <Sun className="w-4 h-4" />
                 </button>
              </div>

              <div className="w-px h-5 bg-border opacity-40 hidden md:block" />

              <button 
                onClick={() => setLanguage(language === 'en' ? 'ru' : 'en')}
                className="flex items-center gap-2 px-3 py-2 bg-accent-soft border border-border rounded-xl text-xs font-semibold text-text-muted hover:text-text-main hover:bg-card transition-all shadow-sm"
              >
                 <Globe className="w-4 h-4" />
                 <span>{language.toUpperCase()}</span>
              </button>

              <div className="w-px h-5 bg-border opacity-40 hidden md:block" />

              <button 
                onClick={() => setActiveTab('cabinet')}
                className="w-10 h-10 bg-card rounded-xl border border-border flex items-center justify-center hover:border-primary/50 transition-all cursor-pointer group overflow-hidden shadow-sm"
              >
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <UserCircle className="w-6 h-6 text-text-muted group-hover:text-primary transition-colors" />
                )}
              </button>

              <button onClick={() => logout()} className="w-10 h-10 hidden md:flex rounded-xl bg-accent-soft hover:bg-red-500/10 border border-border hover:border-red-500/30 items-center justify-center text-text-muted hover:text-red-500 transition-colors group">
                 <LogOut className="w-4 h-4" />
              </button>
           </div>
        </header>

        <div className="max-w-[1800px] mx-auto w-full flex-1 p-4 md:p-8 lg:p-12 relative z-10">
          <AnimatePresence mode="wait">
          {activeTab === 'lecture_hall' && (
            <motion.div 
              key="lecture_hall"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              {/* Refined Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 md:px-0 mb-8">
                <div className="space-y-1">
                  <h1 className="text-4xl font-display font-bold text-text-main tracking-tight">
                    Welcome back, <span className="text-primary">{user?.displayName?.split(' ')[0] || 'Student'}</span>
                  </h1>
                  <p className="text-text-muted font-medium text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                    Ready to learn
                  </p>
                </div>
              </div>

              {/* Current Challenge Hero */}
              <section className="mx-4 md:mx-0 bg-card border border-border rounded-3xl p-8 md:p-10 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden group hover:shadow-md transition-shadow">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                
                <div className="space-y-5 text-center md:text-left relative z-10 w-full max-w-2xl">
                  <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-xs font-semibold text-primary">
                    Next Mission
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight tracking-tight">Cosmos Analysis: <br/><span className="text-primary">{language === 'en' ? 'Spectral Data' : 'Спектральные Данные'}</span></h2>
                    <p className="text-text-muted text-sm font-medium">Data Modeling & Linear Regression</p>
                  </div>
                  <p className="text-text-muted leading-relaxed">
                    {language === 'en' 
                      ? 'Investigate the expansion of the universe. Decode redshift signatures using linear regression patterns.'
                      : 'Исследуй расширение Вселенной. Декодируй сигнатуры красного смещения с помощью паттернов линейной регрессии.'}
                  </p>
                </div>
                
                <div className="relative group/btn z-10 w-full md:w-auto">
                  <button 
                    onClick={() => setSelectedLesson(LESSONS[0])}
                    className="w-full md:w-auto bg-primary text-white px-8 py-4 rounded-xl font-semibold shadow-sm hover:shadow-md hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5 fill-current" /> {t('lesson.start')}
                  </button>
                </div>
              </section>

              <div className="px-4 md:px-0 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
                    <div className="relative group flex-1 max-w-xl">
                      <div className="absolute inset-0 bg-primary/5 blur-xl group-focus-within:bg-primary/10 transition-colors" />
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors z-10" />
                      <input 
                        type="text"
                        placeholder={t('search.placeholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-medium placeholder:text-text-muted relative z-10"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end">
                         <span className="text-xs font-semibold text-text-muted">Total Modules</span>
                         <span className="text-xl font-bold text-text-main leading-none mt-1">{filteredLessons.length}</span>
                      </div>
                      <div className="w-px h-8 bg-border mx-2" />
                      <button 
                        onClick={() => setActiveTab('research_archive')}
                        className="bg-card border border-border px-4 py-2 rounded-xl text-primary font-semibold text-sm hover:bg-primary/5 transition-all shadow-sm active:scale-95"
                      >
                        All Lessons
                      </button>
                    </div>
                  </div>
                  
                  {filteredLessons.slice(0, 4).length > 0 ? (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <AnimatePresence mode="popLayout">
                        {filteredLessons.slice(0, 4).map((lesson) => (
                          <LessonCard 
                            key={lesson.id} 
                            lesson={lesson} 
                            completed={completedLessons.includes(lesson.id)}
                            theme={theme}
                            onClick={() => setSelectedLesson(lesson)}
                          />
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <div className="text-center py-20 bg-white rounded-[32px] border-2 border-dashed border-slate-200">
                      <p className="text-text-muted font-medium">Ничего не найдено по вашему запросу</p>
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="mt-4 text-primary font-bold hover:underline"
                      >
                        Сбросить поиск
                      </button>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-1 h-fit lg:sticky lg:top-10 space-y-4">
                  <div className="flex items-center justify-between px-2 mb-2">
                    <h3 className="font-display font-bold text-text-main text-lg">Latest News</h3>
                    <div className="flex gap-2">
                       <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    </div>
                  </div>
                  <div className="h-[650px]">
                    <NewsWidget />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'theory_hub' && (
            <motion.div 
              key="theory_hub"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-8 px-4 md:px-0 max-w-[1600px] mx-auto"
            >
              <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between">
                <div className="relative flex-1 group w-full max-w-xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors z-10" />
                  <input 
                    type="text"
                    placeholder={language === 'en' ? 'Search topics...' : 'Поиск знаний...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-medium placeholder:text-text-muted relative z-10"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {['All', 'Fundamentals', 'Statistics', 'Machine Learning'].slice(0, 4).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs font-semibold transition-all border",
                        activeCategory === cat 
                          ? "bg-primary text-white border-primary shadow-sm" 
                          : "bg-card text-text-muted hover:bg-accent-soft border-border"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {filteredTheory.length > 0 ? (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredTheory.map((topic) => (
                      <TheoryCard 
                        key={topic.id} 
                        topic={topic} 
                        language={language}
                        onClick={() => {
                          // For now just show in tutor or similar, but maybe a modal?
                          setInput(`Расскажи подробнее про: ${topic.title}`);
                          setActiveTab('tutor');
                        }}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="text-center py-40 bg-card/50 rounded-[48px] border border-dashed border-research-line">
                  <Info className="w-16 h-16 text-research-line mx-auto mb-6" />
                  <p className="text-text-muted font-bold uppercase tracking-[0.5em] text-xs">No_Records_Cached</p>
                  <button 
                    onClick={() => {setSearchQuery(''); setActiveCategory('All'); setActiveLevel('All');}}
                    className="mt-8 text-primary font-black uppercase text-[10px] tracking-[0.4em] hover:text-white transition-colors"
                  >
                    RELOAD_SYSTEM_FILTERS
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'research_archive' && (
            <motion.div 
              key="research_archive"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 px-4 md:px-0"
            >
              <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 px-2">
                <div className="space-y-1">
                  <h1 className="text-3xl font-display font-bold text-text-main tracking-tight">{t('nav.archive')}</h1>
                  <p className="text-text-muted text-sm font-medium">{t('tab.library.desc')}</p>
                </div>
                <div className="flex flex-col gap-3 items-start xl:items-end w-full xl:w-auto">
                   <div className="flex flex-wrap gap-2">
                    {['All', 'Analytics', 'Statistics', 'Python', 'Machine Learning', 'SQL'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-semibold transition-all border shrink-0",
                          activeCategory === cat 
                            ? "bg-primary text-white border-primary shadow-sm" 
                            : "bg-card text-text-muted hover:bg-accent-soft border-border"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                      <button
                        key={lvl}
                        onClick={() => setActiveLevel(lvl as any)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                          activeLevel === lvl 
                            ? "bg-accent-soft text-text-main border-border shadow-sm" 
                            : "bg-transparent text-text-muted hover:bg-accent-soft/50 border-border"
                        )}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </header>

              <div className="relative group max-w-2xl">
                <div className="absolute inset-0 bg-primary/5 blur-xl group-focus-within:bg-primary/10 transition-colors" />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors z-10" />
                <input 
                  type="text"
                  placeholder={language === 'en' ? 'Search archive...' : 'Поиск в архиве...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-medium placeholder:text-text-muted relative z-10"
                />
              </div>

              {filteredLessons.length > 0 ? (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredLessons.map((lesson) => (
                      <LessonCard 
                        key={lesson.id} 
                        lesson={lesson} 
                        completed={completedLessons.includes(lesson.id)}
                        theme={theme}
                        onClick={() => setSelectedLesson(lesson)}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
                  <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-text-muted font-bold">Упс! Кейсов с такими параметрами не нашлось.</p>
                  <button 
                    onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                    className="mt-4 text-primary font-black uppercase text-xs tracking-widest hover:underline"
                  >
                    Сбросить фильтры
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'progress' && (
            <motion.div 
              key="progress"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10 px-4 md:px-0"
            >
              <header className="space-y-1">
                <h1 className="text-3xl font-display font-bold text-text-main tracking-tight">{language === 'en' ? 'Your Progress' : 'Ваш Прогресс'}</h1>
                <p className="text-text-muted text-sm font-medium">Status: {overallProgress}% Complete</p>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard icon={<Award className="text-warning" />} label={language === 'en' ? 'EXP_UNITS' : 'Очки Опыта'} value={xp} theme={theme} />
                    <StatCard icon={<Target className="text-secondary" />} label={language === 'en' ? 'COM_MODULES' : 'Проекты'} value={completedLessons.length} theme={theme} />
                    <StatCard icon={<TrendingUp className="text-success" />} label={language === 'en' ? 'LEAGUE_POS' : 'Рейтинг'} value="#2" theme={theme} />
                  </div>

                  <div className="bg-card p-8 rounded-[40px] border border-research-line shadow-2xl relative overflow-hidden group">
                    <div className="flex items-center justify-between mb-8 relative z-10">
                      <h3 className="font-black text-lg text-text-main uppercase tracking-tight italic">{language === 'en' ? 'Temporal_Energy_Log' : 'Активность'}</h3>
                      <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg text-[9px] font-mono text-primary font-black tracking-widest italic uppercase">7_Day_Stream</div>
                    </div>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { day: 'Пн', val: 400 },
                          { day: 'Вт', val: 300 },
                          { day: 'Ср', val: 600 },
                          { day: 'Чт', val: 800 },
                          { day: 'Пт', val: 500 },
                          { day: 'Сб', val: 200 },
                          { day: 'Вс', val: 100 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                          <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                          <Bar dataKey="val" fill="#4F46E5" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-card p-8 rounded-[40px] border border-research-line shadow-2xl">
                    <h3 className="font-black text-lg text-text-main uppercase tracking-tight italic mb-8">{language === 'en' ? 'Domain_Sync_Levels' : 'Прогресс по тематикам'}</h3>
                    <div className="space-y-6">
                      {categoryProgress.map((cat) => (
                        <div key={cat.name} className="space-y-2">
                          <div className="flex justify-between items-end">
                            <span className="font-bold text-text-main">
                              {cat.name === 'Analytics' ? 'Аналитика' : 
                               cat.name === 'Statistics' ? 'Статистика' : 
                               cat.name === 'Python' ? 'Python' : 'Machine Learning'}
                            </span>
                            <span className="text-xs font-black text-primary uppercase">
                              {cat.completed} / {cat.total} Кейсов ({cat.progress}%)
                            </span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${cat.progress}%` }}
                              className="h-full bg-primary"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-card p-8 rounded-[40px] border border-research-line shadow-2xl flex flex-col items-center relative overflow-hidden group">
                  <h3 className="font-black text-lg text-text-main uppercase tracking-tight italic mb-10 w-full text-center relative z-10">{language === 'en' ? 'Aggregate_Sync' : 'Общий Прогресс'}</h3>
                  <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                          startAngle={90}
                          endAngle={-270}
                        >
                          <Cell key="cell-0" fill="#10B981" />
                          <Cell key="cell-1" fill="#F1F5F9" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-4xl font-black text-text-main leading-none">{overallProgress}%</span>
                      <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">Ready</span>
                    </div>
                  </div>
                  <p className="text-sm text-text-muted text-center mb-8 px-4">
                    Отличный темп! Пройдено {completedLessons.length} из {LESSONS.length} практических кейсов.
                  </p>
                  
                <div className="flex flex-wrap justify-center gap-2">
                    {['Python', 'Pandas', 'Matplotlib', 'SQL Основы'].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-bg-app rounded-lg text-xs font-semibold text-text-main border border-slate-100">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto w-full pt-8">
                    {!showResetConfirm ? (
                      <button 
                        onClick={() => setShowResetConfirm(true)}
                        className="w-full py-3 text-xs font-bold text-error bg-error/5 hover:bg-error/10 rounded-xl transition-colors flex items-center justify-center gap-2 border border-error/10"
                      >
                        Сбросить прогресс
                      </button>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-error/5 p-4 rounded-2xl border-2 border-error/20"
                      >
                        <p className="text-[11px] font-bold text-error text-center mb-3 uppercase tracking-wider">Вы уверены?</p>
                        <p className="text-[10px] text-error/80 text-center leading-tight mb-4 font-medium">Весь ваш XP, уровень и пройденные уроки будут удалены навсегда.</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={handleResetProgress}
                            className="flex-1 py-2 bg-error text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                          >
                            Да, удалить
                          </button>
                          <button 
                            onClick={() => setShowResetConfirm(false)}
                            className="flex-1 py-2 bg-white text-text-muted text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                          >
                            Отмена
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'tutor' && (
            <motion.div 
              key="tutor"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-[calc(100vh-14rem)] md:h-[calc(100vh-8rem)] flex flex-col bg-white rounded-[32px] border-2 border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b-2 border-slate-50 bg-accent-soft flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                  <BrainCircuit className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-text-main text-lg leading-none">{language === 'en' ? 'AI Tutor' : 'AI Наставник'}</h3>
                  <p className="text-xs text-primary font-bold mt-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    {language === 'en' ? 'Online • Ready to help' : 'В сети • Готов помочь'}
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {tutorMessages.map((msg, i) => (
                  <div key={i} className={cn("flex", msg.role === 'user' ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[85%] p-5 rounded-3xl text-[15px] leading-relaxed shadow-sm",
                      msg.role === 'user' 
                        ? "bg-primary text-white rounded-tr-none" 
                        : "bg-slate-100 text-text-main rounded-tl-none"
                    )}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 p-5 rounded-3xl rounded-tl-none flex gap-1.5">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t-2 border-slate-50">
                <div className="flex gap-3 bg-bg-app p-2 rounded-[20px] border-2 border-slate-100 focus-within:border-primary transition-colors">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={language === 'en' ? 'Ask a question about the lesson...' : 'Задай вопрос по уроку...'}
                    className="flex-1 bg-transparent px-4 py-3 focus:outline-none text-text-main font-medium"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={isTyping}
                    className="bg-primary text-white px-6 rounded-2xl font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    <span>{language === 'en' ? 'Send' : 'Отправить'}</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div 
              key="skills"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <SkillTreeView userSkills={completedLessons} />
            </motion.div>
          )}

          {activeTab === 'sandbox' && (
            <motion.div 
              key="sandbox"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <SandboxView />
            </motion.div>
          )}

          {/* News Dashboard */}
          {activeTab === 'news' && (
            <motion.div 
              key="news"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="px-4 md:px-0 max-w-5xl"
            >
              <NewsWidget />
            </motion.div>
          )}

          {/* Data Lab */}
          {activeTab === 'data_lab' && (
            <motion.div 
              key="data_lab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-8"
            >
              <DataExplorer />
            </motion.div>
          )}

          {activeTab === 'planner' && (
            <motion.div 
              key="planner"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <StudyPlanner onViewCurriculum={() => setActiveTab('curriculum')} />
            </motion.div>
          )}

          {activeTab === 'cabinet' && (
            <motion.div 
              key="cabinet"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <StudentCabinet 
                xp={xp} 
                level={level} 
                currentTheme={theme}
                onThemeChange={setTheme}
              />
            </motion.div>
          )}

          {activeTab === 'help' && (
            <motion.div 
              key="help"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-8"
            >
              <header className="px-4 md:px-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)] animate-pulse" />
                  <span className="text-[10px] font-mono text-primary uppercase tracking-[0.3em] font-bold">{t('node.manual')}</span>
                </div>
              </header>
              <UserGuide 
                onViewCurriculum={() => setActiveTab('curriculum')} 
                onNavigate={(tab) => setActiveTab(tab)}
              />
            </motion.div>
          )}

          {activeTab === 'curriculum' && (
            <motion.div 
              key="curriculum"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <DetailedCurriculum />
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10 px-4 md:px-0"
            >
              <header>
                <h1 className="text-3xl font-bold text-text-main">{t('settings.title')}</h1>
                <p className="text-text-muted mt-1">{t('settings.subtitle')}</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Visual Theme Selection */}
                <div className="md:col-span-2 bg-card p-8 rounded-[32px] border-2 border-research-line shadow-sm space-y-8">
                  <div className="flex items-center gap-4 mb-2">
                    <Palette className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-bold text-lg text-text-main">{language === 'en' ? 'Visual Protocol (Theme)' : 'Визуальный протокол (Тема)'}</h3>
                      <p className="text-xs text-text-muted">{language === 'en' ? 'Select the visual aesthetic for your research environment.' : 'Выберите визуальное оформление для вашей исследовательской среды.'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-2">
                    {[
                      { id: 'dark', name: language === 'en' ? 'Dark' : 'Тёмная', icon: Moon, color: 'bg-[#18181B]' },
                      { id: 'light', name: language === 'en' ? 'Light' : 'Светлая', icon: Sun, color: 'bg-white' },
                      { id: 'cyberpunk', name: 'Cyberpunk', icon: Zap, color: 'bg-[#0D0221]' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTheme(t.id as any);
                          playSound('switch');
                        }}
                        className={cn(
                          "relative group flex flex-col items-center gap-3 p-5 rounded-3xl border-2 transition-all overflow-hidden",
                          theme === t.id 
                            ? "border-primary bg-primary/5 shadow-lg" 
                            : "border-research-line bg-accent-soft hover:border-primary/40"
                        )}
                      >
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm", t.color)}>
                          <t.icon className={cn("w-6 h-6", theme === t.id ? "text-primary" : "text-text-muted")} />
                        </div>
                        <span className={cn("text-xs font-bold uppercase tracking-widest", theme === t.id ? "text-primary" : "text-text-muted")}>
                          {t.name}
                        </span>
                        {theme === t.id && (
                          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-card p-8 rounded-[32px] border-2 border-research-line shadow-sm space-y-8">
                  <div className="flex items-center gap-4 mb-2">
                    <Activity className="w-8 h-8 text-primary" />
                    <div>
                      <h3 className="font-bold text-lg text-text-main">{language === 'en' ? 'Analytics & Events' : 'Аналитика и события'}</h3>
                      <p className="text-xs text-text-muted">{language === 'en' ? 'Manage data tracking for service improvement.' : 'Настройте, какие данные мы можем отслеживать для улучшения сервиса.'}</p>
                    </div>
                  </div>

                  <div className="space-y-6 pt-4">
                    <Toggle 
                      label={language === 'en' ? 'Enable Google Analytics' : 'Включить Google Analytics'} 
                      description={language === 'en' ? 'General visit tracking.' : 'Общий сбор данных о посещении приложения.'}
                      checked={analyticsConfig.enabled}
                      onChange={(val) => setAnalyticsConfig(prev => ({ ...prev, enabled: val }))}
                    />
                    <Toggle 
                      label={language === 'en' ? 'Track Lesson Views' : 'Отслеживать просмотры уроков'} 
                      description={language === 'en' ? 'Helps us identify popular topics.' : 'Помогает нам понять, какие темы наиболее интересны.'}
                      checked={analyticsConfig.trackLessons}
                      disabled={!analyticsConfig.enabled}
                      onChange={(val) => setAnalyticsConfig(prev => ({ ...prev, trackLessons: val }))}
                    />
                    <Toggle 
                      label={language === 'en' ? 'Track Progress' : 'Отслеживать прогресс'} 
                      description={language === 'en' ? 'Lesson completion and XP gain.' : 'Завершение уроков и получение опыта.'}
                      checked={analyticsConfig.trackProgress}
                      disabled={!analyticsConfig.enabled}
                      onChange={(val) => setAnalyticsConfig(prev => ({ ...prev, trackProgress: val }))}
                    />
                    <Toggle 
                      label={language === 'en' ? 'Track AI Tutor' : 'Отслеживать AI Тьютора'} 
                      description={language === 'en' ? 'Analyze interaction with AI.' : 'Анализ взаимодействия с виртуальным наставником.'}
                      checked={analyticsConfig.trackTutor}
                      disabled={!analyticsConfig.enabled}
                      onChange={(val) => setAnalyticsConfig(prev => ({ ...prev, trackTutor: val }))}
                    />
                  </div>
                </div>

                <div className="bg-card p-8 rounded-[32px] border-2 border-research-line shadow-sm space-y-8">
                  <div className="flex items-center gap-4 mb-2">
                    <MessageSquare className="w-8 h-8 text-secondary" />
                    <div>
                      <h3 className="font-bold text-lg text-text-main">{language === 'en' ? 'Notifications' : 'Уведомления'}</h3>
                      <p className="text-xs text-text-muted">{language === 'en' ? 'Reminders for lessons and new materials.' : 'Напоминания об уроках и новых материалах.'}</p>
                    </div>
                  </div>

                  <div className="space-y-6 pt-4">
                    <Toggle 
                      label={language === 'en' ? 'Push Notifications' : 'Пуш-уведомления'} 
                      description={language === 'en' ? 'Allow app to send important reminders.' : 'Разрешить приложению отправлять важные напоминания.'}
                      checked={notificationsEnabled}
                      onChange={setNotificationsEnabled}
                    />
                  </div>
                </div>

                <div className="bg-card p-8 rounded-[32px] border-2 border-research-line shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <ShieldCheck className="w-8 h-8 text-success" />
                    <div>
                      <h3 className="font-bold text-lg text-text-main">Безопасность</h3>
                      <p className="text-xs text-text-muted">Ваши данные надежно защищены.</p>
                    </div>
                  </div>
                  <div className="p-6 bg-accent-soft rounded-2xl border-2 border-research-line">
                    <p className="text-sm text-text-main leading-relaxed">
                      Мы используем анонимизированные данные только для улучшения учебного процесса. Ваши диалоги с AI не передаются третьим лицам для обучения их моделей без вашего согласия.
                    </p>
                  </div>
                </div>

                <div className="bg-card p-8 rounded-[32px] border-2 border-research-line shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <HelpCircle className="w-8 h-8 text-primary" />
                      <div>
                        <h3 className="font-bold text-lg text-text-main">{language === 'en' ? 'User Manual' : 'Руководство пользователя'}</h3>
                        <p className="text-xs text-text-muted">{language === 'en' ? 'Learn how to master STEM_DATA_LAB.' : 'Узнайте, как максимально эффективно использовать STEM_DATA_LAB.'}</p>
                      </div>
                    </div>
                    <div className="p-6 bg-primary/5 rounded-2xl border-2 border-primary/10">
                      <p className="text-sm text-text-main leading-relaxed">
                        {language === 'en' ? 'New to the system? Our comprehensive guide covers the core methodology, data lab interactions, and strategic planning tools.' : 'Вы в системе впервые? Наше руководство охватывает основные методики, работу в лаборатории данных и инструменты стратегического планирования.'}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveTab('help')}
                    className="mt-6 w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-5 h-5" />
                    {language === 'en' ? 'Open Manual' : 'Открыть руководство'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </main>

      {/* Dedicated Lesson Workspace */}
      <AnimatePresence>
        {selectedLesson && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-bg-app overflow-hidden"
          >
            {/* Control Header */}
            <div className="h-20 border-b border-research-line bg-card/50 backdrop-blur-xl px-8 flex items-center justify-between z-20">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setSelectedLesson(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-text-muted hover:text-white hover:bg-white/10 transition-all border border-research-line"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="h-8 w-px bg-research-line" />
                <div className="flex flex-col">
                  <h3 className="text-lg font-black text-text-main leading-none uppercase italic tracking-tighter">{selectedLesson.title}</h3>
                  <span className="text-[10px] font-mono text-primary uppercase tracking-[0.4em] mt-1.5">{selectedLesson.id} // SEC_NODE_ACTIVE</span>
                </div>
              </div>

              {/* MODE SWITCHER - The Core of the "Separate Blocks" request */}
              <div className="bg-black/40 border border-research-line rounded-2xl p-1.5 flex gap-2">
                <button 
                  onClick={() => setLessonMode('theory')}
                  className={cn(
                    "px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-3",
                    lessonMode === 'theory' 
                      ? "bg-white text-black shadow-lg shadow-white/5" 
                      : "text-text-muted hover:text-white hover:bg-white/5"
                  )}
                >
                  <BookMarked className="w-4 h-4" /> {language === 'en' ? 'Lecture_Hall' : 'Учебный_Зал'}
                </button>
                <button 
                  onClick={() => setLessonMode('practice')}
                  className={cn(
                    "px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all flex items-center gap-3",
                    lessonMode === 'practice' 
                      ? "bg-primary text-black shadow-lg shadow-primary/20" 
                      : "text-text-muted hover:text-white hover:bg-white/5"
                  )}
                >
                  <FlaskConical className="w-4 h-4" /> {language === 'en' ? 'Research_Annex' : 'Опытный_Отдел'}
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/20 rounded-xl">
                  <Zap className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-xs font-mono text-primary font-black">+200 XP</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto relative bg-bg-app">
              <AnimatePresence mode="wait">
                {lessonMode === 'theory' ? (
                  <motion.div 
                    key="theory-mode"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="min-h-full bg-[#f8f9fa] text-[#1a1a1a] p-8 md:p-20 selection:bg-primary/20"
                  >
                    <div className="max-w-3xl mx-auto space-y-16">
                      <header className="space-y-4 border-b-2 border-slate-900/5 pb-10">
                        <div className="flex items-center gap-4 text-[11px] font-mono font-bold uppercase tracking-[0.4em] text-slate-500">
                          <Microscope className="w-5 h-5 text-slate-900" /> 
                          Theoretic_Framework // {selectedLesson.category}
                        </div>
                        <h1 className="text-6xl font-black tracking-tighter leading-tight italic decoration-slate-900/10 underline underline-offset-8">
                          {selectedLesson.title}
                        </h1>
                        <p className="text-2xl font-medium text-slate-600 leading-relaxed max-w-2xl font-sans">
                          {language === 'en' ? selectedLesson.description_en || selectedLesson.description : selectedLesson.description}
                        </p>
                      </header>

                      <article className="space-y-12">
                        <section className="space-y-6">
                          <h3 className="text-[12px] font-mono font-black text-slate-400 uppercase tracking-[0.5em] flex items-center gap-4">
                            <span className="w-8 h-px bg-slate-200" /> 001_CONCEPTUAL_BASE
                          </h3>
                          <div className="prose prose-slate prose-xl max-w-none text-slate-800 font-sans leading-relaxed">
                             {language === 'en' ? selectedLesson.theory_en || selectedLesson.theory : selectedLesson.theory}
                          </div>
                        </section>

                        <section className="space-y-6">
                          <h3 className="text-[12px] font-mono font-black text-slate-400 uppercase tracking-[0.5em] flex items-center gap-4">
                            <span className="w-8 h-px bg-slate-200" /> 002_APPLICATION_LOGIC
                          </h3>
                          <div className="bg-white border-2 border-slate-100 p-10 rounded-[32px] shadow-sm italic text-slate-700 text-xl font-medium leading-relaxed">
                            {language === 'en' ? selectedLesson.content_en || selectedLesson.content : selectedLesson.content}
                          </div>
                        </section>

                        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          <div className="space-y-4 p-8 bg-slate-50 rounded-[28px] border border-slate-100">
                             <h4 className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">Scientific Advisory</h4>
                             <p className="text-slate-700 text-sm leading-relaxed font-semibold italic">
                                {language === 'en' ? selectedLesson.practicalTip_en || selectedLesson.practicalTip : selectedLesson.practicalTip}
                             </p>
                          </div>
                          <div className="space-y-4 p-8 bg-indigo-50/30 rounded-[28px] border border-indigo-100">
                             <h4 className="text-[10px] font-mono font-black text-indigo-400 uppercase tracking-widest">Strategic Value</h4>
                             <p className="text-slate-700 text-sm leading-relaxed font-semibold italic">
                                {language === 'en' ? selectedLesson.businessValue_en || selectedLesson.businessValue : selectedLesson.businessValue}
                             </p>
                          </div>
                        </section>
                      </article>

                      <footer className="pt-20 flex justify-center">
                        <button 
                          onClick={() => setLessonMode('practice')}
                          className="group flex flex-col items-center gap-6"
                        >
                           <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-[0.5em] animate-bounce">Scroll_to_Research</span>
                           <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-2xl shadow-indigo-200">
                              <FlaskConical className="w-8 h-8" />
                           </div>
                        </button>
                      </footer>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="practice-mode"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    className="min-h-full p-8 md:p-12 space-y-12 max-w-6xl mx-auto"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                       <div className="lg:col-span-2 space-y-8">
                          {/* Main Visualization Lab */}
                          <section className="bg-card/50 border border-research-line rounded-[40px] p-10 relative overflow-hidden shadow-2xl shadow-primary/5">
                             <div className="absolute top-4 left-6 flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-[9px] font-mono text-primary uppercase tracking-[0.3em] font-black">Data_Reconstruction_Active</span>
                             </div>
                             
                             <div className="h-[450px] w-full mt-8">
                               <ResponsiveContainer width="100%" height="100%">
                                  {(() => {
                                    const COLORS = ['#00d1ff', '#ff3e00', '#10b981', '#f59e0b', '#8B5CF6', '#EC4899'];
                                    
                                    switch (selectedLesson.visualType) {
                                      case 'line':
                                        return (
                                          <LineChart data={selectedLesson.data}>
                                            <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#1e293b" />
                                            <XAxis dataKey="name" stroke="#64748B" tick={{fontSize: 10}} />
                                            <YAxis stroke="#64748B" tick={{fontSize: 10}} />
                                            <Tooltip contentStyle={{backgroundColor: '#080a12', border: '1px solid #1e293b'}} />
                                            <Line type="monotone" dataKey="value" stroke="#00d1ff" strokeWidth={4} dot={{r: 4, fill: '#00d1ff'}} activeDot={{r: 6}} />
                                          </LineChart>
                                        );
                                      case 'scatter':
                                        return (
                                          <ScatterChart>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.3} />
                                            <XAxis type="number" dataKey="x" stroke="#64748B" name="Distance" unit="Mpc" />
                                            <YAxis type="number" dataKey="y" stroke="#64748B" name="Velocity" unit="km/s" />
                                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                            <Scatter name="Galaxy_Data" data={selectedLesson.data} fill="#00d1ff" />
                                          </ScatterChart>
                                        );
                                      case 'bar':
                                        return (
                                          <BarChart data={selectedLesson.data}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.2} />
                                            <XAxis dataKey="name" stroke="#64748B" />
                                            <YAxis stroke="#64748B" />
                                            <Tooltip contentStyle={{backgroundColor: '#080a12', border: '1px solid #1e293b'}} />
                                            <Bar dataKey="value" fill="#00d1ff" radius={[10, 10, 0, 0]} />
                                          </BarChart>
                                        );
                                      default: return null;
                                    }
                                  })()}
                               </ResponsiveContainer>
                             </div>
                          </section>

                          {/* Code Interaction Block */}
                          <section className="bg-card border border-research-line rounded-[40px] overflow-hidden shadow-2xl relative">
                            <div className="flex items-center justify-between px-10 py-6 border-b border-research-line bg-black/40">
                               <div className="flex items-center gap-3">
                                  <Binary className="w-5 h-5 text-primary" />
                                  <span className="text-[10px] font-mono text-text-muted/40 uppercase tracking-widest">Algorithmic_Scripting</span>
                               </div>
                               <button 
                                  onClick={() => {
                                    navigator.clipboard.writeText(selectedLesson.solutionCode || '');
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                  }}
                                  className="text-[9px] font-mono text-primary hover:text-white transition-colors"
                               >
                                  {copied ? 'COMMITTED' : 'GRAB_CODE'}
                               </button>
                            </div>
                            <div className="p-10 overflow-x-auto">
                               <pre className="font-mono text-primary/80 selection:bg-primary/20 text-sm">
                                  <code>{selectedLesson.solutionCode}</code>
                               </pre>
                            </div>
                          </section>
                       </div>

                       <div className="space-y-8">
                          <section className="bg-white/5 border border-research-line rounded-[32px] p-8 space-y-6">
                             <div className="flex items-center gap-3 text-secondary">
                                <Activity className="w-5 h-5" />
                                <h4 className="text-[10px] font-mono font-black uppercase tracking-widest">Protocol_Steps</h4>
                             </div>
                             <div className="space-y-4">
                                {selectedLesson.solutionSteps?.map((step, idx) => (
                                  <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group">
                                     <span className="text-secondary font-mono font-black text-xs pt-0.5">[{idx + 1}]</span>
                                     <p className="text-[13px] text-text-muted font-semibold leading-relaxed group-hover:text-text-main transition-colors uppercase tracking-tight">{step}</p>
                                  </div>
                                ))}
                             </div>
                          </section>

                          <section className="bg-primary/5 border border-primary/20 rounded-[32px] p-8 space-y-4 relative overflow-hidden group/final">
                             <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/40 group-hover/final:w-full transition-all duration-700" />
                             <h4 className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.3em]">Module_Goal</h4>
                             <p className="text-sm text-text-main font-medium leading-relaxed italic">
                                {language === 'en' ? selectedLesson.selfStudyTask?.goal_en || selectedLesson.selfStudyTask?.goal : selectedLesson.selfStudyTask?.goal}
                             </p>
                             <button 
                                onClick={() => handleCompleteLesson(selectedLesson.id)}
                                className="w-full mt-4 bg-primary text-black font-black py-4 rounded-2xl hover:bg-white hover:text-primary transition-all uppercase tracking-widest text-[11px]"
                             >
                                Finalize_Submission
                             </button>
                          </section>
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
            </AnimatePresence>
    </motion.div>
  );
}

function NavButton({ active, onClick, icon, label, theme, playSound, highlight = false, isCollapsed = false }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, theme: string, playSound: (t: any) => void, highlight?: boolean, isCollapsed?: boolean }) {
  const getThemeIcon = (originalIcon: any) => {
    const iconSize = "w-5 h-5 md:w-5 md:h-5";
    return React.isValidElement(originalIcon) ? React.cloneElement(originalIcon as React.ReactElement<any>, { className: iconSize }) : originalIcon;
  };

  const handleClick = () => {
    playSound('click');
    onClick();
  };

  return (
    <button 
      onClick={handleClick}
      title={isCollapsed ? label : undefined}
      className={cn(
        "flex md:flex-row flex-col items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-fit md:w-full relative shrink-0",
        isCollapsed && "md:px-0 md:justify-center py-4",
        active ? "bg-primary/10 text-primary font-medium" : 
        highlight ? "bg-secondary text-white shadow-md hover:bg-secondary/90" : 
        "text-text-muted hover:bg-accent-soft hover:text-text-main"
      )}
    >
      {active && (
        <motion.div 
          layoutId="nav-pill"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-lg hidden md:block"
        />
      )}
      
      <div className={cn("relative z-10", active && "animate-pulse-slow")}>
         {getThemeIcon(icon)}
      </div>
      
      {!isCollapsed && (
        <span className={cn(
          "text-sm font-medium hidden md:block z-10 transition-colors tracking-tight",
          active ? "text-primary" : "text-text-muted transition-colors"
        )}>
          {label}
        </span>
      )}
    </button>
  );
}

function LessonCard({ lesson, completed, onClick, theme }: { lesson: Lesson, completed: boolean, onClick: () => void, theme: string }) {
  const { language } = useLanguage();
  const difficultyMap: Record<string, string> = {
    'Beginner': 'Beginner',
    'Intermediate': 'Intermediate',
    'Advanced': 'Advanced'
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={cn(
        "bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group flex flex-col relative overflow-hidden",
        theme === 'light' ? "hover:border-primary/40" : "hover:border-primary/50"
      )}
    >
      <div className="absolute top-4 right-4 flex gap-1.5 opacity-60">
         <div className={cn("w-1.5 h-1.5 rounded-full", completed ? "bg-success" : "bg-primary/50")} />
      </div>

      <div className="relative z-10 flex flex-col gap-6 flex-1">
        <div className="flex justify-between items-start">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-accent-soft text-text-main group-hover:bg-primary group-hover:text-white border border-border group-hover:border-primary/20",
            completed && "bg-success/10 text-success border-success/20"
          )}>
            {lesson.category === 'Analytics' ? <BarChart3 className="w-5 h-5" /> : 
             lesson.category === 'Statistics' ? <TrendingUp className="w-5 h-5" /> : 
             lesson.category === 'SQL' ? <Database className="w-5 h-5" /> :
             <BrainCircuit className="w-5 h-5" />}
          </div>
          {completed && (
            <div className="bg-success/10 text-success text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              Done
            </div>
          )}
        </div>

        <div className="space-y-3 flex-1 flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">{lesson.difficulty}</span>
            <span className="text-[11px] font-medium text-text-muted">{lesson.category}</span>
          </div>
          <h3 className="font-display font-semibold text-xl text-text-main leading-tight group-hover:text-primary transition-colors tracking-tight break-words hyphens-auto">
            {language === 'en' ? lesson.title_en || lesson.title : lesson.title}
          </h3>
          <p className="text-sm text-text-muted line-clamp-2 leading-relaxed">
            {language === 'en' ? lesson.description_en || lesson.description : lesson.description}
          </p>
        </div>

        <div className="pt-5 border-t border-border flex items-center justify-between mt-auto">
           <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-text-muted">{lesson.solutionSteps?.length || 0} Steps</span>
           </div>
           
           <div className="flex items-center gap-2 group/btn">
              <span className="text-[11px] font-bold text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">START</span>
              <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all group-hover:border-primary/20">
                 <ChevronRight className="w-4 h-4" />
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon, label, value, theme }: { icon: React.ReactNode, label: string, value: string | number, theme: string }) {
  return (
    <div className="bg-card border border-border p-5 rounded-3xl shadow-sm hover:shadow-md transition-all flex items-center gap-4 group">
      <div className="w-12 h-12 bg-accent-soft rounded-2xl flex items-center justify-center shadow-inner group-hover:shadow-primary/10 group-hover:bg-primary/5 transition-colors">
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { className: "w-6 h-6 text-primary" }) : icon}
      </div>
      <div>
        <p className="text-xs text-text-muted font-medium">{label}</p>
        <p className="text-xl font-bold text-text-main mt-0.5 tracking-tight">{value}</p>
      </div>
    </div>
  );
}

function Toggle({ label, description, checked, onChange, disabled = false }: { label: string, description: string, checked: boolean, onChange: (val: boolean) => void, disabled?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between gap-6 p-4 rounded-2xl hover:bg-accent-soft/50 transition-colors", disabled && "opacity-40 pointer-events-none")}>
      <div className="flex-1">
        <p className="text-sm font-semibold text-text-main">{label}</p>
        <p className="text-xs text-text-muted mt-1">{description}</p>
      </div>
      <button 
        onClick={() => onChange(!checked)}
        className={cn(
          "w-12 h-6 rounded-full transition-all duration-300 relative flex items-center px-1 border border-border",
          checked ? "bg-primary" : "bg-accent-soft"
        )}
      >
        <motion.div 
          animate={{ x: checked ? 24 : 0 }}
          className={cn(
            "w-4 h-4 rounded-full shadow-sm transition-colors",
            checked ? "bg-white" : "bg-text-muted/60"
          )}
        />
      </button>
    </div>
  );
}
