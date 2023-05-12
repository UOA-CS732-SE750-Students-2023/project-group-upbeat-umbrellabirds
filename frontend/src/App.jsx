import { Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import Lobby from "./Pages/LobbyPage";
import RoundResults from "./Pages/RoundResultsPage";
import Ratings from "./Pages/RatingsPage";
import GameResults from "./Pages/GameResultsPage";
import RatingsPage from "./Pages/RatingsPage"
import background_img from "./assets/react.svg";
import MusicPlayer from "./components/MusicPlayer";
import music from "./assets/music.mp3"
import TestPage from "./Pages/TestPage"
import "./App.css";

const App = () => {
  return (
      <div className="container">
      <MusicPlayer audioUrl={music} volume={0.2} isMuted={false}></MusicPlayer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/roundResults" element={<RoundResults />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/gameResults" element={<GameResults />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </div>
  );
};


export default App;