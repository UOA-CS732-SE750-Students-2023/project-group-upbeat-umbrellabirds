import { useEffect, useState } from "react";
import { Button, Input, Modal, Space, message } from "antd";
import "./index.css";
import CustomButton from "../../components/custom-button";
import usePost from "../../hooks/usePost";
import useGet from "../../hooks/useGet";
import placeholder from "./../../assets/placeholder-img.png"
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

    // Fetch info for all players of the game
    const playersResults = () => {

    }

    const players = [
        { place: "4th", avatarURL: placeholder, name: "AdenAdenAdenAdenAdenAdenAdenAdenAden", points: 30 },
        { place: "5th", avatarURL: placeholder, name: "Avi", points: 20 },
        { place: "6th", avatarURL: placeholder, name: "Cale", points: 10 },
        { place: "6th", avatarURL: placeholder, name: "Cale", points: 10 }
    ];

    function renderPlayer(player) {
        return (
            <div key={player.place} className="grid-cell">
                <PlayerGameResults place={player.place} avatarUrl={player.avatarURL} name={player.name} points={player.points} />
            </div>
        );
    }

    return (
        <div className="game-results-container">
            <div className="results-header">
                <h1 className="heading">Final Results</h1>
            </div>

            <div className="podium-results">

                <PlayerPodiumResults firstPlace={topPlayers[0]} secondPlace={topPlayers[1]} thirdPlace={topPlayers[2]} />

            </div>

            <div className="grid-container">
                {players.map(renderPlayer)}
            </div>


            <div className="button">
                <CustomButton text="Play Again"></CustomButton>
            </div>
        </div >
    );
}

export default GameResults;
