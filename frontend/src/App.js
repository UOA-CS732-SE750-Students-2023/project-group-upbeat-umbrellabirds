import { Routes, Route } from "react-router-dom";
import Home from "./src/Pages/HomePage";
import background_img from "./images/background.png";
import "./App.css";

const App = () => {
  return (
    <main className="main">
      <img
        src={background_img}
        className="background_img"
        alt="background img"
      />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;