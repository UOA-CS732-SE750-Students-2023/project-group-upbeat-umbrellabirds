import { Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import Lobby from "./Pages/LobbyPage";
import background_img from "./assets/react.svg";
import "./App.css";

const App = () => {
  return (
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
        </Routes>
      </div>
  );
};

export default App;