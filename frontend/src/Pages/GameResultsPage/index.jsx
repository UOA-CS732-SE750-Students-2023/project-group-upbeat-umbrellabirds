import { useEffect, useState } from "react";
import { Button, Input, Modal, Space, message } from "antd";
import "./index.css";
import CustomButton from "../../components/customButton";
import usePost from "../../hooks/usePost";
import useGet from "../../hooks/useGet";
import placeholder from "./../../assets/placeholder-img.png";
import homeIcon from "./../../assets/home-icon.png";
import PlayerGameResults from "../../components/playerGameResults";
import PlayerPodiumResults from "../../components/playerPodiumResults";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function GameResults() {
    const URI = "http://localhost:5001";
  location = useLocation();
//   const { roomInfo, userName, isNewRoom, playerId, playerList, gameID } =
//     location.state;

// const roomInfo = 
  const [players, setPlayers] = useState([]);

  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    const getPlayers = async () => {
      const gameState = await useGet(
        `${URI}api/room/${roomInfo}`
      );
      const gamePlayersIds = gameState.playersID;
      const playerScores = [];
      const playerObjects = [];
      for (let i = 0; i < gamePlayers.length; i++) {
        const player = await useGet(
          `${URI}api/player/${gamePlayersIds[i]}`
        );
        playerScores.push(player.score);
        playerObjects.push(player);
      }
      // Create an array of objects with both the score and the player
      const playersWithScores = playerScores.map((score, index) => ({
        score,
        player: playerObjects[index],
      }));
      // Sort the array based on the scores
      playersWithScores.sort((a, b) => (a.score < b.score ? 1 : -1));
      // Extract the sorted players back into a separate array
      const sortedPlayers = playersWithScores.map(({ player }) => player);

        setPlayers(sortedPlayers);
    };
    getPlayers();
    return () => {
      console.log("GameResults unmounted");
    };
  }, []);

  useEffect(() => {
    //populate podium
    if (players.length > 0) {
      for (let i = 0; i < 3; i++) {
        topPlayers[i].avatarURL = players[i].profileURL;
        topPlayers[i].name = players[i].name;
        topPlayers[i].points = players[i].score;
      }
      for (let i = 3; i < players.length; i++) {
        players[i].place = i + 1;
      }
    }
  }, [players]);

  // // Fetch the values for the top 3 players
  // const topPlayers = [
  //     { place: "1st", avatarURL: placeholder, name: "Aden", points: 30 },
  //     { place: "2nd", avatarURL: placeholder, name: "Avi", points: 20 },
  //     { place: "3rd", avatarURL: placeholder, name: "Cale", points: 10 }
  // ];

  // Fetch info for all players of the game
//   const playersResults = () => {};

//   const players = [
//     {
//       place: "4th",
//       avatarURL: placeholder,
//       name: "AdenAdenAdenAdenAdenAdenAdenAdenAden",
//       points: 30,
//     },
//     { place: "5th", avatarURL: placeholder, name: "Avi", points: 20 },
//     { place: "6th", avatarURL: placeholder, name: "Cale", points: 10 },
//     { place: "6th", avatarURL: placeholder, name: "Cale", points: 10 },
//   ];

  function renderPlayer(player) {
    return (
      <div key={player.place} className="grid-cell">
        <PlayerGameResults
          place={player.place}
          avatarUrl={player.avatarURL}
          name={player.name}
          points={player.points}
        />
      </div>
    );
  }

  return (
    <div className="game-results-container">
      <div className="results-header">
        <h1 className="heading">Final Results</h1>
      </div>

      <div className="podium-results">
        <PlayerPodiumResults
          firstPlace={topPlayers[0]}
          secondPlace={topPlayers[1]}
          thirdPlace={topPlayers[2]}
        />
      </div>

      <div className="grid-container">{players.map(renderPlayer)}</div>

      <div className="button">
        <CustomButton text="Play Again"></CustomButton>
      </div>
    </div>
  );
}

export default GameResults;
