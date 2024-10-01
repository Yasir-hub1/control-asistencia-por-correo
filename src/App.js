import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Admin from './Admin';
import Control from './Control';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Control />} />
          <Route path="/admin" element={<Admin />} />
      
        </Routes>
      </div>
    </Router>
  );
}

export default App;
