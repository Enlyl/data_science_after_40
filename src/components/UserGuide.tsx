import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Terminal, 
  Database, 
  BarChart3, 
  Calendar, 
  Settings, 
  HelpCircle,
  Cpu,
  Zap,
  Info,
  ChevronRight,
  Shield,
  Layers,
  CheckCircle2,
  Play,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../lib/i18n';

interface UserGuideProps {
  onViewCurriculum: () => void;
  onNavigate?: (tab: any) => void;
}

export function UserGuide({ onViewCurriculum, onNavigate }: UserGuideProps) {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const sectionsRef = useRef<HTMLDivElement>(null);

  const scrollToSections = () => {
    sectionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNextStep = () => {
    if (activeStep === onboardingSteps.length - 1) {
      scrollToSections();
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const onboardingSteps = [
    {
      id: "welcome",
      title: "Добро пожаловать в STEM_DATA: Ваш новый путь",
      badge: t('guide.badge.start'),
      description: "Мы понимаем: переход в IT из другой области в 40 лет — это смелый вызов. Наша система подготовлена так, чтобы ваш жизненный опыт стал преимуществом, а не преградой. Здесь вы не просто учите код, вы учитесь извлекать ценность из данных.",
      icon: Sparkles,
      action: "Начать погружение",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "mental_models",
      title: "Когнитивная стратегия обучения",
      badge: t('guide.badge.optimization'),
      description: "Для эффективного усвоения в 40+ мы используем: 1. Метод активного отзыва (Active Recall) — проверяйте себя через AI Tutor. 2. Интервальные повторения — возвращайтесь к пройденным темам через 'Библиотеку'. 3. Метод Фейнмана — попробуйте объяснить тему AI, если он поймет, значит и вы освоили.",
      icon: Zap,
      action: "Развернуть хабы",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "system_map",
      title: "Карта вашей цифровой станции",
      badge: t('guide.badge.mapping'),
      description: "Ваш рабочий стол разделен на 3 зоны: 1. ОСНОВНОЙ ХАБ (Уроки) — здесь база. 2. DATA LAB — здесь практика на живых данных. 3. ARCHIVES — ваша личная база знаний. Начните слева сверху и двигайтесь вниз по списку меню.",
      icon: Layers,
      action: "Перейти к инструкциям",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const sections = [
    {
      id: "lecture_hall",
      title: "01. ОСНОВНОЙ ХАБ (Миссии)",
      icon: BookOpen,
      description: "Фундаментальные знания. Каждый урок — это конкретный бизнес-кейс.",
      tips: [
        "Тратьте 45 минут на теорию, 15 на перерыв (Помодоро).",
        "Не пропускайте вводную часть 'Бизнес-ценность'.",
        "Ожидаемое время на 1 миссию: 60-90 минут."
      ],
      quickAction: { label: "Начать первую миссию", tab: "lecture_hall" }
    },
    {
      id: "data_lab",
      title: "02. DATA LAB (Лаборатория)",
      icon: BarChart3,
      description: "Место, где вы работаете с таблицами как профессиональный аналитик.",
      tips: [
        "Начните с загрузки простого CSV из Excel.",
        "Изучите вкладку 'Correlation' — это сердце анализа.",
        "Регулярность важнее интенсивности: 30 минут в день в лабе."
      ],
      quickAction: { label: "В лабораторию", tab: "data_lab" }
    },
    {
      id: "planner",
      title: "03. STRATEGY ROADMAP (План)",
      icon: Calendar,
      description: "Глобальная стратегия вашего движения.",
      tips: [
        "Раз в неделю заглядывайте в план для корректировки.",
        "Используйте 'Detailed Strategy' для оценки сложности тем."
      ],
      quickAction: { label: "Спланировать", tab: "planner" }
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Interactive Onboarding Hero */}
      <div className={cn(
        "relative overflow-hidden rounded-[48px] border border-research-line shadow-2xl transition-all duration-500",
        document.documentElement.getAttribute('data-theme') === 'light' ? "bg-white" : "bg-card"
      )}>
        <div className="absolute inset-0 opacity-40">
           <AnimatePresence mode="wait">
             <motion.img 
               key={activeStep}
               src={onboardingSteps[activeStep].image} 
               className="w-full h-full object-cover grayscale brightness-50"
               initial={{ opacity: 0, scale: 1.1 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               transition={{ duration: 1 }}
             />
           </AnimatePresence>
        </div>
        <div className="relative z-10 p-8 md:p-14 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-8">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeStep}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{onboardingSteps[activeStep].badge}</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-text-main italic tracking-tighter leading-[0.9] drop-shadow-md">
                    {onboardingSteps[activeStep].title.split(':').map((t, i) => (
                      <span key={i} className={i === 1 ? "text-primary" : ""}>{t}</span>
                    ))}
                  </h1>
                  <p className="text-lg text-text-main/80 max-w-xl font-medium leading-relaxed drop-shadow-sm">
                    {onboardingSteps[activeStep].description}
                  </p>
                  <div className="flex items-center gap-4">
                     <button 
                       onClick={handleNextStep}
                       className="px-8 py-4 bg-primary text-white font-black uppercase tracking-tighter rounded-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                     >
                       {onboardingSteps[activeStep].action} <ArrowRight className="w-5 h-5" />
                     </button>
                     <div className="flex gap-2">
                       {onboardingSteps.map((_, i) => (
                         <div key={i} className={cn("w-3 h-3 rounded-full transition-all duration-500", i === activeStep ? "bg-primary w-8" : "bg-text-muted/20")} />
                       ))}
                     </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
               <div className="w-64 h-64 relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full border-2 border-dashed border-primary/40 rounded-full flex items-center justify-center"
                  >
                     <Cpu className="w-16 h-16 text-primary" />
                  </motion.div>
               </div>
            </div>
        </div>
      </div>

      <div ref={sectionsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Sections */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-4">
             <h2 className="text-2xl font-black text-text-main uppercase italic tracking-tighter">{t('guide.nav_title')}</h2>
             <span className="text-[10px] font-mono font-black text-primary uppercase">{t('guide.active_nodes')}</span>
          </div>
          
          <div className="space-y-4">
            {sections.map((section) => (
              <motion.div 
                key={section.id}
                whileHover={{ x: 10 }}
                className="bg-card border border-research-line rounded-[32px] p-8 group relative overflow-hidden shadow-sm"
              >
                <div className="flex gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-accent-soft flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <section.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-black text-text-main uppercase tracking-tight">{section.title}</h3>
                      <p className="text-sm text-text-muted mt-1">{section.description}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.tips.map((tip, i) => (
                        <div key={i} className="flex gap-3 items-start">
                           <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                           <span className="text-[10px] uppercase font-mono text-text-muted leading-relaxed">{tip}</span>
                        </div>
                      ))}
                    </div>
                    {onNavigate && (
                      <button 
                        onClick={() => onNavigate(section.quickAction.tab)}
                        className="mt-4 px-6 py-2 rounded-xl bg-accent-soft border border-research-line text-[10px] font-black uppercase text-text-muted hover:text-primary hover:border-primary/40 transition-all flex items-center gap-2"
                      >
                        <Play className="w-3 h-3" /> {section.quickAction.label}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Roadmap & Quick Links */}
        <div className="space-y-8">
          {/* Quick Start Lessons */}
          <div className="bg-card border border-research-line rounded-[40px] p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-black text-text-main uppercase tracking-tighter italic">Quick_Start_Missions</h3>
            </div>
            
            <div className="space-y-3">
              {[
                { id: '1', title: 'The Foundations of AI', category: 'Fundamentals', icon: <Boxes className="w-4 h-4" /> },
                { id: '2', title: 'Linear Algebra for ML', category: 'Mathematics', icon: <Compass className="w-4 h-4" /> },
                { id: '4', title: 'Understanding Neural Nets', category: 'Deep Learning', icon: <Network className="w-4 h-4" /> }
              ].map((m) => (
                <button 
                  key={m.id}
                  onClick={() => onViewCurriculum?.()} // Assuming parent handles navigation or we just show them
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-accent-soft/50 border border-research-line hover:border-primary/40 hover:bg-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      {m.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-[11px] font-black text-text-main uppercase tracking-tight">{m.title}</p>
                      <p className="text-[9px] font-mono text-text-muted uppercase tracking-widest">{m.category}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-secondary p-8 rounded-[40px] shadow-2xl relative overflow-hidden group border border-secondary/20">
             <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                   <Calendar className="w-8 h-8 text-secondary" />
                </div>
                <div>
                   <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none italic drop-shadow-md">{t('guide.roadmap_title')}</h3>
                   <p className="text-sm text-white/90 font-medium mt-3 drop-shadow-sm">{t('guide.roadmap_desc')}</p>
                </div>
                <button 
                  onClick={onViewCurriculum}
                  className="w-full py-4 bg-white text-secondary font-black uppercase tracking-tighter rounded-2xl flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-lg"
                >
                  {t('guide.open_roadmap')} <ChevronRight className="w-5 h-5" />
                </button>
             </div>
          </div>

          <div className="bg-card border border-research-line rounded-[32px] p-8 space-y-6 shadow-sm">
              <h3 className="text-lg font-black text-text-main uppercase italic tracking-tight flex items-center gap-3">
                 <Shield className="w-6 h-6 text-primary" /> {t('guide.quick_start')}
              </h3>
              <div className="space-y-4">
                 {[
                   t('guide.step1'),
                   t('guide.step2'),
                   t('guide.step3'),
                   t('guide.step4')
                 ].map((todo, i) => (
                   <div key={i} className="flex gap-4 p-4 rounded-2xl bg-accent-soft border border-research-line hover:border-primary/20 transition-all cursor-pointer group">
                      <div className="w-6 h-6 rounded-lg border-2 border-primary/20 flex items-center justify-center group-hover:bg-primary transition-all">
                        <CheckCircle2 className="w-4 h-4 text-primary group-hover:text-white" />
                      </div>
                      <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">{todo}</span>
                   </div>
                 ))}
              </div>
          </div>
        </div>
      </div>

    </div>
  );
}
