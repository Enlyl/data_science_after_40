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
  Sparkles,
  Boxes,
  Compass,
  Network,
  Target,
  Code
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../lib/i18n';

interface UserGuideProps {
  onViewCurriculum: () => void;
  onNavigate?: (tab: any) => void;
}

export function UserGuide({ onViewCurriculum, onNavigate }: UserGuideProps) {
  const { t } = useLanguage();
  const sectionsRef = useRef<HTMLDivElement>(null);

  const scrollToSections = () => {
    sectionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sections = [
    {
      id: "phase_1",
      title: "Фаза 1: Интуиция Данных (Текущая)",
      icon: Target,
      description: "Ваш первый шаг. Прежде чем писать код, научитесь видеть истории в таблицах и данных. Начните с базовых миссий и заданий.",
      tips: [
        "1. Пройдите миссию 'Основы AI и Данных'",
        "2. Научитесь искать закономерности в Excel",
        "3. Поймите что такое Корреляция и Выбросы"
      ],
      quickAction: { label: "НАЧАТЬ ЗДЕСЬ (Миссия 1)", tab: "lecture_hall" },
      highlight: true
    },
    {
      id: "phase_2",
      title: "Фаза 2: Прикладной Python",
      icon: Code,
      description: "Как только вы поймете данные, мы дадим вам инструмент для их автоматической обработки — Python и библиотеку Pandas.",
      tips: [
        "1. Изучите переменные и списки",
        "2. Практикуйтесь в Data Lab с реальными таблицами",
        "3. Напишите свой первый скрипт обработки данных"
      ],
      quickAction: { label: "Открыть Data Lab", tab: "data_lab" },
      highlight: false
    },
    {
      id: "phase_3",
      title: "Фаза 3: Визуализация и ML",
      icon: Network,
      description: "Предсказание будущего на основе прошлого. Вы научитесь строить модели машинного обучения для бизнес-задач.",
      tips: [
        "1. Линейная регрессия",
        "2. Задачи классификации",
        "3. Создание дашбордов для руководства"
      ],
      quickAction: { label: "План развития", tab: "planner" },
      highlight: false
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Simple Hero Header */}
      <div className={cn(
        "relative overflow-hidden rounded-[48px] border border-research-line shadow-2xl transition-all duration-500",
        document.documentElement.getAttribute('data-theme') === 'light' ? "bg-white" : "bg-card"
      )}>
        <div className="absolute inset-0 opacity-40">
           <img 
             src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop" 
             className="w-full h-full object-cover grayscale brightness-50"
             alt="hero abstract"
           />
        </div>
        <div className="relative z-10 p-8 md:p-14 flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-black text-primary uppercase tracking-widest">ROADMAP_INIT = TRUE</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-text-main italic tracking-tighter drop-shadow-md leading-tight">
                СТРАТЕГИЯ <span className="text-primary">DATA SCIENCE</span> ДЛЯ ВАС
              </h1>
              <p className="text-lg text-text-main/80 max-w-xl font-medium leading-relaxed drop-shadow-sm">
                Прямой путь от визуального анализа данных в таблицах до написания алгоритмов машинного обучения. Следуйте фазам без пропусков: логика &rarr; код &rarr; прогноз.
              </p>
              <button 
                onClick={scrollToSections}
                className="px-8 py-3 bg-primary text-white font-black uppercase tracking-tighter rounded-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 w-fit"
              >
                ПЕРЕЙТИ К ФАЗЕ 1 <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="hidden md:flex w-1/3 justify-center">
               <div className="w-64 h-64 relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full border-2 border-dashed border-primary/40 rounded-full flex items-center justify-center p-8 text-center"
                  >
                     <Compass className="w-16 h-16 text-primary" />
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
          
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-text-main uppercase italic tracking-tighter">Ваш Образовательный Трек</h2>
            {sections.map((section) => (
              <motion.div 
                key={section.id}
                whileHover={{ x: 10 }}
                className={cn(
                  "border rounded-[32px] p-8 group relative overflow-hidden shadow-sm transition-all",
                  section.highlight 
                    ? "bg-primary text-white border-primary/20 shadow-xl shadow-primary/20" 
                    : "bg-card border-research-line"
                )}
              >
                <div className="flex gap-8">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-all",
                    section.highlight 
                      ? "bg-white/20 text-white" 
                      : "bg-accent-soft text-primary group-hover:bg-primary group-hover:text-white"
                  )}>
                    <section.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className={cn(
                        "text-xl font-black uppercase tracking-tight",
                        section.highlight ? "text-white drop-shadow-md" : "text-text-main"
                      )}>{section.title}</h3>
                      <p className={cn(
                        "text-sm mt-1 font-medium leading-relaxed",
                        section.highlight ? "text-white/90" : "text-text-muted"
                      )}>{section.description}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.tips.map((tip, i) => (
                        <div key={i} className="flex gap-3 items-start">
                           <CheckCircle2 className={cn("w-4 h-4 mt-1 flex-shrink-0", section.highlight ? "text-white" : "text-primary")} />
                           <span className={cn(
                             "text-[10px] uppercase font-mono leading-relaxed",
                             section.highlight ? "text-white/80" : "text-text-muted"
                           )}>{tip}</span>
                        </div>
                      ))}
                    </div>
                    {onNavigate && (
                      <button 
                        onClick={() => onNavigate(section.quickAction.tab)}
                        className={cn(
                          "mt-4 px-8 py-3 rounded-xl text-[11px] font-black uppercase transition-all flex items-center justify-center gap-2 w-full md:w-auto shadow-sm cursor-pointer",
                          section.highlight
                            ? "bg-white text-primary hover:scale-105 active:scale-95"
                            : "bg-accent-soft border border-research-line text-text-muted hover:text-primary hover:border-primary/40"
                        )}
                      >
                        <Play className="w-4 h-4" /> {section.quickAction.label}
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
                  onClick={() => onNavigate?.('lecture_hall')}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-accent-soft/50 border border-research-line hover:border-primary/40 hover:bg-white transition-all group cursor-pointer"
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
