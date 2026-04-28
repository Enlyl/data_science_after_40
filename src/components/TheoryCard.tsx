import React from 'react';
import { motion } from 'motion/react';
import { BookMarked, Globe, Lightbulb, ArrowRight, Layers } from 'lucide-react';
import { TheoryTopic } from '../constants';
import { cn } from '../lib/utils';

interface TheoryCardProps {
  topic: TheoryTopic;
  onClick: () => void;
  language: 'ru' | 'en';
}

export const TheoryCard: React.FC<TheoryCardProps> = ({ topic, onClick, language }) => {
  const title = language === 'en' ? topic.title_en : topic.title;
  const description = language === 'en' ? topic.description_en : topic.description;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
      case 'Intermediate': return 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';
      case 'Advanced': return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
      default: return 'text-slate-400 border-slate-500/30 bg-slate-500/10';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      onClick={onClick}
      className="bg-card/80 backdrop-blur-xl border border-research-line rounded-3xl p-6 cursor-pointer group active:scale-95 transition-all overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -translate-y-16 translate-x-16 group-hover:bg-primary/10 transition-colors" />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex gap-2">
           <span className={cn(
             "px-2 py-0.5 rounded-md border text-[8px] font-mono font-black uppercase tracking-widest",
             topic.level === 'Beginner' ? 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10' :
             topic.level === 'Intermediate' ? 'text-primary border-primary/30 bg-primary/10' :
             'text-purple-500 border-purple-500/30 bg-purple-500/10'
           )}>
             {topic.level}
           </span>
           <span className="px-2 py-0.5 rounded-md border border-research-line bg-card/50 text-text-muted text-[8px] font-mono font-black uppercase tracking-widest">
             {topic.category}
           </span>
        </div>
        <BookMarked className="w-4 h-4 text-primary/40 group-hover:text-primary transition-colors" />
      </div>

      <div className="relative z-10">
        <h3 className="text-lg font-black text-text-main uppercase tracking-tighter italic mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-text-muted font-medium leading-relaxed line-clamp-2 mb-4">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {topic.tags.map(tag => (
            <span key={tag} className="text-[9px] font-mono text-primary/60 uppercase tracking-widest">#{tag}</span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-research-line">
          <span className="text-[10px] font-mono font-black text-primary/40 uppercase tracking-[0.3em] group-hover:text-primary transition-colors italic">INIT_MODULE</span>
          <div className="w-8 h-8 rounded-xl bg-accent-soft flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
