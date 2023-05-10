import { useEffect, useState } from "react";
import { Button, Input, Modal, Space, message } from "antd";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { CopyOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";
import CustomButton from "../../components/custom-button";
import usePost from "../../hooks/usePost";
import useGet from "../../hooks/useGet";
import PlayerProfile from "../../components/player-profile";
import defaultLogo from "./../../assets/default-profile.jpg"
import placeholder from "./../../assets/placeholder-img.png"
import audioOn from "./../../assets/audio-on.png"
import homeIcon from "./../../assets/home-icon.png"
import PlayerGameResults from "../../components/playerGameResults"
import PlayerPodiumResults from "../../components/playerPodiumResults"


function GameResults() {


    // Fetch the values for the top 3 playes
    const topPlayers = [
        { place: "1st", avatarURL: placeholder, name: "Aden", points: 30 },
        { place: "2nd", avatarURL: placeholder, name: "Avi", points: 20 },
        { place: "3rd", avatarURL: placeholder, name: "Cale", points: 10 }
    ];

    return (
        <div className="App-ResultsPage">
            <div className="results_header">
                <h1 className="heading">Final Results</h1>
                <img src={audioOn} alt="Home" className="audio-icon" />
                <img src={homeIcon} alt="Audio" className="home-icon" />
            </div>

            <div className="podium-results">

                <PlayerPodiumResults firstPlace={topPlayers[0]} secondPlace={topPlayers[1]} thirdPlace={topPlayers[2]} />

            </div>

            <div className="grid-container">
                    <div className="grid-cell"><PlayerGameResults place={"4th"} avatarUrl={placeholder} name={"Cale"} points={"10"} /></div>
                    <div className="grid-cell"><PlayerGameResults place={"5th"} avatarUrl={placeholder} name={"Cale"} points={"10"} /></div>
                    <div className="grid-cell"><PlayerGameResults place={"6th"} avatarUrl={placeholder} name={"Cale"} points={"10"} /></div>
                    <div className="grid-cell"><PlayerGameResults place={"7th"} avatarUrl={placeholder} name={"Cale"} points={"10"} /></div>
                    <div className="grid-cell"><PlayerGameResults place={"8th"} avatarUrl={placeholder} name={"Cale"} points={"10"} /></div>
                </div>


            <div className="button">
                <CustomButton>Play Again</CustomButton>
            </div>
        </div >
    );
}

export default GameResults;
