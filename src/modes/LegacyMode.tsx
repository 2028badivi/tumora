import React from 'react';
import { History, Download, Trash2, ChartLine } from 'lucide-react';
import { useSimulationStore } from '../stores/useSimulationStore';
import { format } from 'date-fns';

const LegacyMode: React.FC = () => {
    const { history } = useSimulationStore();

    const handleExport = (entry: any) => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entry));
        const dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", `tumora_forge_${new Date(entry.date).getTime()}.json`);
        dlAnchorElem.click();
    };

    return (
        <div className="flex-1 w-full flex flex-col p-6 overflow-y-auto bg-[#0a0f1c]">
            <div className="max-w-5xl w-full mx-auto space-y-8">
                <header className="space-y-2">
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <History className="text-primary" size={32} />
                        Legacy Forge
                    </h2>
                    <p className="text-gray-400">Review, compare, and export past simulation run outcomes.</p>
                </header>

                {history.length === 0 ? (
                    <div className="bg-surface border border-gray-800 rounded-lg p-10 flex flex-col items-center justify-center text-center text-gray-400">
                        <ChartLine size={64} className="mb-4 text-gray-600" />
                        <p className="text-lg">No legacy simulations found.</p>
                        <p className="text-sm">Run your first simulation in Debug Mode to record history.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {history.map((entry, index) => (
                            <div key={index} className="bg-[#121b2d] border border-gray-800 rounded-lg p-5 shadow-lg flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-3">
                                        <h3 className="text-base font-semibold text-white flex items-center gap-2">
                                            <span className="bg-primary/20 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs">
                                                {index + 1}
                                            </span>
                                            Forge Entry
                                        </h3>
                                        <span className="text-xs text-gray-500">
                                            {format(new Date(entry.date), 'MMM dd, yyyy HH:mm')}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-end mb-4">
                                        <div className="space-y-1">
                                            <p className="text-xs text-gray-500">Simulated Outcome</p>
                                            <p className="text-2xl font-bold text-white leading-none">
                                                {Math.round(entry.result.survivalRate)}%
                                            </p>
                                        </div>
                                        <div className="text-right space-y-1">
                                            <p className="text-xs text-gray-500">Mut Load / Inflam / PDL1</p>
                                            <p className="text-sm text-slate-300 font-mono">
                                                {entry.variables.mutationLoad}% | {entry.variables.inflammationLevel}% | {entry.variables.pdl1Score}%
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-gray-400 mb-6 line-clamp-2">
                                        {entry.result.summary}
                                    </p>
                                </div>

                                <div className="flex justify-between border-t border-gray-800 pt-3">
                                    <button className="text-xs flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors">
                                        <Trash2 size={14} /> Remove
                                    </button>
                                    <button
                                        onClick={() => handleExport(entry)}
                                        className="text-xs flex items-center gap-1 text-primary hover:text-orange-400 transition-colors bg-primary/10 px-3 py-1.5 rounded"
                                    >
                                        <Download size={14} /> Export JSON
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LegacyMode;
