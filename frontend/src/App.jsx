import { Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import Lobby from "./Pages/LobbyPage";
// import Ratings from "./Pages/RatingsPage";
import GameResults from "./Pages/GameResultsPage";
// import RatingsPage from "./Pages/RatingsPage"
import MusicPlayer from "./components/MusicPlayer";
import Game from "./Pages/GamePage";
import music from "./assets/music.mp3"
// import TestPage from "./Pages/TestPage"
import "./App.css";

const App = () => {
  return (
      <div className="container">
      <MusicPlayer audioUrl={music} volume={0.2} isMuted={false}></MusicPlayer>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game" element={<Game/> } />
          <Route path="/results" element={<GameResults />} />
        </Routes>
      </div>
  );
};

export default App;