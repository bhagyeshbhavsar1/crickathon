import React from 'react';
import { motion } from 'framer-motion';

const AICoach = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 h-full overflow-y-auto pb-24 lg:pb-8"
        >
            {/* Verdict Section */}
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-red-600 pl-4 md:pl-8 py-4 bg-white/30 rounded-r-xl">
                <div>
                    <span className="font-label-red text-red-600 tracking-widest uppercase mb-1 block text-sm">Season Analysis Outlook</span>
                    <h1 className="font-display-xl text-3xl md:text-5xl text-on-surface uppercase italic">CHAMPION MATERIAL</h1>
                </div>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-2 rounded-full shadow-sm hover:bg-slate-50 transition-all group"
                >
                    <div className="w-5 h-5 border-2 border-transparent border-t-red-600 rounded-full animate-spin"></div>
                    <span className="font-label-red text-red-600 uppercase text-sm">Re-Analyze Pool</span>
                </motion.button>
            </section>

            {/* Bento Grid Tactical Breakdown */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Strengths */}
                <motion.div whileHover={{ y: -5 }} className="glass-card p-6 rounded-xl flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-red-600">
                        <span className="material-symbols-outlined">trending_up</span>
                        <h3 className="font-headline-md text-xl uppercase">Strengths</h3>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-red-50/50 rounded-lg border-l-2 border-red-600">
                            <span className="text-xs font-bold text-red-600">TOP 1</span>
                            <p className="text-sm font-medium text-on-surface">Explosive Powerplay Strike Rate (165.4)</p>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">Your opening pair dominates early overs. The middle-order transition is statistically superior to 85% of simulated rosters.</p>
                    </div>
                </motion.div>

                {/* Critical Flaws */}
                <motion.div whileHover={{ y: -5 }} className="glass-card p-6 rounded-xl flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-red-600">
                        <span className="material-symbols-outlined">warning</span>
                        <h3 className="font-headline-md text-xl uppercase">Critical Flaws</h3>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border-l-2 border-slate-400">
                            <span className="text-xs font-bold text-slate-600">ALERT</span>
                            <p className="text-sm font-medium text-on-surface">Death Over Economy (11.2 RPO)</p>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">High vulnerability in the final 4 overs. Lack of specialized yorker specialists might lead to 15-20 extra runs conceded.</p>
                    </div>
                </motion.div>

                {/* X-Factor */}
                <motion.div whileHover={{ y: -5 }} className="glass-card p-6 rounded-xl flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-red-600">
                        <span className="material-symbols-outlined">auto_awesome</span>
                        <h3 className="font-headline-md text-xl uppercase">X-Factor</h3>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-red-600 text-white rounded-lg">
                            <span className="text-xs font-bold">HIDDEN</span>
                            <p className="text-sm font-medium">Rashid Khan's Batting Upside</p>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">Simulations show a 22% increase in win probability when Rashid acts as a pinch hitter at Number 7 against leg-spinners.</p>
                    </div>
                </motion.div>
            </section>

            {/* Suggested Trade Box */}
            <section className="glass-card p-6 md:p-10 rounded-xl border-l-8 border-red-600 relative overflow-hidden group">
                <div className="absolute right-0 top-0 h-full w-1/2 md:w-1/3 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                    <img alt="Stadium" className="h-full w-full object-cover" src="/assets/stadium-bg.jpg" />
                </div>
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-red-600 text-3xl">swap_horizontal_circle</span>
                        <h2 className="font-headline-lg text-2xl md:text-3xl text-on-surface uppercase">Recommended Trade</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <p className="text-base text-slate-500">To fix the death bowling economy crisis, the AI recommends swapping an overseas specialist.</p>
                            
                            <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-slate-400">person</span>
                                    </div>
                                    <span className="text-xs font-bold text-red-600 mt-1 uppercase">Out</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-headline-md text-lg">D. Warner</h4>
                                    <p className="text-sm text-slate-500">₹12.5 Cr | Batter</p>
                                </div>
                                
                                <motion.span 
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="material-symbols-outlined text-slate-300"
                                >
                                    trending_flat
                                </motion.span>
                                
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white">person</span>
                                    </div>
                                    <span className="text-xs font-bold text-red-600 mt-1 uppercase">In</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-headline-md text-lg">M. Starc</h4>
                                    <p className="text-sm text-slate-500">₹10.5 Cr | Bowler</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col justify-center gap-4">
                            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-semibold text-red-600 uppercase">Projected Impact</span>
                                    <span className="text-sm font-bold text-red-600">+12% Win Chance</span>
                                </div>
                                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '78%' }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="bg-red-600 h-full"
                                    ></motion.div>
                                </div>
                            </div>
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-red-600 text-white py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-md"
                            >
                                Execute Swap
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ask the Coach Chat UI */}
            <section className="glass-card p-4 md:p-6 rounded-2xl shadow-xl border-slate-200">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 px-4 border-b border-slate-100 pb-3">
                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg relative">
                            <span className="material-symbols-outlined text-white">smart_toy</span>
                            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                            <h3 className="font-headline-md text-lg">Ask Strategy Coach</h3>
                            <p className="text-xs text-slate-400">AI-Powered Insights based on 10k simulations</p>
                        </div>
                    </div>
                    
                    <div className="px-4 py-2 flex flex-col gap-4">
                        <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 self-start max-w-[80%] border border-slate-100">
                            How should I balance the budget if I pick Virat Kohli as my captain?
                        </div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bg-red-50 p-4 rounded-xl text-sm text-red-900 self-end max-w-[80%] border border-red-100"
                        >
                            <p className="font-bold mb-1">AI Coach:</p>
                            If you pick Kohli (₹18.00 Cr), you'll need to find value in uncapped players for your middle order. I recommend scouting for all-rounders under ₹3.0 Cr to maintain balance.
                        </motion.div>
                    </div>
                    
                    <div className="relative flex items-center gap-2 mt-2">
                        <input className="w-full bg-white border border-slate-200 focus:ring-red-600 focus:border-red-600 rounded-full px-6 py-3 text-sm shadow-inner" placeholder="Ask about team balance, player stats, or match-ups..." type="text" />
                        <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute right-2 p-2 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-all"
                        >
                            <span className="material-symbols-outlined">send</span>
                        </motion.button>
                    </div>
                    
                    <div className="flex gap-2 px-4 pb-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <button className="text-xs font-bold border border-slate-200 px-4 py-1.5 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all">Best death bowlers?</button>
                        <button className="text-xs font-bold border border-slate-200 px-4 py-1.5 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all">Spin utility check</button>
                        <button className="text-xs font-bold border border-slate-200 px-4 py-1.5 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all">Budget picks under 2Cr</button>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default AICoach;
