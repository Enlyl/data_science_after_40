import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  LineChart as LineChartIcon, 
  ScatterChart as ScatterChartIcon, 
  Table as TableIcon, 
  Upload, 
  Download, 
  Database, 
  Search, 
  Filter,
  FileJson,
  FileSpreadsheet,
  RefreshCw,
  Plus,
  Trash2,
  ChevronDown,
  Info,
  BrainCircuit,
  AreaChart as AreaChartIcon,
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, ScatterChart, Scatter, ZAxis, PieChart, Pie, Cell, Legend,
  AreaChart, Area, LabelList
} from 'recharts';
import { cn } from '../lib/utils';
import { useLanguage } from '../lib/i18n';

// --- Types & Interfaces ---
interface DataRecord {
  [key: string]: any;
}

interface Dataset {
  id: string;
  name: string;
  description: string;
  icon: any;
  data: DataRecord[];
  type: 'astrophysics' | 'quantum' | 'climate' | 'market' | 'neuroscience' | 'energy';
  color?: string;
}

// --- Predefined Datasets ---
const PREDEFINED_DATASETS: Dataset[] = [
  {
    id: 'exoplanets',
    name: 'Exoplanet_Spectral_Survey',
    description: 'Data from Kepler-186f sector analysis including mass, radius, and host star distance.',
    icon: Database,
    type: 'astrophysics',
    color: '#8b5cf6',
    data: [
      { name: 'Kepler-186f', mass: 1.1, radius: 1.17, distance: 490, temp: 188 },
      { name: 'TRAPPIST-1e', mass: 0.7, radius: 0.91, distance: 39, temp: 251 },
      { name: 'LHS 1140 b', mass: 6.9, radius: 1.43, distance: 41, temp: 235 },
      { name: 'Proxima b', mass: 1.2, radius: 1.08, distance: 4.2, temp: 234 },
      { name: 'Gliese 667 Cc', mass: 3.8, radius: 1.54, distance: 23, temp: 277 },
      { name: 'K2-18 b', mass: 8.6, radius: 2.71, distance: 124, temp: 265 },
    ]
  },
  {
    id: 'quantum',
    name: 'Quantum_Decoherence_Log',
    description: 'Sub-atomic particle stability trials and energy level transitions.',
    icon: Database,
    type: 'quantum',
    data: [
      { step: 1, energy: 45, entropy: 12, stability: 98 },
      { step: 2, energy: 52, entropy: 15, stability: 95 },
      { step: 3, energy: 48, entropy: 18, stability: 92 },
      { step: 4, energy: 61, entropy: 22, stability: 88 },
      { step: 5, energy: 55, entropy: 25, stability: 85 },
      { step: 6, energy: 68, entropy: 31, stability: 79 },
      { step: 7, energy: 72, entropy: 35, stability: 74 },
    ]
  },
  {
    id: 'neuroscience',
    name: 'Neural_Firing_Patterns',
    description: 'Real-time observation of synaptic potential across cortical layers during high-cognition tasks.',
    icon: BrainCircuit,
    type: 'neuroscience',
    color: '#ec4899',
    data: [
      { ms: 10, amplitude: 0.12, noise: 0.05, spikes: 2 },
      { ms: 20, amplitude: 0.45, noise: 0.08, spikes: 5 },
      { ms: 30, amplitude: 0.89, noise: 0.12, spikes: 12 },
      { ms: 40, amplitude: 1.25, noise: 0.15, spikes: 18 },
      { ms: 50, amplitude: 0.76, noise: 0.14, spikes: 9 },
      { ms: 60, amplitude: 0.34, noise: 0.10, spikes: 4 },
      { ms: 70, amplitude: 0.15, noise: 0.06, spikes: 2 },
    ]
  },
  {
    id: 'renewable',
    name: 'Fusion_Core_Telemetry',
    description: 'Plasma density and magnetic field containment strength in a experimental tokamak.',
    icon: Database,
    type: 'energy',
    color: '#10b981',
    data: [
      { temp: 100, density: 1.2, magnetic: 4.5, output: 0.1 },
      { temp: 200, density: 2.8, magnetic: 6.2, output: 0.8 },
      { temp: 300, density: 4.5, magnetic: 8.1, output: 3.4 },
      { temp: 400, density: 7.2, magnetic: 9.8, output: 12.5 },
      { temp: 500, density: 11.5, magnetic: 12.4, output: 45.2 },
      { temp: 450, density: 10.2, magnetic: 11.8, output: 38.1 },
    ]
  },
  {
    id: 'climate',
    name: 'Climate_Sensor_Array',
    description: 'CO2 concentration and global temperature delta from high-altitude weather stations.',
    icon: Database,
    type: 'climate',
    data: [
      { year: 2018, co2: 408, tempDelta: 0.82 },
      { year: 2019, co2: 411, tempDelta: 0.98 },
      { year: 2020, co2: 414, tempDelta: 1.02 },
      { year: 2021, co2: 416, tempDelta: 0.85 },
      { year: 2022, co2: 419, tempDelta: 1.15 },
      { year: 2023, co2: 422, tempDelta: 1.25 },
    ]
  },
  {
    id: 'global-warming',
    name: 'Global_Climate_Anomalies',
    description: 'Industrial-era temperature shifts and sea level elevation changes.',
    icon: Database,
    type: 'climate',
    data: [
      { year: 1880, tempAnomaly: -0.16, seaLevel: 0, glacierMass: 0 },
      { year: 1900, tempAnomaly: -0.08, seaLevel: 12, glacierMass: -2 },
      { year: 1920, tempAnomaly: -0.27, seaLevel: 28, glacierMass: -5 },
      { year: 1940, tempAnomaly: 0.12, seaLevel: 48, glacierMass: -12 },
      { year: 1960, tempAnomaly: -0.02, seaLevel: 75, glacierMass: -20 },
      { year: 1980, tempAnomaly: 0.26, seaLevel: 110, glacierMass: -35 },
      { year: 2000, tempAnomaly: 0.39, seaLevel: 160, glacierMass: -60 },
      { year: 2010, tempAnomaly: 0.72, seaLevel: 195, glacierMass: -85 },
      { year: 2020, tempAnomaly: 1.02, seaLevel: 240, glacierMass: -115 },
      { year: 2024, tempAnomaly: 1.28, seaLevel: 260, glacierMass: -130 },
    ]
  },
  {
    id: 'market-trends',
    name: 'Tech_Market_Index',
    description: 'Historical performance of major tech sector indices and volume metrics.',
    icon: Database,
    type: 'market',
    data: [
      { year: 2010, price: 2500, volatility: 0.15, volume: 1.2 },
      { year: 2012, price: 3100, volatility: 0.18, volume: 1.5 },
      { year: 2014, price: 4800, volatility: 0.14, volume: 2.1 },
      { year: 2016, price: 5400, volatility: 0.22, volume: 2.8 },
      { year: 2018, price: 7500, volatility: 0.19, volume: 3.5 },
      { year: 2020, price: 12800, volatility: 0.35, volume: 5.2 },
      { year: 2022, price: 15100, volatility: 0.28, volume: 4.8 },
      { year: 2024, price: 18900, volatility: 0.21, volume: 6.1 },
    ]
  }
];

