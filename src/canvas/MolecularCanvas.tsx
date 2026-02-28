import React, { useRef } from 'react';
import { Stage, Layer, Circle, Arrow, Group } from 'react-konva';
import { useCanvasStore } from '../stores/useCanvasStore';

const getNodeColor = (type: string) => {
    switch (type) {
        case 'cancer': return '#ef4444'; // Red pulsing later
        case 'immune': return '#3b82f6'; // Blue
        case 'healthy': return '#22c55e'; // Green
        case 'treatment': return '#f97316'; // Orange
        case 'lifestyle': return '#eab308'; // Yellow
        default: return '#fff';
    }
};

const MolecularCanvas: React.FC = () => {
    const { nodes, addNode, updateNodePosition } = useCanvasStore();
    const stageRef = useRef<any>(null);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (stageRef.current) {
            stageRef.current.setPointersPositions(e);
            const pos = stageRef.current.getPointerPosition();
            const nodeType = e.dataTransfer.getData('nodeType');
            if (pos && nodeType) {
                addNode({ type: nodeType as any, x: pos.x, y: pos.y, label: nodeType });
            }
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div
            className="flex-1 w-full h-full relative"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <Stage
                width={window.innerWidth - 640} // subtract sidebars
                height={window.innerHeight - 100} // subtract headers
                ref={stageRef}
            >
                <Layer>
                    {nodes.map((node) => (
                        <Group
                            key={node.id}
                            x={node.x}
                            y={node.y}
                            draggable
                            onDragEnd={(e) => {
                                updateNodePosition(node.id, e.target.x(), e.target.y());
                            }}
                        >
                            {node.type === 'treatment' ? (
                                <Arrow
                                    points={[0, 0, 30, 0]}
                                    pointerLength={10}
                                    pointerWidth={10}
                                    fill={getNodeColor(node.type)}
                                    stroke={getNodeColor(node.type)}
                                    strokeWidth={4}
                                />
                            ) : (
                                <Circle
                                    radius={20}
                                    fill={getNodeColor(node.type)}
                                    shadowBlur={10}
                                    shadowColor={getNodeColor(node.type)}
                                />
                            )}
                        </Group>
                    ))}
                </Layer>
            </Stage>
        </div>
    );
};

export default MolecularCanvas;
