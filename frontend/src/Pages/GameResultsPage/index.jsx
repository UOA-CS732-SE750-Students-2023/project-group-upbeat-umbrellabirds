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
  console.log("GameResults");
  const URI = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const location = useLocation();
  const { roomInfo, userName, isNewRoom, playerId, playerList, gameID } =
    location.state;
  const [players, setPlayers] = useState([]);
  const [sortedPlayerList, setSortedPlayerList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(playerList, "player");

  useEffect(() => {
    console.log("useEffect");
    const getPlayers = async () => {
      const gamePlayersIds = playerList;
      console.log(gamePlayersIds, "gamePlayersIds");
      console.log(roomInfo, "roomInfo");
      const playerScores = [];
      const playerObjects = [];
      for (let i = 0; i < gamePlayersIds.length; i++) {
        const player = await useGet(
          `${URI}api/player/${gamePlayersIds[i]._id}`
        );
        console.log(player, "Game player");
        playerScores.push(player.score);
        playerObjects.push(player);
      }
      console.log(playerScores, "this is the score");
      // Create an array of objects with both the score and the player
      const playersWithScores = playerScores.map((score, index) => ({
        score,
        player: playerObjects[index],
      }));
      // Sort the array based on the scores
      playersWithScores.sort((a, b) => (a.score < b.score ? 1 : -1));
      // Extract the sorted players back into a separate array
      const sortedPlayers = playersWithScores.map(({ player }) => player);
      //rnadomize the array
      console.log(sortedPlayers, "sorted");

      console.log("testing");
      setPlayers(sortedPlayers);
    };

    getPlayers();
  }, []);

  useEffect(() => {
    const updateplayerList = (players) => {
      if (players.length === 0) return;
      console.log(players, "palyers");
      const playerListHere = [];
      for (let i = 0; i < players.length; i++) {
        playerListHere.push({
          avatarURL: players[i].profileURL,
          name: players[i].name,
          score: players[i].score,
        });
      }
      console.log(playerListHere, "top");
      setSortedPlayerList(playerListHere);
      setIsLoading(false);
    };
    updateplayerList(players);
  }, [players]);

  useEffect(() => {
    console.log("sorted plyaers", sortedPlayerList);
  }, [sortedPlayerList]);

  const renderPlayer = (index) => {
    console.log(index, "hello");
    if (index < 3 || sortedPlayerList == null || sortedPlayerList.length <= 3)
      return;
    console.log(index, "indextest");
    const player = sortedPlayerList[index];
    console.log(player, "player");
    return (
      <div key={player.place} className="grid-cell">
        <PlayerGameResults
          place={`${index + 1}th`}
          avatarUrl={player.profileURL}
          name={player.name}
          points={player.score}
        />
      </div>
    );
  };

  const playAgainOnClick = () => {
    navigate("/");
  };

  const downloadImages = async () => {
    const images = await useGet(`${URI}api/game/${gameID}/images`);
    console.log(images);
    // Create a temporary container element
    const container = document.createElement("div");

    // Iterate over the image URLs
    for (let i = 0; i < images.length; i++) {
      // download(images[i], i)
    }

    // Append the container to the document body
    document.body.appendChild(container);

    // Simulate a click event on each anchor element
    const anchors = container.querySelectorAll("a");
    for (let i = 0; i < anchors.length; i++) {
      anchors[i].click();
    }

    // Clean up by removing the container from the document body
    document.body.removeChild(container);

    for (let index = 0; index < images.length; index++) {
      const image = images[index];
      const imageUrl = image.url;
      console.log(image, "image");
      const imageName = `image_${index + 1}.png`;
      const newTab = window.open(imageUrl, "_blank");

      // newTab.document.title = imageName;
      console.log(imageName, "imageName");
      newTab.document.write(`
  <html>
    <head>
      <title>Images</title>
      <style>
      body {background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
      flex-direction: column;}
      h2 {color: white; text-align: center; width: 70%;}
      </style>
    </head>
    <body >
      ${images
        .map(
          (image, index) =>
            `<h2> ${image.prompt} </h2>
          <a href="${image.url}" target="_blank">
          <img src="${image.url}" alt="image_${index + 1}.png" /><br />
        </a>`
        )
        .join("")}
    </body>
  </html>
`);
      newTab.document.close();
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before opening the next tab
    }
  };

  return (
    <div className="game-results-container">
      <div className="results-header">
        <h1 className="heading">Final Results</h1>
      </div>
      {sortedPlayerList.length >= 3 && (
        <>
          <div className="podium-results">
            <PlayerPodiumResults
              firstPlace={sortedPlayerList[0]}
              secondPlace={sortedPlayerList[1]}
              thirdPlace={sortedPlayerList[2]}
            />
          </div>
        </>
      )}
      {sortedPlayerList.length > 3 ? (
        <div>
          <div className="grid-container">
            {sortedPlayerList.map((player, index) => renderPlayer(index))}
          </div>
          <div>{sortedPlayerList.length}</div>
        </div>
      ) : (
        <></>
      )}
      <div className="button">
        <CustomButton
          text="Play Again"
          onClick={() => playAgainOnClick()}
        ></CustomButton>

        <CustomButton
          text="View Game Images"
          onClick={() => downloadImages()}
        ></CustomButton>
      </div>
    </div>
  );
}

export default GameResults;
