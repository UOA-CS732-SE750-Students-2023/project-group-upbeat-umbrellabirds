import { Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import Lobby from "./Pages/LobbyPage";
import RoundResults from "./Pages/RoundResultsPage";
import Ratings from "./Pages/RatingsPage";
import GameResults from "./Pages/GameResultsPage";
import background_img from "./assets/react.svg";
import "./App.css";

const App = () => {
  return (
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/roundResults" element={<RoundResults />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/gameResults" element={<GameResults />} />
        </Routes>
      </div>
  );
};

export default App;