import React from 'react';
import { Microscope, FileQuestion, ArrowRight } from 'lucide-react';

const mockTrials = [
    { id: 'NCT04839210', title: 'Phase II Trial of Pembrolizumab with Precision Radiotherapy', phase: 'Phase 2', status: 'Recruiting' },
    { id: 'NCT05128455', title: 'CAR-T Cell Therapy for Advanced Solid Tumors', phase: 'Phase 1/2', status: 'Active' },
    { id: 'NCT03901423', title: 'Neoantigen Vaccine + Checkpoint Inhibitors', phase: 'Phase 2', status: 'Recruiting' },
    { id: 'NCT04592811', title: 'Metabolic Inhibitor (TL-895) with Standard Chemo', phase: 'Phase 3', status: 'Enrolling by Invitation' },
    { id: 'NCT05021980', title: 'Bispecific Antibody Targeting CD3 and Tumor Antigen', phase: 'Phase 1', status: 'Recruiting' },
    { id: 'NCT04481023', title: 'Microbiome Modification to Enhance Immunotherapy', phase: 'Phase 2', status: 'Recruiting' },
];

const questions = [
    "Does my specific tumor mutation profile match the inclusion criteria for this trial?",
    "How does this experimental arm compare functionally to my current standard of care option?",
    "Could participating in this trial exclusionary for future line therapies if it fails?"
];

const TrialMode: React.FC = () => {
    return (
        <div className="flex-1 w-full flex flex-col p-6 overflow-y-auto bg-[#0a0f1c]">
            <div className="max-w-6xl w-full mx-auto space-y-8">
                <header className="space-y-2">
                    <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Microscope className="text-primary" size={32} />
                        Trial Forge Mode
                    </h2>
                    <p className="text-gray-400">Mock ClinicalTrials.gov Integration – Educational match and question generation.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="text-xl font-semibold border-b border-gray-800 pb-2">Simulated Trial Matches</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {mockTrials.map((trial, i) => (
                                <div key={i} className="bg-surface border border-gray-700 p-4 rounded-lg hover:border-primary transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">{trial.id}</span>
                                        <span className="text-xs font-semibold bg-gray-800 px-2 py-1 rounded">{trial.phase}</span>
                                    </div>
                                    <h4 className="font-medium text-white group-hover:text-primary transition-colors">{trial.title}</h4>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className={`text-xs ${trial.status === 'Recruiting' ? 'text-success' : 'text-warning'}`}>
                                            ● {trial.status}
                                        </span>
                                        <button className="text-xs flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                                            Fork Simulation <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-[#121b2d] border border-gray-800 rounded-lg p-5 sticky top-6">
                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                                <FileQuestion className="text-blue-400" />
                                Ask Your Oncologist
                            </h3>
                            <p className="text-sm text-gray-400 mb-4">
                                Bring these generated questions to your next appointment based on your simulation:
                            </p>

                            <ul className="space-y-3">
                                {questions.map((q, i) => (
                                    <li key={i} className="bg-[#1a2333] p-3 text-sm rounded border border-gray-700 text-slate-300">
                                        {q}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white text-sm py-2 rounded transition-colors"
                                onClick={() => navigator.clipboard.writeText(questions.join('\n\n'))}
                            >
                                Copy All to Clipboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrialMode;
