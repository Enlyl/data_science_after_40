export interface Lesson {
  id: string;
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  category: 'Analytics' | 'Statistics' | 'Python' | 'Machine Learning' | 'SQL';
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
    id: 'basic-01',
    title: 'Фаза 1. Загадка кофейни: Кто наши клиенты?',
    description: 'Научитесь смотреть на таблицы не как на столбцы цифр, а как на истории людей. Идеально для старта.',
    category: 'Analytics',
    difficulty: 'Beginner',
    caseStudy: 'Local Coffee Shop',
    content: 'Вы открыли небольшую кофейню. У вас есть таблица с продажами за месяц. Вы видите, что по вторникам продажи падают, а по выходным растут. Это и есть анализ данных — выявление закономерностей. Мы начнем с самого простого: как читать данные и находить в них смысл.',
    problem: 'Как понять, в какое время приходит больше всего людей, чтобы пригласить второго баристу?',
    theory: 'Основы данных: Строки (записи) и Столбцы (характеристики). Среднее значение и медиана — способы понять "типичного" покупателя.',
    visualType: 'bar',
    data: [
      { name: 'Понедельник', value: 120 },
      { name: 'Вторник', value: 80 },
      { name: 'Среда', value: 150 },
      { name: 'Четверг', value: 140 },
      { name: 'Пятница', value: 200 },
      { name: 'Суббота', value: 300 },
      { name: 'Воскресенье', value: 280 },
    ],
    fullExplanation: 'Смотря на график, мы сразу видим, что пик нагрузки приходится на выходные. Здесь не нужна сложная математика. Главное — задать правильный вопрос к данным.',
    practicalTip: 'Всегда визуализируйте данные перед тем как делать выводы. Глаз человека лучше замечает паттерны на картинке, чем в таблице.',
    businessValue: 'Понимание посещаемости позволило оптимизировать смены бариста и сэкономить 15% на зарплатном фонде.',
    selfStudyTask: {
      title: 'Анализ меню',
      description: 'Попробуйте сгруппировать продажи не по дням, а по типам напитков.',
      goal: 'Узнайте топ-3 самых популярных напитка.'
    }
  },
  {
    id: 'basic-02',
    title: 'Фаза 1. Охота за аномалиями (Выбросы)',
    description: 'Что делать, если один человек купил 100 чашек кофе? Разбираемся с необычными данными.',
    category: 'Statistics',
    difficulty: 'Beginner',
    caseStudy: 'Онлайн-магазин',
    content: 'Представьте, что средний чек в вашем магазине 500 рублей. Но сегодня один клиент купил товаров на 50 000 рублей. Если вы посчитаете среднее за сегодня, оно будет огромным! Такие редкие случаи называются "выбросами" (аномалиями).',
    problem: 'Как не дать одному оптовику исказить понимание "среднего" покупателя?',
    theory: 'Разница между Средним арифметическим и Медианой. Медиана не боится выбросов, так как это просто "число посередине".',
    visualType: 'scatter',
    data: [
      { x: 1, y: 500, name: 'Покупатель 1' },
      { x: 2, y: 450, name: 'Покупатель 2' },
      { x: 3, y: 600, name: 'Покупатель 3' },
      { x: 4, y: 50000, name: 'Покупатель 4 (Выброс)' },
      { x: 5, y: 550, name: 'Покупатель 5' },
    ],
    fullExplanation: 'Средний чек с учетом оптовика получится около 10 000 рублей, что создает иллюзию богатства. А вот медиана составит 525 рублей, что отражает реальную картину.',
    practicalTip: 'Вместо среднего значения чаще используйте медиану, особенно если анализируете зарплаты или чеки.',
    businessValue: 'Использование медианы помогло маркетологам настроить рекламу на реальных клиентов, а не на несуществующих "богачей".'
  },
  {
    id: 'python-01',
    title: 'Фаза 2. Знакомство со змеей: Первые шаги в Python',
    description: 'Когда данных слишком много для Excel. Пишем первую команду для анализа тысяч строк.',
    category: 'Python',
    difficulty: 'Beginner',
    caseStudy: 'Автоматизация Отчетов',
    content: 'Когда в таблице 100 строк — Excel идеален. Когда их 1 миллион, Excel зависнет. Здесь на сцену выходит язык программирования Python и его инструмент Pandas. Pandas — это "Excel на стероидах", работающий тысячекратно быстрее.',
    problem: 'Автоматически сложить колонку "Прибыль" в таблице на 100 тысяч строк.',
    theory: 'Что такое переменные (коробочки для данных) и библиотеки (готовые наборы инструментов, например Pandas для таблиц).',
    visualType: 'bar',
    data: [
      { name: 'Филиал А', value: 45000 },
      { name: 'Филиал Б', value: 52000 },
      { name: 'Филиал В', value: 38000 },
    ],
    solutionCode: `import pandas as pd

# Загружаем "эксельку" в Python
таблица = pd.read_csv('sales.csv')

# Считаем общую прибыль за секунду
общая_прибыль = таблица['Прибыль'].sum()

print("Общая прибыль:", общая_прибыль)`,
    solutionSteps: [
      'Подключаем инструмент (import pandas).',
      'Просим его прочитать наш файл с данными.',
      'Выбираем нужную колонку и говорим "суммируй" (.sum()).'
    ],
    fullExplanation: 'То, что в Excel потребовало бы открывания файла, ожидания его загрузки, выделения колонки и клик на автосумму, Python делает в 3 строки кода и за доли секунды.',
    practicalTip: 'Не бойтесь кода. Это просто пошаговая инструкция для компьютера, как рецепт пирога.',
    businessValue: 'Аналитик сэкономил 4 часа рутинной работы в неделю, автоматизировав сбор отчета.'
  },
  {
    id: 'python-02',
    title: 'Фаза 2. Уборка данных (Очистка от мусора)',
    description: 'В реальном мире данные грязные. Учимся приводить их в порядок с помощью Pandas.',
    category: 'Python',
    difficulty: 'Intermediate',
    caseStudy: 'Опрос клиентов',
    content: 'Мы провели опрос клиентов. Кто-то указал возраст "25", кто-то написал "двадцать пять", а кто-то оставил поле пустым. Если мы попытаемся посчитать средний возраст, система выдаст ошибку. Данные нужно "причесать".',
    problem: 'Удалить пустые строки и исправить неправильные форматы.',
    theory: 'Пропущенные значения (Null/NaN) и типизация данных (текст, числа). Метод очистки .dropna().',
    visualType: 'bar',
    data: [
      { name: 'Правильные', value: 85 },
      { name: 'С пустыми полями', value: 10 },
      { name: 'Ошибки ввода', value: 5 },
    ],
    solutionCode: `import pandas as pd

df = pd.read_csv('survey.csv')

# Выбрасываем строки, где пользователь не указал возраст
df_clean = df.dropna(subset=['Возраст'])

print(f"Осталось чистых ответов: {len(df_clean)}")`,
    solutionSteps: [
      'Загрузка сырых данных.',
      'Выявление пустых значений (NaN).',
      'Удаление бракованных строк или замена пустот на среднее арифметическое.'
    ],
    fullExplanation: 'Чистые данные — залог правильных выводов. Правило Data Science: Garbage In - Garbage Out (Мусор на входе - мусор на выходе).',
    practicalTip: 'Никогда не перезаписывайте исходный файл! Всегда сохраняйте очищенные данные в новый файл (например, clean_data.csv).',
  },
  {
    id: 'ml-01',
    title: 'Фаза 3. Заглядываем в будущее (Линейная регрессия)',
    description: 'Наш первый алгоритм Машинного Обучения. Узнаем, сколько мы заработаем завтра.',
    category: 'Machine Learning',
    difficulty: 'Intermediate',
    caseStudy: 'Прогноз Продаж Мороженого',
    content: 'Лето, жара. Вы замечаете, что чем выше температура на улице, тем больше мороженого вы продаете. Зная прогноз погоды на завтра, мы можем предсказать точные продажи! Линейная регрессия поможет нам провести прямую линию через эти точки.',
    problem: 'Завтра обещают +30 градусов. Сколько порций нам заготовить?',
    theory: 'Машинное обучение (ML) — это когда компьютер сам находит взаимосвязь. Линейная регрессия — поиск прямой, которая лучше всего описывает тренд.',
    visualType: 'line',
    data: [
      { name: '+20 °C', value: 50 },
      { name: '+22 °C', value: 65 },
      { name: '+25 °C', value: 90 },
      { name: '+28 °C', value: 110 },
      { name: '+30 °C', value: 130 },
    ],
    solutionCode: `from sklearn.linear_model import LinearRegression
import numpy as np

# Обучаем модель (Градусы -> Порции)
температура = np.array([[20], [22], [25], [28]])
продажи = np.array([50, 65, 90, 110])

model = LinearRegression()
model.fit(температура, продажи)

# Предсказываем на завтра (+30 градусов)
завтра = np.array([[30]])
прогноз = model.predict(завтра)
print(f"Готовьте порций: {int(прогноз[0])}")`,
    solutionSteps: [
      'Собрать исторические данные о погоде и продажах (Обучающая выборка).',
      'Передать их модели: "Учись находить связь" (.fit).',
      'Попросить модель сделать предсказание на новых данных (.predict).'
    ],
    fullExplanation: 'Компьютер понял, что каждый дополнительный градус жары дает вам около 7 дополнительных продаж мороженого. Это и есть чудо Машинного Обучения!',
    practicalTip: 'Линейная регрессия работает, только если связь действительно похожа на прямую линию.',
    businessValue: 'Заранее заготовленное правильное количество мороженого снизило списания испорченного товара на 40%.'
  },
  {
    id: 'sql-01',
    title: 'SQL: Разговор с Базой Данных (SELECT)',
    title_en: 'SQL: Talking to Databases (SELECT)',
    description: 'Основы SQL: как забрать нужные столбцы из таблицы с миллионами строк.',
    description_en: 'SQL basics: how to retrieve specific columns from large tables.',
    category: 'SQL',
    difficulty: 'Beginner',
    caseStudy: 'Анализ базы клиентов Airbnb',
    caseStudy_en: 'Airbnb User Analytics',
    content: 'Когда данных миллионы, хранить их в CSV-файлах невозможно. Компании используют Базы Данных (БД). А язык, на котором общаются с БД — это SQL (Structured Query Language). Самая главная команда в нем — SELECT (Выбрать). Это как сказать: "Выдай мне имя и возраст из таблицы Клиентов".',
    content_en: 'When dealing with millions of records, CSVs don\'t cut it. Companies use Databases, and SQL is the language to query them. The core command is SELECT.',
    problem: 'Как выгрузить список всех email-адресов пользователей из огромной таблицы `users`, чтобы отправить им рассылку?',
    theory: 'Команда SELECT выбирает столбцы (можно переименовывать их через AS), а FROM указывает, из какой таблицы их брать. Зведочка (*) означает "все столбцы", но в Data Science это дурной тон (слишком много данных!). Оператор LIMIT ограничивает количество возвращаемых строк.',
    visualType: 'bar',
    data: [
      { name: 'Пользователи (млн)', value: 45 },
      { name: 'Выгружено (млн)', value: 45 }
    ],
    solutionCode: `SELECT 
    first_name AS user_name, 
    email AS user_email
FROM users
LIMIT 100;`,
    solutionSteps: [
      'Определить нужную таблицу (users).',
      'Выбрать команду SELECT и задать псевдонимы (AS).',
      'Ограничить вывод с помощью LIMIT.'
    ],
    fullExplanation: 'За 0.5 секунды база данных обработала 45 миллионов строк и вернула вам только 2 нужные колонки. Это мощность SQL.',
    practicalTip: 'Никогда не делайте SELECT * на рабочих таблицах — вы можете положить (сломать) базу данных компании перегрузкой памяти.',
    businessValue: 'Быстрая и точная выгрузка данных позволяет маркетологам запускать целевые рекламные кампании.'
  },
  {
    id: 'sql-02',
    title: 'SQL: Фильтр шума (WHERE)',
    title_en: 'SQL: Filtering Noise (WHERE)',
    description: 'Учимся находить бриллианты в терабайтах данных: условия, фильтры, операторы.',
    description_en: 'Finding diamons in terabytes of data: conditions, filters, operators.',
    category: 'SQL',
    difficulty: 'Beginner',
    caseStudy: 'Антифрод в Банке',
    caseStudy_en: 'Bank Anti-fraud',
    content: 'Достать все данные — легко. Но аналитикам нужно искать конкретные вещи: "Транзакции больше 1000$ в ночное время" или "Пользователи из РФ, которые не заходили 6 месяцев". Для этого используется оператор WHERE.',
    content_en: 'Extracting everything is easy. Analysts need specific data. The WHERE operator is used to filter records.',
    problem: 'Нужно найти все подозрительные переводы (сумма > 100_000 руб) за последнюю неделю.',
    theory: 'WHERE работает как сито. Мы фильтруем данные с помощью условий и операторов: > (больше), < (меньше), = (равно). Их можно комбинировать через AND (И) или OR (ИЛИ). Также полезны BETWEEN (проверка диапазона) и LIKE (поиск по шаблону). Например: WHERE amount > 1000 AND status = "success".',
    visualType: 'scatter',
    data: [
      { x: 1, y: 5000, name: 'Ок' },
      { x: 2, y: 150000, name: 'Фрод!' },
      { x: 3, y: 200, name: 'Ок' }
    ],
    solutionCode: `SELECT 
    transaction_id, 
    amount, 
    user_id 
FROM transactions
WHERE amount BETWEEN 100000 AND 500000 
  AND status = 'success'
  AND merchant_name LIKE '%Crypto%';`,
    solutionSteps: [
      'Выбираем таблицу транзакций.',
      'Добавляем блок WHERE.',
      'Используем BETWEEN для диапазона и LIKE для поиска текста.'
    ],
    fullExplanation: 'База "отсеила" миллионы обычных покупок кофе и выдала вам список из 15 подозрительных операций для ручной проверки.',
    practicalTip: 'Порядок важен: WHERE всегда пишется ПОСЛЕ FROM, но ДО сортировки (ORDER BY).',
    businessValue: 'Автоматическая фильтрация экономит сотни часов работы службы безопасности.'
  },
  {
    id: 'sql-03',
    title: 'SQL: Бизнес-метрики (GROUP BY)',
    title_en: 'SQL: Business Metrics (GROUP BY)',
    description: 'Считаем выручку, средний чек и количество покупок с помощью аггрегации.',
    description_en: 'Calculating revenue, average order value and counts via aggregation.',
    category: 'SQL',
    difficulty: 'Intermediate',
    caseStudy: 'Аналитика маркетплейса',
    caseStudy_en: 'Marketplace Analytics',
    content: 'Когда CEO спрашивает "Какая у нас выручка по городам?", ему не нужны миллионы строк с чеками. Ему нужна маленькая табличка: Город - Выручка. В SQL для сжатия (аггрегации) данных используется магия GROUP BY.',
    content_en: 'When a CEO asks for revenue by city, they don\'t want millions of rows. GROUP BY aggregates data into summaries.',
    problem: 'Посчитать средний чек (AOV) и общую выручку для каждого города присутствия.',
    theory: 'Функции SUM(), AVG(), COUNT() схлопывают множество строк в одну цифру. GROUP BY говорит базе данных, по какому признаку "схлопывать" продажи (например, по городу).',
    visualType: 'bar',
    data: [
      { name: 'Москва', value: 500000 },
      { name: 'Спб', value: 300000 },
      { name: 'Казань', value: 150000 }
    ],
    solutionCode: `SELECT 
    city,
    COUNT(order_id) as total_orders,
    SUM(amount) as total_revenue,
    AVG(amount) as aov
FROM orders
GROUP BY city
ORDER BY total_revenue DESC;`,
    solutionSteps: [
      'Выбираем колонку для группировки (city).',
      'Применяем агрегатные функции к числовым колонкам.',
      'Группируем (GROUP BY) и сортируем по убыванию выручки (ORDER BY DESC).'
    ],
    fullExplanation: 'Из миллиона строк мы получили 3 строки. Это уже не просто сырые данные, это Инсайт, готовый для дашборда!',
    practicalTip: 'Всё, что вы написали в SELECT (кроме агрегатных функций с математикой), ОБЯЗАТЕЛЬНО должно быть перечислено в GROUP BY.',
    businessValue: 'Понимание AOV по регионам позволяет грамотно распределять маркетинговый бюджет.'
  },
  {
    id: 'sql-04',
    title: 'SQL: Сшиваем Франкенштейна (JOIN)',
    title_en: 'SQL: Stitching Frankenstein (JOIN)',
    description: 'Как объединять данные из разных таблиц по ключам (ID).',
    description_en: 'Merging data from multiple tables using keys (IDs).',
    category: 'SQL',
    difficulty: 'Advanced',
    caseStudy: 'Рекомендательная система Netflix',
    caseStudy_en: 'Netflix Recommender System',
    content: 'В реальных базах данные разделены. В одной таблице лежат имена юзеров (`users`). Во второй — названия фильмов (`movies`). А в третьей — кто что посмотрел (`views`). Чтобы сделать отчет, нам нужно сшить их вместе! Это делается оператором JOIN.',
    content_en: 'In real databases, data is split across tables. We use JOIN to merge them back together.',
    problem: 'Получить таблицу вида "Имя человека - Какое кино он смотрел".',
    theory: 'JOIN работает как ВПР в Excel. Он ищет совпадения по уникальным идентификаторам (ID). Например, user_id в таблице просмотров равен id в таблице пользователей.',
    visualType: 'bar',
    data: [
      { name: 'Users Table', value: 100 },
      { name: 'Views Table', value: 100 },
      { name: 'Joined Result', value: 200 }
    ],
    solutionCode: `SELECT 
    u.first_name,
    m.title,
    v.watch_date
FROM views v
JOIN users u 
  ON v.user_id = u.id
JOIN movies m 
  ON v.movie_id = m.id;`,
    solutionSteps: [
      'Берем центральную таблицу (views).',
      'Присоединяем users по ключу user_id.',
      'Присоединяем movies по ключу movie_id.'
    ],
    fullExplanation: 'Мы собрали распределенные данные в единую, плоскую, богатую смыслами таблицу. Именно такие таблицы скармливают алгоритмам машинного обучения.',
    practicalTip: 'Используйте алиасы (короткие псевдонимы таблиц, например u вместо users), чтобы код был чище.',
    businessValue: 'Склеивание данных из CRM и логов приложения — первый шаг к созданию профиля 360° для клиента.'
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
  category: 'Fundamentals' | 'Mathematics' | 'Statistics' | 'Machine Learning' | 'Deep Learning' | 'SQL' | 'Analytics';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
}

