import React from "react";
import "./playerPodiumResults.css";
import Podium from "./../assets/podium.png";
import first from "./../assets/first.png";
import second from "./../assets/second.png";
import third from "./../assets/third.png";
import PlayerProfile from "./player-profile";
import StartIcon from "./../assets/start-icon.png";

export default function playerPodiumResults() {
  return (
    <div class="podium-container">
      <div class="Podium-Second">
        <img className="user second" src={StartIcon}></img>
        <img className="stage" src={second}></img>
      </div>
      <div class="Podium-First">
        <img className="user first" src={StartIcon}></img>
        <img className="stage" src={first}></img>
      </div>
      <div class="Podium-Third">
        <img className="user third" src={StartIcon}></img>
        <img className="stage" src={third}></img>
      </div>
    </div>
  );
}
