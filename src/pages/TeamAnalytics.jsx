import React from 'react';
import { motion } from 'framer-motion';
import { useSquadStore } from '../store/useSquadStore';

const TeamAnalytics = () => {
    const { draftedPlayers, budget } = useSquadStore();

    // Calculate dynamic stats
    const totalInvestment = 100 - budget;
    const batsmanCount = draftedPlayers.filter(p => p.role === 'BAT' || p.role === 'WK').length;
    const bowlerCount = draftedPlayers.filter(p => p.role === 'BWL').length;
    const arCount = draftedPlayers.filter(p => p.role === 'AR').length;
    
    // Balance Index (mock calculation based on roles)
    const isBalanced = batsmanCount >= 3 && bowlerCount >= 3;
    const balanceScore = isBalanced ? 92 : (draftedPlayers.length > 0 ? 65 + draftedPlayers.length : 0);

    const batSpend = draftedPlayers.filter(p => p.role === 'BAT' || p.role === 'WK').reduce((acc, p) => acc + p.price, 0);
    const bwlSpend = draftedPlayers.filter(p => p.role === 'BWL').reduce((acc, p) => acc + p.price, 0);
    const arSpend = draftedPlayers.filter(p => p.role === 'AR').reduce((acc, p) => acc + p.price, 0);

    const totalSpend = batSpend + bwlSpend + arSpend || 1; // Prevent division by zero
    const batPercent = (batSpend / totalSpend) * 100;
    const bwlPercent = (bwlSpend / totalSpend) * 100;
    const arPercent = (arSpend / totalSpend) * 100;

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto h-full overflow-y-auto pb-24 lg:pb-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <div>
                    <h2 className="font-display-xl text-3xl md:text-4xl text-on-surface">Team Analytics</h2>
                    <p className="font-body-lg text-slate-500 mt-2">Comprehensive performance and financial breakdown of your drafted squad.</p>
                </div>
                <div className="flex gap-4">
                    <button className="glass-card px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2 hover:bg-slate-50 transition-colors">
                        <span className="material-symbols-outlined text-sm">download</span>
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-600">Export PDF</span>
                    </button>
                    <button className="bg-slate-900 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-red-600 transition-colors shadow-md">
                        <span className="material-symbols-outlined text-sm">share</span>
                        <span className="text-xs font-bold uppercase tracking-widest">Share Report</span>
                    </button>
                </div>
            </div>

            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Balance Index */}
                <motion.div whileHover={{ y: -5 }} className="glass-card p-6 rounded-2xl border border-slate-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-red-200 transition-colors"></div>
                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-red-600 bg-red-50 p-2 rounded-lg">balance</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Squad Balance</span>
                        </div>
                        <div>
                            <span className="text-4xl font-display-lg text-slate-800">{balanceScore}</span>
                            <span className="text-sm font-medium text-slate-400 ml-2">/ 100</span>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${isBalanced ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                {isBalanced ? 'Optimal' : 'Needs Balance'}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded uppercase">{draftedPlayers.length} Drafted</span>
                        </div>
                    </div>
                </motion.div>

                {/* Financial Summary */}
                <motion.div whileHover={{ y: -5 }} className="glass-card p-6 rounded-2xl border border-slate-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-200 transition-colors"></div>
                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-blue-600 bg-blue-50 p-2 rounded-lg">account_balance</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Total Spent</span>
                        </div>
                        <div>
                            <span className="text-4xl font-display-lg text-slate-800">₹{totalInvestment.toFixed(2)}</span>
                            <span className="text-sm font-medium text-slate-400 ml-2">Cr</span>
                        </div>
                        <div className="mt-4 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                            <motion.div initial={{ width: 0 }} animate={{ width: `${totalInvestment}%` }} className="h-full bg-blue-600"></motion.div>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">Remaining: ₹{budget.toFixed(2)} Cr</p>
                    </div>
                </motion.div>

                {/* Key Roles */}
                <motion.div whileHover={{ y: -5 }} className="glass-card p-6 rounded-2xl border border-slate-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-amber-200 transition-colors"></div>
                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-amber-600 bg-amber-50 p-2 rounded-lg">groups</span>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Role Distribution</span>
                        </div>
                        <div className="flex justify-between items-end mt-2">
                            <div className="text-center">
                                <span className="text-2xl font-bold text-slate-800">{batsmanCount}</span>
                                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">BAT</p>
                            </div>
                            <div className="w-px h-8 bg-slate-200"></div>
                            <div className="text-center">
                                <span className="text-2xl font-bold text-slate-800">{bowlerCount}</span>
                                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">BWL</p>
                            </div>
                            <div className="w-px h-8 bg-slate-200"></div>
                            <div className="text-center">
                                <span className="text-2xl font-bold text-slate-800">{arCount}</span>
                                <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">AR</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Main Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Role Allocation Donut (Simulated with CSS) */}
                <div className="glass-card p-6 rounded-2xl border border-slate-200 flex flex-col">
                    <h3 className="font-headline-md text-sm uppercase tracking-widest mb-6">Investment by Role</h3>
                    <div className="flex-1 flex items-center justify-center gap-8">
                        <div className="relative w-40 h-40">
                            {/* SVG Donut Chart Mock */}
                            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E2E8F0" strokeWidth="20" />
                                {totalSpend > 0 && (
                                    <>
                                        <motion.circle initial={{ strokeDasharray: "0 251" }} animate={{ strokeDasharray: `${batPercent * 2.51} 251` }} cx="50" cy="50" r="40" fill="transparent" stroke="#DC2626" strokeWidth="20" />
                                        <motion.circle initial={{ strokeDasharray: "0 251" }} animate={{ strokeDasharray: `${bwlPercent * 2.51} 251` }} cx="50" cy="50" r="40" fill="transparent" stroke="#2563EB" strokeWidth="20" strokeDashoffset={`-${batPercent * 2.51}`} />
                                        <motion.circle initial={{ strokeDasharray: "0 251" }} animate={{ strokeDasharray: `${arPercent * 2.51} 251` }} cx="50" cy="50" r="40" fill="transparent" stroke="#D97706" strokeWidth="20" strokeDashoffset={`-${(batPercent + bwlPercent) * 2.51}`} />
                                    </>
                                )}
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-xl font-bold text-slate-800">{draftedPlayers.length}</span>
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Players</span>
                            </div>
                        </div>
                        
                        <div className="space-y-4 flex-1">
                            <div>
                                <div className="flex justify-between text-xs font-bold uppercase mb-1 text-slate-600">
                                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-600"></span> Batsmen</span>
                                    <span>₹{batSpend.toFixed(2)} Cr</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full"><div style={{ width: `${batPercent}%` }} className="h-full bg-red-600 rounded-full transition-all"></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold uppercase mb-1 text-slate-600">
                                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-600"></span> Bowlers</span>
                                    <span>₹{bwlSpend.toFixed(2)} Cr</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full"><div style={{ width: `${bwlPercent}%` }} className="h-full bg-blue-600 rounded-full transition-all"></div></div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold uppercase mb-1 text-slate-600">
                                    <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-600"></span> All-Rounders</span>
                                    <span>₹{arSpend.toFixed(2)} Cr</span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-100 rounded-full"><div style={{ width: `${arPercent}%` }} className="h-full bg-amber-600 rounded-full transition-all"></div></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Performance Projection (Bar Chart) */}
                <div className="glass-card p-6 rounded-2xl border border-slate-200 flex flex-col">
                    <h3 className="font-headline-md text-sm uppercase tracking-widest mb-6">Phase-wise Performance Projection</h3>
                    <div className="flex-1 flex items-end justify-between gap-2 md:gap-4 mt-8 pb-4 border-b border-slate-200 relative">
                        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[8px] font-bold text-slate-300 pr-2 pb-4">
                            <span>100</span>
                            <span>50</span>
                            <span>0</span>
                        </div>
                        
                        <div className="ml-6 flex-1 flex flex-col items-center gap-2 group">
                            <motion.div initial={{ height: 0 }} animate={{ height: `${draftedPlayers.length > 0 ? 60 + batsmanCount * 5 : 0}%` }} className="w-full bg-red-500 rounded-t hover:bg-red-600 transition-colors relative">
                            </motion.div>
                            <span className="text-[9px] font-bold uppercase text-slate-400">Powerplay</span>
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center gap-2 group">
                            <motion.div initial={{ height: 0 }} animate={{ height: `${draftedPlayers.length > 0 ? 50 + arCount * 10 : 0}%` }} className="w-full bg-slate-800 rounded-t hover:bg-slate-900 transition-colors relative">
                            </motion.div>
                            <span className="text-[9px] font-bold uppercase text-slate-400 text-center">Middle Overs</span>
                        </div>
                        
                        <div className="flex-1 flex flex-col items-center gap-2 group">
                            <motion.div initial={{ height: 0 }} animate={{ height: `${draftedPlayers.length > 0 ? 40 + bowlerCount * 10 : 0}%` }} className="w-full bg-slate-300 rounded-t hover:bg-slate-400 transition-colors relative">
                            </motion.div>
                            <span className="text-[9px] font-bold uppercase text-slate-400">Death</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Financial Audit Table */}
            <div className="glass-card border border-slate-200 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-white/50">
                    <div>
                        <h3 className="font-headline-md text-lg text-slate-800">Drafted Players</h3>
                        <p className="text-xs text-slate-500 font-medium">Real-time expenditure tracking</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200">Player</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200">Role</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200">Team</th>
                                <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200 text-right">Investment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {draftedPlayers.map(player => (
                                <tr key={`audit-${player.id}`} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={player.image} alt={player.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                                            <span className="font-bold text-sm text-slate-800 uppercase">{player.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-[10px] font-bold px-2 py-1 bg-slate-100 text-slate-600 rounded uppercase tracking-wider">{player.role}</span>
                                    </td>
                                    <td className="p-4 font-bold text-slate-500 text-sm">{player.team}</td>
                                    <td className="p-4 text-right font-mono font-bold text-primary">₹{player.price.toFixed(2)} Cr</td>
                                </tr>
                            ))}
                            {draftedPlayers.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-slate-400 text-sm font-medium">No players drafted yet. Drag players into the pitch view to see analytics.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeamAnalytics;
