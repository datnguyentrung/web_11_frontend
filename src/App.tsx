import Navbar from './components/Navbar/Navbar';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import FitnessComponent from './components/FitnessProgram/FitnessProgram';
import SkillLevel from './components/FitnessProgram/SkillLevel/SkillLevel';
import Tournament from './components/Tournament/Tournament';
import TournamentDetails from './components/Tournament/TournamentDetails/TournamentDetails';
import CompetitorList from './components/Tournament/CompetitorList/CompetitorList';
import TournamentDiscipline from './components/Tournament/TournamentDiscipline/TournamentDiscipline';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="navbar-spacer"></div>
      <main className="app__main">
        <Routes>
          <Route path="/giai-dau" element={<Tournament />} />
          <Route path="/giai-dau/:idTournament" element={<TournamentDetails />} />
          <Route path="/giai-dau/:idTournament/:tournamentType" element={<TournamentDiscipline />} />

          <Route path="/giai-dau/:tournamentType/danh-sach" element={<CompetitorList />} />

          <Route path="/chuong-trinh-ky-nang/bang-xep-hang" element={<FitnessComponent />} />
          <Route path="/chuong-trinh-ky-nang/bang-quy-doi-trinh-do" element={<SkillLevel />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
