import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Save, Check, Shield, Award, Activity, Mail, UserCircle, Palette, Sun, Moon, Zap, Terminal, Joystick, Stars } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

const AVATARS = [
  'https://api.dicebear.com/7.x/pixel-art/svg?seed=Felix',
  'https://api.dicebear.com/7.x/pixel-art/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/pixel-art/svg?seed=Coco',
  'https://api.dicebear.com/7.x/pixel-art/svg?seed=Luna',
  'https://api.dicebear.com/7.x/pixel-art/svg?seed=Bear',
  'https://api.dicebear.com/7.x/pixel-art/svg?seed=Oliver',
];

type Theme = 'research' | 'light' | 'cyberpunk' | 'matrix' | 'spectrum' | 'space';

interface StudentCabinetProps {
  xp?: number;
  level?: number;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function StudentCabinet({ xp = 0, level = 1, currentTheme, onThemeChange }: StudentCabinetProps) {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.photoURL || AVATARS[0]);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const THEMES: { id: Theme; name: string; icon: any; color: string }[] = [
    { id: 'research', name: 'Research (Dark)', icon: Moon, color: 'bg-[#12141C]' },
    { id: 'light', name: 'Laboratory (Light)', icon: Sun, color: 'bg-white' },
    { id: 'cyberpunk', name: 'Cyberpunk', icon: Zap, color: 'bg-[#0D0221]' },
    { id: 'matrix', name: 'Matrix', icon: Terminal, color: 'bg-[#0D0208]' },
    { id: 'spectrum', name: 'ZX Spectrum', icon: Joystick, color: 'bg-black' },
    { id: 'space', name: 'Infinite Space', icon: Stars, color: 'bg-[#050510]' },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile(name, selectedAvatar);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update profile', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 px-4 md:px-0">
      <header className="space-y-1 px-4 md:px-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-mono text-primary uppercase tracking-[0.4em]">Auth_Node_Secure</span>
        </div>
        <h1 className="text-4xl font-black text-text-main uppercase tracking-tighter italic">Operational_Clearance</h1>
        <p className="text-text-muted mt-1 font-mono text-[10px] uppercase tracking-widest opacity-60">Control_Panel // Personnel_Registry_v4.2</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6 px-4 md:px-0">
          <div className="bg-card rounded-[32px] border border-research-line p-8 text-center shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-12 translate-x-12 blur-2xl group-hover:bg-primary/10 transition-colors" />
             
             <div className="relative inline-block mb-6 group/avatar">
                <div className="w-32 h-32 rounded-[40px] overflow-hidden border border-primary/20 shadow-2xl relative z-10 bg-accent-soft">
                   <img 
                     src={selectedAvatar} 
                     alt="User Avatar" 
                     className="w-full h-full object-cover relative z-10" 
                     referrerPolicy="no-referrer"
                   />
                   <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover/avatar:opacity-100 transition-opacity z-20" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2.5 rounded-2xl shadow-lg border-2 border-research-line z-30 group-hover/avatar:scale-110 transition-transform">
                   <Camera className="w-5 h-5" />
                </div>
             </div>

             <h2 className="text-2xl font-black text-text-main tracking-tight line-clamp-1 uppercase italic">{name || 'RESEARCHER_X'}</h2>
             <p className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.3em] mt-2 opacity-60">Level_{level < 10 ? `0${level}` : level}_Operator</p>
             
             <div className="mt-8 pt-8 border-t border-research-line flex justify-around">
                <div className="text-center">
                   <p className="text-2xl font-black text-text-main font-mono">{xp.toLocaleString()}</p>
                   <p className="text-[9px] font-mono text-text-muted uppercase tracking-[0.2em] mt-1">XP_DATA</p>
                </div>
                <div className="text-center">
                   <p className="text-2xl font-black text-text-main font-mono">14</p>
                   <p className="text-[9px] font-mono text-text-muted uppercase tracking-[0.2em] mt-1">UPLINK_STREAK</p>
                </div>
             </div>
          </div>

          <div className="bg-card/50 border border-research-line rounded-2xl p-6 space-y-4">
             <div className="flex items-center gap-3 text-text-muted">
                <Mail className="w-3.5 h-3.5 text-primary/40" />
                <span className="text-[10px] font-mono font-medium truncate opacity-70 tracking-wider uppercase">{user?.email}</span>
             </div>
             <div className="flex items-center gap-3 text-primary">
                <Shield className="w-3.5 h-3.5" />
                <span className="text-[9px] font-mono font-black uppercase tracking-[0.2em]">System_Verified_ID</span>
             </div>
          </div>
        </div>

