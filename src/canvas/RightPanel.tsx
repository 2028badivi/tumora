import React from 'react';
import { Play, Loader2 } from 'lucide-react';
import { useSimulationStore } from '../stores/useSimulationStore';
import { useCanvasStore } from '../stores/useCanvasStore';

const RightPanel: React.FC = () => {
    const { mutationLoad, inflammationLevel, pdl1Score, setVariable, runSimulation, isRunning, lastResult } = useSimulationStore();
    const { nodes } = useCanvasStore();

    const handleRun = () => {
        runSimulation(nodes);
    };

    return (
        <div className="w-80 bg-surface border-l border-gray-800 p-4 shrink-0 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
                <div>
                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Patient Variables</h3>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium">
                                <span>Mutation Load</span>
                                <span className={mutationLoad > 70 ? 'text-danger' : mutationLoad > 40 ? 'text-warning' : 'text-success'}>
                                    {mutationLoad}%
                                </span>
                            </div>
                            <input
                                type="range"
                                max={100}
                                min={0}
                                className="w-full accent-primary bg-gray-700 h-1 rounded blur-[0.5px]"
                                value={mutationLoad}
                                onChange={(e) => setVariable('mutationLoad', parseInt(e.target.value))}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium">
                                <span>Inflammation Level</span>
                                <span className={inflammationLevel > 70 ? 'text-danger' : inflammationLevel > 40 ? 'text-warning' : 'text-success'}>
                                    {inflammationLevel}%
                                </span>
                            </div>
                            <input
                                type="range"
                                max={100}
                                min={0}
                                className="w-full accent-primary bg-gray-700 h-1 rounded blur-[0.5px]"
                                value={inflammationLevel}
                                onChange={(e) => setVariable('inflammationLevel', parseInt(e.target.value))}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium">
                                <span>PD-L1 Score</span>
                                <span className="text-blue-400">{pdl1Score}%</span>
                            </div>
                            <input
                                type="range"
                                max={100}
                                min={0}
                                className="w-full accent-primary bg-gray-700 h-1 rounded blur-[0.5px]"
                                value={pdl1Score}
                                onChange={(e) => setVariable('pdl1Score', parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                {lastResult && !isRunning && (
                    <div className="bg-[#1a2333] border border-gray-700 rounded-md p-3 space-y-3">
                        <h4 className="text-sm font-semibold border-b border-gray-700 pb-2">Simulation Outcome</h4>
                        <div className="flex justify-between items-baseline">
                            <span className="text-xs text-gray-400">Baseline Survival + Interventions</span>
                            <span className="text-xl font-bold text-primary">{Math.round(lastResult.survivalRate)}%</span>
                        </div>
                        <p className="text-[10px] text-gray-400 italic">
                            Confidence Interval: {Math.round(lastResult.confidenceInterval[0])}% - {Math.round(lastResult.confidenceInterval[1])}%
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed border-t border-gray-700 pt-2">
                            {lastResult.summary}
                        </p>
                        <div className="w-full h-16 bg-gray-800 rounded mt-2 border border-gray-700 relative overflow-hidden flex items-end">
                            {/* Extremely simple Kaplan-Meier style placeholder */}
                            <svg viewBox="0 0 100 100" className="w-full h-full preserve-aspect-ratio-none" preserveAspectRatio="none">
                                <polyline
                                    points={`0,0 20,${100 - lastResult.survivalRate / 2} 50,${100 - lastResult.survivalRate / 1.5} 80,${100 - lastResult.survivalRate / 1.2} 100,${100 - lastResult.survivalRate}`}
                                    fill="none"
                                    stroke="#f97316"
                                    strokeWidth="2"
                                />
                            </svg>
                        </div>
                    </div>
                )}
            </div>

            <div className="pt-4 border-t border-gray-800 flex flex-col gap-3 mt-4">
                <button
                    onClick={handleRun}
                    disabled={isRunning}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-orange-600 text-white font-bold p-3 rounded shadow-[0_0_15px_rgba(249,115,22,0.4)] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isRunning ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} fill="currentColor" />}
                    {isRunning ? 'Simulating...' : 'Run Simulation'}
                </button>
                <p className="text-[10px] text-gray-400 text-center px-1">
                    Based on 47 real PubMed studies (educational only).
                </p>
            </div>
        </div>
    );
};

export default RightPanel;
