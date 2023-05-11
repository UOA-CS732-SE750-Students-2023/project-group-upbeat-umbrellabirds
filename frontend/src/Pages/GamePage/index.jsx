import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import "./index.css";
import { Button, Input, List } from "antd";
import music from "./../../assets/music.mp3"; // music=
import homeIcon from "./../../assets/home-icon.png"; // home icon
import timerIcon from "./../../assets/timer.png"; // timer icon
import submitIcon from "./../../assets/submit-icon.png"; // submit icon
import placeholder from "./../../assets/placeholder-img.png";
import ChatBox from "./../../components/ChatBox";
import CustomButton from "./../../components/custom-button";

import MusicPlayer from "../../components/MusicPlayer";
import socket from "../../socket";
import useGet from "../../hooks/useGet";
import usePut from "../../hooks/usePut";

export default function Game() {
  const [timer, setTimer] = useState(15); //倒计时时间
  const timerRef = useRef(); //设置延时器
  const [playMusic, setPlayMusic] = useState(true);
  const [isSubmit, setSubmit] = useState(false);
  const [currentImage, setCurrentImage] = useState(placeholder);
  const [isOwner, setIsOwner] = useState(false);
  const location = useLocation();

  const [roundNumber, setRoundNumber] = useState(0);
  const [gameInfo, setGameInfo] = useState(null);
  const [nextRoundText, setNextRoundText] = useState("View round results!");
  const [gameUpdate, setGameUpdate] = useState(null);
  const [guess, setGuess] = useState("");
  const [showGuess, setShowGuess] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [isRoundDone, setIsRoundDone] = useState(false);
  const [isGame, setIsGame] = useState(true);

  const { roomInfo, userName, isNewRoom, playerId, playerList, gameID } =
    location.state;
  const navigate = useNavigate();

  //user effect that loads all the images url into the image array
  useEffect(() => {
    async function initialise() {
      //i want to use placeholder and defaultImage for now
      // setImageArray([placeholder, defaultLogo, logo, defaultLogo, placeholder]);
      await checkOwner();
      socket.emit("tester", { tester: "hello worlds", roomInfo });
    }
    console.log("gameInfo", gameInfo);
    console.log("gameID", gameID);
    initialise();
  }, []);

  useEffect(() => {
    if (isRoundDone === true) {
      navigate("/roundResults", {
        state: {
          roomInfo: roomInfo,
          userName: userName,
          isNewRoom: isNewRoom,
          playerId: playerId,
          playerList: playerList,
          gameID: gameID,
        },
      });
    }
  }, [isRoundDone, navigate]);

  useEffect(() => {
    if (isGame == false) {
      navigate("/ratings", {
        state: {
          roomInfo: roomInfo,
          userName: userName,
          isNewRoom: isNewRoom,
          playerId: playerId,
          playerList: playerList,
          gameID: gameID,
        },
      });
    }
  }, [isGame, navigate]);

  useEffect(() => {
    async function initialise() {
      if (isOwner) {
        // let populate = usePut(
        //   `http://localhost:5001/api/game/newImages/${gameID}`
        // );
        await updateGame();
        console.log("gameInfo", gameInfo);
        console.log("I am owner");
      }
    }
    initialise();
  }, [isOwner]);

  useEffect(() => {
    console.log(isOwner);
    //game updates if not owner
    if (isOwner === false) {
      console.log("waiting for gameInfo");
      socket.on("setGameInfo", (data) => {
        console.log("gameInfoChange", data, roomInfo);
        console.log("gameInfo has been received", data);
        setGameInfo(data);
      });

      socket.on("tester", (data) => {
        console.log("tester", data);
      });

      socket.on("timerReset", () => {
        console.log("timer reset");
        const image = document.querySelector(".GuessButton");
        image.style.visibility = "visible";
        setTimer(15);
      });
      socket.on("roundDone", () => {
        setIsRoundDone(true);
      });

      
  }
    if (isOwner === true) {
      socket.off("setGameInfo");
      socket.off("rooms");
      socket.off("tester");

      socket.on("allGuessed", (guessedPlayers) => {
        console.log("all guessed", guessedPlayers);
        handleNextRound(guessedPlayers);
      });
    }
    socket.on("getRoundNumber", (roundNum) => {
      console.log("roundNumber", roundNum);
      setRoundNumber(roundNum);
  });
  }, [isOwner]);
  const updateGame = async () => {
    //update the game
    console.log("update game");
    let data = await usePut(`http://localhost:5001/api/game/round/${gameID}`);
    socket.emit("setRoundNumber", { roomInfo, roundNum: data.rounds.length });
    console.log("data", data);
    setGameInfo(data);
  };

  const checkRoundScores = async () => {
    const gameState = await useGet(`http://localhost:5001/api/game/${gameID}`);
    let roundNum = gameState.rounds.length;
    console.log("data of game", gameState, gameState.rounds[roundNum - 1], 'ruond number', roundNum);
    const guesses = await useGet(`http://localhost:5001/api/game/guesses/${gameID}/${roundNum}`);
    const numGuesses = guesses.length;
    let guessesArray = [];
    let playersArray = [];
    for (let i = 0; i < numGuesses; i++) {
      guessesArray.push(guesses[i].guess);
      playersArray.push(guesses[i].playerID);
    }
    const ratios = await useGet(`http://localhost:5001/api/sentence/check`, {
      params: { prompt: prompt, guesses: guessesArray },
    });
    console.log("ratios", ratios);

    for (let i = 0; i < ratios.length; i++) {
      ratios[i] = ratios[i] * 1000;
      await usePut(`http://localhost:5001/api/player/${playersArray[i]}`, {
        score: ratios[i],
      });
      await usePut(
        `http://localhost:5001/api/player/guesses/${playersArray[i]}`,
        {
          guess: guessesArray[i],
        }
      );
    }
  };

  useEffect(() => {
    if (gameInfo != null) {
      console.log(gameInfo, "sending game info");
      if (isOwner === true) {
        socket.emit("gameInfoChange", { gameInfo, roomInfo });
        console.log("sent");
      }
      console.log("gameInfo has been sent", gameInfo, roomInfo);
      console.log(roundNumber);
      if (roundNumber > 5) {
        setCurrentImage(placeholder);
        setPrompt("I am a hungry hippo!");
      } else {
        let curRound = roundNumber + 1;
        console.log(gameInfo, "gameInfo");
        console.log(roundNumber, "roundNum");

        setCurrentImage(gameInfo.images[curRound - 1].url);
        setPrompt(gameInfo.images[curRound - 1].prompt);
      }

      let roundNum = gameInfo.rounds.length;
      if (roundNum > 5) {
        roundNum = 5;
        setNextRoundText("Rate Other guesses!");
      }
      setShowGuess(true);
      socket.emit("timerReset", { roomInfo });
    }
  }, [gameInfo]);

  const submitGuess = async () => {
    
    setSubmit(true);
    setShowGuess(false);
    //submit the guess
    const image = document.querySelector(".GuessButton");
    image.style.visibility = "hidden";
    let curGuess = guess.trim();
    if (curGuess == "") {
      curGuess = "No Guess";
    }
    
    console.log("submit guess>", curGuess, "<guess");
    console.log(
      "gameID",
      gameInfo._id,
      "playerId",
      playerId,
      "guess",
      curGuess,
      "roundNumber",
      roundNumber
    );
    
    // const data = await usePut(
    //   `http://localhost:5001/api/game/guess/${gameInfo._id}`,
    //   { playerId: playerId, guess: curGuess, roundNumber: roundNumber }
    // );
    
    socket.emit("guessed", { playerId, roomInfo, curGuess });
    // console.log("data", data);

    // setGameInfo(data);
  };

  useEffect(() => {
    async function timerChange() {
      if (timer === 0) {
        if (!isSubmit) {
          await submitGuess();
        }
        console.log("sent Guess");
        if (isOwner) {
          // //wait 1 second
          // await new Promise((resolve) => setTimeout(resolve, 1000));
          // handleNextRound();
        }
        return;
      }
      timerRef.current = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => {
        clearTimeout(timerRef.current);
      };
    }
    timerChange();
  }, [timer]);

  // const updateGameResult = (idx, val) => {
  //   let newGameResult = gameResult.map(function (item, index) {
  //     if (index === idx) {
  //       return {
  //         ...item,
  //         isGood: val,
  //       };
  //     } else {
  //       return item;
  //     }
  //   });
  //   setGameResult(newGameResult);
  // };
  const submitAllGuesses = async (guessedPlayers) => {
    let state = await useGet(`http://localhost:5001/api/game/${gameID}`);
    for(let i = 0; i < guessedPlayers.length; i++){
      console.log(guessedPlayers[i]);
      let strID = guessedPlayers[i].playerID.toString();
      let response = await usePut(`http://localhost:5001/api/game/guess/${gameID}`, { playerId: strID, guess: guessedPlayers[i].curGuess, roundNumber: state.rounds.length });
      console.log("response", response);
    }
    return

  }



  const handleNextRound = async (guessedPlayers) => {
    console.log("next round")
    await submitAllGuesses(guessedPlayers);
    await checkRoundScores();
    if (roundNumber < 5) {
      // updateGame();
      socket.emit("roundDone", { roomInfo });

      // setRoundNumber(roundNumber + 1);
    } else {
      setIsGame(false);
    }
    const image = document.querySelector(".GuessButton");
    image.style.visibility = "visible";
  };

  const checkOwner = async () => {
    let curRoom = await useGet(`http://localhost:5001/api/room/${roomInfo}/`);
    if (curRoom.owner === playerId) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  };

  //use effect that sets current image when round number changes
  useEffect(() => {
    if (roundNumber > 5) {
      return;
    }
  }, [roundNumber]);

  const handleGuessChange = (e) => {
    setGuess(e.target.value);
    console.log(guess);
  };

  return (
    <>
      <div class="page">
        <div class="RoundImage">
          <img src={currentImage} style={{ width: 200, height: 200 }} />
        </div>

        <div class="Chatbox">
          <ChatBox roomInfo={roomInfo} userName={userName} gameId={gameID} />
        </div>

        <div class="RoundHeader">
          <h1 id="RoundText">Round {roundNumber}/5</h1>
        </div>

        <div class="PromptInput">
          <Input onChange={handleGuessChange}></Input>
        </div>

        <div class="Button">
          <div class="GuessButton">
            <CustomButton
              class="SubmitButton"
              style={{ width: 150, height: 60 }}
              onClick={submitGuess}
            >
              <span>Guess</span>

              <img
                className="guess-image"
                src={submitIcon}
                style={{ width: 30, height: 30, marginLeft: 20 }}
              />
            </CustomButton>
          </div>
          {isOwner && timer < 30 && (
            <div class="SubmitButton">
              <CustomButton
                class="SubmitButton"
                style={{ width: 150, height: 60 }}
                onClick={handleNextRound}
              >
                <span>{nextRoundText}</span>
                <img
                  src={submitIcon}
                  style={{ width: 50, height: 30, marginLeft: 20 }}
                />
              </CustomButton>
            </div>
          )}
          ;
        </div>
        <div class="Audio">
          <div class="AudioIcon">
            <MusicPlayer audioURL={music} volume={1} isMuted={false} />
          </div>
        </div>
        <div class="Home">
          <div class="HomeIcon">
            <img
              src={homeIcon}
              style={{ width: "48px", height: "48px" }}
              onClick={() => {
                window.history.back();
              }}
            ></img>
          </div>
        </div>
        <div class="Timer">
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
      </div>
    </>
  );
}
