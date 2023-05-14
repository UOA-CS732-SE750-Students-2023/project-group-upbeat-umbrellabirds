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
  const URI = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const { roomInfo, userName, isNewRoom, playerId, playerList, gameID } =
    location.state;
  const [players, setPlayers] = useState([]);
  // const [playerList, setplayerList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(playerList,"player")

  // useEffect(() => {
  //   const getPlayers = async () => {
  //     const gamePlayersIds = playerList;
  //     const playerScores = [];
  //     const playerObjects = [];
  //     for (let i = 0; i < gamePlayersIds.length; i++) {
  //       const player = await useGet(`${URI}api/player/${gamePlayersIds[i]._id}`);
  //       playerScores.push(player.score);
  //       playerObjects.push(player);
  //     }
  //     console.log(playerScores, "this is the score");
  //     // Create an array of objects with both the score and the player
  //     const playersWithScores = playerScores.map((score, index) => ({
  //       score,
  //       player: playerObjects[index],
  //     }));
  //     // Sort the array based on the scores
  //     playersWithScores.sort((a, b) => (a.score < b.score ? 1 : -1));
  //     // Extract the sorted players back into a separate array
  //     const sortedPlayers = playersWithScores.map(({ player }) => player);
  //     console.log(sortedPlayers,"sorted");
  //     setPlayers(sortedPlayers);
  
  //     updateplayerList(sortedPlayers);
  //   };
  
  //   const updateplayerList = (players) => {
  //     console.log(players,"palyers");
  //     const playerList = [];
  //     for (let i = 0; i < 3; i++) {
  //       playerList.push({
  //         avatarURL: players[i].profileURL,
  //         name: players[i].name,
  //         score: players[i].score,
  //       });
  //     }
  //     console.log(playerList,"top");
  //     setplayerList(playerList);
  //     setIsLoading(false);
  //   };
  
  //   getPlayers();
  // }, []);

  // const renderPlayer = (index) => {
  //   const player = players[index];
  //   console.log(player,"player");
  //   return (
  //     <div key={player.place} className="grid-cell">
  //       <PlayerGameResults
  //         place={`${index + 4}th`}
  //         avatarUrl={player.profileURL}
  //         name={player.name}
  //         points={player.score}
  //       />
  //     </div>
  //   );
  // };
  const playAgainOnClick = ()=>{
    navigate("/")
  }

  return (
    <div className="game-results-container">
      <div className="results-header">
        <h1 className="heading">Final Results</h1>
      </div>
      {playerList.length === 3 && (
        <>
          <div className="podium-results">
            <PlayerPodiumResults
              firstPlace={playerList[0]}
              secondPlace={playerList[1]}
              thirdPlace={playerList[2]}
            />
          </div>
          {/* <div className="grid-container">{players.map(renderPlayer)}</div> */}
        </>
      ) }
      <div className="button">
        <CustomButton
          text="Play Again"
          onClick={() => playAgainOnClick()}
        ></CustomButton>
      </div>
    </div>
  );
}

export default GameResults;
