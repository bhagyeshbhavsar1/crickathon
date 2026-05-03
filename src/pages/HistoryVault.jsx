import React from 'react';
import { motion } from 'framer-motion';

const HistoryVault = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 md:p-8 max-w-7xl mx-auto h-full overflow-y-auto pb-24 lg:pb-8"
        >
            <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="font-display-xl text-3xl md:text-5xl text-on-background mb-1">THE VAULT</h1>
                    <div className="flex items-center gap-2 text-slate-500">
                        <span className="material-symbols-outlined text-sm">cloud_done</span>
                        <p className="font-utility-sm text-xs uppercase tracking-widest">History fetched from Server</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="glass-card px-4 py-2 rounded-xl font-label-red text-sm flex items-center gap-1 hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined text-sm">filter_list</span> Filter
                    </button>
                    <button className="glass-card px-4 py-2 rounded-xl font-label-red text-sm flex items-center gap-1 hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined text-sm">sort</span> Date
                    </button>
                </div>
            </header>

            {/* Squad History Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                
                {/* Squad Card 1 */}
                <motion.div whileHover={{ y: -5 }} className="glass-card rounded-xl overflow-hidden flex flex-col group transition-all cursor-pointer">
                    <div className="relative h-40 bg-slate-100 flex items-center justify-center overflow-hidden">
                        <img alt="Stadium Field" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500" src="/assets/history-1.jpg" />
                        <div className="relative z-10 w-32 h-20 bg-white/80 backdrop-blur-md rounded-lg border border-slate-200 p-2 grid grid-cols-4 grid-rows-3 gap-1">
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div>
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div>
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto col-start-2"></div><div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div>
                        </div>
                        <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold">LATEST</div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-headline-md text-lg text-on-surface">Finals Qualifier 1</h3>
                                <p className="text-slate-500 text-xs">Saved: 24 Oct, 2024</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-red-600 text-sm">88% Synergy</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">ELITE GRADE</p>
                            </div>
                        </div>
                        <div className="space-y-2 mb-6">
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-red-600 h-full w-[94%]"></div>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500 font-medium">Cost: ₹94.5 Cr</span>
                                <span className="text-red-600 font-bold">₹5.5 Cr Remaining</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-auto">
                            <div className="flex gap-4">
                                <button className="material-symbols-outlined text-slate-400 hover:text-red-600 transition-colors text-sm">share</button>
                                <button className="material-symbols-outlined text-slate-400 hover:text-red-600 transition-colors text-sm">delete</button>
                            </div>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1 active:scale-95 duration-150 hover:bg-red-700">
                                <span className="material-symbols-outlined text-sm">open_in_new</span> LOAD SQUAD
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Squad Card 2 */}
                <motion.div whileHover={{ y: -5 }} className="glass-card rounded-xl overflow-hidden flex flex-col group transition-all cursor-pointer">
                    <div className="relative h-40 bg-slate-100 flex items-center justify-center overflow-hidden">
                        <img alt="Arena View" className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500" src="/assets/history-2.jpg" />
                        <div className="relative z-10 w-32 h-20 bg-white/80 backdrop-blur-md rounded-lg border border-slate-200 p-2 grid grid-cols-4 grid-rows-3 gap-1">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div>
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div>
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mx-auto col-start-2"></div><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mx-auto"></div>
                        </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-headline-md text-lg text-on-surface">Budget Simulation B</h3>
                                <p className="text-slate-500 text-xs">Saved: 18 Oct, 2024</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-red-600 text-sm">74% Synergy</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">BALANCED</p>
                            </div>
                        </div>
                        <div className="space-y-2 mb-6">
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-red-600 h-full w-[78%]"></div>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500 font-medium">Cost: ₹78.2 Cr</span>
                                <span className="text-red-600 font-bold">₹21.8 Cr Remaining</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-auto">
                            <div className="flex gap-4">
                                <button className="material-symbols-outlined text-slate-400 hover:text-red-600 transition-colors text-sm">share</button>
                                <button className="material-symbols-outlined text-slate-400 hover:text-red-600 transition-colors text-sm">delete</button>
                            </div>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1 active:scale-95 duration-150 hover:bg-red-700">
                                <span className="material-symbols-outlined text-sm">open_in_new</span> LOAD SQUAD
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Squad Card 3 */}
                <motion.div whileHover={{ y: -5 }} className="glass-card rounded-xl overflow-hidden flex flex-col group transition-all cursor-pointer">
                    <div className="relative h-40 bg-slate-100 flex items-center justify-center overflow-hidden">
                        <img alt="Pitch Grass" className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500" src="/assets/history-3.jpg" />
                        <div className="relative z-10 w-32 h-20 bg-white/80 backdrop-blur-md rounded-lg border border-slate-200 p-2 grid grid-cols-4 grid-rows-3 gap-1">
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div>
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-slate-400 rounded-full mx-auto"></div>
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto col-start-2"></div><div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div><div className="w-1.5 h-1.5 bg-red-600 rounded-full mx-auto"></div>
                        </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-headline-md text-lg text-on-surface">Experimental Bowlers</h3>
                                <p className="text-slate-500 text-xs">Saved: 12 Oct, 2024</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-red-600 text-sm">62% Synergy</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">MID-RANGE</p>
                            </div>
                        </div>
                        <div className="space-y-2 mb-6">
                            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-red-600 h-full w-[99%]"></div>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-slate-500 font-medium">Cost: ₹99.8 Cr</span>
                                <span className="text-red-600 font-bold">₹0.2 Cr Remaining</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-auto">
                            <div className="flex gap-4">
                                <button className="material-symbols-outlined text-slate-400 hover:text-red-600 transition-colors text-sm">share</button>
                                <button className="material-symbols-outlined text-slate-400 hover:text-red-600 transition-colors text-sm">delete</button>
                            </div>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1 active:scale-95 duration-150 hover:bg-red-700">
                                <span className="material-symbols-outlined text-sm">open_in_new</span> LOAD SQUAD
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Stats Bar (Bento Detail) */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                    <p className="text-slate-500 text-xs mb-1 uppercase tracking-tight font-bold">Total Simulations</p>
                    <p className="font-display-xl text-3xl text-on-surface">14</p>
                </div>
                <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                    <p className="text-slate-500 text-xs mb-1 uppercase tracking-tight font-bold">Avg Synergy</p>
                    <p className="font-display-xl text-3xl text-red-600">82%</p>
                </div>
                <div className="glass-card p-6 rounded-xl hover:shadow-lg transition-shadow">
                    <p className="text-slate-500 text-xs mb-1 uppercase tracking-tight font-bold">Most Picked Captain</p>
                    <p className="font-headline-md text-xl text-on-surface">Virat Kohli</p>
                </div>
                <div className="glass-card p-6 rounded-xl bg-red-50/50 border-red-100 hover:shadow-lg transition-shadow">
                    <p className="text-red-600 text-xs mb-1 uppercase tracking-tight font-bold">Vault Status</p>
                    <p className="font-headline-md text-xl text-red-600 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> 
                        Sync Active
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default HistoryVault;
