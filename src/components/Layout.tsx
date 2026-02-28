import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Activity } from 'lucide-react';

const Layout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-background text-slate-200">
            {/* Navbar segment */}
            <header className="flex items-center justify-between p-4 bg-surface border-b border-gray-800 shrink-0">
                <div className="flex items-center gap-2 text-primary">
                    <Activity size={28} />
                    <div>
                        <h1 className="text-xl font-bold leading-tight">Tumora</h1>
                        <p className="text-[10px] text-gray-400 font-medium">CODE YOUR CURE --TUMORA.</p>
                    </div>
                </div>

                <nav className="flex space-x-1 border p-1 rounded-md border-gray-800 bg-[#0c1221]">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `px-4 py-2 text-sm font-semibold rounded transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
                            }`
                        }
                    >
                        Debug Mode
                    </NavLink>
                    <NavLink
                        to="/trial"
                        className={({ isActive }) =>
                            `px-4 py-2 text-sm font-semibold rounded transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
                            }`
                        }
                    >
                        Trial Forge
                    </NavLink>
                    <NavLink
                        to="/legacy"
                        className={({ isActive }) =>
                            `px-4 py-2 text-sm font-semibold rounded transition-colors ${isActive ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
                            }`
                        }
                    >
                        Legacy Forge
                    </NavLink>
                </nav>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                <Outlet />
            </main>

            {/* Footer Disclaimer */}
            <footer className="p-2 bg-surface border-t border-gray-800 text-center text-xs text-gray-500 shrink-0">
                <p>Educational simulation only – not medical advice. Always consult your doctor.</p>
                <p className="mt-1 opacity-60">A beta product by CodeTheCure Labs.</p>
            </footer>
        </div>
    );
};

export default Layout;
