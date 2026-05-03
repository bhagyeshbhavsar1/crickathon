import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useSquadStore } from '../store/useSquadStore';

const Layout = () => {
    const location = useLocation();
    const budget = useSquadStore(state => state.budget);

    return (
        <div className="bg-background text-on-background font-body-md min-h-screen">
            {/* Top Navigation Shell */}
            <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200 shadow-sm shadow-slate-200/50 docked full-width top-0 z-50 sticky">
                <div className="flex justify-between items-center w-full px-6 py-3">
                    <div className="flex items-center gap-md">
                        <span className="text-xl font-black italic tracking-tighter text-red-600 font-['Inter']">
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

            <div className="flex min-h-[calc(100vh-64px)]">
                {/* Side Navigation Shell */}
                <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-64 border-r border-slate-200 bg-white/70 backdrop-blur-xl hidden lg:flex flex-col">
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
                        <Link to="/" className={`flex items-center gap-md px-md py-sm rounded-lg transition-all font-['Inter'] text-sm font-medium ${location.pathname === '/' ? 'text-red-600 font-bold border-r-4 border-red-600 bg-red-50/50' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'}`}>
                            <span className="material-symbols-outlined">groups</span> Draft Pool
                        </Link>
                        <Link to="/pitch" className={`flex items-center gap-md px-md py-sm rounded-lg transition-all font-['Inter'] text-sm font-medium ${location.pathname === '/pitch' ? 'text-red-600 font-bold border-r-4 border-red-600 bg-red-50/50' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'}`}>
                            <span className="material-symbols-outlined">sports_cricket</span> Pitch View
                        </Link>
                        <Link to="/analytics" className={`flex items-center gap-md px-md py-sm rounded-lg transition-all font-['Inter'] text-sm font-medium ${location.pathname === '/analytics' ? 'text-red-600 font-bold border-r-4 border-red-600 bg-red-50/50' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'}`}>
                            <span className="material-symbols-outlined">analytics</span> Team Analytics
                        </Link>
                        <Link to="/ai-coach" className={`flex items-center gap-md px-md py-sm rounded-lg transition-all font-['Inter'] text-sm font-medium ${location.pathname === '/ai-coach' ? 'text-red-600 font-bold border-r-4 border-red-600 bg-red-50/50' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'}`}>
                            <span className="material-symbols-outlined">smart_toy</span> AI Coach
                        </Link>
                        <Link to="/history" className={`flex items-center gap-md px-md py-sm rounded-lg transition-all font-['Inter'] text-sm font-medium ${location.pathname === '/history' ? 'text-red-600 font-bold border-r-4 border-red-600 bg-red-50/50' : 'text-slate-600 hover:bg-slate-50 hover:text-red-600'}`}>
                            <span className="material-symbols-outlined">history</span> History
                        </Link>
                    </nav>

                    <div className="p-lg mt-auto">
                        <button className="w-full bg-primary text-white py-md px-lg rounded-xl font-bold flex items-center justify-center gap-sm active:scale-95 duration-150 ease-in-out shadow-lg shadow-red-200">
                            <span className="material-symbols-outlined">add</span> New Simulation
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 lg:ml-64 w-full h-full min-h-[calc(100vh-64px)]">
                    <Outlet />
                </main>
            </div>

            {/* Mobile Nav */}
            <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white/70 backdrop-blur-xl border-t border-slate-200 flex justify-around items-center py-3 z-50">
                <Link to="/" className="flex flex-col items-center gap-xs text-slate-400">
                    <span className="material-symbols-outlined">groups</span>
                    <span className="text-[10px] font-bold">Pool</span>
                </Link>
                <Link to="/analytics" className="flex flex-col items-center gap-xs text-slate-400">
                    <span className="material-symbols-outlined">analytics</span>
                    <span className="text-[10px] font-bold">Stats</span>
                </Link>
                <Link to="/history" className="flex flex-col items-center gap-xs text-slate-400">
                    <span className="material-symbols-outlined">history</span>
                    <span className="text-[10px] font-bold">Vault</span>
                </Link>
                <Link to="/ai-coach" className="flex flex-col items-center gap-xs text-slate-400">
                    <span className="material-symbols-outlined">smart_toy</span>
                    <span className="text-[10px] font-bold">AI</span>
                </Link>
            </nav>
        </div>
    );
};

export default Layout;
