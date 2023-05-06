import { Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import Lobby from "./Pages/LobbyPage";
import Game from "./Pages/GamePage"
import background_img from "./assets/react.svg";
import "./App.css";

const App = () => {
  return (
    <main className="main">
      {/* <img
        src={background_img}
        className="background_img"
        alt="background img"
      /> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;