import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import DebugMode from './modes/DebugMode';
import TrialMode from './modes/TrialMode';
import LegacyMode from './modes/LegacyMode';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DebugMode />} />
          <Route path="trial" element={<TrialMode />} />
          <Route path="legacy" element={<LegacyMode />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
