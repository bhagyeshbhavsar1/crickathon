import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSquadStore } from '../store/useSquadStore';
import { motion } from 'framer-motion';

const Layout = () => {
    const location = useLocation();
    const budget = useSquadStore(state => state.budget);

    return (
        <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
            {/* Top Navigation Shell */}
            <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200 shadow-sm shadow-slate-200/50 docked full-width top-0 z-50 sticky">
                <div className="flex justify-between items-center w-full px-4 md:px-6 py-3">
                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <img src="/assets/ipl-logo.png" alt="IPL Logo" className="w-8 h-8 rounded-lg bg-red-600/10 p-1 hidden md:block" />
                        <span className="text-lg md:text-xl font-black italic tracking-tighter text-red-600 font-['Inter']">
                            APEX REDLINE
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex items-center gap-1 md:gap-4 overflow-x-auto scrollbar-hide px-2">
                        <Link to="/" className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 rounded-lg transition-all font-['Inter'] text-xs md:text-sm font-medium whitespace-nowrap ${location.pathname === '/' ? 'text-red-600 font-bold bg-red-50' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'}`}>
                            <span className="material-symbols-outlined text-sm md:text-base">groups</span> <span className="hidden lg:inline">Draft Pool</span>
                        </Link>
                        <Link to="/pitch" className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 rounded-lg transition-all font-['Inter'] text-xs md:text-sm font-medium whitespace-nowrap ${location.pathname === '/pitch' ? 'text-red-600 font-bold bg-red-50' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'}`}>
                            <span className="material-symbols-outlined text-sm md:text-base">sports_cricket</span> <span className="hidden lg:inline">Pitch View</span>
                        </Link>
                        <Link to="/analytics" className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 rounded-lg transition-all font-['Inter'] text-xs md:text-sm font-medium whitespace-nowrap ${location.pathname === '/analytics' ? 'text-red-600 font-bold bg-red-50' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'}`}>
                            <span className="material-symbols-outlined text-sm md:text-base">analytics</span> <span className="hidden lg:inline">Analytics</span>
                        </Link>
                        <Link to="/library" className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 rounded-lg transition-all font-['Inter'] text-xs md:text-sm font-medium whitespace-nowrap ${location.pathname === '/library' ? 'text-red-600 font-bold bg-red-50' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'}`}>
                            <span className="material-symbols-outlined text-sm md:text-base">library_books</span> <span className="hidden lg:inline">Library</span>
                        </Link>
                        <Link to="/ai-coach" className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 rounded-lg transition-all font-['Inter'] text-xs md:text-sm font-medium whitespace-nowrap ${location.pathname === '/ai-coach' ? 'text-red-600 font-bold bg-red-50' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'}`}>
                            <span className="material-symbols-outlined text-sm md:text-base">smart_toy</span> <span className="hidden lg:inline">AI Coach</span>
                        </Link>
                        <Link to="/history" className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-2 rounded-lg transition-all font-['Inter'] text-xs md:text-sm font-medium whitespace-nowrap ${location.pathname === '/history' ? 'text-red-600 font-bold bg-red-50' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'}`}>
                            <span className="material-symbols-outlined text-sm md:text-base">history</span> <span className="hidden lg:inline">History</span>
                        </Link>
                    </nav>

                    {/* Right Tools */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="hidden lg:flex items-center gap-xs px-md py-sm bg-surface-container rounded-full transition-all duration-300">
                            <span className="font-utility-sm text-utility-sm text-primary font-bold">₹{budget.toFixed(2)} Cr</span>
                        </div>
                        <button className="material-symbols-outlined text-slate-500 hover:bg-slate-50/50 transition-colors p-1 md:p-2 rounded-full">account_circle</button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 relative overflow-hidden h-[calc(100vh-64px)]">
                {/* Main Content Area */}
                <main className="flex-1 w-full h-full overflow-hidden relative z-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