        {/* Editing Section */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-card border border-research-line rounded-[32px] p-8 shadow-2xl">
              <h3 className="text-xl font-black text-white mb-10 flex items-center gap-3 uppercase tracking-tight italic">
                 <UserCircle className="w-6 h-6 text-primary" /> Profile_Configuration
              </h3>

              <div className="space-y-10">
                 <div className="space-y-4">
                    <label className="text-[9px] font-mono font-black text-primary uppercase tracking-[0.3em] ml-1">Assigned_Alias</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-research-line rounded-2xl px-6 py-5 text-white font-bold focus:border-primary focus:outline-none transition-all placeholder:text-white/10"
                      placeholder="Enter operational callsign..."
                    />
                 </div>

                 <div className="space-y-5">
                    <label className="text-[9px] font-mono font-black text-primary uppercase tracking-[0.3em] ml-1">Kernel_Identity_Vector</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                       {AVATARS.map((av, idx) => (
                         <button
                           key={idx}
                           onClick={() => setSelectedAvatar(av)}
                           className={cn(
                             "w-full aspect-square rounded-2xl overflow-hidden border-2 transition-all p-1 bg-white/5 relative group",
                             selectedAvatar === av ? "border-primary scale-105 shadow-lg shadow-primary/20" : "border-research-line hover:border-primary/40"
                           )}
                         >
                            <img src={av} alt={`Avatar ${idx}`} className="w-full h-full object-cover rounded-xl relative z-10" referrerPolicy="no-referrer" />
                            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-5">
                    <label className="text-[9px] font-mono font-black text-primary uppercase tracking-[0.3em] ml-1">Visual_Protocol_Selection</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {THEMES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => onThemeChange(t.id)}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-2xl border-2 transition-all group relative overflow-hidden text-left",
                            currentTheme === t.id 
                              ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(0,209,255,0.1)]" 
                              : "border-research-line bg-white/5 hover:border-primary/40"
                          )}
                        >
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110", t.color)}>
                            <t.icon className={cn("w-4 h-4", currentTheme === t.id ? "text-primary" : "text-white/40")} />
                          </div>
                          <div>
                            <p className={cn("text-[9px] font-black uppercase tracking-tight leading-tight", currentTheme === t.id ? "text-white" : "text-white/60")}>{t.name}</p>
                            {currentTheme === t.id && <p className="text-[7.5px] font-mono text-primary uppercase tracking-widest mt-0.5">Active</p>}
                          </div>
                        </button>
                      ))}
                    </div>
                 </div>

                 {/* Professional Certifications Section */}
                 <div className="space-y-5 pt-4 border-t border-research-line/50">
                    <label className="text-[9px] font-mono font-black text-secondary uppercase tracking-[0.3em] ml-1">Professional_Endorsements</label>
                    <div className="grid grid-cols-1 gap-3">
                       {[
                         { id: 1, name: 'Advanced_Data_Analytics_Mastery', date: '2024-03-12', status: 'verified' },
                         { id: 2, name: 'Neural_Network_Architecture_V1', date: '2024-01-05', status: 'verified' },
                         { id: 3, name: 'Strategic_Cybernetics_Operations', date: 'In Progress', status: 'pending' },
                       ].map((cert) => (
                         <div key={cert.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-research-line hover:border-secondary/30 transition-all group">
                            <div className="flex items-center gap-4">
                               <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", cert.status === 'verified' ? "bg-secondary/10 text-secondary" : "bg-white/5 text-white/20")}>
                                  <Award className="w-5 h-5" />
                               </div>
                               <div>
                                  <p className="text-[10px] font-black text-white uppercase tracking-tight">{cert.name}</p>
                                  <p className="text-[8px] font-mono text-text-muted uppercase tracking-widest mt-0.5">ID: CERT-00{cert.id} // {cert.date}</p>
                               </div>
                            </div>
                            {cert.status === 'verified' ? (
                               <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
                                  <Check className="w-3 h-3 text-secondary" />
                                  <span className="text-[8px] font-black text-secondary uppercase">Verified</span>
                               </div>
                            ) : (
                               <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                                  <span className="text-[8px] font-black text-white/40 uppercase">Awaiting_Validation</span>
                               </div>
                            )}
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="pt-6">
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className={cn(
                        "w-full py-5 rounded-[22px] font-mono font-black text-xs uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3",
                        showSuccess 
                          ? "bg-success text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                          : "bg-white text-[#010204] hover:bg-primary hover:text-white hover:shadow-[0_0_25px_rgba(0,209,255,0.4)] disabled:opacity-50"
                      )}
                    >
                       {isSaving ? (
                         <>
                           <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                           <span>SYNC_IN_PROGRESS...</span>
                         </>
                       ) : showSuccess ? (
                         <>
                           <Check className="w-5 h-5 shadow-[0_0_10px_white]" />
                           <span>DATA_COMMITTED</span>
                         </>
                       ) : (
                         <>
                           <Save className="w-5 h-5" />
                           <span>REWRITE_IDENTITY</span>
                         </>
                       )}
                    </button>
                 </div>
              </div>
           </div>

           <div className="bg-primary/5 p-8 rounded-[32px] border border-primary/20 border-dashed flex items-start gap-5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Award className="w-8 h-8 text-primary shrink-0 relative z-10" />
              <div className="relative z-10">
                 <h4 className="font-black text-white uppercase tracking-tight mb-2 italic">System_Integrity_Report</h4>
                 <p className="text-[11px] font-mono text-text-muted leading-relaxed tracking-wider opacity-80 uppercase">Personnel account fully synced with ASTRO_LAB database. Every mission outcome and laboratory discovery contributes to overall system status and operational clearance level.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
