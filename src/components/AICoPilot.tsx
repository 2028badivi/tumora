import React, { useState, useEffect } from 'react';
import { Bot, User, ShieldAlert, Sparkles } from 'lucide-react';
import { useSimulationStore } from '../stores/useSimulationStore';

const AICoPilot: React.FC = () => {
    const { isRunning, lastResult, mutationLoad, inflammationLevel } = useSimulationStore();
    const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string; icon: any }[]>([
        {
            role: 'ai',
            text: "Welcome to the Forge. I'm your AI co-pilot. I analyze the canvas and explain the bio-programming outcomes in real-time. Drop some nodes, tweak variables, and hit Run Simulation!",
            icon: <Bot size={16} />
        }
    ]);

    useEffect(() => {
        if (isRunning) {
            setMessages(prev => [...prev, {
                role: 'ai',
                text: "Analyzing canvas configuration... Sequence running. Computing probable trajectories.",
                icon: <Bot size={16} />
            }]);
        } else if (lastResult) {
            let narrative = "";
            if (lastResult.survivalRate > 60) {
                narrative = "Excellent configuration! Your treatment nodes combined well with T-cells. The simulated tumor burden is shrinking.";
            } else {
                narrative = "This strategy needs adjustment. Survival probability is low. Did you consider lowering inflammation to help T-cell infiltration?";
            }

            if (inflammationLevel > 70) {
                narrative += " High inflammation acts like a force field, blocking immune cells.";
            }

            setMessages(prev => [...prev, {
                role: 'ai',
                text: narrative,
                icon: <Sparkles size={16} className="text-primary" />
            }]);
        }
    }, [isRunning, lastResult, inflammationLevel]);

    return (
        <div className="w-80 bg-[#121b2d] border-l border-gray-800 flex flex-col shrink-0 h-full">
            <div className="p-3 border-b border-gray-800 flex items-center gap-2">
                <Bot className="text-primary" />
                <h3 className="font-bold text-sm">AI Co-Pilot</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-3 text-sm ${msg.role === 'ai' ? 'items-start' : 'items-center justify-end'}`}>
                        {msg.role === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center shrink-0 border border-gray-700">
                                {msg.icon}
                            </div>
                        )}
                        <div className={`p-3 rounded-lg leading-relaxed shadow-sm ${msg.role === 'ai'
                                ? 'bg-[#1a2333] text-gray-300 border border-gray-800'
                                : 'bg-primary text-white ml-8'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-gray-800 bg-[#0c1221]">
                <div className="bg-red-500/10 border border-red-500/20 rounded p-2 flex gap-2 items-start mt-auto">
                    <ShieldAlert size={14} className="text-red-400 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-red-200">
                        I am a simulation co-pilot, not a doctor. My advice is for educational "what-if" scenarios only. Always talk to your oncologist.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AICoPilot;
