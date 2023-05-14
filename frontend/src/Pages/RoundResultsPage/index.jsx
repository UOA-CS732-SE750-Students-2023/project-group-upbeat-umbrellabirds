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

function RoundResults(props) {

  const URI = import.meta.env.VITE_API_URL;
  console.log(props,"roundresults props");
  const prompt = props.prompt;
  const roundNumber= props.round;
  const firstPlayer =props.firstPlayer;
  const secondPlayer = props.secondPlayer;
  const thirdPlayer = props.thirdPlayer;
  const currentPlayer = props.currentPlayer;
  // const navigate = useNavigate();
  // const location = useLocation();
  // const { roomInfo, userName, isNewRoom, playerId, playerList, gameID } =
  //   location.state;

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

  // const [gotRoundResults, setGotRoundResults] = useState(false);
  // const [backToGame, setBackToGame] = useState(false);

  // const [currentPlayer, setCurrentPlayer] = useState({});

  // const [roundNumber, setRoundNumber] = useState(1);
  // const [prompt, setPrompt] = useState("");
  const [timer, setTimer] = useState(10);
  // const [isOwner, setIsOwner] = useState(false);

  // const [playersSorted, setPlayersSorted] = useState([]);

  // useEffect(() => {
    
  //   socket.on(
  //     "getRoundResults",
  //     ({
  //       gameID,
  //       roundNumber,
  //       prompt,
  //       firstPlayer,
  //       secondPlayer,
  //       thirdPlayer,
  //     }) => {
  //       console.log("We are at socket connection");

  //         setRoundNumber(roundNumber);
  //         setPrompt(prompt);
  //         setFirstPlayer(firstPlayer);
  //         setSecondPlayer(secondPlayer);
  //         setThirdPlayer(thirdPlayer);
  //     }
  //   );
  //   socket.on("recievingRoundResults", () => {
  //     console.log("We are at socket connection getting results  ");
  //   });
  // }, []);


  // useEffect(() => {
  //   if (backToGame) {
  //     navigate("/game", {
  //       state: {
  //         roomInfo: roomInfo,
  //         userName: userName,
  //         isNewRoom: isNewRoom,
  //         playerId: playerId,
  //         playerList: playerList,
  //         gameID: gameID,
  //       }
  //     });
  //   }
  // }, [backToGame]);


  // const getPlayer = async () => {
  //   let thisPlayer = await useGet(
  //     `${URI}api/player/${playerId}/`
  //   );
  //   setCurrentPlayer(thisPlayer);
  //   console.log(thisPlayer);
  // };

  // const checkOwner = async () => {
  //   let curRoom = await useGet(`${URI}api/room/${roomInfo}/`);
  //   if (playerId === curRoom.owner) {
  //     setIsOwner(true);
  //   }
  // };

  // useEffect(() => {
  //   checkOwner();
  //   getPlayer();
  // }, []);



  useEffect(() => {
    // if (timer === 0) {
    //   setBackToGame(true);
    //   return;
    // }
    timerRef.current = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [timer]);

  // useEffect(() => {
  //   isOwnerLoad();
  //   console.log("I am owner: ", isOwner);
  // }, [isOwner]);

  // const isOwnerLoad = async () => {
  //   if (isOwner === true) {
  //     console.log("I am owner: inside the is ownerLoad", isOwner);
  //     //get all the scores given players array

  //     const currentRoundNumber = await useGet(
  //       `${URI}api/game/round/${gameID}/`
  //     );
  //     setRoundNumber(currentRoundNumber);
  //     let players = [];
  //     let scores = [];

      
  //     setGotRoundResults(true);

  //     //sort the scores
  //   }
  // };

  // useEffect(() => {
  //   if (gotRoundResults === true) {
  //     console.log(
  //       "gameID: ",
  //       gameID,
  //       "roundNumber: ",
  //       roundNumber,
  //       "prompt: ",
  //       prompt,
  //       "firstPlayer: ",
  //       playersSorted[0],
  //       "secondPlayer: ",
  //       playersSorted[1],
  //       "thirdPlayer: ",
  //       playersSorted[2]
  //     );
  //     socket.emit("SendingRoundResults", roomInfo);
  //     socket.emit("roundResults", {
  //       gameID: gameID,
  //       roundNumber: roundNumber,
  //       prompt: prompt,
  //       firstPlayer: playersSorted[0],
  //       secondPlayer: playersSorted[1],
  //       thirdPlayer: playersSorted[2],
  //       roomInfo: roomInfo,
  //     });
  //   }
  // }, [gotRoundResults]);


  return (
    <div className="round-results-container">
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
          <div class="TimerIcon" style={{ marginRight:"500px" }}>
            <img
              src={timerIcon}
              style={{ width: "48px", height: "48px"}}
            ></img>
            {timer == "0" ? (
              ""
            ) : (
              <div style={{ color: "black", marginLeft: "20px" }}>{timer}s</div>
            )}
          </div>
        </div>
        <h2 className="user">
          {currentPlayer.name}: Current Score:{currentPlayer.score} lastScore:
          {currentPlayer.lastScore}
        </h2>
      </div>
    </div>
  );
}

export default RoundResults;