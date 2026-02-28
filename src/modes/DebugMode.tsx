import React from 'react';
import Toolbar from '../canvas/Toolbar';
import MolecularCanvas from '../canvas/MolecularCanvas';
import RightPanel from '../canvas/RightPanel';

const DebugMode: React.FC = () => {
    return (
        <div className="flex h-full w-full">
            <Toolbar />
            <MolecularCanvas />
            <RightPanel />
        </div>
    );
};

export default DebugMode;
