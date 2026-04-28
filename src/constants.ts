export interface Lesson {
  id: string;
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  category: 'Analytics' | 'Statistics' | 'Python' | 'Machine Learning';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  caseStudy: string;
  caseStudy_en?: string;
  content: string;
  content_en?: string;
  problem: string;
  problem_en?: string;
  theory: string;
  theory_en?: string;
  visualType: 'bar' | 'line' | 'scatter' | 'pie';
  data: any[];
  solutionCode?: string;
  solutionSteps?: string[];
  solutionSteps_en?: string[];
  fullExplanation?: string;
  fullExplanation_en?: string;
  codeExplanation?: {
    step: string;
    step_en?: string;
    detail: string;
    detail_en?: string;
  }[];
  practicalTip?: string;
  practicalTip_en?: string;
  businessValue?: string;
  businessValue_en?: string;
  selfStudyTask?: {
    title: string;
    title_en?: string;
    description: string;
    description_en?: string;
    goal: string;
    goal_en?: string;
  };
}

export const LESSONS: Lesson[] = [
  {
    id: 'astro-01',
    title: 'Астрометрия: Космологическое расширение',
    description: 'Определение скорости расширения Вселенной на основе спектральных данных далеких галактик.',
    category: 'Analytics',
    difficulty: 'Intermediate',
    caseStudy: 'Deep Space Observatory',
    content: 'Для понимания эволюции космоса нам необходимо измерять красное смещение — изменение длины волны света при удалении объекта. Это фундамент современной космологии.',
    problem: 'Как по набору спектральных пиков вычислить константу Хаббла и определить возраст Вселенной?',
    theory: 'Закон Хаббла гласит: скорость убегания галактик прямо пропорциональна их расстоянию от нас. В анализе данных это превращается в задачу линейной регрессии.',
    visualType: 'scatter',
    data: [
      { x: 10, y: 700, name: 'NGC 1365' },
      { x: 25, y: 1750, name: 'M100' },
      { x: 40, y: 2800, name: 'NGC 4414' },
      { x: 55, y: 3850, name: 'Galaxy X' },
      { x: 70, y: 4900, name: 'Galaxy Y' },
    ],
    solutionCode: `import numpy as np
from sklearn.linear_model import LinearRegression

# x: Расстояние (Mpc), y: Скорость (km/s)
X = np.array([10, 25, 40, 55, 70]).reshape(-1, 1)
y = np.array([700, 1750, 2800, 3850, 4900])

model = LinearRegression(fit_intercept=False)
model.fit(X, y)

print(f"Постоянная Хаббла (H0): {model.coef_[0]:.2f} km/s/Mpc")`,
    solutionSteps: [
      'Калибровка спектрометра и выделение линий поглощения водорода.',
      'Расчет смещения (lambda - lambda_0) / lambda_0 для каждого объекта.',
      'Построение регрессионной модели зависимости скорости от расстояния.',
      'Оценка доверительного интервала для вычисленной константы.'
    ],
    fullExplanation: 'В этом исследовании мы использовали линейную регрессию. Полученное значение 70 км/с/Мпк соответствует возрасту Вселенной около 13.8 млрд лет.',
    practicalTip: 'В астрофизике данные крайне зашумлены. Используйте взвешенную регрессию для более точных результатов.',
    businessValue: 'Регрессионные модели, отточенные на звездах, используются в предсказательной логистике.',
    selfStudyTask: {
      title: 'Анизотропия излучения',
      description: 'Изучите данные реликтового излучения.',
      goal: 'Объясните, как масштабирование данных помогает увидеть структуру ранней Вселенной.'
    }
  },
  {
    id: 'game-01',
    title: 'Game Economy: Баланс Виртуальных Миров',
    description: 'Математическое моделирование инфляции в MMO-играх на основе анализа потоков валюты.',
    category: 'Analytics',
    difficulty: 'Advanced',
    caseStudy: 'MMO Titan Quest',
    content: 'Игровая экономика живет по тем же законам, что и реальная. Если игроки получают золота больше (Source), чем могут потратить (Sink), наступает гиперинфляция.',
    problem: 'Как спроектировать систему налогов, чтобы удержать инфляцию в пределах 5% в месяц?',
    theory: 'Анализ потоков (Flux Analysis) — это мониторинг ежедневного оборота валюты для поиска точки равновесия эмиссии и сжигания.',
    visualType: 'line',
    data: [
      { name: 'W1', value: 1000 },
      { name: 'W2', value: 1200 },
      { name: 'W3', value: 1500 },
      { name: 'W4', value: 1900 },
      { name: 'W5', value: 2400 },
    ],
    solutionCode: `import pandas as pd

# Данные по неделям: [Эмиссия, Сжигание]
data = {
    'sources': [5000, 5200, 5800, 6500, 7200],
    'sinks': [4800, 4700, 4600, 4500, 4400]
}
df = pd.DataFrame(data)
df['inflation_trend'] = (df['sources'] - df['sinks']).cumsum()`,
    solutionSteps: [
      'Идентификация всех каналов дохода и расхода.',
      'Расчет чистого сальдо экономики.',
      'Предложение корректирующих множителей для редких материалов.'
    ],
    fullExplanation: 'Сжигание валюты падает, эмиссия растет. Это классический признак "стареющей" экономики. Нужно вводить новые Sink-механики.',
    practicalTip: 'Сегментируйте экономику: у "китов" и новичков разные паттерны трат.',
    businessValue: 'Правильный баланс повышает LTV игрока на 40%.',
    selfStudyTask: {
      title: 'Налог на аукцион',
      description: 'Посчитайте влияние 10% налога на транзакции.',
      goal: 'Вычислите период стабилизации экономики.'
    }
  },
  {
    id: 'bio-01',
    title: 'Биометрия: Клинические испытания',
    description: 'Статистическая оценка эффективности препаратов методами байесовского вывода.',
    category: 'Statistics',
    difficulty: 'Advanced',
    caseStudy: 'Molecular Lab',
    content: 'В медицине цена ошибки — жизнь. Мы используем статистику, чтобы подтвердить безопасность препарата.',
    problem: 'Как доказать, что положительный эффект в группе — не случайность?',
    theory: 'Мы используем p-value для подтверждения значимости. При p < 0.05 результат считается достоверным.',
    visualType: 'bar',
    data: [
      { name: 'Control', value: 12 },
      { name: 'Treatment', value: 48 },
    ],
    solutionCode: `from scipy import stats
a = [1, 0, 1, 0, 0, 1, 0, 0] * 25
b = [1, 1, 0, 1, 1, 1, 0, 1] * 25
t_stat, p_val = stats.ttest_ind(a, b)
print(f"P-value: {p_val:.10f}")`,
    solutionSteps: [
      'Ослепление данных для минимизации субъективности.',
      'Расчет мощности теста (Power Analysis).',
      'Проведение сравнительного анализа групп.'
    ],
    fullExplanation: 'Результаты показывают критическую значимость. P-value стремится к нулю.',
    practicalTip: 'Всегда проверяйте условия применимости тестов.',
    businessValue: 'Автоматизация в R&D сокращает время вывода лекарства на рынок на 30%.',
    selfStudyTask: {
      title: 'Побочные эффекты',
      description: 'Анализ флуктуации побочных эффектов в контрольной группе.',
      goal: 'Определите порог значимости для списка побочных эффектов.'
    }
  },
  {
    id: 'retail-01',
    title: 'Churn Analytics: Удержание клиентов',
    description: 'Прогнозирование оттока пользователей на основе поведенческих паттернов.',
    category: 'Machine Learning',
    difficulty: 'Intermediate',
    caseStudy: 'Global Telecom',
    content: 'Привлечение нового клиента в 5 раз дороже удержания старого.',
    problem: 'Как найти тех, кто вот-вот уйдет, и предложить им бонус?',
    theory: 'Бинарная классификация с использованием случайного леса (Random Forest) позволяет выявлять скрытые закономерности в поведении.',
    visualType: 'line',
    data: [
      { name: 'M1', value: 5 },
      { name: 'M2', value: 8 },
      { name: 'M3', value: 15 },
      { name: 'M4', value: 12 },
    ],
    solutionCode: `from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)
prob = model.predict_proba(new_data)`,
    solutionSteps: [
      'Анализ факторов риска (частые жалобы, снижение трат).',
      'Обучение классификатора.',
      'Оценка качества по матрице ошибок.'
    ],
    fullExplanation: 'Модель выявила, что количество звонков в саппорт — ключевой фактор оттока.',
    practicalTip: 'В задачах оттока полнота (Recall) важнее точности.',
    businessValue: 'Снижение оттока на 5% увеличивает прибыль на 25%.',
    selfStudyTask: {
      title: 'Retention Strategy',
      description: 'Разработка стратегии для клиентов с вероятностью ухода > 70%.',
      goal: 'Предложите 3 меры по удержанию.'
    }
  },
  {
    id: 'astro-02',
    title: 'Экзопланеты: Поиск жизни',
    description: 'Анализ кривых блеска для обнаружения прохождения планет перед диском звезды.',
    category: 'Analytics',
    difficulty: 'Advanced',
    caseStudy: 'Kepler Mission Data',
    content: 'Транзитный метод позволяет находить планеты, измеряя падение светимости звезды. Даже 0.01% падения может означать наличие планеты.',
    problem: 'Как отличить шум матрицы от реального сигнала прохождения экзопланеты?',
    theory: 'Применение преобразования Фурье и вейвлет-анализа помогает выделить периодические сигналы из зашумленных временных рядов.',
    visualType: 'line',
    data: [
      { name: 'T1', value: 100 },
      { name: 'T2', value: 99.8 },
      { name: 'T3', value: 99.7 },
      { name: 'T4', value: 100 },
      { name: 'T5', value: 100 },
    ],
    solutionCode: `import scipy.signal as signal
import numpy as np

# Поиск периодичности в данных светимости
f, Pxx_den = signal.periodogram(data_stream)
best_period = f[np.argmax(Pxx_den)]`,
    solutionSteps: [
      'Удаление тренда светимости звезды.',
      'Применение BLS (Box-fitting Least Squares) для поиска провалов.',
      'Валидация кандидата через статистические тесты.'
    ]
  },
  {
    id: 'game-02',
    title: 'Matchmaking: Честная игра',
    description: 'Система подбора игроков на основе ELO-рейтинга и балансировки команд.',
    category: 'Machine Learning',
    difficulty: 'Intermediate',
    caseStudy: 'Arena Legends',
    content: 'Плохой матчмейкинг — главная причина ухода игроков. Система должна подбирать противников так, чтобы вероятность победы была около 50%.',
    problem: 'Как минимизировать время ожидания, не жертвуя качеством подбора?',
    theory: 'Алгоритмы многоруких бандитов и системы рекомендаций здесь работают на удержание интереса.',
    visualType: 'scatter',
    data: [
      { x: 1500, y: 1510, name: 'Match 1' },
      { x: 1500, y: 2100, name: 'Match 2 (Bad)' },
      { x: 1800, y: 1780, name: 'Match 3' },
    ],
    solutionCode: `def calculate_win_prob(rating_a, rating_b):
    return 1 / (1 + 10 ** ((rating_b - rating_a) / 400))`,
    solutionSteps: [
      'Анализ распределения навыков в пуле игроков.',
      'Расчет ожидаемого винрейта.',
      'Динамическое расширение рамок поиска при долгом ожидании.'
    ]
  }
];

