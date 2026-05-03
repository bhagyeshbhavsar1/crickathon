import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DndContext, useDraggable, useDroppable, DragOverlay } from '@dnd-kit/core';
import { useSquadStore } from '../store/useSquadStore';

// Draggable Player Card Component
const DraggablePlayer = ({ player }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: player.id,
        data: player
    });

    const roleColors = {
        'Batter': 'border-l-blue-500 text-blue-600',
        'Bowler': 'border-l-red-500 text-red-600',
        'All-rounder': 'border-l-green-500 text-green-600',
        'Wicket-keeper': 'border-l-purple-500 text-purple-600'
    };

    const roleColor = roleColors[player.role] || 'border-l-primary text-primary';

    return (
        <motion.div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            whileHover={{ scale: 1.02 }}
            className={`glass-card p-4 rounded-xl cursor-grab active:cursor-grabbing transition-shadow border-l-4 ${roleColor.split(' ')[0]} ${isDragging ? 'opacity-50' : 'opacity-100 hover:opacity-100'}`}
        >
            <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${roleColor.split(' ')[1]}`}>{player.role}</span>
                <span className="text-slate-700 font-label-red">₹{player.price.toFixed(2)} Cr</span>
            </div>
            <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-slate-100 rounded-lg overflow-hidden border-2 ${roleColor.split(' ')[0]}`}>
                    <img alt={player.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" src={player.image} />
                </div>
                <div>
                    <h4 className="font-bold text-sm uppercase">{player.name}</h4>
                    <div className="flex gap-1 mt-1">
                        {Array.from({ length: player.stars }).map((_, i) => (
                            <span key={i} className="material-symbols-outlined text-[12px] text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Droppable Pitch Area Component
const DroppablePitch = ({ draftedPlayers, removePlayer }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: 'pitch-dropzone',
    });

    const wk = draftedPlayers.filter(p => p.role === 'Wicket-keeper');
    const bats = draftedPlayers.filter(p => p.role === 'Batter');
    const ars = draftedPlayers.filter(p => p.role === 'All-rounder');
    const bwls = draftedPlayers.filter(p => p.role === 'Bowler');

    const renderSlot = (player, defaultRole) => {
        if (!player) {
            return (
                <div className="w-16 md:w-20 lg:w-24 text-center opacity-70">
                    <div className="w-12 h-12 md:w-16 md:h-16 mx-auto rounded-xl bg-white/10 backdrop-blur-md border-2 border-dashed border-white/50 mb-2 flex items-center justify-center transition-all">
                        <span className="material-symbols-outlined text-white/50">add</span>
                    </div>
                    <span className="bg-white/20 backdrop-blur-md text-white shadow-lg text-[8px] md:text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">{defaultRole}</span>
                </div>
            );
        }

        return (
            <motion.div 
                key={`drafted-${player.id}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-16 md:w-20 lg:w-24 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border-2 border-red-500 flex flex-col items-center p-2 relative"
            >
                <button 
                    onClick={() => removePlayer(player.id)}
                    className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] hover:bg-red-600 hover:scale-110 transition-transform z-20 shadow-md"
                >
                    ×
                </button>
                <img alt={player.name} className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full object-cover border-2 border-slate-200 mb-1 shadow-inner" src={player.image} />
                <span className="text-[7px] md:text-[9px] font-black uppercase text-center leading-tight truncate w-full">{player.name}</span>
                <span className="text-[8px] md:text-[10px] font-bold text-red-600 mt-auto">₹{player.price.toFixed(1)} Cr</span>
            </motion.div>
        );
    };

    return (
        <motion.section 
            ref={setNodeRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`w-full h-[400px] md:h-[480px] relative pitch-grid border-4 rounded-3xl overflow-hidden shadow-2xl transition-all flex-shrink-0 ${isOver ? 'border-red-400 scale-[1.01]' : 'border-slate-800'}`}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img src="/assets/stadium-bg.jpg" className="w-full h-full object-cover opacity-90" alt="stadium" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90"></div>
                {/* Field markings overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-[50%] h-[90%] border-[3px] border-white rounded-full flex items-center justify-center">
                        <div className="w-full h-24 border-t-[3px] border-b-[3px] border-white"></div>
                    </div>
                </div>
            </div>
            
            {/* Render Drafted Players in 1-3-2-4 Grid */}
            <div className="absolute inset-0 p-2 md:p-6 flex flex-col justify-between z-10 overflow-y-auto scrollbar-hide py-6 md:py-8">
                {/* Wicket Keeper */}
                <div className="flex justify-center w-full">
                    {renderSlot(wk[0], 'WK')}
                </div>

                {/* Batsmen */}
                <div className="flex justify-around w-full mt-2 px-4 md:px-12">
                    {renderSlot(bats[0], 'BAT')}
                    {renderSlot(bats[1], 'BAT')}
                    {renderSlot(bats[2], 'BAT')}
                </div>

                {/* All Rounders */}
                <div className="flex justify-evenly w-full mt-2 px-12 md:px-32">
                    {renderSlot(ars[0], 'AR')}
                    {renderSlot(ars[1], 'AR')}
                    {renderSlot(ars[2], 'AR')}
                </div>

                {/* Bowlers */}
                <div className="flex justify-between w-full mt-2 pb-6 md:pb-8">
                    {renderSlot(bwls[0], 'BWL')}
                    {renderSlot(bwls[1], 'BWL')}
                    {renderSlot(bwls[2], 'BWL')}
                    {renderSlot(bwls[3], 'BWL')}
                </div>
            </div>

            {/* Pitch Overlay Stats */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center gap-2 md:gap-4 z-20">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 md:px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,1)]"></span>
                    <span className="text-[10px] md:text-xs font-bold uppercase">Synergy: {draftedPlayers.length > 0 ? (80 + draftedPlayers.length).toFixed(0) : 0}%</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 md:px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <span className="material-symbols-outlined text-xs text-red-400">analytics</span>
                    <span className="text-[10px] md:text-xs font-bold uppercase">Balance Index: {draftedPlayers.length > 0 ? (draftedPlayers.reduce((acc, p) => acc + p.rating, 0) / draftedPlayers.length / 10).toFixed(1) : '0.0'}</span>
                </div>
            </div>
        </motion.section>
    );
};


const DraftPool = () => {
    const { draftedPlayers, draftPlayer, removePlayer, getFilteredPlayers, setTeamFilter, setRoleFilter, teamFilter, roleFilter } = useSquadStore();
    const filteredPlayers = getFilteredPlayers();

    const [activeDragPlayer, setActiveDragPlayer] = useState(null);

    const handleDragStart = (event) => {
        const { active } = event;
        setActiveDragPlayer(active.data.current);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveDragPlayer(null);

        if (over && over.id === 'pitch-dropzone') {
            draftPlayer(active.id);
        }
    };

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="p-4 md:p-8 h-full grid grid-cols-1 md:grid-cols-12 gap-8 overflow-y-auto">
                {/* Player Pool (Left Panel) */}
                <section className="col-span-1 md:col-span-3 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-headline-md text-lg text-primary">DRAFT POOL</h2>
                        <span className="bg-slate-200 text-xs px-2 py-1 rounded font-bold">{filteredPlayers.length} Players</span>
                    </div>

                    {/* Filter Controls */}
                    <div className="flex gap-2 mb-2">
                        <select 
                            value={teamFilter} 
                            onChange={(e) => setTeamFilter(e.target.value)}
                            className="bg-white border border-slate-200 text-xs rounded p-2 text-slate-600 outline-none flex-1"
                        >
                            <option value="All">All Teams</option>
                            <option value="CSK">CSK</option>
                            <option value="MI">MI</option>
                            <option value="RCB">RCB</option>
                            <option value="DC">DC</option>
                            <option value="GT">GT</option>
                            <option value="KKR">KKR</option>
                            <option value="PBKS">PBKS</option>
                        </select>
                        <select 
                            value={roleFilter} 
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="bg-white border border-slate-200 text-xs rounded p-2 text-slate-600 outline-none flex-1"
                        >
                            <option value="All">All Roles</option>
                            <option value="Batter">Batter</option>
                            <option value="Bowler">Bowler</option>
                            <option value="All-rounder">All-rounder</option>
                            <option value="Wicket-keeper">Wicket-keeper</option>
                        </select>
                    </div>

                    <div className="flex-1 space-y-3 overflow-y-auto pr-2 pb-24 scrollbar-hide">
                        {filteredPlayers.map(player => (
                            <DraggablePlayer key={player.id} player={player} />
                        ))}
                        {filteredPlayers.length === 0 && (
                            <p className="text-center text-slate-400 text-sm mt-8">No players match the filters.</p>
                        )}
                    </div>
                </section>

                {/* Right Panel: Pitch and Analytics Below */}
                <div className="col-span-1 md:col-span-9 flex flex-col gap-8 h-full">
                    {/* Pitch View (Main Content) Drop Zone */}
                    <DroppablePitch draftedPlayers={draftedPlayers} removePlayer={removePlayer} />

                    {/* Analytics & AI (Below Pitch) */}
                    <motion.section 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 shrink-0 pb-8"
                    >
                        {/* Radar Chart Analysis */}
                        <div className="glass-card p-6 rounded-3xl h-64 flex flex-col">
                        <h3 className="font-headline-md text-sm uppercase tracking-widest mb-6">Team Radar</h3>
                        <div className="flex-1 relative flex items-center justify-center">
                            <svg className="w-full h-full max-w-[200px]" viewBox="0 0 200 200">
                                <circle cx="100" cy="100" fill="none" r="80" stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1"></circle>
                                <circle cx="100" cy="100" fill="none" r="60" stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1"></circle>
                                <circle cx="100" cy="100" fill="none" r="40" stroke="#E2E8F0" strokeDasharray="4 4" strokeWidth="1"></circle>
                                <line stroke="#E2E8F0" strokeWidth="1" x1="100" x2="100" y1="20" y2="180"></line>
                                <line stroke="#E2E8F0" strokeWidth="1" x1="20" x2="180" y1="100" y2="100"></line>
                                <motion.polygon 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1 }}
                                    fill="rgba(220, 38, 38, 0.4)" 
                                    points="100,40 160,100 130,160 70,160 40,100" 
                                    stroke="#DC2626" 
                                    strokeWidth="2"
                                />
                            </svg>
                            <span className="absolute top-0 text-[8px] font-bold text-slate-400 uppercase">Power</span>
                            <span className="absolute right-0 text-[8px] font-bold text-slate-400 uppercase">Spin</span>
                            <span className="absolute bottom-0 text-[8px] font-bold text-slate-400 uppercase">Death</span>
                            <span className="absolute left-0 text-[8px] font-bold text-slate-400 uppercase">Strike Rate</span>
                        </div>
                    </div>

                    {/* AI Coach Terminal */}
                    <div className="glass-card p-6 rounded-3xl h-64 flex flex-col bg-slate-900 overflow-hidden relative group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-white to-red-500"></div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-red-500 text-sm">smart_toy</span>
                            <h3 className="text-white text-xs font-bold uppercase tracking-widest">AI Coach Terminal</h3>
                            <span className="ml-auto flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                <span className="text-[10px] text-red-500 font-mono">THINKING</span>
                            </span>
                        </div>
                        <div className="flex-1 font-mono text-[11px] text-slate-400 space-y-2 overflow-y-auto">
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-red-400">&gt; Analyzing budget efficiency...</motion.p>
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>&gt; Squad synergy currently at {draftedPlayers.length > 0 ? (80 + draftedPlayers.length) : 0}%.</motion.p>
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="text-white">&gt; RECOMMENDATION: Ensure balanced squad roles.</motion.p>
                            <p className="animate-pulse">_</p>
                        </div>
                    </div>
                </motion.section>
                </div>

                {/* Drag Overlay for smooth dragging aesthetics */}
                <DragOverlay>
                    {activeDragPlayer ? (
                        <div className="glass-card p-4 rounded-xl shadow-2xl opacity-90 scale-105 border-red-400 w-[300px]">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden border-l-4 border-red-600">
                                    <img alt={activeDragPlayer.name} className="w-full h-full object-cover" src={activeDragPlayer.image} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm uppercase text-slate-800">{activeDragPlayer.name}</h4>
                                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">{activeDragPlayer.role}</span>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </DragOverlay>
            </div>
        </DndContext>
    );
};

export default DraftPool;
