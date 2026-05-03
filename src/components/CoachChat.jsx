import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useSquadStore } from '../store/useSquadStore';

const CoachChat = () => {
    const { draftedPlayers, availablePlayers, budget, removePlayer, draftPlayer } = useSquadStore();
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const critiqueTeam = async () => {
        setIsLoading(true);
        setError(null);
        setResponse(null);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) throw new Error("Gemini API Key missing! Set VITE_GEMINI_API_KEY in .env.local");

            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ 
                model: "gemini-3-flash-preview",
                generationConfig: {
                    responseMimeType: "application/json",
                }
            });

            const currentSquad = draftedPlayers.map(p => `${p.name} (${p.role}, ₹${p.price}Cr)`).join(", ");
            const totalCost = (100 - budget).toFixed(2);
            
            // Limit available players to save tokens, just send names and prices
            const availablePool = availablePlayers.slice(0, 20).map(p => `{id: "${p.id}", name: "${p.name}", role: "${p.role}", price: ${p.price}}`).join(", ");

            const prompt = `You are the Lead Tactical Analyst for an IPL team.
I have drafted the following 11-player squad (or partial squad):
[${currentSquad}]
Total Cost: ₹${totalCost} Cr.

Please provide a tactical critique focusing exactly on:
1. Batting Depth
2. Bowling Variety
3. Wicket-keeper presence
4. Budget efficiency

Then, suggest exactly 2 specific player swaps to improve the team. Choose the 'add' players from this available pool: [${availablePool}].
The 'drop' players must be from my current squad.

Return ONLY a valid JSON object with the following schema:
{
  "verdict": "CHAMPION MATERIAL or NEEDS WORK",
  "battingDepth": "Your analysis...",
  "bowlingVariety": "Your analysis...",
  "budgetEfficiency": "Your analysis...",
  "swaps": [
    { "dropId": "player_id_from_squad", "dropName": "Name", "addId": "player_id_from_pool", "addName": "Name", "reason": "Why this swap is good" },
    { "dropId": "player_id_from_squad", "dropName": "Name", "addId": "player_id_from_pool", "addName": "Name", "reason": "Why this swap is good" }
  ]
}
Do not include markdown blocks, just the raw JSON.`;

            const result = await model.generateContent(prompt);
            const text = result.response.text();
            const parsed = JSON.parse(text);
            setResponse(parsed);
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to generate critique.");
        } finally {
            setIsLoading(false);
        }
    };

    const executeSwap = (dropId, addId) => {
        if(dropId) removePlayer(dropId);
        if(addId) draftPlayer(addId);
        // Remove the swap from the list to avoid double execution
        setResponse(prev => ({
            ...prev,
            swaps: prev.swaps.filter(s => s.dropId !== dropId && s.addId !== addId)
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-l-4 border-red-600 pl-4 py-2 bg-white/30 rounded-r-xl">
                <div>
                    <span className="font-label-red text-red-600 tracking-widest uppercase mb-1 block text-sm">AI Tactical Engine</span>
                    <h2 className="font-display-xl text-2xl text-on-surface uppercase italic">
                        {response?.verdict || "AWAITING DATA"}
                    </h2>
                </div>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={critiqueTeam}
                    disabled={isLoading}
                    className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition-all disabled:opacity-50"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <span className="material-symbols-outlined text-sm">smart_toy</span>
                    )}
                    <span className="font-bold uppercase text-sm tracking-widest">
                        {isLoading ? 'Analyzing...' : 'Critique My Team'}
                    </span>
                </motion.button>
            </div>

            {error && (
                <div className="p-4 bg-red-100 text-red-600 border border-red-200 rounded-xl text-sm font-medium">
                    {error}
                </div>
            )}

            {response && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Critique Breakdown */}
                    <div className="glass-card p-6 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100">
                            <span className="material-symbols-outlined text-red-600">analytics</span>
                            <h3 className="font-bold uppercase tracking-widest text-slate-800">Squad Assessment</h3>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="bg-white/60 p-3 rounded-lg border border-slate-100">
                                <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Batting Depth</h4>
                                <p className="text-sm text-slate-700">{response.battingDepth}</p>
                            </div>
                            <div className="bg-white/60 p-3 rounded-lg border border-slate-100">
                                <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Bowling Variety</h4>
                                <p className="text-sm text-slate-700">{response.bowlingVariety}</p>
                            </div>
                            <div className="bg-white/60 p-3 rounded-lg border border-slate-100">
                                <h4 className="text-xs font-bold text-slate-500 uppercase mb-1">Budget Efficiency</h4>
                                <p className="text-sm text-slate-700">{response.budgetEfficiency}</p>
                            </div>
                        </div>
                    </div>

                    {/* Suggested Trades */}
                    <div className="glass-card p-6 rounded-2xl border-l-8 border-red-600 space-y-4 shadow-sm relative overflow-hidden">
                        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-100 relative z-10">
                            <span className="material-symbols-outlined text-red-600">swap_horizontal_circle</span>
                            <h3 className="font-bold uppercase tracking-widest text-slate-800">Recommended Trades</h3>
                        </div>

                        <div className="space-y-4 relative z-10">
                            {response.swaps.length === 0 ? (
                                <p className="text-sm text-slate-500">No further swaps recommended.</p>
                            ) : response.swaps.map((swap, idx) => (
                                <motion.div 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.2 }}
                                    key={idx} 
                                    className="bg-white border border-red-100 p-4 rounded-xl shadow-sm"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">OUT: {swap.dropName}</span>
                                            <span className="material-symbols-outlined text-slate-300 text-sm">arrow_forward</span>
                                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">IN: {swap.addName}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-600 mb-3">{swap.reason}</p>
                                    <button 
                                        onClick={() => executeSwap(swap.dropId, swap.addId)}
                                        className="w-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest py-2 rounded-lg hover:bg-red-600 transition-colors"
                                    >
                                        Execute Swap
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                        
                        <div className="absolute right-0 top-0 h-full w-1/2 opacity-5 pointer-events-none">
                            <img alt="Stadium" className="h-full w-full object-cover" src="/assets/stadium-bg.jpg" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoachChat;
