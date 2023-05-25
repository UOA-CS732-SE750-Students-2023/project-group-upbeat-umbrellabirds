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
// const fs = require('fs');
// const https = require('https');

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

  const download = async (image, index) => {
    const imageUrl = image.url;
    const imageName = `image_${index + 1}.png`;

    // console.log(imageUrl);
    // const link = document.createElement("a");
    // link.href = imageUrl;
    // link.download = imageName;
    // link.target = '_blank';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    // const file = fs.createWriteStream(imageName);

    // fetch(imageUrl)
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     const downloadLink = document.createElement("a");
    //     downloadLink.href = URL.createObjectURL(blob);
    //     downloadLink.download = imageName;
    //     downloadLink.click();
    //   })
    //   .catch((error) => {
    //     console.error("Error downloading image:", error);
    //   });

    // fetch(imageUrl)
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", imageName);
    //     document.body.appendChild(link);
    //     link.click();
    //     link.parentNode.removeChild(link);
    //   })
    //   .catch((error) => {
    //     console.error("Error downloading image:", error);
    //   });
  };

  const downloadImages = async () => {
    const images = await useGet(`${URI}api/game/${gameID}/images`);

    console.log(images);

    images.forEach(async (image, index) => {
      image = image.url;
    });

    console.log(images);

    // Create a temporary container element
    const container = document.createElement("div");

    // Iterate over the image URLs
    for (let i = 0; i < images.length; i++) {
      // Create an anchor element for each image URL
      const anchor = document.createElement("a");
      anchor.href = images[i];
      anchor.download = `image${i + 1}.png`; // Set the desired filename for the image

      // Append the anchor element to the container
      container.appendChild(anchor);
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

    // images.forEach(async (image, index) => {
    //   await download(image, index);
    //   console.log("inside", image);
    //   // const file = fs.createWriteStream(imageName);
    //   // const request = https.get(imageUrl, function(response) {
    //   // response.pipe(file);
    // });
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
          text="Download Game Images"
          onClick={() => downloadImages()}
        ></CustomButton>
      </div>
    </div>
  );
}

export default GameResults;
