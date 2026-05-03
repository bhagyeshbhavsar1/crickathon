import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import playersData from '../data/players.json';

const PlayerCard = ({ player }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const roleColors = {
        'Batter': 'border-blue-500/50 text-blue-400',
        'Bowler': 'border-red-500/50 text-red-400',
        'All-rounder': 'border-green-500/50 text-green-400',
        'Wicket-keeper': 'border-purple-500/50 text-purple-400'
    };

    const roleColor = roleColors[player.role] || 'border-slate-500/50 text-slate-400';
    const bgColor = 'bg-slate-900/60';

    return (
        <motion.div 
            layout
            className={`glass-card rounded-2xl overflow-hidden border border-slate-700 shadow-xl ${bgColor} backdrop-blur-md relative group`}
        >
            <div className={`absolute top-0 left-0 w-1 h-full border-l-4 ${roleColor}`}></div>
            
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-800 border-2 border-slate-700 shrink-0">
                            <img src={player.image} alt={player.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                        </div>
                        <div>
                            <h3 className="text-white font-headline-md text-lg uppercase tracking-wider">{player.name}</h3>
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${roleColor}`}>{player.role} | {player.team}</span>
                        </div>
                    </div>
                    <div className="text-right shrink-0">
                        <p className="text-red-500 font-bold text-xl">₹{player.price.toFixed(2)}</p>
                        <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Crores</p>
                    </div>
                </div>

                <div className="flex gap-2 items-center mb-4">
                    <div className="flex gap-1">
                        {Array.from({ length: player.stars || Math.floor(player.rating / 20) }).map((_, i) => (
                            <span key={i} className="material-symbols-outlined text-[14px] text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        ))}
                    </div>
                    <span className="text-slate-500 text-xs font-mono bg-slate-800 px-2 py-0.5 rounded">RATING {player.rating}</span>
                </div>

                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 border border-slate-700"
                >
                    {isExpanded ? 'Hide Details' : 'View Deep-Dive Data'}
                    <span className="material-symbols-outlined text-sm">{isExpanded ? 'expand_less' : 'expand_more'}</span>
                </button>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 mt-4 border-t border-slate-700 space-y-4">
                                <div>
                                    <h4 className="text-[10px] text-slate-500 uppercase font-bold mb-1 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">info</span> Status 2026</h4>
                                    <p className="text-slate-300 text-xs leading-relaxed italic border-l-2 border-slate-600 pl-2">{player.background}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-xl">
                                        <h4 className="text-[10px] text-green-400 uppercase font-bold mb-2 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">bolt</span> Strengths</h4>
                                        <ul className="text-slate-300 text-[11px] space-y-1 list-disc pl-4">
                                            {player.strengths?.map((s, i) => <li key={i}>{s}</li>)}
                                        </ul>
                                    </div>
                                    <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                                        <h4 className="text-[10px] text-red-400 uppercase font-bold mb-2 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">warning</span> Weaknesses</h4>
                                        <ul className="text-slate-300 text-[11px] space-y-1 list-disc pl-4">
                                            {player.weaknesses?.map((w, i) => <li key={i}>{w}</li>)}
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                                    <h4 className="text-[10px] text-slate-400 uppercase font-bold mb-2">Tactical Summary</h4>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-2 text-[11px]">
                                            <span className="bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider shrink-0 h-fit">PRO</span>
                                            <span className="text-slate-300">{player.prosCons?.pro}</span>
                                        </div>
                                        <div className="flex gap-2 text-[11px]">
                                            <span className="bg-red-500/20 text-red-400 font-bold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider shrink-0 h-fit">CON</span>
                                            <span className="text-slate-300">{player.prosCons?.con}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const PlayersLibrary = () => {
    const [teamFilter, setTeamFilter] = useState('All');
    const [roleFilter, setRoleFilter] = useState('All');
    const [priceSort, setPriceSort] = useState('desc'); // 'asc' or 'desc'

    // Filter and Sort Data
    const filteredPlayers = playersData
        .filter(p => (teamFilter === 'All' || p.team === teamFilter))
        .filter(p => (roleFilter === 'All' || p.role === roleFilter))
        .sort((a, b) => priceSort === 'desc' ? b.price - a.price : a.price - b.price);

    const teams = ['All', ...new Set(playersData.map(p => p.team))];
    const roles = ['All', 'Batter', 'Bowler', 'All-rounder', 'Wicket-keeper'];

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto h-full overflow-y-auto pb-24 lg:pb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div>
                    <h2 className="font-display-xl text-3xl md:text-5xl text-on-surface">Players Library</h2>
                    <p className="font-body-lg text-slate-500 mt-2">Deep-dive analytics and tactical scouting reports for IPL 2026.</p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="glass-card p-4 rounded-xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Franchise</label>
                    <select 
                        value={teamFilter} 
                        onChange={(e) => setTeamFilter(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-sm rounded-lg p-2.5 text-slate-700 outline-none focus:border-red-500 transition-colors"
                    >
                        {teams.map(team => <option key={team} value={team}>{team === 'All' ? 'All Franchises' : team}</option>)}
                    </select>
                </div>
                <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Role</label>
                    <select 
                        value={roleFilter} 
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-sm rounded-lg p-2.5 text-slate-700 outline-none focus:border-red-500 transition-colors"
                    >
                        {roles.map(role => <option key={role} value={role}>{role === 'All' ? 'All Roles' : role}</option>)}
                    </select>
                </div>
                <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block">Sort By Price</label>
                    <select 
                        value={priceSort} 
                        onChange={(e) => setPriceSort(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-sm rounded-lg p-2.5 text-slate-700 outline-none focus:border-red-500 transition-colors"
                    >
                        <option value="desc">Highest to Lowest</option>
                        <option value="asc">Lowest to Highest</option>
                    </select>
                </div>
                <div className="flex items-end">
                    <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg px-4 py-2.5 h-[42px] flex items-center justify-center font-bold text-sm">
                        {filteredPlayers.length} Results
                    </div>
                </div>
            </div>

            {/* Players Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                    {filteredPlayers.map(player => (
                        <PlayerCard key={player.id} player={player} />
                    ))}
                </AnimatePresence>
                
                {filteredPlayers.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-400">
                        <span className="material-symbols-outlined text-4xl mb-2 opacity-50">search_off</span>
                        <p>No players found matching these criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlayersLibrary;
