import { Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import Lobby from "./Pages/LobbyPage";
import GamePage from "./Pages/GamePage";
import RatingsPage from "./Pages/RatingsPage";
import ResultsPage from "./Pages/ResultsPage";
import TestPage from "./Pages/TestPage";
import background_img from "./assets/react.svg";
import "./App.css";

const App = () => {
  return (
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/gamePage" element={<GamePage />} />
          <Route path="/ratingsPage" element={<RatingsPage />} />
          <Route path="/resultsPage" element={<ResultsPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </div>
  );
};

export default App;