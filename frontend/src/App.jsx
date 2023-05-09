
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import Lobby from "./Pages/LobbyPage";
import Game from "./Pages/GamePage"
import background_img from "./assets/react.svg";
import "./App.css";

const App = () => {
  return (
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
  );
};
{/*
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import Lobby from "./Pages/LobbyPage";
import GamePage from "./Pages/GamePage";
import RatingsPage from "./Pages/RatingsPage";
import ResultsPage from "./Pages/ResultsPage";
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
        </Routes>
      </div>
  );
};

*/}
export default App;