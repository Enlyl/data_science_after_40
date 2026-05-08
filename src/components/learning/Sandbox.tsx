import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ScatterChart, 
  Scatter, 
  LineChart,
  Line,
  ComposedChart,
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { Settings2, Play, RefreshCw, Cpu, Upload, FileJson, TrendingUp, Layers } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  cluster: number;
}

type ModelType = 'kmeans' | 'linear_regression';

export const SandboxView: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [centroids, setCentroids] = useState<Point[]>([]);
  const [clusters, setClusters] = useState(3);
  const [noise, setNoise] = useState(0.5);
  const [iterations, setIterations] = useState(0);
  const [modelType, setModelType] = useState<ModelType>('kmeans');
  const [regressionLine, setRegressionLine] = useState<{slope: number, intercept: number} | null>(null);

  const calculateLinearRegression = (data: Point[]) => {
    const n = data.length;
    if (n === 0) return null;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    for (const p of data) {
      sumX += p.x;
      sumY += p.y;
      sumXY += p.x * p.y;
      sumXX += p.x * p.x;
    }
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    return { slope, intercept };
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        let p: Point[] = [];
        
        if (file.name.endsWith('.csv')) {
          const lines = content.split('\n').filter(l => l.trim().length > 0);
          p = lines.slice(1).map(line => {
            const values = line.split(',');
            // We'll just take the first two numeric columns
            const nums = values.map(v => Number(v.trim())).filter(v => !isNaN(v));
            return {
              x: nums[0] || 0,
              y: nums[1] || 0,
              cluster: -1
            };
          });
        }
        
        // Normalize points to fit 0-100 chart bounds
        if (p.length > 0) {
          const xs = p.map(pt => pt.x);
          const ys = p.map(pt => pt.y);
          const minX = Math.min(...xs), maxX = Math.max(...xs) || minX + 1;
          const minY = Math.min(...ys), maxY = Math.max(...ys) || minY + 1;
          
          p = p.map(pt => ({
            ...pt,
            x: ((pt.x - minX) / (maxX - minX)) * 100,
            y: ((pt.y - minY) / (maxY - minY)) * 100,
          }));
        }

        setPoints(p);
        setIterations(0);
        setRegressionLine(null);
        setCentroids([]);
      } catch (err) {
        console.error('Error parsing file', err);
      }
    };
    reader.readAsText(file);
  };

  const generateData = () => {
    const newPoints: Point[] = [];
    
    if (modelType === 'kmeans') {
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
    } else {
      // Generate Linear trend data
      const slope = (Math.random() * 1.5) - 0.5; // between -0.5 and 1.0
      const intercept = Math.random() * 30;
      
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * 100;
        const idealY = x * slope + intercept;
        // Add robust noise
        const noisyY = idealY + (Math.random() - 0.5) * 60 * noise;
        newPoints.push({
          x: x,
          y: Math.max(0, Math.min(100, noisyY)),
          cluster: -1
        });
      }
    }
    
    setPoints(newPoints);
    setCentroids([]);
    setIterations(0);
    setRegressionLine(null);
  };

  useEffect(() => {
    generateData();
  }, [clusters, noise, modelType]);

  const runModelStep = () => {
    if (points.length === 0) return;

    if (modelType === 'kmeans') {
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
    } else {
      // Run Linear Regression pseudo-iteration (actually instantaneous, but let's animate)
      const res = calculateLinearRegression(points);
      if (res) {
        setRegressionLine(res);
      }
      setIterations(1); // One step to train
    }
  };

  const COLORS = ['#10b981', '#6366f1', '#f43f5e', '#fbbf24', '#8b5cf6'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-4">
      {/* Controls */}
      <div className="lg:col-span-1 space-y-6 bg-card border border-border p-6 rounded-[32px] shard-glow">
        <div className="flex items-center gap-2 mb-4">
          <Settings2 className="w-5 h-5 text-primary" />
          <h2 className="font-display font-bold text-text-main text-xl">Lab Parameters</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-text-muted block mb-2">
              Model
            </label>
            <div className="flex bg-accent-soft border border-border rounded-xl p-1 w-full relative">
              <button
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors z-10 ${modelType === 'kmeans' ? 'text-text-main bg-card shadow-sm' : 'text-text-muted hover:text-text-main'}`}
                onClick={() => setModelType('kmeans')}
              >
                K-Means
              </button>
              <button
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors z-10 ${modelType === 'linear_regression' ? 'text-text-main bg-card shadow-sm' : 'text-text-muted hover:text-text-main'}`}
                onClick={() => setModelType('linear_regression')}
              >
                Linear Reg
              </button>
            </div>
          </div>

          {modelType === 'kmeans' && (
            <div>
              <label className="text-xs font-semibold text-text-muted block mb-2">
                Clusters Count: {clusters}
              </label>
              <input 
                type="range" min="2" max="5" value={clusters}
                onChange={(e) => setClusters(parseInt(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-text-muted block mb-2">
              Noise Variance: {noise.toFixed(2)}
            </label>
            <input 
              type="range" min="0.1" max="1" step="0.1" value={noise}
              onChange={(e) => setNoise(parseFloat(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
          
          <div>
            <label className="text-xs font-semibold text-text-muted block mb-1 mt-2">
              Custom Dataset
            </label>
            <p className="text-xs text-text-muted mb-3 leading-tight">Upload CSV with 2 columns to run Regression on your data.</p>
            <div className="relative">
              <input 
                type="file" 
                accept=".csv"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="bg-card border border-border text-text-main py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-accent-soft transition-colors w-full shadow-sm">
                <Upload className="w-4 h-4" />
                <span className="text-sm font-semibold">Upload CSV</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 space-y-3">
          <button 
            onClick={runModelStep}
            className="w-full py-4 bg-primary text-white font-semibold rounded-xl hover:shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Play className="w-5 h-5 fill-current" /> {modelType === 'kmeans' ? 'Run Iteration' : 'Train Model'}
          </button>
          <button 
            onClick={generateData}
            className="w-full py-4 bg-card border border-border text-text-main font-semibold rounded-xl hover:bg-accent-soft transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <RefreshCw className="w-5 h-5" /> Reset Data
          </button>
        </div>

        <div className="mt-8 p-5 bg-card border border-border rounded-2xl">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-text-main">System Status</span>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">
            Model: <span className="text-text-main font-medium">{modelType === 'kmeans' ? 'K-Means Clustering' : 'Linear Regression'}</span><br/>
            Iterations: <span className="text-text-main font-medium">{iterations}</span><br/>
            Status: <span className="text-text-main font-medium">{modelType === 'kmeans' ? (iterations > 0 && iterations < 10 ? 'Converging...' : iterations >= 10 ? 'Optimized' : 'Ready') : (iterations > 0 ? 'Trained' : 'Ready')}</span>
            {modelType === 'linear_regression' && regressionLine && (
              <span className="block mt-2 text-sm text-success font-mono">
                y = {regressionLine.slope.toFixed(2)}x + {regressionLine.intercept.toFixed(2)}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Visualizer */}
      <div className="lg:col-span-3 bg-card border border-border rounded-[32px] p-8 min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden shadow-sm">
        <div className="absolute top-8 left-8 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-semibold text-text-muted">Realtime Visualization Feed</span>
        </div>
        
        <div className="w-full h-full min-h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <XAxis type="number" dataKey="x" hide domain={[0, 100]} />
              <YAxis type="number" dataKey="y" hide domain={[0, 100]} />
              <ZAxis type="number" range={[60, 250]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              
              {/* Data Points */}
              <Scatter name="Points" data={points} fill="#8884d8">
                {points.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={modelType === 'kmeans' ? (entry.cluster === -1 ? '#334155' : COLORS[entry.cluster % COLORS.length]) : '#8b5cf6'} 
                    z={60}
                  />
                ))}
              </Scatter>

              {/* Centroids exclusively for K-Means */}
              {modelType === 'kmeans' && (
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
              )}
              
              {/* Regression Line exclusively for Linear Regression */}
              {modelType === 'linear_regression' && regressionLine && (
                <Line 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#10b981" 
                  strokeWidth={4}
                  dot={false}
                  activeDot={false}
                  isAnimationActive={true}
                  data={[
                    { x: 0, y: regressionLine.intercept },
                    { x: 100, y: regressionLine.slope * 100 + regressionLine.intercept }
                  ]}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center mt-4">
            <p className="text-text-muted text-xs font-medium max-w-md">
              {modelType === 'kmeans' ? 'Центры кластеров (крупные точки с обводкой) показывают, куда смещаются группы данных в каждой итерации.' : 'Прямая линия минимизирует среднеквадратичную ошибку (MSE), находя главный тренд в данных.'}
            </p>
        </div>
      </div>
    </div>
  );
};
