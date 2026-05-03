import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useSquadStore } from '../store/useSquadStore';

const AICoach = () => {
    const { draftedPlayers, budget } = useSquadStore();
    const [messages, setMessages] = useState([
        { sender: 'ai', text: "Hello! I am your AI Strategy Coach. Ask me anything about team balance, player stats, or match-ups based on your current squad." }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (customText = null) => {
        const textToSend = customText || inputValue;
        if (!textToSend.trim()) return;

        // Add user message
        const newMessages = [...messages, { sender: 'user', text: textToSend }];
        setMessages(newMessages);
        setInputValue('');
        setIsTyping(true);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            if (!apiKey) throw new Error("API Key missing");
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

            const currentSquad = draftedPlayers.map(p => `${p.name} (${p.role})`).join(", ");
            const prompt = `You are an AI Strategy Coach for an IPL cricket team.
The user currently has these drafted players: [${currentSquad || 'None'}].
Remaining budget: ₹${budget} Cr.
The user says: "${textToSend}"
Provide a brief, tactical, and helpful response. Keep it under 3-4 sentences.`;

            const result = await model.generateContent(prompt);
            const responseText = result.response.text();
            
            setMessages([...newMessages, { sender: 'ai', text: responseText }]);
        } catch (error) {
            console.error(error);
            setMessages([...newMessages, { sender: 'ai', text: "Sorry, I am experiencing technical difficulties analyzing that request." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 h-full overflow-y-auto pb-24 lg:pb-8"
        >




            {/* Ask the Coach Chat UI */}
            <section className="glass-card p-4 md:p-6 rounded-2xl shadow-xl border-slate-200 flex flex-col h-[500px]">
                <div className="flex items-center gap-4 px-4 border-b border-slate-100 pb-3 flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg relative">
                        <span className="material-symbols-outlined text-white">smart_toy</span>
                        <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div>
                        <h3 className="font-headline-md text-lg">Ask Strategy Coach</h3>
                        <p className="text-xs text-slate-400">AI-Powered Insights based on 10k simulations</p>
                    </div>
                </div>
                
                <div className="flex-1 px-4 py-4 flex flex-col gap-4 overflow-y-auto scrollbar-hide">
                    {messages.map((msg, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`${msg.sender === 'user' ? 'bg-slate-50 border-slate-200 self-end' : 'bg-red-50 border-red-100 self-start'} p-4 rounded-xl text-sm max-w-[80%] border shadow-sm`}
                        >
                            {msg.sender === 'ai' && <p className="font-bold mb-1 text-red-900">AI Coach:</p>}
                            <p className={msg.sender === 'user' ? 'text-slate-700' : 'text-red-900'}>{msg.text}</p>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-sm self-start max-w-[80%] flex items-center gap-2 shadow-sm">
                            <span className="w-2 h-2 bg-red-400 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                            <span className="w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                
                <div className="flex-shrink-0 pt-2 border-t border-slate-100">
                    <div className="flex gap-2 px-4 pb-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        <button onClick={() => handleSendMessage("Who are the best death bowlers available?")} className="text-xs font-bold border border-slate-200 px-4 py-1.5 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all">Best death bowlers?</button>
                        <button onClick={() => handleSendMessage("Do I have enough spin utility?")} className="text-xs font-bold border border-slate-200 px-4 py-1.5 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all">Spin utility check</button>
                        <button onClick={() => handleSendMessage("Who are the best budget picks under 2Cr?")} className="text-xs font-bold border border-slate-200 px-4 py-1.5 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all">Budget picks under 2Cr</button>
                    </div>

                    <div className="relative flex items-center gap-2 px-2">
                        <input 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="w-full bg-white border border-slate-200 focus:ring-red-600 focus:border-red-600 rounded-full px-6 py-3 text-sm shadow-inner outline-none" 
                            placeholder="Ask about team balance, player stats, or match-ups..." 
                            type="text" 
                        />
                        <motion.button 
                            onClick={() => handleSendMessage()}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            disabled={isTyping}
                            className="absolute right-4 p-2 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-all disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined">send</span>
                        </motion.button>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default AICoach;
