import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSquadStore } from '../store/useSquadStore';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
    const location = useLocation();
    const budget = useSquadStore(state => state.budget);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
            {/* Top Navigation Shell */}
            <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200 shadow-sm shadow-slate-200/50 docked full-width top-0 z-50 sticky">
                <div className="flex justify-between items-center w-full px-6 py-3">
                    <div className="flex items-center gap-md">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            className="material-symbols-outlined p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-800"
                        >
                            {isMenuOpen ? 'close' : 'menu'}
                        </button>
                        <span className="text-xl font-black italic tracking-tighter text-red-600 font-['Inter'] ml-2">
                            APEX REDLINE
                        </span>
                    </div>
                    <div className="flex items-center gap-md">
                        <div className="hidden md:flex items-center gap-xs px-md py-sm bg-surface-container rounded-full transition-all duration-300">
                            <span className="font-utility-sm text-utility-sm text-primary">Budget: ₹{budget.toFixed(2)} Cr</span>
                        </div>
                        <button className="material-symbols-outlined text-slate-500 hover:bg-slate-50/50 transition-colors p-sm rounded-full">notifications</button>
                        <button className="material-symbols-outlined text-slate-500 hover:bg-slate-50/50 transition-colors p-sm rounded-full">account_circle</button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 relative overflow-hidden h-[calc(100vh-64px)]">
                {/* Overlay for mobile when menu is open */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
                        />
                    )}
                </AnimatePresence>

                {/* Side Navigation Shell (Hamburger Menu) */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.aside 
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                            className="absolute lg:relative z-40 left-0 top-0 h-full w-64 border-r border-slate-200 bg-white/95 backdrop-blur-xl flex flex-col shadow-2xl lg:shadow-none"
                        >
                            <div className="px-lg py-md border-b border-slate-200">
                                <div className="flex items-center gap-sm">
                                    <img src="/assets/ipl-logo.png" alt="IPL Logo" className="w-10 h-10 rounded-lg bg-red-600/10 p-1" />
                                    <div>
                                        <p className="font-['Inter'] text-sm font-bold text-on-surface">Squad Manager</p>
                                        <p className="text-[10px] text-slate-500 font-medium">2024 Season</p>
                                    </div>
                                </div>
                            </div>

                            <nav className="flex-1 px-sm py-md space-y-xs overflow-y-auto">
                                <Link onClick={() => setIsMenuOpen(false)} to="/" className={`flex items-center gap-md px-md py-sm rounded-lg transition-all font-['Inter'] text-sm font-medium ${location.pathname === '/' ? 'text-red-600 font-bold border-r-4 border-red-600 bg-red-50/50' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'}`}>
                                    <span className="material-symbols-outlined">groups</span> Draft Pool
                                </Link>
                                <Link onClick={() => setIsMenuOpen(false)} to="/pitch" className={`flex items-center gap-md px-md py-sm rounded-lg transition-all font-['Inter'] text-sm font-medium ${location.pathname === '/pitch' ? 'text-red-600 font-bold border-r-4 border-red-600 bg-red-50/50' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'}`}>
                                    <span className="material-symbols-outlined">sports_cricket</span> Pitch View
                                </Link>
                                <Link onClick={() => setIsMenuOpen(false)} to="/analytics" className={`flex items-center gap-md px-md py-sm rounded-lg transition-all font-['Inter'] text-sm font-medium ${location.pathname === '/analytics' ? 'text-red-600 font-bold border-r-4 border-red-600 bg-red-50/50' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'}`}>
                                    <span className="material-symbols-outlined">analytics</span> Team Analytics
                                </Link>
                                <Link onClick={() => setIsMenuOpen(false)} to="/ai-coach" className={`flex items-center gap-md px-md py-sm rounded-lg transition-all font-['Inter'] text-sm font-medium ${location.pathname === '/ai-coach' ? 'text-red-600 font-bold border-r-4 border-red-600 bg-red-50/50' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'}`}>
                                    <span className="material-symbols-outlined">smart_toy</span> AI Coach
                                </Link>
                                <Link onClick={() => setIsMenuOpen(false)} to="/history" className={`flex items-center gap-md px-md py-sm rounded-lg transition-all font-['Inter'] text-sm font-medium ${location.pathname === '/history' ? 'text-red-600 font-bold border-r-4 border-red-600 bg-red-50/50' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'}`}>
                                    <span className="material-symbols-outlined">history</span> History
                                </Link>
                            </nav>
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Main Content Area */}
                <main className="flex-1 w-full h-full overflow-hidden relative z-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
