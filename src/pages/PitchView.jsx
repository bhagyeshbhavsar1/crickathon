import React from 'react';
import { motion } from 'framer-motion';
import { useSquadStore } from '../store/useSquadStore';

const PitchView = () => {
    const { draftedPlayers, budget } = useSquadStore();

    // Map drafted players to roles for the grid
    const wk = draftedPlayers.filter(p => p.role === 'Wicket-keeper');
    const bats = draftedPlayers.filter(p => p.role === 'Batter');
    const ars = draftedPlayers.filter(p => p.role === 'All-rounder');
    const bwls = draftedPlayers.filter(p => p.role === 'Bowler');

    const totalInvestment = 100 - budget;

    const renderPlayer = (player, defaultRole) => {
        if (!player) {
            return (
                <div className="w-24 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 border-2 border-dashed border-slate-300 mb-2 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-300">add</span>
                    </div>
                    <span className="bg-slate-200 text-slate-500 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">{defaultRole}</span>
                </div>
            );
        }

        return (
            <motion.div whileHover={{ scale: 1.1 }} className="w-24 text-center cursor-pointer">
                <div className="w-16 h-16 mx-auto rounded-full bg-white border-2 border-red-600 p-1 mb-2 shadow-lg">
                    <img alt={player.name} className="w-full h-full rounded-full object-cover" src={player.image} />
                </div>
                <span className="bg-slate-900 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">{player.role}</span>
                <p className="font-utility-sm text-xs mt-2 font-semibold truncate px-1">{player.name}</p>
            </motion.div>
        );
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 h-full overflow-y-auto pb-24 lg:pb-8"
        >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div>
                    <h2 className="font-display-xl text-3xl md:text-5xl text-on-surface">Final XI Strategy</h2>
                    <p className="font-body-lg text-slate-500 mt-2">Tactical deployment for the upcoming championship series.</p>
                </div>
                <div className="flex gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} className="glass-card px-4 md:px-6 py-3 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Aggression Index</span>
                        <span className="text-xl md:text-2xl font-headline-md text-red-600">{draftedPlayers.length > 0 ? 80 + bats.length * 2 : 0}%</span>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="glass-card px-4 md:px-6 py-3 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Defensive Stability</span>
                        <span className="text-xl md:text-2xl font-headline-md text-red-600">{draftedPlayers.length > 0 ? 70 + bwls.length * 2 : 0}%</span>
                    </motion.div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left: Formation Grid */}
                <div className="lg:col-span-8 glass-card border border-slate-200 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[600px] bg-white/40">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="w-full h-full border-[2px] border-red-600 rounded-full scale-110 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-24 border-t-2 border-x-2 border-red-600"></div>
                    </div>
                    
                    {/* Wicket Keeper */}
                    <div className="flex justify-center relative z-10">
                        {renderPlayer(wk[0], 'WK')}
                    </div>

                    {/* Batsmen */}
                    <div className="flex justify-around relative z-10 mt-8">
                        {renderPlayer(bats[0], 'BAT')}
                        {renderPlayer(bats[1], 'BAT')}
                        {renderPlayer(bats[2], 'BAT')}
                    </div>

                    {/* All Rounders */}
                    <div className="flex justify-evenly relative z-10 mt-8">
                        {renderPlayer(ars[0], 'AR')}
                        {renderPlayer(ars[1], 'AR')}
                        {renderPlayer(ars[2], 'AR')}
                    </div>

                    {/* Bowlers */}
                    <div className="flex justify-around relative z-10 mt-8">
                        {renderPlayer(bwls[0], 'BWL')}
                        {renderPlayer(bwls[1], 'BWL')}
                        {renderPlayer(bwls[2], 'BWL')}
                        {renderPlayer(bwls[3], 'BWL')}
                    </div>
                </div>

                {/* Right: Coaching Report */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="flex-1 glass-card border border-slate-200 rounded-xl p-6 flex flex-col">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="material-symbols-outlined text-red-600">smart_toy</span>
                            <h3 className="font-headline-md text-sm uppercase tracking-widest text-slate-800">Coaching Report</h3>
                        </div>
                        
                        <div className="space-y-4 flex-1">
                            <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-red-50/80 rounded-xl border border-red-100 shadow-sm">
                                <p className="text-[10px] font-bold text-red-600 uppercase mb-2">Squad Insight #01</p>
                                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                                    {draftedPlayers.length === 0 ? "Draft players to see insights." : `You have drafted ${draftedPlayers.length} players. Total spend is ₹${totalInvestment.toFixed(2)} Cr.`}
                                </p>
                            </motion.div>
                            
                            <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-white/60 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Squad Insight #02</p>
                                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                                    {bats.length < 3 ? "Need more top-order batsmen for stability." : "Top order looks solid."}
                                </p>
                            </motion.div>
                            
                            <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-white/60 rounded-xl border border-slate-200 shadow-sm">
                                <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">AI Recommendation</p>
                                <div className="text-xs font-medium text-slate-600 leading-relaxed font-mono space-y-1">
                                    <p className="text-slate-400">&gt; Analyzing squad composition...</p>
                                    <p>&gt; Missing slots: {11 - draftedPlayers.length}</p>
                                    <p className="text-red-600">&gt; Strategy: {totalInvestment > 80 ? "Conserve Budget" : "Aggressive Bidding"}</p>
                                </div>
                            </motion.div>
                        </div>
                        
                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <button className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-colors shadow-md">
                                Detailed Analysis
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Total Investment */}
                <motion.div whileHover={{ y: -5 }} className="glass-card border border-slate-200 rounded-xl p-6 relative overflow-hidden group shadow-sm">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600"></div>
                    <div className="flex justify-between items-start mb-4 pl-2">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Investment</p>
                            <h4 className="text-3xl font-bold text-red-600 mt-1">₹{totalInvestment.toFixed(2)} Cr</h4>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-red-600 transition-colors">account_balance_wallet</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden ml-2 mt-4">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${totalInvestment}%` }} transition={{ duration: 1 }} className="h-full bg-red-600"></motion.div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter ml-2">Remaining: ₹{budget.toFixed(2)} Cr / ₹100 Cr Limit</p>
                </motion.div>

                {/* Bowling Variety Score */}
                <motion.div whileHover={{ y: -5 }} className="glass-card border border-slate-200 rounded-xl p-6 relative overflow-hidden group shadow-sm">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600"></div>
                    <div className="flex justify-between items-start mb-4 pl-2">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bowling Variety Score</p>
                            <h4 className="text-3xl font-bold text-slate-800 mt-1">{bwls.length * 20} <span className="text-lg text-slate-400">/ 100</span></h4>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-red-600 transition-colors">analytics</span>
                    </div>
                    <div className="flex gap-1 ml-2 mt-4 h-2">
                        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className={`h-full flex-1 rounded ${bwls.length > 0 ? 'bg-red-600' : 'bg-slate-200'}`}></motion.div>
                        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.1 }} className={`h-full flex-1 rounded ${bwls.length > 1 ? 'bg-red-600' : 'bg-slate-200'}`}></motion.div>
                        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2 }} className={`h-full flex-1 rounded ${bwls.length > 2 ? 'bg-red-600' : 'bg-slate-200'}`}></motion.div>
                        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 }} className={`h-full flex-1 rounded ${bwls.length > 3 ? 'bg-red-600' : 'bg-slate-200'}`}></motion.div>
                        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4 }} className="h-full flex-1 bg-slate-200 rounded"></motion.div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter ml-2">Elite: 2 Pace, 1 Swing, 2 Spin</p>
                </motion.div>

                {/* Middle Order Strength */}
                <motion.div whileHover={{ y: -5 }} className="glass-card border border-slate-200 rounded-xl p-6 relative overflow-hidden group shadow-sm flex items-center justify-between">
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-red-600"></div>
                    <div className="pl-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Middle Order Strength</p>
                        <h4 className="text-3xl font-bold text-slate-800 mt-1">{ars.length * 40}</h4>
                        <div className="flex items-end gap-1 h-8 mt-2">
                            <motion.div initial={{ height: 0 }} animate={{ height: '60%' }} className="w-4 bg-red-200 rounded-t"></motion.div>
                            <motion.div initial={{ height: 0 }} animate={{ height: '40%' }} className="w-4 bg-red-300 rounded-t"></motion.div>
                            <motion.div initial={{ height: 0 }} animate={{ height: '80%' }} className="w-4 bg-red-400 rounded-t"></motion.div>
                            <motion.div initial={{ height: 0 }} animate={{ height: '95%' }} className="w-4 bg-red-600 rounded-t"></motion.div>
                            <motion.div initial={{ height: 0 }} animate={{ height: '70%' }} className="w-4 bg-red-500 rounded-t"></motion.div>
                        </div>
                    </div>
                    <button className="w-12 h-12 bg-red-600 text-white rounded-xl shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                        <span className="material-symbols-outlined text-xl">bolt</span>
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default PitchView;
