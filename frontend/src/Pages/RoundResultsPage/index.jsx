import React from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import "./index.css";

import timerIcon from "./../../assets/timer.png"; // timer icon
import PlayerProfile from "../../components/player-profile";
import StartIcon from "../../assets/start-icon.png";
import placeholder from "../../assets/placeholder-img.png";
import firstMedal from "../../assets/1st.png";
import secondMedal from "../../assets/2nd.png";
import thirdMedal from "../../assets/3rd.png";
import { useEffect } from "react";
import useGet from "../../hooks/useGet";
import socket from "../../socket";

function RoundResults() {
  const timerRef = useRef();
  const styleFirst = {
    transform: "scale(1.1)",
  };

  const styleSecond = {
    transform: "scale(0.95)",
  };

  const styleThird = {
    transform: "scale(0.8)",
  };
  const [firstPlayer, setFirstPlayer] = useState({});
  const [secondPlayer, setSecondPlayer] = useState({});
  const [thirdPlayer, setThirdPlayer] = useState({});

  const [currentPlayer, setCurrentPlayer] = useState({});

  const [roundNumber, setRoundNumber] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [timer, setTimer] = useState(20);
  const [isOwner, setIsOwner] = useState(false);
  const location = useLocation();

  const getPlayer = async () => {
    let thisPlayer = await useGet(
      `http://localhost:5001/api/player/${playerId}/`
    );
    setCurrentPlayer(thisPlayer);
    console.log(thisPlayer);
  };

  const checkOwner = () => {
    if (playerId === roomInfo.owner) {
      setIsOwner(true);
    }
  };

  useEffect(() => {
    checkOwner();
    getPlayer();
    socket.on(
      "roundResults",
      ({
        gameID,
        roundNumber,
        prompt,
        firstPlayer,
        secondPlayer,
        thirdPlayer,
      }) => {
        console.log("We are at socket connection");
        if (gameId === gameID) {
          setRoundNumber(roundNum);
          setPrompt(roundPrompt);
          setFirstPlayer(first);
          setSecondPlayer(second);
          setThirdPlayer(third);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (timer === 0) {
      //   handleNextRound();
      return;
    }
    timerRef.current = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [timer]);

  useEffect(() => {
    isOwnerLoad();
  }, [isOwner]);

  const isOwnerLoad = async () => {
    if (isOwner === true) {
      //get all the scores given players array

      const currentRoundNumber = await useGet(
        `http://localhost:5001/api/game/round/${gameID}/`
      );
      let players = [];
      for (let i = 0; i < playerList.length; i++) {
        let player = await useGet(
          `http://localhost:5001/api/player/${playerList[i]}/`
        );
        players.push(player);
        console.log(player);
      }
      let scores = [];
      for (let i = 0; i < playerList.length; i++) {
        let playerScore = await useGet(
          `http://localhost:5001/api/player/score/${playerList[i]}/`
        );
        scores.push(playerScore);
      }
      const indices = scores.map((value, index) => index);
      indices.sort((a, b) => scores[b] - scores[a]);
      const sortedScores = indices.map((index) => scores[index]);
      const sortedPlayers = indices.map((index) => players[index]);
      console.log(
        "gameID: ",
        gameID,
        "roundNumber: ",
        currentRoundNumber,
        "prompt: ",
        prompt,
        "firstPlayer: ",
        sortedPlayers[0],
        "secondPlayer: ",
        sortedPlayers[1],
        "thirdPlayer: ",
        sortedPlayers[2]
      );
      socket.emit("roundResults", {
        gameID: gameID,
        roundNumber: currentRoundNumber,
        prompt: prompt,
        firstPlayer: sortedPlayers[0],
        secondPlayer: sortedPlayers[1],
        thirdPlayer: sortedPlayers[2],
      });

      //sort the scores
    }
  };

  const { roomInfo, userName, isNewRoom, playerId, playerList, gameID } =
    location.state;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          Round {roundNumber} Prompt: {prompt}
        </h1>
      </div>

      <div className="first-place">
        <div className="first-image">
          <PlayerProfile
            style={styleFirst}
            picture={firstPlayer.profileURL}
            name={firstPlayer.name}
            random="false"
          />
        </div>
        <img className="first-medal" src={firstMedal} />
        <div className="score-details">
          <h2>
            {firstPlayer.score} + {firstPlayer.lastScore}
          </h2>
          <p>{firstPlayer.lastGuess}</p>
        </div>
      </div>

      <div className="second-place">
        <div className="second-image">
          <PlayerProfile
            style={styleSecond}
            picture={secondPlayer.profileURL}
            name={secondPlayer.name}
            random="false"
          />
        </div>
        <img className="second-medal" src={secondMedal} />
        <div className="score-details">
          <h2>
            {secondPlayer.score} + {secondPlayer.lastScore}
          </h2>
          <p>{secondPlayer.lastGuess}</p>
        </div>
      </div>

      <div className="third-place">
        <div className="third-image">
          <PlayerProfile
            style={styleThird}
            picture={thirdPlayer.profileURL}
            name={thirdPlayer.name}
            random="false"
          />
        </div>
        <img className="third-medal" src={thirdMedal} />
        <div className="score-details">
          <h2>
            {thirdPlayer.score} + {thirdPlayer.lastScore}
          </h2>
          <p>{thirdPlayer.lastGuess}</p>
        </div>
      </div>

      <div className="page-footer">
        <div class="timer">
          <div class="TimerIcon">
            <img
              src={timerIcon}
              style={{ width: "48px", height: "48px" }}
            ></img>
            {timer == "0" ? (
              ""
            ) : (
              <div style={{ color: "black", marginLeft: "20px" }}>{timer}s</div>
            )}
          </div>
        </div>
        <h2 className="user">
          {currentPlayer.name} Current Score:{currentPlayer.name} lastScore:
          {currentPlayer.name}
        </h2>
      </div>
    </div>
  );
}

export default RoundResults;
