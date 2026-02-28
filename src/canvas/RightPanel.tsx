import React from 'react';
import { Play } from 'lucide-react';

const RightPanel: React.FC = () => {
    return (
        <div className="w-80 bg-surface border-l border-gray-800 p-4 shrink-0 flex flex-col justify-between">
            <div>
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Variables</h3>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                            <span>Mutation Load</span>
                            <span className="text-danger">High (84%)</span>
                        </div>
                        <input type="range" className="w-full accent-primary bg-gray-700 h-1 rounded" defaultValue={84} />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                            <span>Inflammation Level</span>
                            <span className="text-warning">Moderate (55%)</span>
                        </div>
                        <input type="range" className="w-full accent-primary bg-gray-700 h-1 rounded" defaultValue={55} />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                            <span>PD-L1 Score</span>
                            <span className="text-blue-400">Low (10%)</span>
                        </div>
                        <input type="range" className="w-full accent-primary bg-gray-700 h-1 rounded" defaultValue={10} />
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-gray-800 flex flex-col gap-3">
                <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-orange-600 text-white font-bold p-3 rounded shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all active:scale-95">
                    <Play size={18} fill="currentColor" />
                    Run Simulation
                </button>
                <p className="text-[10px] text-gray-400 text-center px-2">
                    Based on simplified rule-sets. Educational only.
                </p>
            </div>
        </div>
    );
};

export default RightPanel;
