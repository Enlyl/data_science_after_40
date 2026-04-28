import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import * as dagreD3 from 'dagre-d3-es';
import { motion } from 'framer-motion';
import { Lock, Unlock, Star, Target, BrainCircuit, BarChart3, TrendingUp, Cpu } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useLanguage } from '../../lib/i18n';

interface SkillNode {
  id: string;
  labelKey: string;
  icon: React.ReactNode;
  level: number;
  parents?: string[];
  description: string;
}

const SKILLS: SkillNode[] = [
  { id: 'math', labelKey: 'skills.stats', icon: <TrendingUp className="w-6 h-6" />, level: 1, description: 'Статистика и линейная алгебра' },
  { id: 'python', labelKey: 'skills.python', icon: <Cpu className="w-6 h-6" />, level: 1, description: 'Основы синтаксиса и структуры данных' },
  { id: 'pandas', labelKey: 'skills.pandas', icon: <BarChart3 className="w-6 h-6" />, level: 2, parents: ['python'], description: 'Манипуляция данными' },
  { id: 'viz', labelKey: 'skills.viz', icon: <Star className="w-6 h-6" />, level: 2, parents: ['math'], description: 'Matplotlib и Seaborn' },
  { id: 'ml_basic', labelKey: 'skills.ml', icon: <BrainCircuit className="w-6 h-6" />, level: 3, parents: ['pandas', 'viz'], description: 'Линейные модели и KNN' },
  { id: 'nlp', labelKey: 'skills.nlp', icon: <Unlock className="w-6 h-6" />, level: 4, parents: ['ml_basic'], description: 'Работа с текстом' },
  { id: 'deep', labelKey: 'skills.deep', icon: <Lock className="w-6 h-6" />, level: 4, parents: ['ml_basic'], description: 'Нейронные сети' },
];

