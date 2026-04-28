import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { Settings2, Play, RefreshCw, Cpu } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  cluster: number;
}

export const SandboxView: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [centroids, setCentroids] = useState<Point[]>([]);
  const [clusters, setClusters] = useState(3);
  const [noise, setNoise] = useState(0.5);
  const [iterations, setIterations] = useState(0);

  const generateData = () => {
    const newPoints: Point[] = [];
    const centers = Array.from({ length: clusters }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100
    }));

    for (let i = 0; i < 100; i++) {
        const centerIdx = i % clusters;
        newPoints.push({
            x: centers[centerIdx].x + (Math.random() - 0.5) * 50 * noise,
            y: centers[centerIdx].y + (Math.random() - 0.5) * 50 * noise,
            cluster: -1
        });
    }
    setPoints(newPoints);
    setCentroids([]);
    setIterations(0);
  };

  useEffect(() => {
    generateData();
  }, [clusters, noise]);

  const runKMeansStep = () => {
    if (points.length === 0) return;

    // Simplified 1-step k-means visual logic
    const centers = Array.from({ length: clusters }, (_, i) => {
        const clusterPoints = points.filter(p => p.cluster === i);
        // On very first run or if cluster becomes empty, pick random point
        if (clusterPoints.length === 0) {
          const randomPoint = points[Math.floor(Math.random() * points.length)];
          return {
              x: randomPoint.x,
              y: randomPoint.y,
              cluster: i
          };
        }
        return {
            x: clusterPoints.reduce((sum, p) => sum + p.x, 0) / clusterPoints.length,
            y: clusterPoints.reduce((sum, p) => sum + p.y, 0) / clusterPoints.length,
            cluster: i
        };
    });

    const nextPoints = points.map(p => {
        let minDist = Infinity;
        let bestCluster = 0;
        centers.forEach((c, i) => {
            const d = Math.sqrt((p.x - c.x) ** 2 + (p.y - c.y) ** 2);
            if (d < minDist) {
                minDist = d;
                bestCluster = i;
            }
        });
        return { ...p, cluster: bestCluster };
    });

    setPoints(nextPoints);
    setCentroids(centers);
    setIterations(prev => prev + 1);
  };

  const COLORS = ['#10b981', '#6366f1', '#f43f5e', '#fbbf24', '#8b5cf6'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4">
      {/* Controls */}
      <div className="lg:col-span-1 space-y-6 bg-card border border-border p-6 rounded-[32px] shard-glow">
        <div className="flex items-center gap-2 mb-4">
          <Settings2 className="w-5 h-5 text-primary" />
          <h2 className="font-black text-text-main uppercase tracking-tighter">LAB_PARAMS</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-mono font-black text-text-muted uppercase tracking-widest block mb-2">
              Clusters Count: {clusters}
            </label>
            <input 
              type="range" min="2" max="5" value={clusters}
              onChange={(e) => setClusters(parseInt(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <label className="text-[10px] font-mono font-black text-text-muted uppercase tracking-widest block mb-2">
              Noise Variance: {noise.toFixed(2)}
            </label>
            <input 
              type="range" min="0.1" max="1" step="0.1" value={noise}
              onChange={(e) => setNoise(parseFloat(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </div>

        <div className="pt-6 space-y-3">
          <button 
            onClick={runKMeansStep}
            className="w-full py-3 bg-primary text-card font-black uppercase text-xs tracking-widest rounded-xl hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" /> RUN_ITERATION
          </button>
          <button 
            onClick={generateData}
            className="w-full py-3 bg-white/5 border border-border text-text-main font-black uppercase text-xs tracking-widest rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> RESET_DATA
          </button>
        </div>

        <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">System Status</span>
          </div>
          <p className="text-[11px] text-text-muted leading-relaxed">
            Модель: K-Means Clustering<br/>
            Итераций: {iterations}<br/>
            Статус: {iterations > 0 && iterations < 10 ? 'CONVERGING...' : iterations >= 10 ? 'OPTIMIZED' : 'READY'}
          </p>
        </div>
      </div>

      {/* Visualizer */}
      <div className="lg:col-span-3 bg-card border border-border rounded-[32px] p-8 min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-6 left-8 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-mono font-black text-text-muted uppercase tracking-widest">REALTIME_VISUALIZATION_FEED</span>
        </div>
        
        <div className="w-full h-full min-h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis type="number" dataKey="x" hide domain={[0, 100]} />
              <YAxis type="number" dataKey="y" hide domain={[0, 100]} />
              <ZAxis type="number" range={[60, 250]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              
              {/* Data Points */}
              <Scatter name="Points" data={points} fill="#8884d8">
                {points.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.cluster === -1 ? '#334155' : COLORS[entry.cluster % COLORS.length]} 
                    z={60}
                  />
                ))}
              </Scatter>

              {/* Centroids */}
              <Scatter name="Centroids" data={centroids}>
                {centroids.map((entry, index) => (
                  <Cell 
                    key={`centroid-${index}`} 
                    fill={COLORS[entry.cluster % COLORS.length]} 
                    strokeWidth={3}
                    stroke="#fff"
                    z={250}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center mt-4">
            <p className="text-text-muted text-xs font-medium max-w-md">
                Центры кластеров (крупные точки с обводкой) показывают, куда смещаются группы данных в каждой итерации.
            </p>
        </div>
      </div>
    </div>
  );
};