export interface TheoryTopic {
  id: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  content: string;
  content_en?: string;
  category: 'Fundamentals' | 'Mathematics' | 'Statistics' | 'Machine Learning' | 'Deep Learning';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

export const THEORY_TOPICS: TheoryTopic[] = [
  {
    id: 'th-stats-02',
    title: 'Введение в описательную статистику',
    title_en: 'Introduction to Descriptive Statistics',
    description: 'Основные понятия: среднее, медиана, мода и стандартное отклонение.',
    description_en: 'Core concepts: mean, median, mode, and standard deviation.',
    category: 'Statistics',
    level: 'Beginner',
    tags: ['Stats', 'Basics', 'Fundamentals'],
    content: 'Описательная статистика помогает кратко охарактеризовать основные свойства набора данных. Среднее значение, медиана и мода показывают центр данных, а стандартное отклонение — степень их разброса. Это первый шаг в любом анализе данных, позволяющий понять структуру распределения перед применением более сложных моделей.'
  },
  {
    id: 'th-stats-01',
    title: 'Вероятностные пространства',
    title_en: 'Probability Spaces',
    description: 'Аксиоматика Колмогорова и основы измерения неопределенности.',
    description_en: 'Kolmogorov axioms and fundamentals of uncertainty measurement.',
    category: 'Statistics',
    level: 'Beginner',
    tags: ['Math', 'Probability', 'Basics'],
    content: 'Вероятностное пространство — это математическая модель случайного эксперимента. Оно состоит из трех элементов: множества элементарных исходов, набора событий и вероятностной меры.'
  },
  {
    id: 'th-ml-01',
    title: 'Линейная регрессия',
    title_en: 'Linear Regression',
    description: 'Минимизация среднеквадратичной ошибки и метод наименьших квадратов.',
    description_en: 'MSE minimization and Ordinary Least Squares method.',
    category: 'Machine Learning',
    level: 'Beginner',
    tags: ['Supervised', 'Regression', 'Basics'],
    content: 'Линейная регрессия — это метод моделирования зависимости между одной зависимой переменной и одной или несколькими независимыми. В основе лежит поиск прямой, минимизирующей расстояние до точек данных.'
  },
  {
    id: 'th-deep-01',
    title: 'Обратное распространение ошибки',
    title_en: 'Backpropagation',
    description: 'Алгоритм обучения нейронных сетей через градиентный спуск.',
    description_en: 'Neural network training algorithm via gradient descent.',
    category: 'Deep Learning',
    level: 'Advanced',
    tags: ['Neural Networks', 'Optimization', 'Deep'],
    content: 'Backprop — это применение цепного правила дифференцирования для вычисления градиентов функции потерь по весам сети. Это позволяет "наказывать" веса за ошибки.'
  },
  {
    id: 'th-stats-03',
    title: 'Статистическая проверка гипотез',
    title_en: 'Statistical Hypothesis Testing',
    description: 'Нулевая и альтернативная гипотезы, p-value и критерии значимости.',
    description_en: 'Null vs. alternative hypotheses, p-value, and significance criteria.',
    category: 'Statistics',
    level: 'Intermediate',
    tags: ['Stats', 'Testing', 'Inference'],
    content: 'Проверка гипотез — это формальный процесс принятия решений в статистике. Мы начинаем с нулевой гипотезы (H0) об отсутствии эффекта и пытаемся найти свидетельства в пользу альтернативной гипотезы (H1). Основные тесты включают t-критерий Стьюдента и критерий хи-квадрат.'
  }
];
