import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import "./index.css";
import { Button, Input, List } from "antd";
import music from "./../../assets/music.mp3"; // music
import likedIcon from "./../../assets/liked.png"; // empty heart
import unlikedIcon from "./../../assets/unliked.png"; // full heart
import firstIcon from "./../../assets/1st.png"; // medal 1st
import secondIcon from "./../../assets/2nd.png"; // medal 2nd
import thirdIcon from "./../../assets/3rd.png"; // medal 3rd
import sendMs from "./../../assets/logo.png"; // next arrow icon
import homeIcon from "./../../assets/home-icon.png"; // home icon
import audioOn from "./../../assets/audio-on.png"; // audio icon
import audioOff from "./../../assets/audio-off.png"; // disabled audo icon
import timerIcon from "./../../assets/timer.png"; // timer icon
import submitIcon from "./../../assets/submit-icon.png"; // submit icon
import placeholder from "./../../assets/placeholder-img.png";
import ChatBox from "./../../components/ChatBox";
import CustomButton from "./../../components/custom-button";
import logo from "./../../assets/logo.png"; //temp holder image

import defaultLogo from "./../../assets/default-profile.jpg";
import MusicPlayer from "../../components/MusicPlayer";
import socket from "../../socket";
import useGet from "../../hooks/useGet";
import usePut from "../../hooks/usePut";
import usePost from "../../hooks/usePost";
import PlayerProfile from "../../components/player-profile";