export const SkillTreeView: React.FC<{ userSkills?: string[] }> = ({ userSkills = ['math', 'python'] }) => {
  const { t } = useLanguage();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    // Create the input graph
    const g = new dagreD3.graphlib.Graph()
      .setGraph({
        rankdir: 'LR', // Left to Right
        nodesep: 80,
        ranksep: 120,
        marginx: 20,
        marginy: 20,
      })
      .setDefaultEdgeLabel(() => ({}));

    // Add nodes
    SKILLS.forEach((skill) => {
      const isUnlocked = userSkills.includes(skill.id);
      const allParentsUnlocked = !skill.parents || skill.parents.every(p => userSkills.includes(p));
      const isAvailable = !isUnlocked && allParentsUnlocked;
      const isLocked = !isUnlocked && !allParentsUnlocked;
      
      const statusClass = isUnlocked ? 'unlocked' : isAvailable ? 'available' : 'locked';
      const borderColor = isUnlocked ? 'rgba(16,185,129,0.5)' : isAvailable ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.05)';
      const bgColor = isUnlocked ? 'rgba(8,10,18,0.95)' : isAvailable ? 'rgba(16,185,129,0.02)' : 'rgba(8,10,18,0.4)';
      const accentColor = isUnlocked ? '#10b981' : isAvailable ? '#10b981' : '#4b5563';

      // We use a custom SVG group with foreignObject to allow HTML/Tailwind inside nodes
      g.setNode(skill.id, {
        labelType: 'html',
        label: `
          <div class="skill-node ${statusClass}" style="width: 240px; padding: 20px; border-radius: 24px; border: 2px ${isAvailable ? 'dashed' : 'solid'} ${borderColor}; background: ${bgColor}; color: white; display: flex; flex-direction: column; gap: 8px; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: ${isUnlocked ? '0 0 30px rgba(16,185,129,0.15)' : isAvailable ? '0 0 15px rgba(16,185,129,0.05)' : 'none'}; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div style="width: 40px; height: 40px; background: ${isUnlocked ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.02)'}; color: ${accentColor}; border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 1px solid ${isUnlocked ? 'rgba(16,185,129,0.2)' : 'transparent'};">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${isUnlocked ? '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>' : isAvailable ? '<path d="M12 2v20"/><path d="m17 12-5 5-5-5"/><path d="m17 7-5 5-5-5"/>' : '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'}</svg>
              </div>
              <div style="text-align: right;">
                <span style="display: block; font-family: monospace; font-size: 8px; font-weight: 900; color: ${accentColor}; letter-spacing: 2px;">LVL_${skill.level}</span>
                <span style="font-family: monospace; font-size: 7px; color: ${isUnlocked ? '#10b981' : isAvailable ? '#10b981' : '#4b5563'}; opacity: 0.6; text-transform: uppercase;">${statusClass}</span>
              </div>
            </div>
            <h3 style="font-family: inherit; font-weight: 900; font-size: 14px; text-transform: uppercase; margin: 4px 0 0 0; letter-spacing: -0.5px; color: ${isUnlocked ? '#fff' : isAvailable ? '#fff' : '#4b5563'};">${t(skill.labelKey)}</h3>
            <p style="font-size: 10px; color: ${isUnlocked ? '#9ca3af' : isAvailable ? '#9ca3af' : '#374151'}; font-weight: 500; margin: 0; line-height: 1.4;">${skill.description}</p>
            ${isAvailable ? '<div style="position: absolute; top: -2px; left: -2px; right: -2px; bottom: -2px; border-radius: 24px; border: 2px solid #10b981; animation: node-pulse 2s infinite; pointer-events: none;"></div>' : ''}
          </div>
        `,
        padding: 0,
        rx: 24,
        ry: 24,
      });
    });

    // Add edges
    SKILLS.forEach((skill) => {
      if (skill.parents) {
        skill.parents.forEach((parentId) => {
          const parentUnlocked = userSkills.includes(parentId);
          const childUnlocked = userSkills.includes(skill.id);
          const isFullActive = parentUnlocked && childUnlocked;
          const isPending = parentUnlocked && !childUnlocked;

          const edgeColor = isFullActive ? '#10b981' : isPending ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.05)';
          const edgeWidth = isFullActive ? '3px' : '2px';
          
          g.setEdge(parentId, skill.id, {
            curve: d3.curveBasis,
            style: `stroke: ${edgeColor}; stroke-width: ${edgeWidth}; fill: none; ${isPending ? 'stroke-dasharray: 4 4;' : ''}`,
            arrowheadStyle: `fill: ${edgeColor};`,
            arrowhead: 'vee'
          });
        });
      }
    });

    const svg = d3.select(svgRef.current);
    const inner = svg.select('g');

    // Set up zoom support
    const zoom = d3.zoom<SVGSVGElement, unknown>().on('zoom', (event) => {
      inner.attr('transform', event.transform);
    });
    svg.call(zoom);

    // Create the renderer
    const renderer = (dagreD3 as any).render();
    
    // Run the renderer. This is what draws the final graph.
    renderer(inner as any, g);

    // Initial center and zoom
    const initialScale = 0.8;
    const graphWidth = g.graph().width;
    const graphHeight = g.graph().height;
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;

    const xCenterOffset = (containerWidth - graphWidth * initialScale) / 2;
    const yCenterOffset = (containerHeight - graphHeight * initialScale) / 2;
    
    svg.call(zoom.transform, d3.zoomIdentity.translate(xCenterOffset, yCenterOffset).scale(initialScale));

  }, [userSkills, t]);

  return (
    <div className="p-8 flex flex-col items-center bg-[#05060b] min-h-screen">
      <header className="text-center mb-12 w-full max-w-4xl">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4"
        >
          <span className="text-[10px] font-mono font-bold text-primary tracking-[0.3em] uppercase">Architecture_Visualization</span>
        </motion.div>
        <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-3 leading-none italic">
          {t('skills.title')}
        </h1>
        <p className="text-text-muted max-w-2xl mx-auto font-medium leading-relaxed">
          {t('skills.subtitle')}
        </p>
      </header>

      <div 
        ref={containerRef}
        className="w-full h-[700px] bg-card/20 backdrop-blur-xl rounded-[40px] border border-white/5 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.03),transparent)] pointer-events-none" />
        <div className="absolute bottom-8 left-8 flex items-center gap-6 z-10 px-6 py-4 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Unlocked</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-primary/50" />
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest underline decoration-primary/20 underline-offset-4">Locked</span>
          </div>
        </div>

        <svg 
          ref={svgRef} 
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <g />
        </svg>

        {/* Floating elements for aesthetic */}
        <div className="absolute top-8 right-8 text-[10px] font-mono text-primary/40 text-right space-y-1 select-none pointer-events-none">
          <div>DATA_SYNC: ACTIVE</div>
          <div>CORE_VERSION: 1.0.4</div>
          <div>UPLINK_STABLE: 100%</div>
        </div>
      </div>
      
      <style>{`
        @keyframes node-pulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0; }
          100% { transform: scale(1); opacity: 0.5; }
        }
        .node path, .node rect {
          fill: transparent !important;
        }
        .edgePath path {
          stroke-linecap: round;
          transition: all 0.3s ease;
        }
        marker#vee path {
          fill: rgba(255,255,255,0.2) !important;
        }
        .skill-node:hover {
          transform: translateY(-4px);
          border-color: #10b981 !important;
          box-shadow: 0 10px 30px rgba(16,185,129,0.2) !important;
        }
        .skill-node.available {
          animation: available-glow 3s infinite;
        }
        @keyframes available-glow {
          0%, 100% { border-color: rgba(16,185,129,0.3); }
          50% { border-color: rgba(16,185,129,0.6); }
        }
      `}</style>
    </div>
  );
};
