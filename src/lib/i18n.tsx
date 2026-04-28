import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ru' | 'en';

interface Translations {
  [key: string]: {
    ru: string;
    en: string;
  };
}

export const uiStrings: Translations = {
  // Sidebar
  'nav.learn': { ru: 'Миссии (Обучение)', en: 'MISSIONS (LEARN)' },
  'nav.theory': { ru: 'База Знаний (Теория)', en: 'THEORY HUB' },
  'nav.library': { ru: 'Библиотека Данных', en: 'DATA ARCHIVES' },
  'nav.progress': { ru: 'Анализ Прогресса', en: 'PROGRESS_ANALYSIS' },
  'nav.tutor': { ru: 'Интеллект-Наставник', en: 'GENAI_CORE' },
  'nav.news': { ru: 'Лента Событий', en: 'LOG_STREAM' },
  'nav.sandbox': { ru: 'Исследовательская Среда', en: 'SANDBOX_ENV' },
  'nav.skills': { ru: 'Дерево Навыков', en: 'SKILL_TREE' },
  'nav.planner': { ru: 'Стратегия (План)', en: 'ROADMAP' },
  'nav.curriculum': { ru: 'Подробная Стратегия', en: 'STRATEGY' },
  'nav.cabinet': { ru: 'Личное Дело', en: 'CLEARANCE' },
  'nav.help': { ru: 'Старт (Руководство)', en: 'START (MANUAL)' },
  'nav.settings': { ru: 'Настройки Системы', en: 'SYSTEM_CONFIG' },
  'nav.archive': { ru: 'Архив Исследований', en: 'ARCHIVE' },
  
  // Sidebar Status
  'status.terminal': { ru: 'Доступ к терминалу', en: 'TERMINAL_ACCESS' },
  'status.connection': { ru: 'Связь с центром', en: 'LINK_ESTABLISHED' },
  'status.session': { ru: 'Сессия активна', en: 'SESSION_HYPERCORE' },

  // Tabs / Nodes
  'node.main_hub': { ru: 'УЗЕЛ_01: ОСНОВНОЙ ХАБ (ОБУЧЕНИЕ)', en: 'NODE_01: MAIN_HUB (LECTURE_HALL)' },
  'node.data_lab': { ru: 'УЗЕЛ_02: DATA_LAB (ЛАБОРАТОРИЯ)', en: 'NODE_02: DATA_LAB (RESEARCH_CENTER)' },
  'node.manual': { ru: 'УЗЕЛ_00: ИНИЦИАЦИЯ (ИНСТРУКЦИИ)', en: 'NODE_00: PROTOCOL_INIT (USER_GUIDE)' },
  'node.archive': { ru: 'УЗЕЛ_03: АРХИВ (БАЗА ЗНАНИЙ)', en: 'NODE_03: RESEARCH_ARCHIVE' },

  // Data Lab Specific
  'lab.title': { ru: 'Лаборатория Исследований', en: 'Laboratory_01' },
  'lab.upload': { ru: 'Загрузить CSV', en: 'Upload CSV' },
  'lab.search': { ru: 'Поиск сета...', en: 'Search datasets...' },
  'lab.export': { ru: 'Экспорт в CSV', en: 'Export to CSV' },
  'lab.correlation': { ru: 'Корреляция', en: 'Correlation' },
  'lab.distribution': { ru: 'Распределение', en: 'Distribution' },
  'lab.table': { ru: 'Таблица данных', en: 'Data Table' },
  'lab.no_data': { ru: 'Данные не загружены', en: 'No data loaded' },
  'lab.geometry': { ru: 'Эстетика Геометрии', en: 'Geometry Aesthetics' },
  'lab.color': { ru: 'Цветовой Профиль', en: 'Color Profile' },
  'lab.vector': { ru: 'Стиль Вектора', en: 'Vector Style' },
  'lab.labels': { ru: 'Метки Данных', en: 'Data Labels' },
  'lab.x_axis': { ru: 'Протокол Оси X', en: 'X Axis Protocol' },
  'lab.y_axis': { ru: 'Протокол Оси Y', en: 'Y Axis Protocol' },
  'lab.custom_label': { ru: 'Своя метка', en: 'Custom Label' },
  'lab.data_format': { ru: 'Формат данных', en: 'Data Format' },
  'status.online': { ru: 'В СЕТИ', en: 'ONLINE' },
  'status.institute': { ru: 'Институт Исследований', en: 'RESEARCH INSTITUTE' },
  'status.uplink': { ru: 'Связь', en: 'UPLINK' },
  'status.temp': { ru: 'Температура ЦП', en: 'CORE_TEMP' },
  'status.activity': { ru: 'Активность', en: 'ACTIVITY' },
  'status.rank': { ru: 'Развитие Ранга', en: 'RANK_EVOLUTION' },

  // Tabs Header
  'tab.learn.title': { ru: 'Исследовательский Хаб', en: 'Research Hub' },
  'tab.learn.desc': { ru: 'Выберите следующую миссию для анализа данных', en: 'Select next mission for data analysis' },
  'tab.library.title': { ru: 'Библиотека Алгоритмов', en: 'Algorithm Archives' },
  'tab.library.desc': { ru: 'Справочник методов и инструментов Data Science', en: 'Reference for DS methods and tools' },
  
  // Lesson Modal
  'lesson.start': { ru: 'Запустить миссию', en: 'Initiate Probe' },
  'lesson.complete': { ru: 'Миссия завершена', en: 'Dossier Complete' },
  'lesson.steps': { ru: 'Этапы анализа', en: 'Analysis Steps' },
  'lesson.theory': { ru: 'Теоретическая база', en: 'Theoretical Basis' },
  'lesson.practical': { ru: 'Практический совет', en: 'Field Recommendation' },
  'lesson.business': { ru: 'Ценность для института', en: 'Institutional Value' },
  'lesson.code': { ru: 'Ядро алгоритма (Python)', en: 'Algorithm Kernel (Python)' },
  'lesson.explanation': { ru: 'Интерпретация результатов', en: 'Reconstruction Feedback' },

  // Search & Filters
  'search.placeholder': { ru: 'Поиск по базе...', en: 'Searching records...' },
  'filter.all': { ru: 'Все категории', en: 'All Categories' },

  // Auth
  'auth.title': { ru: 'ИНСТИТУТ_АСТРО_ИССЛЕДОВАНИЙ', en: 'ASTRO_RESEARCH_INSTITUTE' },
  'auth.subtitle': { ru: 'Стратегический Узел Данных // Доступ Запрещен', en: 'Strategic_Data_Node // Unauthorized_Access_Denied' },
  'auth.desc': { ru: 'Для входа в систему и синхронизации исследовательских данных требуется биометрическая авторизация Google.', en: 'Google biometric authentication is required to access the system and sync research data.' },
  'auth.login': { ru: 'Синхронизация Личности', en: 'IDENTITY_SYNC' },
  'auth.loading': { ru: 'УСТАНОВКА_СВЯЗИ...', en: 'ESTABLISHING_UPLINK...' },

  // News
  'news.title': { ru: 'Архив Новостей', en: 'Archive Intelligence' },
  'news.subtitle': { ru: 'Глобальный поток данных DS', en: 'Global DS Intelligence Feed' },

  // Settings
  'settings.title': { ru: 'Конфигурация Системы', en: 'System Configuration' },
  'settings.subtitle': { ru: 'Управление параметрами и приватностью', en: 'Manage parameters and privacy' },
  'settings.lang': { ru: 'Язык интерфейса', en: 'Interface Language' },
  'settings.ru': { ru: 'Русский', en: 'Russian' },
  'settings.en': { ru: 'Английский', en: 'English' },

  // Skill Tree
  'skills.title': { ru: 'Дерево Навыков', en: 'SKILL_TREE' },
  'skills.subtitle': { ru: 'Прокладывайте свой путь через тернии к звёздам Data Science', en: 'Navigating the celestial path through Data Science complexities' },
  'skills.stats': { ru: 'Основы математики', en: 'MTH_FOUNDATIONS' },
  'skills.python': { ru: 'Python Core', en: 'PYTHON_CORE' },
  'skills.pandas': { ru: 'Pandas & DataFrames', en: 'DATA_MANIPULATION' },
  'skills.viz': { ru: 'Визуализация', en: 'VISUALIZATION' },
  'skills.ml': { ru: 'ML Алгоритмы', en: 'ML_ALGORITHMS' },
  'skills.nlp': { ru: 'NLP Обработка', en: 'NLP_PROCESSING' },
  'skills.deep': { ru: 'Deep Learning', en: 'DEEP_LEARNING' },
  'skills.level': { ru: 'УРОВЕНЬ', en: 'LEVEL' },
  'skills.mastered': { ru: 'ОСВОЕНО', en: 'MASTERED' },

  // Study Planner
  'planner.title': { ru: 'Планировщик Эффективности', en: 'Efficiency_Planner' },
  'planner.subtitle': { ru: 'Оптимизация когнитивной нагрузки', en: 'Optimizing_Cognitive_Loading' },
  'planner.add_btn': { ru: 'Добавить_Цель', en: 'Append_New_Objective' },
  'planner.add_title': { ru: 'Конфигурация_Нового_Узла', en: 'Configure_New_Node' },
  'planner.placeholder_title': { ru: 'ЗАГОЛОВОК_ЦЕЛИ...', en: 'OBJECTIVE_TITLE...' },
  'planner.placeholder_duration': { ru: 'ДЛИТЕЛЬНОСТЬ (напр. 45м)', en: 'DURATION (e.g. 45m)' },
  'planner.btn_save': { ru: 'Инициализировать_Стратегию', en: 'Initialize_Strategy_Node' },
  'planner.today': { ru: 'Протокол Сегодня', en: 'Today_Protocol' },
  'planner.est_time': { ru: 'Оценка времени', en: 'Est. Time' },
  'planner.priority': { ru: 'Приоритет', en: 'Priority' },
  'planner.p_low': { ru: 'П_НИЗКИЙ', en: 'P_LOW' },
  'planner.p_medium': { ru: 'П_СРЕДНИЙ', en: 'P_MEDIUM' },
  'planner.p_high': { ru: 'П_ВЫСОКИЙ', en: 'P_HIGH' },

  // Detailed Curriculum
  'curriculum.title': { ru: 'Стратегическая Программа', en: 'Strategic Curriculum' },
  'curriculum.intro': { ru: 'План обучения, адаптированный под жизненный опыт и ограниченное время. Мы фокусируемся на прикладных навыках, которые приносят результат в бизнесе и карьере.', en: 'Learning plan adapted for life experience and limited time. We focus on applied skills that bring results in business and career.' },
  'curriculum.feature1.title': { ru: 'Сначала Эффективность', en: 'Efficiency First' },
  'curriculum.feature1.desc': { ru: 'Мы не тратим время на теорию, которая не пригодится в первые 3 года работы.', en: "We don't waste time on theory that won't be useful in the first 3 years of work." },
  'curriculum.feature2.title': { ru: 'Проектный Подход', en: 'Project Based' },
  'curriculum.feature2.desc': { ru: 'Каждый этап заканчивается реальным проектом для вашего портфолио.', en: 'Each stage ends with a real project for your portfolio.' },
  'curriculum.feature3.title': { ru: 'Регулярный Поток', en: 'Consistent Flow' },
  'curriculum.feature3.desc': { ru: '30 минут ежедневно лучше, чем 5 часов в воскресенье. Постоянство — ключ к успеху.', en: '30 minutes daily is better than 5 hours on Sunday. Consistency is the key to success.' },
  'curriculum.learning_objectives': { ru: 'Цели Обучения', en: 'Learning Objectives' },
  'curriculum.action_method': { ru: 'Методика Действия', en: 'Action Method' },
  'curriculum.success_focus': { ru: 'Фокус Успеха', en: 'Success Focus' },
  'curriculum.journey_begins': { ru: 'Путешествие Начинается', en: 'The Journey Begins' },
  'curriculum.persistence': { ru: 'Упорство важнее Совершенства', en: 'Persistence Over Perfection' },
  'curriculum.footer_desc': { ru: 'Вы не соревнуетесь с 20-летними гениями математики. Вы используете свой опыт, насмотренность и дисциплину для решения реальных проблем. Это и есть настоящая Data Science.', en: "You're not competing with 20-year-old math geniuses. You're using your experience, insight, and discipline to solve real problems. That is what real Data Science is." },

  // User Guide
  'guide.nav_title': { ru: 'Навигация Системы', en: 'System Navigation' },
  'guide.active_nodes': { ru: '3 АКТИВНЫХ УЗЛА', en: '3 ACTIVE NODES' },
  'guide.badge.start': { ru: 'СТАРТ СЕССИИ', en: 'START SESSION' },
  'guide.badge.optimization': { ru: 'ОПТИМИЗАЦИЯ КОРТЕКСА', en: 'COGNITIVE OPTIMIZATION' },
  'guide.badge.mapping': { ru: 'КАРТИРОВАНИЕ СИСТЕМЫ', en: 'SYSTEM MAPPING' },
  'guide.roadmap_title': { ru: 'Ваша Стратегия', en: 'Your Strategy' },
  'guide.roadmap_desc': { ru: 'Готовый план развития от новичка до специалиста. С расчетом времени и приоритетами.', en: 'Ready development plan from beginner to specialist. With time calculations and priorities.' },
  'guide.open_roadmap': { ru: 'Открыть план', en: 'Open Roadmap' },
  'guide.quick_start': { ru: 'Быстрый Старт', en: 'Quick Start' },
  'guide.step1': { ru: 'Пройдите вводный урок в Хабе', en: 'Complete Intro Lesson in Hub' },
  'guide.step2': { ru: 'Постройте график в Data Lab', en: 'Build a Chart in Data Lab' },
  'guide.step3': { ru: 'Настройте тему в Системе', en: 'Configure Theme in System' },
  'guide.step4': { ru: 'Обсудите теорию с AI Tutor', en: 'Discuss Theory with AI Tutor' },

  // Common
  'common.close': { ru: 'Закрыть терминал', en: 'Close Terminal' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('app_language') as Language) || 'ru';
  });

  useEffect(() => {
    localStorage.setItem('app_language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return uiStrings[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
