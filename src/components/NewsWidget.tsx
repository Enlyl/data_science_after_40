import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, ExternalLink, Calendar, Tag, ChevronRight, RefreshCcw, ArrowUpDown } from 'lucide-react';
import { newsService, NewsItem } from '../services/newsService';
import { cn } from '../lib/utils';

export function NewsWidget() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await newsService.getLatestNews();
      setNews(data);
    } catch (err) {
      setError('Не удалось загрузить новости');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const categories = ['All', 'Research', 'Industry', 'Library', 'Event'];
  const filteredNews = (selectedCategory === 'All' 
    ? [...news] 
    : news.filter(item => item.category === selectedCategory))
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Research': return 'bg-primary/10 text-primary border-primary/30';
      case 'Industry': return 'bg-secondary/10 text-secondary border-secondary/30';
      case 'Library': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Event': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default: return 'bg-white/5 text-white/50 border-white/10';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'All': return 'DATA_ALL';
      case 'Research': return 'SCIENCE';
      case 'Industry': return 'MARKET';
      case 'Library': return 'LIB_DATA';
      case 'Event': return 'EVENT';
      default: return category.toUpperCase();
    }
  };

  const formatNewsDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).toUpperCase();
  };

  return (
    <div className="bg-card/80 backdrop-blur-xl rounded-[32px] border border-research-line shadow-2xl overflow-hidden flex flex-col h-full relative">
      <div className="absolute inset-0 bg-primary/5 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      
      <div className="p-6 border-b border-research-line flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,209,255,0.1)]">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-white text-lg leading-tight uppercase tracking-tighter italic">Operational_Logs</h3>
            <p className="text-[9px] text-primary/60 font-mono font-bold uppercase tracking-[0.3em]">Sector_Update_Stream</p>
          </div>
        </div>
        <button 
          onClick={fetchNews}
          disabled={loading}
          className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-text-muted hover:text-primary border border-research-line disabled:opacity-50 group"
        >
          <RefreshCcw className={cn("w-4 h-4", loading && "animate-spin")} />
        </button>
      </div>

      {/* Category Tabs & Sort */}
      <div className="px-6 py-3 border-b border-research-line flex items-center justify-between gap-4 relative z-10 bg-black/20">
        <div className="flex gap-2 overflow-x-auto no-scrollbar flex-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[9px] font-mono uppercase tracking-[0.1em] transition-all whitespace-nowrap",
                selectedCategory === cat
                  ? "bg-primary text-[#010204] font-black shadow-[0_0_15px_rgba(0,209,255,0.3)]"
                  : "bg-white/5 text-text-muted hover:bg-white/10 border border-research-line"
              )}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-research-line rounded-lg text-[9px] font-mono uppercase tracking-wider text-text-muted transition-all"
        >
          <ArrowUpDown className="w-3 h-3" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar relative z-10">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {[1, 2, 3].map(i => (
                <div key={i} className="p-4 rounded-2xl border border-research-line bg-white/5 overflow-hidden relative">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-16 h-3 bg-primary/10 rounded-full animate-pulse" />
                    <div className="w-12 h-3 bg-white/5 rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-4 bg-white/5 rounded-lg animate-pulse" />
                    <div className="w-2/3 h-4 bg-white/5 rounded-lg animate-pulse" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center"
            >
              <p className="text-[11px] font-mono text-secondary mb-3">{error}</p>
              <button 
                onClick={fetchNews}
                className="text-primary font-mono font-bold text-[10px] uppercase tracking-[0.4em]"
              >
                RETRY_SCAN
              </button>
            </motion.div>
          ) : filteredNews.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-12 text-center"
            >
              <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest">No_Data_In_Segment</p>
            </motion.div>
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {filteredNews.map((item, idx) => {
                const isEvent = item.category === 'Event';
                const dateObj = new Date(item.date);
                const day = dateObj.getDate();
                const month = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();

                return (
                  <motion.a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={item.id}
                    className={cn(
                      "block p-4 rounded-2xl transition-all border group cursor-pointer relative overflow-hidden",
                      isEvent 
                        ? "bg-amber-500/[0.03] border-amber-500/20 hover:border-amber-500/40 hover:bg-amber-500/[0.05]" 
                        : "bg-transparent border-research-line hover:bg-primary/[0.03] hover:border-primary/30"
                    )}
                  >
                    {isEvent && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-3xl pointer-events-none -translate-y-16 translate-x-16" />
                    )}
                    <div className="flex justify-between items-start mb-3 relative z-10">
                      <span className={cn(
                        "text-[8px] font-mono font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md border",
                        getCategoryColor(item.category)
                      )}>
                        {getCategoryLabel(item.category)}
                      </span>
                      {!isEvent && (
                        <span className="text-[9px] text-text-muted font-mono flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-primary/40" /> {formatNewsDate(item.date)}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-4 relative z-10">
                      {isEvent && (
                        <div className="flex flex-col items-stretch min-w-[50px] h-[60px] bg-amber-500/5 border border-amber-500/20 rounded-xl overflow-hidden group-hover:border-amber-500/40 transition-all duration-300">
                          <div className="bg-amber-500/20 text-amber-400 text-[8px] font-mono font-black uppercase tracking-[0.1em] py-1 text-center border-b border-amber-500/20 group-hover:bg-amber-500 group-hover:text-[#010204]">
                            {month}
                          </div>
                          <div className="flex-1 flex items-center justify-center text-white group-hover:bg-amber-500/5">
                            <span className="text-xl font-mono font-black leading-none drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">{day}</span>
                          </div>
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className={cn(
                          "font-black text-sm text-white group-hover:text-primary transition-colors leading-snug mb-2 tracking-tight uppercase italic",
                          isEvent && "text-amber-500/90"
                        )}>
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-text-muted leading-relaxed line-clamp-2 opacity-70 font-medium tracking-wide">
                          {item.summary}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
                      <span className="text-[9px] text-primary font-mono font-black uppercase tracking-[0.3em] flex items-center gap-2">
                        READ_SRC <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 bg-black/20 border-t border-research-line space-y-4 relative z-10">
        <div className="p-5 bg-primary/5 border border-primary/10 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-8 translate-x-8 blur-2xl group-hover:bg-primary/10 transition-colors" />
          <p className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.3em] mb-2 relative z-10">LOG_SUBMISSION</p>
          <p className="text-[11px] text-white/60 mb-4 leading-relaxed font-medium relative z-10 uppercase tracking-widest">Share discoveries with the research collective.</p>
          <button className="w-full py-3 bg-white text-[#010204] text-[9px] font-mono font-black uppercase tracking-[0.3em] rounded-xl hover:bg-primary hover:text-white transition-all relative z-10 shadow-xl">
            PROPOSE_UPDATE
          </button>
        </div>
        <button className="w-full py-4 bg-transparent border border-research-line rounded-2xl text-[9px] font-mono font-black text-text-muted uppercase tracking-[0.3em] hover:text-primary hover:border-primary/40 transition-all flex items-center justify-center gap-2">
          CENTRAL_ARCHIVE <ExternalLink className="w-3 h-3 text-primary/40" />
        </button>
      </div>
    </div>
  );
}