export function DataExplorer() {
  const { t } = useLanguage();
  const [activeDataset, setActiveDataset] = useState<Dataset>(PREDEFINED_DATASETS[0]);
  const [viewMode, setViewMode] = useState<'viz' | 'table'>('viz');
  const [chartType, setChartType] = useState<'line' | 'bar' | 'scatter' | 'area'>('line');
  const [searchQuery, setSearchQuery] = useState('');
  const [datasetSearch, setDatasetSearch] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);

  // --- Handlers ---
  const exportToCSV = () => {
    const dataToExport = filteredData;
    if (!dataToExport.length) return;
    
    const headers = Object.keys(dataToExport[0]);
    const csvRows = [
      headers.join(','),
      ...dataToExport.map(row => 
        headers.map(header => JSON.stringify(row[header])).join(',')
      )
    ];
    
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${activeDataset.name.toLowerCase()}_export.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredDatasets = useMemo(() => {
    if (!datasetSearch) return PREDEFINED_DATASETS;
    return PREDEFINED_DATASETS.filter(ds => 
      ds.name.toLowerCase().includes(datasetSearch.toLowerCase()) || 
      ds.type.toLowerCase().includes(datasetSearch.toLowerCase())
    );
  }, [datasetSearch]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadLoading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        let data: any[] = [];

        if (file.name.endsWith('.json')) {
          data = JSON.parse(content);
        } else if (file.name.endsWith('.csv')) {
          const lines = content.split('\n');
          const headers = lines[0].split(',');
          data = lines.slice(1).map(line => {
            const values = line.split(',');
            return headers.reduce((obj, header, index) => {
              obj[header.trim()] = values[index]?.trim();
              return obj;
            }, {} as any);
          });
        }

        const newDataset: Dataset = {
          id: `custom-${Date.now()}`,
          name: file.name.split('.')[0],
          description: `Custom dataset uploaded on ${new Date().toLocaleDateString()}`,
          icon: Upload,
          data: data.slice(0, 100), // Limit for performance
          type: 'market'
        };

        setActiveDataset(newDataset);
      } catch (err) {
        console.error('Error parsing file', err);
        alert('Invalid file format. Please upload JSON or CSV.');
      } finally {
        setUploadLoading(false);
      }
    };

    reader.readAsText(file);
  };

  const filteredData = useMemo(() => {
    if (!searchQuery) return activeDataset.data;
    return activeDataset.data.filter(row => 
      Object.values(row).some(val => 
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [activeDataset, searchQuery]);

  // Keys for visualization (axes)
  const numericKeys = useMemo(() => {
    if (activeDataset.data.length === 0) return [];
    return Object.keys(activeDataset.data[0]).filter(key => 
      typeof activeDataset.data[0][key] === 'number'
    );
  }, [activeDataset]);

  const allKeys = useMemo(() => {
    if (activeDataset.data.length === 0) return [];
    return Object.keys(activeDataset.data[0]);
  }, [activeDataset]);

  const [xAxisKey, setXAxisKey] = useState(allKeys[0] || '');
  const [yAxisKey, setYAxisKey] = useState(numericKeys[0] || '');
  
  // Aggregate Stats calculation
  const aggregateStats = useMemo(() => {
    if (!activeDataset.data.length || !yAxisKey) return null;
    const values = activeDataset.data.map(d => d[yAxisKey]).filter(v => typeof v === 'number');
    if (!values.length) return null;
    
    return {
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      sum: values.reduce((a, b) => a + b, 0),
      count: values.length
    };
  }, [activeDataset, yAxisKey]);

  // Customization State
  const [xAxisLabel, setXAxisLabel] = useState('');
  const [yAxisLabel, setYAxisLabel] = useState('');
  const [xAxisFormat, setXAxisFormat] = useState<'standard' | 'scientific' | 'currency' | 'percent'>('standard');
  const [yAxisFormat, setYAxisFormat] = useState<'standard' | 'scientific' | 'currency' | 'percent'>('standard');
  const [showSettings, setShowSettings] = useState(false);

  // Enhancement: Chart Customization State
  const [chartColor, setChartColor] = useState('#00d1ff');
  const [lineStyle, setLineStyle] = useState<'solid' | 'dashed' | 'dotted'>('solid');
  const [showDataLabels, setShowDataLabels] = useState(false);

  const COLORS = [
    { name: 'CYAN', value: '#00d1ff' },
    { name: 'VIOLET', value: '#8b5cf6' },
    { name: 'PINK', value: '#ec4899' },
    { name: 'EMERALD', value: '#10b981' },
    { name: 'AMBER', value: '#f59e0b' },
  ];

  const LINE_STYLES = [
    { name: 'SOLID', value: 'solid', dash: '0' },
    { name: 'DASHED', value: 'dashed', dash: '5 5' },
    { name: 'DOTTED', value: 'dotted', dash: '2 2' },
  ];

  // Formatting Helper
  const formatValue = (val: any, format: string) => {
    if (typeof val !== 'number') return val;
    switch (format) {
      case 'scientific':
        return val.toExponential(2);
      case 'currency':
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
      case 'percent':
        return `${(val * 100).toFixed(1)}%`;
      default:
        return val.toLocaleString();
    }
  };

  // Reset axis keys when dataset changes
  React.useEffect(() => {
    if (activeDataset.data.length > 0) {
      const keys = Object.keys(activeDataset.data[0]);
      const nums = keys.filter(k => typeof activeDataset.data[0][k] === 'number');
      setXAxisKey(keys[0]);
      setYAxisKey(nums[0] || keys[1]);
      setXAxisLabel('');
      setYAxisLabel('');
      if (activeDataset.color) setChartColor(activeDataset.color);
    }
  }, [activeDataset]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 md:px-0">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#00d1ff] animate-pulse" />
             <span className="text-[10px] font-mono text-primary uppercase tracking-[0.4em] font-black">Data_Exploration_Mode</span>
          </div>
          <h1 className="text-4xl font-black text-text-main uppercase tracking-tighter italic leading-none">
            {t('lab.title')}
          </h1>
          <p className="text-text-muted mt-1 font-mono text-[10px] uppercase tracking-widest opacity-60">
            Node: DATA_EXPLORER_V2 // Visualization_Engine_Online
          </p>
        </div>

        <div className="flex items-center gap-3">
           <label className="relative group cursor-pointer">
              <input type="file" className="hidden" accept=".csv,.json" onChange={handleFileUpload} />
              <div className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-6 py-3 rounded-2xl text-primary font-bold text-[11px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all group-hover:shadow-[0_0_20px_rgba(0,209,255,0.2)]">
                 {uploadLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                 <span>{t('lab.upload')}</span>
              </div>
           </label>

           <button 
             onClick={exportToCSV}
             className="flex items-center gap-2 bg-secondary/10 border border-secondary/20 px-6 py-3 rounded-2xl text-secondary font-bold text-[11px] uppercase tracking-widest hover:bg-secondary hover:text-white transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
           >
              <Download className="w-4 h-4" />
              <span>{t('lab.export')}</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Dataset Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className={cn(
            "border rounded-[32px] p-6 shadow-xl relative overflow-hidden group h-fit sticky top-24",
            document.documentElement.getAttribute('data-theme') === 'light' ? "bg-white border-research-line" : "bg-card border-research-line"
          )}>
            <h3 className="text-xs font-mono font-black text-primary uppercase tracking-[0.3em] mb-4 flex items-center justify-between">
               <div className="flex items-center gap-2">
                 <Database className="w-3.5 h-3.5" /> Source_Catalog
               </div>
               <span className="text-[10px] opacity-40">{filteredDatasets.length}</span>
            </h3>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-text-muted/40" />
              <input 
                type="text"
                placeholder={t('lab.search')}
                value={datasetSearch}
                onChange={(e) => setDatasetSearch(e.target.value)}
                className="w-full bg-accent-soft border border-research-line rounded-xl pl-8 pr-3 py-2 text-[9px] font-mono text-text-main focus:border-primary outline-none transition-all placeholder:text-text-muted/50 uppercase"
              />
            </div>
            
            <div className="space-y-1 max-h-[400px] overflow-y-auto no-scrollbar">
              {filteredDatasets.map((ds) => (
                <button
                  key={ds.id}
                  onClick={() => setActiveDataset(ds)}
                  className={cn(
                    "w-full text-left p-3 rounded-xl border transition-all relative overflow-hidden group",
                    activeDataset.id === ds.id 
                      ? "border-primary bg-primary/5" 
                      : "border-transparent hover:bg-accent-soft/50"
                  )}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <div className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center transition-colors", 
                      activeDataset.id === ds.id ? "bg-primary text-white" : "bg-accent-soft text-text-muted/40"
                    )}>
                      <ds.icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className={cn("text-[10px] font-black uppercase tracking-tight", activeDataset.id === ds.id ? "text-text-main" : "text-text-main/60")}>{ds.name}</p>
                      <p className="text-[7px] font-mono text-text-muted uppercase tracking-widest mt-0.5">{ds.type}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {filteredDatasets.length === 0 && (
              <div className="py-8 text-center">
                <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest opacity-40">No_Matches_Found</p>
              </div>
            )}
          </div>
        </div>

        {/* Visualization & Table Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Aggregated Stats Breakdown */}
          <div className="bg-card border border-research-line rounded-[32px] p-6 shadow-xl w-full">
            {aggregateStats ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-[8px] font-mono text-text-muted uppercase tracking-widest">Global_Mean</p>
                  <p className="text-xl font-black text-text-main italic">{formatValue(aggregateStats.avg, yAxisFormat)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-mono text-text-muted uppercase tracking-widest">N_Samples</p>
                  <p className="text-xl font-black text-text-main italic">{aggregateStats.count}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-mono text-text-muted uppercase tracking-widest">Range_Max</p>
                  <p className="text-xl font-black text-primary italic">{formatValue(aggregateStats.max, yAxisFormat)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] font-mono text-text-muted uppercase tracking-widest">Range_Min</p>
                  <p className="text-xl font-black text-secondary italic">{formatValue(aggregateStats.min, yAxisFormat)}</p>
                </div>
              </div>
            ) : (
               <div className="h-12 flex items-center justify-center border border-dashed border-research-line rounded-xl">
                  <p className="text-[9px] font-mono text-text-muted uppercase tracking-widest opacity-40">Calculating_Aggregates...</p>
               </div>
            )}
          </div>

          {/* Controls Bar */}
          <div className="bg-card border border-research-line rounded-[32px] p-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center bg-accent-soft p-1 rounded-2xl border border-research-line">
              <button 
                onClick={() => setViewMode('viz')}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  viewMode === 'viz' ? "bg-primary text-white" : "text-text-muted hover:text-text-main"
                )}
              >
                <LineChartIcon className="w-3.5 h-3.5" /> {t('lab.distribution')}
              </button>
              <button 
                onClick={() => setViewMode('table')}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  viewMode === 'table' ? "bg-primary text-white" : "text-text-muted hover:text-text-main"
                )}
              >
                <TableIcon className="w-3.5 h-3.5" /> {t('lab.table')}
              </button>
            </div>

            {viewMode === 'viz' && (
              <>
                <div className="flex items-center gap-2">
                  {[
                    { id: 'line', icon: LineChartIcon },
                    { id: 'bar', icon: BarChart3 },
                    { id: 'area', icon: BarChart3 },
                    { id: 'scatter', icon: ScatterChartIcon },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setChartType(t.id as any)}
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all border",
                        chartType === t.id ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_rgba(0,209,255,0.2)]" : "border-research-line bg-white/5 text-white/40 hover:text-white"
                      )}
                    >
                      <t.icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border",
                    showSettings ? "border-primary bg-primary text-black" : "border-research-line bg-white/5 text-white/40 hover:text-white"
                  )}
                >
                  <Filter className="w-3.5 h-3.5" /> Protocol_Settings
                </button>
              </>
            )}

            <div className="relative w-full md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
              <input 
                type="text"
                placeholder="Search_Matrix..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-accent-soft border border-research-line rounded-2xl pl-12 pr-4 py-3 text-[10px] font-mono text-text-main focus:border-primary focus:outline-none transition-all placeholder:text-text-muted/30 uppercase tracking-widest"
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === 'viz' && showSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-card border border-research-line rounded-[32px] p-6 shadow-xl overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] border-b border-primary/20 pb-2">{t('lab.x_axis')}</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[8px] text-white/40 uppercase tracking-widest block ml-1">{t('lab.custom_label')}</label>
                        <input 
                          type="text" 
                          value={xAxisLabel}
                          onChange={(e) => setXAxisLabel(e.target.value)}
                          placeholder={xAxisKey.toUpperCase()}
                          className="w-full bg-white/5 border border-research-line rounded-xl px-4 py-2 text-[10px] text-white focus:border-primary outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[8px] text-white/40 uppercase tracking-widest block ml-1">{t('lab.data_format')}</label>
                        <select 
                          value={xAxisFormat}
                          onChange={(e) => setXAxisFormat(e.target.value as any)}
                          className="w-full bg-white/5 border border-research-line rounded-xl px-4 py-2 text-[10px] text-white focus:border-primary outline-none transition-all"
                        >
                          <option value="standard">STANDARD</option>
                          <option value="scientific">SCIENTIFIC_E</option>
                          <option value="currency">CURRENCY_USD</option>
                          <option value="percent">PERCENTAGE</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] border-b border-primary/20 pb-2">{t('lab.y_axis')}</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[8px] text-white/40 uppercase tracking-widest block ml-1">{t('lab.custom_label')}</label>
                        <input 
                          type="text" 
                          value={yAxisLabel}
                          onChange={(e) => setYAxisLabel(e.target.value)}
                          placeholder={yAxisKey.toUpperCase()}
                          className="w-full bg-white/5 border border-research-line rounded-xl px-4 py-2 text-[10px] text-white focus:border-primary outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[8px] text-white/40 uppercase tracking-widest block ml-1">{t('lab.data_format')}</label>
                        <select 
                          value={yAxisFormat}
                          onChange={(e) => setYAxisFormat(e.target.value as any)}
                          className="w-full bg-white/5 border border-research-line rounded-xl px-4 py-2 text-[10px] text-white focus:border-primary outline-none transition-all"
                        >
                          <option value="standard">STANDARD</option>
                          <option value="scientific">SCIENTIFIC_E</option>
                          <option value="currency">CURRENCY_USD</option>
                          <option value="percent">PERCENTAGE</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 md:col-span-2 pt-4 border-t border-research-line/30">
                    <h4 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">{t('lab.geometry')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[10px] font-mono">
                      <div className="space-y-3">
                        <label className="text-[8px] text-white/40 uppercase tracking-widest block ml-1">{t('lab.color')}</label>
                        <div className="flex flex-wrap gap-2">
                          {COLORS.map((c) => (
                            <button
                              key={c.value}
                              onClick={() => setChartColor(c.value)}
                              className={cn(
                                "w-6 h-6 rounded-full border-2 transition-all",
                                chartColor === c.value ? "border-white scale-110 shadow-[0_0_10px]" : "border-transparent opacity-50"
                              )}
                              style={{ 
                                backgroundColor: c.value,
                                boxShadow: chartColor === c.value ? `0 0 10px ${c.value}` : 'none'
                              }}
                              title={c.name}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[8px] text-white/40 uppercase tracking-widest block ml-1">{t('lab.vector')}</label>
                        <div className="flex gap-2">
                          {LINE_STYLES.map((s) => (
                            <button
                              key={s.value}
                              onClick={() => setLineStyle(s.value as any)}
                              className={cn(
                                "px-3 py-1.5 rounded-lg border text-[8px] font-black uppercase transition-all",
                                lineStyle === s.value 
                                  ? "border-primary bg-primary/10 text-primary" 
                                  : "border-research-line bg-white/5 text-white/40 hover:text-white"
                              )}
                            >
                              {s.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[8px] text-white/40 uppercase tracking-widest block ml-1">{t('lab.labels')}</label>
                        <button
                          onClick={() => setShowDataLabels(!showDataLabels)}
                          className={cn(
                            "px-4 py-2 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all w-full flex items-center justify-center gap-3",
                            showDataLabels 
                              ? "border-primary bg-primary text-black" 
                              : "border-research-line bg-white/5 text-white/40 hover:text-white"
                          )}
                        >
                           <div className={cn("w-2 h-2 rounded-full", showDataLabels ? "bg-black" : "bg-white/20")} />
                           {showDataLabels ? "LABELS_ENABLED" : "LABELS_DISABLED"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {viewMode === 'viz' ? (
              <motion.div 
                key="viz"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-card border border-research-line rounded-[40px] p-8 shadow-2xl min-h-[500px] flex flex-col relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 relative z-10">
                   <div>
                      <h4 className="text-xl font-black text-text-main italic uppercase tracking-tighter">Geometric_Reconstruction</h4>
                      <p className="text-[9px] font-mono text-primary uppercase tracking-[0.4em] mt-1">Axes: {xAxisKey} // {yAxisKey}</p>
                   </div>

                   <div className="flex gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[8px] font-mono text-text-muted uppercase tracking-widest block ml-1">DATA_SOURCE_X</label>
                        <select 
                          value={xAxisKey}
                          onChange={(e) => setXAxisKey(e.target.value)}
                          className="bg-accent-soft border border-research-line rounded-xl px-3 py-2 text-[10px] font-mono text-text-main outline-none focus:border-primary"
                        >
                          {allKeys.map(k => <option key={k} value={k}>{k.toUpperCase()}</option>)}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[8px] font-mono text-text-muted uppercase tracking-widest block ml-1">DATA_SOURCE_Y</label>
                        <select 
                          value={yAxisKey}
                          onChange={(e) => setYAxisKey(e.target.value)}
                          className="bg-accent-soft border border-research-line rounded-xl px-3 py-2 text-[10px] font-mono text-text-main outline-none focus:border-primary"
                        >
                          {numericKeys.map(k => <option key={k} value={k}>{k.toUpperCase()}</option>)}
                        </select>
                      </div>
                   </div>
                </div>

                <div className="flex-1 h-[400px] relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === 'line' ? (
                      <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--research-line)" vertical={false} />
                        <XAxis 
                          dataKey={xAxisKey} 
                          stroke="var(--text-muted)" 
                          fontSize={10} 
                          fontFamily="monospace" 
                          tickLine={false} 
                          axisLine={false}
                          tickFormatter={(val) => formatValue(val, xAxisFormat)}
                          label={{ value: xAxisLabel || xAxisKey, position: 'insideBottomRight', offset: -5, fill: 'var(--text-muted)', fontSize: 9, fontFamily: 'monospace' }}
                        />
                        <YAxis 
                          stroke="var(--text-muted)" 
                          fontSize={10} 
                          fontFamily="monospace" 
                          tickLine={false} 
                          axisLine={false}
                          tickFormatter={(val) => formatValue(val, yAxisFormat)}
                          label={{ value: yAxisLabel || yAxisKey, angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 9, fontFamily: 'monospace' }}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'var(--card)', border: `1px solid var(--research-line)`, borderRadius: '12px', fontSize: '10px', fontFamily: 'monospace' }}
                          itemStyle={{ color: chartColor }}
                          formatter={(val: any) => [formatValue(val, yAxisFormat), yAxisLabel || yAxisKey]}
                          labelFormatter={(val) => `${xAxisLabel || xAxisKey}: ${formatValue(val, xAxisFormat)}`}
                        />
                        <Line 
                          type="monotone" 
                          dataKey={yAxisKey} 
                          stroke={chartColor} 
                          strokeWidth={3} 
                          strokeDasharray={LINE_STYLES.find(s => s.value === lineStyle)?.dash}
                          dot={{ r: 4, fill: chartColor, strokeWidth: 2, stroke: 'var(--card)' }} 
                          activeDot={{ r: 8, strokeWidth: 0 }}
                          animationDuration={1500}
                        >
                          {showDataLabels && (
                            <LabelList 
                              dataKey={yAxisKey} 
                              position="top" 
                              fill={chartColor} 
                              fontSize={9} 
                              fontFamily="monospace"
                              formatter={(val: any) => formatValue(val, yAxisFormat)}
                            />
                          )}
                        </Line>
                      </LineChart>
                    ) : chartType === 'bar' ? (
                      <BarChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--research-line)" vertical={false} />
                        <XAxis 
                          dataKey={xAxisKey} 
                          stroke="var(--text-muted)" 
                          fontSize={10} 
                          fontFamily="monospace" 
                          tickLine={false} 
                          axisLine={false}
                          tickFormatter={(val) => formatValue(val, xAxisFormat)}
                          label={{ value: xAxisLabel || xAxisKey, position: 'insideBottomRight', offset: -5, fill: 'var(--text-muted)', fontSize: 9, fontFamily: 'monospace' }}
                        />
                        <YAxis 
                          stroke="var(--text-muted)" 
                          fontSize={10} 
                          fontFamily="monospace" 
                          tickLine={false} 
                          axisLine={false}
                          tickFormatter={(val) => formatValue(val, yAxisFormat)}
                          label={{ value: yAxisLabel || yAxisKey, angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 9, fontFamily: 'monospace' }}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'var(--card)', border: `1px solid var(--research-line)`, borderRadius: '12px', fontSize: '10px', fontFamily: 'monospace' }}
                          itemStyle={{ color: chartColor }}
                          formatter={(val: any) => [formatValue(val, yAxisFormat), yAxisLabel || yAxisKey]}
                          labelFormatter={(val) => `${xAxisLabel || xAxisKey}: ${formatValue(val, xAxisFormat)}`}
                        />
                        <Bar dataKey={yAxisKey} fill={chartColor} radius={[4, 4, 0, 0]} animationDuration={1500}>
                          {showDataLabels && (
                            <LabelList 
                              dataKey={yAxisKey} 
                              position="top" 
                              fill={chartColor} 
                              fontSize={9} 
                              fontFamily="monospace"
                              formatter={(val: any) => formatValue(val, yAxisFormat)}
                            />
                          )}
                        </Bar>
                      </BarChart>
                    ) : chartType === 'area' ? (
                      <AreaChart data={filteredData}>
                        <defs>
                          <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--research-line)" vertical={false} />
                        <XAxis 
                          dataKey={xAxisKey} 
                          stroke="var(--text-muted)" 
                          fontSize={10} 
                          fontFamily="monospace" 
                          tickLine={false} 
                          axisLine={false}
                          tickFormatter={(val) => formatValue(val, xAxisFormat)}
                          label={{ value: xAxisLabel || xAxisKey, position: 'insideBottomRight', offset: -5, fill: 'var(--text-muted)', fontSize: 9, fontFamily: 'monospace' }}
                        />
                        <YAxis 
                          stroke="var(--text-muted)" 
                          fontSize={10} 
                          fontFamily="monospace" 
                          tickLine={false} 
                          axisLine={false}
                          tickFormatter={(val) => formatValue(val, yAxisFormat)}
                          label={{ value: yAxisLabel || yAxisKey, angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 9, fontFamily: 'monospace' }}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'var(--card)', border: `1px solid var(--research-line)`, borderRadius: '12px', fontSize: '10px', fontFamily: 'monospace' }}
                          itemStyle={{ color: chartColor }}
                          formatter={(val: any) => [formatValue(val, yAxisFormat), yAxisLabel || yAxisKey]}
                          labelFormatter={(val) => `${xAxisLabel || xAxisKey}: ${formatValue(val, xAxisFormat)}`}
                        />
                        <Area type="monotone" dataKey={yAxisKey} stroke={chartColor} fillOpacity={1} fill="url(#colorY)" strokeWidth={2} strokeDasharray={LINE_STYLES.find(s => s.value === lineStyle)?.dash}>
                          {showDataLabels && (
                            <LabelList 
                              dataKey={yAxisKey} 
                              position="top" 
                              fill={chartColor} 
                              fontSize={9} 
                              fontFamily="monospace"
                              formatter={(val: any) => formatValue(val, yAxisFormat)}
                            />
                          )}
                        </Area>
                      </AreaChart>
                    ) : (
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--research-line)" />
                        <XAxis 
                          type="number" 
                          dataKey={xAxisKey} 
                          name="x" 
                          stroke="var(--text-muted)" 
                          fontSize={10} 
                          fontFamily="monospace"
                          tickFormatter={(val) => formatValue(val, xAxisFormat)}
                          label={{ value: xAxisLabel || xAxisKey, position: 'insideBottomRight', offset: -5, fill: 'var(--text-muted)', fontSize: 9, fontFamily: 'monospace' }}
                        />
                        <YAxis 
                          type="number" 
                          dataKey={yAxisKey} 
                          name="y" 
                          stroke="var(--text-muted)" 
                          fontSize={10} 
                          fontFamily="monospace"
                          tickFormatter={(val) => formatValue(val, yAxisFormat)}
                          label={{ value: yAxisLabel || yAxisKey, angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 9, fontFamily: 'monospace' }}
                        />
                        <Tooltip 
                          cursor={{ strokeDasharray: '3 3' }} 
                          contentStyle={{ backgroundColor: 'var(--card)', border: `1px solid var(--research-line)`, borderRadius: '12px', fontSize: '10px', fontFamily: 'monospace' }}
                          itemStyle={{ color: chartColor }}
                          formatter={(val: any) => [formatValue(val, yAxisFormat), yAxisLabel || yAxisKey]}
                          labelFormatter={(val) => `${xAxisLabel || xAxisKey}: ${formatValue(val, xAxisFormat)}`}
                        />
                        <Scatter name="Observation" data={filteredData} fill={chartColor}>
                          {showDataLabels && (
                            <LabelList 
                              dataKey={yAxisKey} 
                              position="top" 
                              fill={chartColor} 
                              fontSize={9} 
                              fontFamily="monospace"
                              formatter={(val: any) => formatValue(val, yAxisFormat)}
                            />
                          )}
                        </Scatter>
                      </ScatterChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="table"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="bg-card border border-research-line rounded-[40px] shadow-2xl overflow-hidden"
              >
                <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                      <thead>
                         <tr className="bg-white/5 border-b border-research-line">
                            {allKeys.map(key => (
                              <th key={key} className="px-6 py-5 text-[9px] font-mono font-black text-primary uppercase tracking-[0.2em] whitespace-nowrap">
                                 {key}
                              </th>
                            ))}
                         </tr>
                      </thead>
                      <tbody>
                         {filteredData.map((row, i) => (
                           <tr key={i} className="border-b border-research-line/50 hover:bg-white/5 transition-colors group">
                              {allKeys.map(key => (
                                <td key={key} className={cn("px-6 py-4 text-[11px] font-medium transition-colors", typeof row[key] === 'number' ? "text-secondary font-mono" : "text-white/70")}>
                                   {row[key]}
                                </td>
                              ))}
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
                {filteredData.length === 0 && (
                  <div className="p-20 text-center space-y-4">
                     <Database className="w-12 h-12 text-white/5 mx-auto" />
                     <p className="text-[10px] font-mono text-text-muted uppercase tracking-widest leading-loose">No_Matching_Entries_Located</p>
                  </div>
                )}
                <div className="p-6 bg-white/2 border-t border-research-line flex justify-between items-center">
                   <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em]">Entries_Count: {filteredData.length}</span>
                   <button className="flex items-center gap-2 text-primary hover:text-white transition-colors text-[9px] font-mono font-black uppercase tracking-widest">
                      <Download className="w-3.5 h-3.5" /> Export_CSV
                   </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
