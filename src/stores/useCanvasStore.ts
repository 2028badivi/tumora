import { create } from 'zustand';

export type NodeType = 'cancer' | 'immune' | 'healthy' | 'treatment' | 'lifestyle';

export interface CanvasNode {
    id: string;
    type: NodeType;
    x: number;
    y: number;
    label?: string;
}

interface CanvasState {
    nodes: CanvasNode[];
    addNode: (node: Omit<CanvasNode, 'id'>) => void;
    updateNodePosition: (id: string, x: number, y: number) => void;
    clearNodes: () => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
    nodes: [],
    addNode: (node) => set((state) => ({
        nodes: [...state.nodes, { ...node, id: crypto.randomUUID() }]
    })),
    updateNodePosition: (id, x, y) => set((state) => ({
        nodes: state.nodes.map(n => n.id === id ? { ...n, x, y } : n)
    })),
    clearNodes: () => set({ nodes: [] })
}));
