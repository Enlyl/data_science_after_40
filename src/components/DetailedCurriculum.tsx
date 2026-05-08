import React from 'react';
import { motion } from 'motion/react';
import { 
  Target, 
  Clock, 
  Map, 
  ChevronRight, 
  Star, 
  BookOpen, 
  Code, 
  BarChart, 
  Cpu,
  BrainCircuit,
  Settings2,
  Lightbulb,
  Database
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../lib/i18n';

interface RoadmapPhase {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  intensity: string;
  description: string;
  whatToLearn: string[];
  howToLearn: string;
  focus: string;
  icon: any;
  color: string;
}

export function DetailedCurriculum() {
  const { language, t } = useLanguage();

  const PHASES: RoadmapPhase[] = [
    {
      id: 1,
      title: language === 'ru' ? "Фаза 1: Мышление Исследователя" : "Phase 1: The Detective's Mindset",
      subtitle: language === 'ru' ? "Интуиция Данных и Логика" : "Data Intuition & Logic",
      duration: language === 'ru' ? "4 Недели" : "4 Weeks",
      intensity: language === 'ru' ? "5-7 часов в неделю" : "5-7 hours per week",
      description: language === 'ru' 
        ? "Прежде чем прикасаться к коду, вы должны научиться видеть истории, скрытые в простых таблицах. Это про логику и базовую математику, которую вы, вероятно, уже знаете, но не применяли таким образом."
        : "Before touching code, you must learn to see the stories hidden in simple tables. This is about logic and basic math that you probably already know but haven't applied this way.",
      whatToLearn: language === 'ru' ? [
        "Таблицы (Продвинутые формулы Excel/Sheets)",
        "Базовая статистика (Среднее, Медиана, Выбросы, Корреляция)",
        "Гигиена данных (Поиск ошибок и дубликатов)",
        "Критическое мышление (Как распознать предвзятость в цифрах)"
      ] : [
        "Spreadsheets (Advanced Excel/Sheets formulas)",
        "Basic Statistics (Mean, Median, Outliers, Correlation)",
        "Data Hygiene (Identifying errors and duplicates)",
        "Critical Thinking (How to spot bias in statistics)"
      ],
      howToLearn: language === 'ru'
        ? "Возьмите свои семейные расходы или простой отчет по работе и попробуйте найти 3 неочевидных паттерна. Не используйте Python пока — используйте инструменты, в которых вам комфортно (например, Excel)."
        : "Take your family expenses or a simple work report and try to find 3 non-obvious patterns. Don't use Python yet—use tools you are comfortable with (like Excel).",
      focus: language === 'ru' ? "Развитие 'вкуса' к качеству данных и паттернам." : "Developing an 'eye' for data quality and patterns.",
      icon: Target,
      color: "#0ea5e9"
    },
    {
      id: 2,
      title: language === 'ru' ? "Фаза 2: Извлечение Информации" : "Phase 2: Data Extraction",
      subtitle: language === 'ru' ? "SQL для общения с БД" : "SQL for DB Communication",
      duration: language === 'ru' ? "4 Недели" : "4 Weeks",
      intensity: language === 'ru' ? "6-8 часов в неделю" : "6-8 hours per week",
      description: language === 'ru' 
        ? "Компании не хранят данные в эксельках, они используют Базы Данных. SQL — это язык общения с этими базами, чтобы за долю секунды выгрузить нужное из миллионов строк."
        : "Companies don't store data in spreadsheets, they use Databases. SQL is the language to query them, retrieving exactly what you need from millions of rows in milliseconds.",
      whatToLearn: language === 'ru' ? [
        "Основы SELECT и WHERE (Умная выгрузка)",
        "Аггрегация GROUP BY (Сжатие данных для CEO)",
        "Сшивание таблиц JOIN (Сборка единого пазла)",
        "Оконные функции (Взрослая аналитика)"
      ] : [
        "SELECT and WHERE basics (Smart extraction)",
        "GROUP BY aggregations (Summaries for the CEO)",
        "JOINing tables (Stitching the puzzle)",
        "Window Functions (Advanced analytics)"
      ],
      howToLearn: language === 'ru'
        ? "Пишите реальные запросы в песочнице. Поймите логику SQL (Сначала FROM, потом WHERE, в конце SELECT)."
        : "Write real queries in the sandbox. Understand the execution logic (FROM first, then WHERE, and finally SELECT).",
      focus: language === 'ru' ? "Сбор и очистка нужных данных из сырых таблиц." : "Gathering and cleaning the right data from raw tables.",
      icon: Database,
      color: "#f59e0b"
    },
    {
      id: 3,
      title: language === 'ru' ? "Фаза 3: Изучение Языка" : "Phase 3: Learning the Language",
      subtitle: language === 'ru' ? "Прикладной Python для данных" : "Applied Python for Data",
      duration: language === 'ru' ? "8 Недель" : "8 Weeks",
      intensity: language === 'ru' ? "8-10 часов в неделю" : "8-10 hours per week",
      description: language === 'ru'
        ? "Python — это не про 'хакинг', это ваш цифровой ассистент. Для человека 40 лет цель — не стать senior-разработчиком, а автоматизировать рутину."
        : "Python is not about 'hacking'—it's your digital assistant. For a 40-year-old, the goal is not to be a senior developer, but to automate tedious work.",
      whatToLearn: language === 'ru' ? [
        "Основы Python (Переменные, Списки, Словари)",
        "Библиотека Pandas (Главный инструмент для работы с таблицами)",
        "Numpy (Быстрые математические операции)",
        "Загрузка данных CSV и JSON в Python"
      ] : [
        "Python Basics (Variables, Lists, Dictionaries)",
        "Pandas Library (The ultimate tool for handling tables)",
        "Numpy (Fast mathematical operations)",
        "Loading CSV and JSON data into Python"
      ],
      howToLearn: language === 'ru'
        ? "Следуйте практическим урокам, которые фокусируются на 'Pandas'. Избегайте общих курсов 'введение в программирование', которые учат создавать игры; держите фокус на библиотеках анализа данных."
        : "Follow practical tutorials that focus on 'Pandas'. Avoid generic 'intro to programming' courses that teach game development; stay focused on data science libraries.",
      focus: language === 'ru' ? "Преобразование таблиц в автоматизированные скрипты Python." : "Converting spreadsheets into automated Python scripts.",
      icon: Code,
      color: "#8b5cf6"
    },
    {
      id: 4,
      title: language === 'ru' ? "Фаза 4: Искусство Прозрения" : "Phase 4: The Art of Insight",
      subtitle: language === 'ru' ? "Визуализация и Сторителлинг" : "Visualization & Storytelling",
      duration: language === 'ru' ? "4 Недели" : "4 Weeks",
      intensity: language === 'ru' ? "5-7 часов в неделю" : "5-7 hours per week",
      description: language === 'ru'
        ? "Данные бесполезны, если вы не можете объяснить их другим. Вы научитесь создавать графики, которые заставят коллег сказать: 'Ого, я этого не замечал'."
        : "Data is useless if you can't explain it to others. You will learn to create charts that make people in your office say 'Wow, I didn't see that coming'.",
      whatToLearn: language === 'ru' ? [
        "Matplotlib и Seaborn (Классические библиотеки визуализации)",
        "Интерактивные графики (Plotly или Recharts)",
        "Коммуникация (Как презентовать результаты нетехническим боссам)",
        "Выбор правильного типа графика для конкретной истории"
      ] : [
        "Matplotlib & Seaborn (Classic visualization libraries)",
        "Interactive charts (Plotly or Recharts)",
        "Communication (How to present results to non-technical bosses)",
        "Choosing the right chart for the right story"
      ],
      howToLearn: language === 'ru'
        ? "Возьмите датасет, который вы очистили во 2-й фазе, и постройте 'Дашборд руководителя'. Представьте, что вы презентуете это CEO."
        : "Take a dataset you cleared in Phase 2 and build a 'Executive Dashboard'. Imagine you are presenting this to your CEO.",
      focus: language === 'ru' ? "Ясность и убедительность через визуальные данные." : "Clarity and persuasion through visual data.",
      icon: BarChart,
      color: "#ec4899"
    },
    {
      id: 5,
      title: language === 'ru' ? "Фаза 5: Сила Прогноза" : "Phase 5: Predictive Power",
      subtitle: language === 'ru' ? "Прикладное машинное обучение" : "Applied Machine Learning",
      duration: language === 'ru' ? "12 Недель" : "12 Weeks",
      intensity: language === 'ru' ? "10-12 часов в неделю" : "10-12 hours per week",
      description: language === 'ru'
        ? "Переходим от 'что случилось' к 'что случится'. Здесь вы научитесь строить модели, которые предсказывают результаты на основе исторических данных."
        : "Now we move from 'what happened' to 'what will happen'. This is where you learn to build models that predict outcomes based on historical patterns.",
      whatToLearn: language === 'ru' ? [
        "Линейная регрессия (Прогноз цены, температуры, продаж)",
        "Классификация (Это спам? Это мошенническая транзакция?)",
        "Оценка модели (Как понять, что модель работает?)",
        "Scikit-Learn (Главная библиотека для ML на Python)"
      ] : [
        "Linear Regression (Predicting price, temperature, sales)",
        "Classification (Is this email spam? Is this transaction fraudulent?)",
        "Model Evaluation (How do we know our model works?)",
        "Scikit-Learn (The main library for ML in Python)"
      ],
      howToLearn: language === 'ru'
        ? "Выберите простой проект, например 'Прогноз цен на жилье' или 'Отток клиентов'. Сначала сфокусируйтесь на линейных моделях — они самые полезные в бизнесе."
        : "Pick a simple project like 'Predicting House Prices' or 'Customer Churn'. Focus on 'linear models' first—they are the most useful in business.",
      focus: language === 'ru' ? "Переход от наблюдений к предсказаниям." : "Moving from observation to prediction.",
      icon: BrainCircuit,
      color: "#10b981"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Introduction */}
      <div className="space-y-4 px-4 md:px-0">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
          <Map className="w-4 h-4 text-secondary" />
          <span className="text-[10px] font-mono font-black text-secondary uppercase tracking-[0.3em]">Operational_Roadmap_V1.1</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-text-main uppercase italic tracking-tighter leading-tight">
          {t('curriculum.title').split(' ').map((word, i) => (
            <span key={i} className={i === 0 ? "text-secondary" : ""}>{word} </span>
          ))}
        </h1>
        <p className="text-text-muted max-w-2xl text-sm leading-relaxed font-medium uppercase opacity-80">
          {t('curriculum.intro')}
        </p>
      </div>

      {/* Adult Learning Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
        {[
          { title: t('curriculum.feature1.title'), icon: Clock, desc: t('curriculum.feature1.desc') },
          { title: t('curriculum.feature2.title'), icon: Target, desc: t('curriculum.feature2.desc') },
          { title: t('curriculum.feature3.title'), icon: Lightbulb, desc: t('curriculum.feature3.desc') }
        ].map((item, i) => (
          <div key={i} className="bg-card border border-research-line rounded-[24px] p-6 space-y-3 shadow-sm">
             <item.icon className="w-6 h-6 text-secondary" />
             <h4 className="text-[11px] font-black text-text-main uppercase tracking-widest">{item.title}</h4>
             <p className="text-[10px] text-text-muted leading-relaxed uppercase opacity-60 font-mono tracking-tight">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-8 relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-secondary/50 via-secondary/10 to-transparent hidden md:block" />

        {PHASES.map((phase, idx) => (
          <div key={phase.id} className="relative px-4 md:px-0 md:pl-20">
            {/* Phase Indicator */}
            <div className="hidden md:flex absolute left-0 top-0 w-16 h-16 rounded-2xl bg-bg-app border-4 border-research-line items-center justify-center shadow-lg z-10">
               <phase.icon className="w-8 h-8" style={{ color: phase.color }} />
            </div>

            <div className="bg-card border border-research-line rounded-[40px] p-8 shadow-2xl space-y-6 hover:border-secondary/30 transition-all group">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em]" style={{ color: phase.color }}>Level_0{phase.id}</span>
                    <h3 className="text-2xl font-black text-text-main uppercase italic tracking-tighter mt-1">{phase.title}</h3>
                    <p className="text-[11px] font-mono text-text-muted uppercase tracking-widest mt-1 opacity-60">{phase.subtitle}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                     <div className="px-4 py-2 rounded-xl bg-accent-soft border border-research-line text-[9px] font-mono text-text-muted uppercase tracking-widest flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" /> {phase.duration}
                     </div>
                     <div className="px-4 py-2 rounded-xl bg-secondary/10 border border-secondary/20 text-[9px] font-mono text-secondary uppercase tracking-widest font-black flex items-center gap-2">
                        <Target className="w-3.5 h-3.5" /> {phase.intensity}
                     </div>
                  </div>
               </div>

               <p className="text-sm text-text-main/80 leading-relaxed uppercase font-medium">
                  {phase.description}
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-research-line/50">
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5" /> {t('curriculum.learning_objectives')}
                     </h4>
                     <ul className="space-y-2">
                        {phase.whatToLearn.map((item, i) => (
                           <li key={i} className="flex items-center gap-3 text-[10px] text-text-muted font-mono uppercase tracking-tight">
                              <div className="w-1 h-1 rounded-full bg-primary" /> {item}
                           </li>
                        ))}
                     </ul>
                  </div>
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-mono font-black text-secondary uppercase tracking-[0.3em] flex items-center gap-2">
                        <Star className="w-3.5 h-3.5" /> {t('curriculum.action_method')}
                     </h4>
                     <p className="text-[10px] text-text-muted leading-relaxed uppercase font-mono opacity-80 border-l-2 border-secondary/30 pl-4 py-1 italic">
                        {phase.howToLearn}
                     </p>
                     <div className="bg-accent-soft rounded-2xl p-4 border border-research-line">
                        <p className="text-[9px] font-black text-text-muted uppercase tracking-widest mb-1">{t('curriculum.success_focus')}:</p>
                        <p className="text-[10px] text-text-main font-mono uppercase">{phase.focus}</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Encouragement */}
      <div className="bg-secondary p-12 rounded-[40px] text-center space-y-6 relative overflow-hidden group">
         <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
         <div className="relative z-10 space-y-6">
            <div className="w-20 h-20 bg-black rounded-3xl mx-auto flex items-center justify-center shadow-2xl">
               <Settings2 className="w-10 h-10 text-secondary" />
            </div>
            <div>
               <h3 className="text-3xl font-black text-black uppercase tracking-tighter italic leading-none">{t('curriculum.journey_begins')}</h3>
               <p className="text-[10px] font-black text-black/60 uppercase tracking-[0.4em] mt-3">{t('curriculum.persistence')}</p>
            </div>
            <p className="text-black/80 max-w-lg mx-auto text-sm font-medium uppercase leading-relaxed">
              {t('curriculum.footer_desc')}
            </p>
         </div>
      </div>
    </div>
  );
}
