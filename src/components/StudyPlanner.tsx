import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  Target, 
  TrendingUp, 
  MoreHorizontal, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Layout, 
  ArrowRight,
  BookOpen,
  Monitor,
  Map,
  Star,
  Plus,
  X,
  ChevronDown,
  Trash2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../lib/i18n';

// --- Types ---
interface Task {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'learning' | 'practical' | 'deep_work';
  priority: 'high' | 'medium' | 'low';
}

interface DayPlan {
  day: string;
  tasks: Task[];
}

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Основы Теории: Введение в Астрофизику', duration: '45m', completed: true, type: 'learning', priority: 'high' },
  { id: '2', title: 'Аудит Кода: Квантовые Системы Шифрования', duration: '60m', completed: false, type: 'deep_work', priority: 'medium' },
  { id: '3', title: 'Лаборатория Визуализации: Работа с Kepler', duration: '30m', completed: false, type: 'practical', priority: 'low' },
  { id: '4', title: 'Сессия Менторства: Стратегия Исследований', duration: '20m', completed: false, type: 'learning', priority: 'medium' },
];

interface StudyPlannerProps {
  onViewCurriculum: () => void;
}

export function StudyPlanner({ onViewCurriculum }: StudyPlannerProps) {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [focusMode, setFocusMode] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  
  // New Task State
  const [newTitle, setNewTitle] = useState('');
  const [newDuration, setNewDuration] = useState('');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [newType, setNewType] = useState<'learning' | 'practical' | 'deep_work'>('learning');

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTitle,
      duration: newDuration || '30m',
      completed: false,
      priority: newPriority,
      type: newType
    };

    setTasks(prev => [...prev, newTask]);
    setNewTitle('');
    setNewDuration('');
    setIsAdding(false);
  };

  const progress = (tasks.filter(t => t.completed).length / tasks.length) * 100;

  const totalMinutes = tasks.reduce((acc, t) => {
    const mins = parseInt(t.duration) || 0;
    return acc + mins;
  }, 0);

  const formatTotalTime = (total: number) => {
    const h = Math.floor(total / 60);
    const m = total % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-2 px-4 md:px-0">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_#7c3aed] animate-pulse" />
             <span className="text-[10px] font-mono text-secondary uppercase tracking-[0.4em] font-black">Strategic_Roadmap_Active</span>
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">
            {t('planner.title')}
          </h1>
          <p className="text-text-muted mt-1 font-mono text-[10px] uppercase tracking-widest opacity-60">
            Node: PLANNER_V4 // {t('planner.subtitle')}
          </p>
        </div>

        <div className="bg-card border border-research-line rounded-[32px] p-6 flex items-center justify-between shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-full -translate-y-8 translate-x-8 blur-2xl" />
           <div className="space-y-1 relative z-10">
              <p className="text-[9px] font-mono text-secondary uppercase tracking-widest font-black">Daily_Efficiency</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{Math.round(progress)}%</span>
                <TrendingUp className="w-4 h-4 text-secondary" />
              </div>
           </div>
           <div className="w-16 h-16 relative z-10">
              <svg className="w-full h-full -rotate-90">
                 <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6" className="text-white/5" />
                 <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray={`${progress * 1.76} 176`} className="text-secondary transition-all duration-1000" />
              </svg>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-research-line rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-secondary" /> {t('planner.today')}
               </h3>
               <div className="flex items-center gap-2 text-[9px] font-mono text-text-muted uppercase tracking-widest">
                  <Clock className="w-3.5 h-3.5" /> {t('planner.est_time')}: {formatTotalTime(totalMinutes)}
               </div>
            </div>

            <div className="space-y-4">
              {tasks.map((task, idx) => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={cn(
                    "group flex items-center justify-between p-5 rounded-3xl border transition-all duration-300",
                    task.completed 
                      ? "border-secondary/20 bg-secondary/5 opacity-50" 
                      : "border-research-line bg-white/5 hover:border-secondary/40 hover:bg-white/10"
                  )}
                >
                  <div className="flex items-center gap-5">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className={cn(
                        "w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all",
                        task.completed 
                          ? "bg-secondary border-secondary text-black" 
                          : "border-research-line text-transparent hover:border-secondary/50"
                      )}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <div>
                      <h4 className={cn("text-[11px] font-black uppercase tracking-tight transition-all", task.completed ? "line-through text-text-muted" : "text-white")}>
                        {task.title}
                      </h4>
                      <div className="flex items-center gap-4 mt-1.5 font-mono text-[8px] uppercase tracking-[0.2em] opacity-60">
                         <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {task.duration}</span>
                         <span className={cn("px-2 py-0.5 rounded-full border", 
                           task.priority === 'high' ? "border-red-500/30 text-red-400 bg-red-500/10" :
                           task.priority === 'medium' ? "border-yellow-500/30 text-yellow-400 bg-yellow-500/10" :
                           "border-blue-500/30 text-blue-400 bg-blue-500/10"
                         )}>
                            P_{task.priority}
                         </span>
                         <span className="px-2 py-0.5 rounded-full bg-white/5 border border-research-line">
                            {task.type.replace('_', ' ')}
                         </span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-research-line flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 group/trash"
                  >
                     <Trash2 className="w-4 h-4 transition-transform group-hover/trash:scale-110" />
                  </button>
                </motion.div>
              ))}
            </div>

            <AnimatePresence>
              {isAdding ? (
                <motion.form 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onSubmit={addTask}
                  className="mt-8 p-6 rounded-[32px] border-2 border-secondary bg-secondary/5 space-y-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[10px] font-black text-secondary uppercase tracking-[0.3em]">{t('planner.add_title')}</h4>
                    <button 
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="text-text-muted hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <input 
                        type="text"
                        placeholder={t('planner.placeholder_title')}
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-white/5 border border-research-line rounded-xl px-4 py-3 text-[11px] font-mono text-white focus:border-secondary outline-none transition-all placeholder:text-white/10 uppercase"
                        autoFocus
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary" />
                        <input 
                          type="text"
                          placeholder={t('planner.placeholder_duration')}
                          value={newDuration}
                          onChange={(e) => setNewDuration(e.target.value)}
                          className="w-full bg-white/5 border border-research-line rounded-xl pl-10 pr-4 py-3 text-[11px] font-mono text-white focus:border-secondary outline-none transition-all placeholder:text-white/10 uppercase"
                        />
                      </div>
                      <div className="relative">
                         <select 
                            value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value as any)}
                            className="w-full bg-white/5 border border-research-line rounded-xl px-4 py-3 text-[11px] font-mono text-white focus:border-secondary outline-none transition-all uppercase appearance-none"
                         >
                            <option value="low" className="bg-card">{t('planner.p_low')}</option>
                            <option value="medium" className="bg-card">{t('planner.p_medium')}</option>
                            <option value="high" className="bg-card">{t('planner.p_high')}</option>
                         </select>
                         <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                       {['learning', 'practical', 'deep_work'].map((type) => (
                         <button
                           key={type}
                           type="button"
                           onClick={() => setNewType(type as any)}
                           className={cn(
                             "px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border shrink-0",
                             newType === type 
                               ? "bg-secondary text-black border-secondary" 
                               : "bg-white/5 text-text-muted hover:bg-white/10 border-research-line"
                           )}
                         >
                           {type.replace('_', ' ')}
                         </button>
                       ))}
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-secondary text-black font-black text-[10px] py-4 rounded-2xl uppercase tracking-[0.4em] hover:scale-[0.98] transition-all shadow-[0_0_20px_var(--color-secondary)] opacity-90 hover:opacity-100 mt-2"
                    >
                      {t('planner.btn_save')}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <button 
                  onClick={() => setIsAdding(true)}
                  className="w-full mt-8 p-4 rounded-2xl border border-dashed border-research-line hover:border-secondary/50 hover:bg-secondary/5 transition-all flex items-center justify-center gap-3 text-[9px] font-mono font-black text-white/40 hover:text-secondary uppercase tracking-[0.3em] group"
                >
                   <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-secondary group-hover:text-black transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                   </span>
                   {t('planner.add_btn')}
                </button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <button 
            onClick={onViewCurriculum}
            className="w-full bg-secondary p-8 rounded-[32px] shadow-2xl relative overflow-hidden group border-2 border-secondary hover:scale-[1.02] active:scale-[0.98] transition-all text-left"
          >
             <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-110 transition-transform">
                <Map className="w-16 h-16 text-black" />
             </div>
             <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                   <Star className="w-6 h-6 text-secondary" />
                </div>
                <div>
                   <h3 className="text-xl font-black text-black uppercase tracking-tighter leading-none italic">View_Detailed_Strategy</h3>
                   <p className="text-[9px] font-black text-black/60 uppercase tracking-widest mt-2">Step-By-Step_Phased_Biannual_Roadmap</p>
                </div>
             </div>
          </button>

          <div className="bg-card border border-research-line rounded-[32px] p-8 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
                <Target className="w-20 h-20 rotate-12" />
             </div>
             <h3 className="text-xs font-black text-secondary uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Target className="w-3.5 h-3.5" /> Strategic_Macro_Goals
             </h3>
             
             <div className="space-y-6">
                {[
                  { name: 'Neural_Network_Professional', progress: 65, icon: Zap },
                  { name: 'Advanced_Data_Architecture', progress: 40, icon: Layout },
                  { name: 'Cybernetic_Law_Expert', progress: 85, icon: BookOpen },
                ].map((goal) => (
                  <div key={goal.name} className="space-y-3">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-white uppercase tracking-tight flex items-center gap-2">
                           <goal.icon className="w-3.5 h-3.5 text-secondary" /> {goal.name}
                        </span>
                        <span className="text-[9px] font-mono text-secondary font-black">{goal.progress}%</span>
                     </div>
                     <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-research-line">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${goal.progress}%` }}
                          className="h-full bg-secondary shadow-[0_0_10px_#7c3aed]" 
                        />
                     </div>
                  </div>
                ))}
             </div>

             <div className="mt-10 pt-8 border-t border-research-line">
                <button 
                  onClick={() => setFocusMode(!focusMode)}
                  className={cn(
                    "w-full p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 group relative overflow-hidden",
                    focusMode ? "border-secondary bg-secondary/10 shadow-lg" : "border-research-line bg-white/5 hover:border-secondary/40"
                  )}
                >
                   <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-lg shadow-black", focusMode ? "bg-secondary text-black" : "bg-white/10 text-white/40")}>
                      <Monitor className="w-8 h-8" />
                   </div>
                   <div className="text-center">
                      <p className={cn("text-[11px] font-black uppercase tracking-widest", focusMode ? "text-white" : "text-white/60")}>Focus_Mode_Terminal</p>
                      <p className="text-[8px] font-mono text-text-muted mt-1 uppercase tracking-widest opacity-50">Isolate_Digital_Distractions</p>
                   </div>
                   {focusMode && (
                     <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary animate-pulse" />
                   )}
                </button>
             </div>
          </div>

          <div className="bg-secondary p-8 rounded-[32px] shadow-2xl relative overflow-hidden group cursor-pointer active:scale-95 transition-all">
             <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center shadow-lg">
                   <Target className="w-6 h-6 text-secondary" />
                </div>
                <div>
                   <h3 className="text-xl font-black text-black uppercase tracking-tighter leading-none italic">Book_Mentor_Session</h3>
                   <p className="text-[9px] font-black text-black/60 uppercase tracking-widest mt-2">Connect_With_Expert_Nodes</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
