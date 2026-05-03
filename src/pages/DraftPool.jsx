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

    return (
        <motion.div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            whileHover={{ scale: 1.02 }}
            className={`glass-card p-4 rounded-xl cursor-grab active:cursor-grabbing transition-shadow ${isDragging ? 'opacity-50' : 'opacity-100 hover:opacity-100'}`}
        >
            <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{player.role}</span>
                <span className="text-primary font-label-red">₹{player.price.toFixed(2)} Cr</span>
            </div>
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden border-l-4 border-primary">
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

    return (
        <motion.section 
            ref={setNodeRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`col-span-1 md:col-span-6 h-full min-h-[500px] relative pitch-grid border-2 rounded-3xl overflow-hidden bg-white/40 shadow-inner transition-colors ${isOver ? 'border-red-400 bg-red-50/20' : 'border-slate-200'}`}
        >
            <div className="absolute inset-0 scanline"></div>
            
            {/* Render Drafted Players in a grid or flex */}
            <div className="absolute inset-0 p-8 flex flex-wrap content-start gap-4 z-10 overflow-y-auto scrollbar-hide">
                {draftedPlayers.length === 0 && (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
                        <span className="material-symbols-outlined text-6xl mb-4">sports_cricket</span>
                        <p className="font-bold uppercase tracking-widest text-sm">Drag Players Here</p>
                    </div>
                )}
                {draftedPlayers.map(player => (
                    <motion.div 
                        key={`drafted-${player.id}`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 md:w-24 bg-white rounded-xl shadow-lg border border-primary flex flex-col items-center p-2 relative"
                    >
                        <button 
                            onClick={() => removePlayer(player.id)}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-[10px] hover:bg-red-700 hover:scale-110 transition-transform z-20"
                        >
                            ×
                        </button>
                        <img alt={player.name} className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-primary-container mb-2" src={player.image} />
                        <span className="text-[8px] md:text-[9px] font-black uppercase text-center leading-tight truncate w-full">{player.name}</span>
                        <span className="text-[9px] md:text-[10px] font-label-red text-primary mt-auto">₹{player.price.toFixed(1)} Cr</span>
                    </motion.div>
                ))}
            </div>

            {/* Pitch Overlay Stats */}
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center gap-2 md:gap-4 z-20">
                <div className="glass-card px-3 md:px-4 py-2 rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] md:text-xs font-bold uppercase">Synergy: {draftedPlayers.length > 0 ? (80 + draftedPlayers.length).toFixed(0) : 0}%</span>
                </div>
                <div className="glass-card px-3 md:px-4 py-2 rounded-full flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs text-primary">analytics</span>
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
                            <option value="BAT">Batsman</option>
                            <option value="BWL">Bowler</option>
                            <option value="AR">All-Rounder</option>
                            <option value="WK">Keeper</option>
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

                {/* Pitch View (Main Content) Drop Zone */}
                <DroppablePitch draftedPlayers={draftedPlayers} removePlayer={removePlayer} />

                {/* Analytics & AI (Right Panel) */}
                <motion.section 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="col-span-1 md:col-span-3 h-full flex flex-col gap-6"
                >
                    {/* Radar Chart Analysis */}
                    <div className="glass-card p-6 rounded-3xl flex-1 flex flex-col">
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
