import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SimulationResult {
    survivalRate: number;
    confidenceInterval: [number, number];
    summary: string;
}

interface SimulationState {
    mutationLoad: number;
    inflammationLevel: number;
    pdl1Score: number;
    isRunning: boolean;
    setVariable: (name: 'mutationLoad' | 'inflammationLevel' | 'pdl1Score', value: number) => void;
    runSimulation: (nodes: any[]) => void;
    lastResult: SimulationResult | null;
    history: any[]; // For legacy mode
}

export const useSimulationStore = create<SimulationState>()(
    persist(
        (set, get) => ({
            mutationLoad: 84,
            inflammationLevel: 55,
            pdl1Score: 10,
            isRunning: false,
            lastResult: null,
            history: [],
            setVariable: (name, value) => set({ [name]: value }),
            runSimulation: (nodes) => {
                set({ isRunning: true });

                // Mock computation after a delay
                setTimeout(() => {
                    const { mutationLoad, inflammationLevel, pdl1Score } = get();

                    let baseSurvival = 30; // base %

                    // Factor in variables
                    baseSurvival -= (mutationLoad > 50 ? 10 : 0);
                    baseSurvival -= (inflammationLevel > 50 ? 15 : 0);
                    baseSurvival += (pdl1Score > 50 ? 20 : 0);

                    // Factor in nodes
                    const immuneCount = nodes.filter(n => n.type === 'immune').length;
                    const cancerCount = nodes.filter(n => n.type === 'cancer').length;
                    const treatmentCount = nodes.filter(n => n.type === 'treatment').length;
                    const lifestyleCount = nodes.filter(n => n.type === 'lifestyle').length;

                    baseSurvival += (immuneCount * 2);
                    baseSurvival -= (cancerCount * 3);
                    baseSurvival += (treatmentCount * 15);
                    baseSurvival += (lifestyleCount * 5);

                    // Clamp between 5 and 95
                    baseSurvival = Math.max(5, Math.min(95, baseSurvival));
                    const confidenceInterval: [number, number] = [
                        Math.max(1, baseSurvival - 12),
                        Math.min(99, baseSurvival + 12)
                    ];

                    let summary = "Simulation completed. ";
                    if (treatmentCount > 0) summary += "Treatments showed a positive effect. ";
                    if (lifestyleCount > 0) summary += "Lifestyle factors contributed to overall resilience. ";
                    if (highInflammation(inflammationLevel)) summary += "High inflammation is hindering T-cell efficacy. ";

                    const newResult = {
                        survivalRate: baseSurvival,
                        confidenceInterval,
                        summary
                    };

                    set((state) => ({
                        isRunning: false,
                        lastResult: newResult,
                        history: [{ date: new Date().toISOString(), result: newResult, nodes, variables: { mutationLoad, inflammationLevel, pdl1Score } }, ...state.history].slice(0, 10)
                    }));
                }, 3000);
            }
        }),
        {
            name: 'tumora_sims',
        }
    )
);

function highInflammation(level: number) {
    return level > 60;
}
