import Navbar from './components/Navbar/Navbar';
import BxhKyNang from './components/BxhKyNang/BxhKyNang';
import Filter from './components/Filter/Filter';
import SkillLevel from './components/SkillLevel/SkillLevel';
import './App.css';
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const [filterName, setFilterName] = React.useState<string>('');
  const [branch, setBranch] = React.useState<string[]>([]);
  const location = useLocation();

  // Reset filters when navigating away from home page
  React.useEffect(() => {
    if (location.pathname !== '/') {
      setFilterName('');
      setBranch([]);
    }
  }, [location.pathname]);

  return (
    <div className="app">
      <Navbar />
      <div className="navbar-spacer"></div>
      <main className="app__main">
        <Routes>
          <Route path="/" element={
            <>
              <Filter
                filterName={filterName}
                setFilterName={setFilterName}
                branch={branch}
                setBranch={setBranch}
              />
              <BxhKyNang filterName={filterName} branch={branch} />
            </>
          } />
          <Route path="/skill-level-reference" element={<SkillLevel />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
