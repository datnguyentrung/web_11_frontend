import Navbar from './components/Navbar/Navbar';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import FitnessComponent from './components/FitnessProgram/FitnessProgram';
import SkillLevel from './components/FitnessProgram/SkillLevel/SkillLevel';
import Tournament from './components/Tournament/Tournament';
import TournamentDetails from './components/Tournament/TournamentDetails/TournamentDetails';
import CompetitorList from './components/Tournament/CompetitorList/CompetitorList';
import TournamentDiscipline from './components/Tournament/TournamentDiscipline/TournamentDiscipline';
import Sigma from './components/Tournament/Sigma/Sigma';

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="navbar-spacer"></div>
      <main className="app__main">
        <Routes>
          {/* 1. Danh sách tất cả giải đấu */}
          <Route path="/giai-dau" element={<Tournament />} />

          {/* 2. Chi tiết một giải đấu cụ thể */}
          <Route path="/giai-dau/:tournamentId">
            {/* Trang Dashboard của giải đấu */}
            <Route index element={<TournamentDetails />} />

            {/* 3. Đi vào từng nội dung (Kyorugi/Poomsae) */}
            {/* :discipline = "quyen" hoặc "doi-khang" */}
            <Route path=":discipline">
              {/* Trang tổng quan của nội dung đó */}
              <Route index element={<TournamentDiscipline />} />

              {/* Chi tiết từng hạng đấu (combination) */}
              <Route path=":combinationId">
                {/* Danh sách vận động viên */}
                <Route path="danh-sach" element={<CompetitorList />} />

                {/* Bảng đấu (Sigma) */}
                <Route path="bang-dau" element={<Sigma />} />
              </Route>
            </Route>
          </Route>

          <Route path="/chuong-trinh-ky-nang/bang-xep-hang" element={<FitnessComponent />} />
          <Route path="/chuong-trinh-ky-nang/bang-quy-doi-trinh-do" element={<SkillLevel />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