export const THEORY_TOPICS: TheoryTopic[] = [
  {
    id: 'th-data-01',
    title: 'Что такое Данные?',
    title_en: 'What is Data?',
    description: 'Основы таблиц: строки и столбцы. Как перевести реальный мир в цифры.',
    description_en: 'Table basics: rows and columns.',
    category: 'Fundamentals',
    level: 'Beginner',
    tags: ['Basics', 'Data', 'SQL'],
    content: 'Данные — это просто записанные факты. Когда вы записываете в блокнот, сколько потратили в магазине — это данные. В Data Science мы представляем данные в виде таблиц, где каждая СТРОКА — это один объект (один клиент, один чек), а каждый СТОЛБЕЦ — его характеристика (возраст, сумма чека). Понимание этой просто концепции открывает путь к анализу чего угодно.'
  },
  {
    id: 'th-stats-01',
    title: 'Среднее vs Медиана',
    title_en: 'Mean vs Median',
    description: 'Почему "средняя зарплата" часто врет, и как медиана спасает ситуацию.',
    description_en: 'Why mean salary lies and how median saves the day.',
    category: 'Fundamentals',
    level: 'Beginner',
    tags: ['Stats', 'Basics'],
    content: 'Представьте 10 человек в баре, каждый зарабатывает 50к рублей. Среднее — 50к. В бар заходит Билл Гейтс. Теперь средняя зарплата в баре — миллион долларов! Но люди богаче не стали. Среднее арифметическое очень боится "выбросов" (аномалий). Медиана работает умнее: она выстраивает всех по росту доходов и берет того, кто стоит ровно посередине. И это по-прежнему 50к.'
  },
  {
    id: 'th-python-01',
    title: 'Зачем нужен Python?',
    title_en: 'Why Python?',
    description: 'Python как ультимативный калькулятор, который не "зависает" от 1 млн строк.',
    description_en: 'Python as an ultimate calculator.',
    category: 'Fundamentals',
    level: 'Beginner',
    tags: ['Python', 'Pandas', 'Basics'],
    content: 'Многие боятся программирования. Но для Data Science Python — это просто инструмент, как молоток. Вам не нужно писать сложные программы или сайты. Вы используете Python (и библиотеку Pandas), чтобы сказать компьютеру: "Возьми эту таблицу, найди здесь все пустые строки и посчитай выручку". То, что в Excel делается мышкой, в Python делается короткой текстовой командой, но работает в тысячу раз быстрее и не зависает.'
  },
  {
    id: 'th-ml-01',
    title: 'Интуиция Машинного Обучения',
    title_en: 'Machine Learning Intuition',
    description: 'Как компьютеры учатся находить закономерности без участия человека.',
    description_en: 'How computers learn patterns.',
    category: 'Machine Learning',
    level: 'Intermediate',
    tags: ['AI', 'ML', 'Basics'],
    content: 'Классическое программирование: вы пишете жесткие правила (Если температура > 30, то продадим 100 мороженого). Машинное обучение: вы даете компьютеру данные за прошлые годы и говорите "Найди правило сам". И компьютер находит закономерность, рассчитывая коэффициенты. Это не магия, это статистика и Линейная Регрессия.'
  },
  {
    id: 'th-viz-01',
    title: 'Искусство Графиков',
    title_en: 'Art of Visualization',
    description: 'Как правильно выбрать график для вашей бизнес-задачи.',
    description_en: 'How to choose the right chart.',
    category: 'Analytics',
    level: 'Intermediate',
    tags: ['Dataviz', 'Charts'],
    content: 'Графики нужны не для красоты, а для быстрого донесения мысли. Линейный график (Line Chart) — для показа тренда во времени (продажи за год). Столбчатая диаграмма (Bar Chart) — для сравнения категорий (какой филиал продал больше). Диаграмма рассеяния (Scatter Plot) — чтобы показать связь двух вещей (зависит ли зарплата от возраста).'
  },
  {
    id: 'th-sql-01',
    title: 'Реляционные Базы Данных',
    title_en: 'Relational Databases',
    description: 'Почему данные хранят в разных связанных таблицах, а не в одной мега-таблице.',
    description_en: 'Why data is stored in multiple linked tables instead of one huge table.',
    category: 'SQL',
    level: 'Beginner',
    tags: ['Database', 'SQL', 'Architecture'],
    content: 'Представьте файл Excel, в котором записаны имена клиентов, адреса, истории заказов и названия товаров. Если клиент сменит адрес, придется менять его в тысяче строк его заказов! В реляционных БД данные разделены (нормализованы): отдельно таблица клиентов, отдельно таблица товаров, отдельно таблица заказов. А связываются они через уникальные номера (ID). Это спасает от хаоса, дублирования и ошибок.'
  },
  {
    id: 'th-sql-02',
    title: 'Анатомия SQL-запроса',
    title_en: 'Anatomy of an SQL Query',
    description: 'Порядок написания и порядок выполнения SQL-команд: SELECT, FROM, WHERE...',
    description_en: 'Order of writing and execution of SQL commands.',
    category: 'SQL',
    level: 'Beginner',
    tags: ['SQL', 'Syntax'],
    content: 'В SQL мы пишем команды в одном порядке, но компьютер читает их в другом. Мы пишем: 1) SELECT (что взять), 2) FROM (откуда), 3) WHERE (какой фильтр). А компьютер исполняет: Сначала идет в таблицу (FROM), затем отсеивает лишнее (WHERE), и только потом берет нужные колонки (SELECT). Понимание этого логического порядка поможет избежать 90% ошибок для новичков.'
  },
  {
    id: 'th-sql-03',
    title: 'Типы JOIN: LEFT, INNER, RIGHT',
    title_en: 'JOIN Types: LEFT, INNER, RIGHT',
    description: 'Разница между видами склейки таблиц. Как не потерять важные данные.',
    description_en: 'Difference between JOIN types. How to avoid losing data.',
    category: 'SQL',
    level: 'Intermediate',
    tags: ['SQL', 'JOIN', 'Data Prep'],
    content: 'INNER JOIN возвращает только те строки, которые есть в ОБЕИХ таблицах (например, пользователи, которые совершили хотя бы одну покупку). LEFT JOIN более популярен в Data Science — он берет ВСЕ строки из "левой" (основной) таблицы и приклеивает данные из правой. Если совпадений нет, он ставит NULL. Это критически важно, когда мы хотим посмотреть на всех пользователей, а не только на активных покупателей.'
  }
];
