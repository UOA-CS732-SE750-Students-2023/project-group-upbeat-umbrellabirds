import React from "react";
import "./playerPodiumResults.css";
import Podium from "./../assets/podium.png";
import first from "./../assets/first.png";
import second from "./../assets/second.png";
import third from "./../assets/third.png";
import PlayerProfile from "./player-profile";
import StartIcon from "./../assets/start-icon.png";

export default function playerPodiumResults({ firstPlace, secondPlace, thirdPlace }) {

    return (
        <div class="podium-container">
            <div class="Podium-Second">
                <h3 className="points-second">{secondPlace.points} pts</h3>
                <img className="user-second" src={secondPlace.avatarURL}></img>
                <h3 className="name-second">{secondPlace.name}</h3>
                <img className="stage" src={second}></img>
                
            </div>
            <div class="Podium-First">
                <h3 className="points-first">{firstPlace.points} pts</h3>
                <img className="user-first" src={firstPlace.avatarURL}></img>
                <h3 className="name-first">{firstPlace.name}</h3>
                <img className="stage" src={first}></img>
            </div>
            <div class="Podium-Third">
                <h3 className="points-third">{thirdPlace.points} pts</h3>
                <img className="user-third" src={thirdPlace.avatarURL}></img>
                <h3 className="name-third">{thirdPlace.name}</h3>
                <img className="stage" src={third}></img>
            </div>
        </div>
    );
}
