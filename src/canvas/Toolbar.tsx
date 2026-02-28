import React from 'react';
import { Database, Upload, Activity, AlertCircle, Shield, ArrowRight } from 'lucide-react';

const nodeTypes = [
    { id: 'cancer', label: 'Cancer Cells', color: 'bg-red-500', icon: AlertCircle },
    { id: 'immune', label: 'T-Cells (Immune)', color: 'bg-blue-500', icon: Shield },
    { id: 'healthy', label: 'Healthy Tissue', color: 'bg-green-500', icon: Activity },
    { id: 'treatment', label: 'Treatment Arrow', color: 'bg-orange-500', icon: ArrowRight },
    { id: 'lifestyle', label: 'Lifestyle Factor', color: 'bg-yellow-500', icon: Database },
];

const Toolbar: React.FC = () => {
    const onDragStart = (e: React.DragEvent, type: string) => {
        e.dataTransfer.setData('nodeType', type);
    };

    return (
        <div className="w-64 bg-surface border-r border-gray-800 p-4 shrink-0 flex flex-col gap-6">
            <div>
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Palette</h3>
                <div className="space-y-3">
                    {nodeTypes.map((node) => (
                        <div
                            key={node.id}
                            className="flex items-center gap-3 p-2 bg-[#1a2333] border border-gray-700 rounded-md cursor-grab active:cursor-grabbing hover:bg-gray-800 transition-colors"
                            draggable
                            onDragStart={(e) => onDragStart(e, node.id)}
                        >
                            <div className={`w-4 h-4 rounded-full ${node.color} shadow-lg shrink-0`} />
                            <span className="text-sm font-medium">{node.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-4 border-t border-gray-800">
                <button className="flex w-full items-center justify-center gap-2 bg-[#1a2333] hover:bg-[#202b3d] border border-gray-700 transition p-3 rounded-md text-sm font-medium">
                    <Upload size={16} />
                    Upload Genomic Report
                </button>
                <p className="text-[10px] text-gray-500 mt-2 text-center">Stores locally</p>
            </div>
        </div>
    );
};

export default Toolbar;