export default function Game() {
  const rankImg = [secondIcon, firstIcon, thirdIcon];
  const [isranking, setRanking] = useState(0);
  const [rankingStatus, setRankingStatus] = useState(false);
  //   const [socket, setSocket] = useState(null);
  const [sendMessageValue, setOnMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [timer, setTimer] = useState(0); //倒计时时间
  const timerRef = useRef(); //设置延时器
  const [isPlay, setPlay] = useState(true);
  const [imageArray, setImageArray] = useState([]); //image array
  const result = [
    { data: 0, isGood: 0 },
    { data: 0, isGood: 0 },
    { data: 0, isGood: 0 },
    { data: 0, isGood: 0 },
  ];
  const [gameResult, setGameResult] = useState(result);
  const [playMusic, setPlayMusic] = useState(true);
  const [isSubmit, setSubmit] = useState(false);
  const [currentImage, setCurrentImage] = useState(placeholder);
  const [isOwner, setIsOwner] = useState(false);
  const [gameID, setGameID] = useState("645a402d4bb17c536a27fef2");
  const location = useLocation();
  const { roomInfo, userName, isNewRoom, playerId } = location.state;
  const [roundNumber, setRoundNumber] = useState(1);
  const [gameInfo, setGameInfo] = useState(null);
  const [nextRoundText, setNextRoundText] = useState("Next Round");
  const [gameUpdate, setGameUpdate] = useState(null);
  const [guess, setGuess] = useState("");
  const [showGuess, setShowGuess] = useState(true);
  const [prompt, setPrompt] = useState("");

  //user effect that loads all the images url into the image array
  useEffect(() => {
    async function initialise() {
      //i want to use placeholder and defaultImage for now
      // setImageArray([placeholder, defaultLogo, logo, defaultLogo, placeholder]);
      await checkOwner();
      socket.emit("tester", { tester: "hello worlds", roomInfo });
    }
    initialise();
  }, []);

  useEffect(() => {
    async function initialise() {
      if (isOwner) {
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
        console.log("gameInfo has been received", gameInfo);
        setGameInfo(data);
      });

      socket.on("tester", (data) => {
        console.log("tester", data);
      });
    }
    if (isOwner === true) {
      socket.off("setGameInfo");
      socket.off("rooms");
      socket.off("tester");
    }
  }, [isOwner]);
  const updateGame = async () => {
    //update the game
    console.log("update game");
    const data = await usePut(`http://localhost:5001/api/game/round/${gameID}`);
    console.log("data", data);
    setGameInfo(data);
  };

  const checkRoundScores = async () => {
    console.log("check round scores");
    const gameState = await useGet(`http://localhost:5001/api/game/${gameID}`);
    console.log("data", gameState);
    let numGuesses = gameState.rounds[roundNumber - 1].guesses.length;
    let guessesArray = [];
    let playersArray = [];
    for (let i = 0; i < numGuesses; i++) {
      guessesArray.push(gameState.rounds[roundNumber - 1].guesses[i].guess);
      playersArray.push(gameState.rounds[roundNumber - 1].guesses[i].playerID);
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
      await usePut(`http://localhost:5001/api/player/guesses/${playersArray[i]}`, {
        guess: guessesArray[i]
      })
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
        setCurrentImage(gameInfo.images[roundNumber].url);
        setPrompt(gameInfo.images[roundNumber].prompt);
      }

      let roundNum = gameInfo.rounds.length;
      setRoundNumber(roundNum);
      setShowGuess(true);
      setTimer(10);
    }
  }, [gameInfo, roundNumber]);

  const submitGuess = async () => {
    //submit the guess
    const image = document.querySelector('.GuessButton');
    image.style.visibility = "hidden";
    console.log("submit guess");
    console.log(
      "gameID",
      gameID,
      "playerId",
      playerId,
      "guess",
      guess,
      "roundNumber",
      roundNumber
    );
    const data = await usePut(
      `http://localhost:5001/api/game/guess/${gameID}`,
      { playerId: playerId, guess: guess, roundNumber: roundNumber }
    );
    setShowGuess(false);
    console.log("data", data);

    // setGameInfo(data);
  };

  // useEffect(() => {
  //   async function checkOwner() {
  //     if (gameInfo == null && isOwner === false) {
  //       console.log("waiting for gameInfo");
  //       let resp = await useGet(`http://localhost:5001/api/game/${gameID}`);
  //       console.log("resp", resp);
  //       setGameInfo(resp);
  //     }
  //   }
  //   checkOwner();
  // }, []);

  //set the image
  //set the round number
  //set the game id
  //set the game result
  //set the submit status
  //set the ranking status
  //set the ranking

  //   useEffect(() => {
  //     const socket = new WebSocket("ws://localhost:4000/");
  //     setSocket(socket);
  //     socket.onopen = function () {
  //       console.log("websocket open");
  //     };
  //     // 结束websocket
  //     socket.onclose = function () {
  //       console.log("websocket close");
  //     };
  //     // 接受到信息
  //     socket.onmessage = function (e) {
  //       addList(e.data)
  //     };
  //     // eslint-disable-next-line no-unused-expressions
  //   }, [messageList]);

  //   const addList = (data) => {
  //     const list = JSON.parse(data)
  //     const arry = JSON.parse(JSON.stringify(messageList))
  //     arry.push(list)
  //     setMessageList(arry)
  //   }
  //   const onSendMessage = () => {
  //     const data = JSON.stringify({ type: "0", msg: sendMessageValue });
  //     socket.send(data);
  //     setOnMessage('')
  //     document.getElementsByClassName('content')[0].srollTop = 10000000;

  //   }
  //   const onMessage = (val) => {
  //     setOnMessage(val);
  //     // 点击发送webscoket
  //   };

  // Starts the timer on 30 seconds and then sets the setranking state to 1
  useEffect(() => {
    if (timer === 0) {
      // setPlay(false);
      // setSubmit(true);
      // setRankingStatus(true);
      // setRanking(1);
      return;
    }
    timerRef.current = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);
    // return () => {
    //     clearTimeout(timeRef.current);
    // };
  }, [timer]);

  const updateGameResult = (idx, val) => {
    let newGameResult = gameResult.map(function (item, index) {
      if (index === idx) {
        return {
          ...item,
          isGood: val,
        };
      } else {
        return item;
      }
    });
    setGameResult(newGameResult);
  };

  const handleNextRound = async () => {
    await checkRoundScores();
    console.log(imageArray);
    if (roundNumber < 999) {
      setRoundNumber(roundNumber + 1);
      updateGame();
      setTimer(10);
    } else {
      setNextRoundText("Finish Game");
    }
    const image = document.querySelector('.GuessButton');
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
    // setCurrentImage(gameInfo.images[roundNumber - 1].url);

    // setCurrentImage(imageArray[roundNumber - 1]);
  }, [roundNumber]);

  const handleGuessChange = (e) => {
    setGuess(e.target.value);
  };

  // const handleHuggingAPI = async () => {
  //   const guesses = [
  //     "hlelow",
  //     "i am types",
  //     "I cannot type",
  //     "I am not a hippo",
  //   ];

  //   const huggingface = await useGet(
  //     `http://localhost:5001/api/sentence/check`,
  //     { params: { prompt: prompt, guesses: guesses } }
  //   );
  //   console.log(huggingface, "waiting", "guesses", guesses);
  // };

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

