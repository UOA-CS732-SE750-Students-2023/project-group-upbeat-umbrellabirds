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

// // Div for the whole page
// <div
//     className="App-header"

// >
//     {/* Div for the game content */}
//     <div
//         style={{
//             width: "100%",
//             height: "100%",
//             position: "relative",
//             backgroundColor: "#5c06bf",
//         }}

//     >
//         {/* Div for music and home button */}
//         <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 0 0 20px", backgroundColor: "#cc14ff" }}>
//             <img src={homeIcon} style={{ width: "48px", height: "48px" }} onClick={() => {
//                 window.history.back()
//             }}></img>
//             {isPlay == true ? <img src={audioOn} style={{ width: "48px", height: "48px", marginRight: "30px" }} onClick={() => {
//                 const bjmusic = document.getElementById("bjmusic");
//                 setPlay(false);
//                 bjmusic.pause();
//             }}></img> : <img src={audioOff} style={{ width: "48px", height: "48px", marginRight: "30px" }} onClick={() => {
//                 const bjmusic = document.getElementById("bjmusic");
//                 setPlay(true);
//                 bjmusic.play();
//             }}></img>}
//         </div>
//         <div
//             style={{
//                 width: "100%",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 marginTop: "20px",
//                 cursor: 'pointer',
//                 backgroundColor: "#2146db"
//             }}
//         >
//             {/* Div for the round header */}
//             <div className="logo" style={{ width: "300px", color: "white", backgroundColor: "#db9a21" }}>
//                 ROUND 1/5
//             </div>

//             {/* Div for the timer */}
//             <div style={{ position: 'relative', left: 200, display: 'flex', alignItems: 'center', backgroundColor: "#db9a21" }}>
//                 <img src={timerIcon} style={{ width: "48px", height: "48px" }}></img>
//                 {
//                     time == '0' ? '' : <div style={{ color: 'black', marginLeft: '20px' }} >{time}s</div>
//                 }
//             </div>
//         </div>

//         {/* Audio */}
//         <audio
//             controls
//             id="bjmusic"
//             src={mu}
//             autoPlay={false}
//             style={{ Visibility: "Visibility", opacity: 0, width: "0", height: "0" }}
//             loop="loop"
//         ></audio>

//         {/* Div for the image and chatbox*/}
//         <div
//             style={{
//                 display: "flex",
//                 flexWrap: "wrap",
//                 height: window.innerHeight - 290,
//                 width: "100%",
//                 overflow: "hidden",
//                 justifyContent: "space-around",
//                 backgroundColor: "#e3e03d"
//             }}
//         >

//             {/* Div for the round image */}
//             <div
//                 style={{
//                     width: "40%",
//                     display: "flex",
//                     justifyContent: "space-around",
//                     flexDirection: "column",
//                     backgroundColor: "#1a9628"
//                 }}
//             >
//                 <img
//                     src={placeholder}
//                     alt=""
//                     style={{ width: "80%", height: "67%", borderRadius: "10px" }}
//                 />

//                 <div
//                     style={{
//                         width: "100%",
//                         height: "80px",
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         backgroundColor: "#1a2628"
//                     }}
//                 >

//                     {/* Div displays the prompt input and guess button */}
//                     <div
//                         style={{
//                             width: "100%",
//                             marginTop: "30px",
//                             display: "flex",
//                             justifyContent: "space-between",
//                             backgroundColor: "#1a9628"
//                         }}
//                     >

//                         {
//                             isranking != 0 ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', backgroundColor: '#ffffff', color: 'black' }}>生成文本信息</div></div> : <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
//                                 <div style={{ width: "350px" }}>
//                                     <Input placeholder="Basic usage" style={{ height: "48px" }} />
//                                 </div>
//                                 <div style={{ background: "springgreen", marginLeft: "10px", borderRadius: "20px", display: "flex", alignItems: "center", flexDirection: "row" }}>
//                                     <Button type="primary"
//                                         className="button_sb" style={{ width: "100px", height: "50px" }} onClick={() => onStart()}>
//                                         Guess
//                                     </Button>
//                                     <img src={submitIcon} style={{ borderRadius: "20px", height: "50px", width: "50px" }}></img>
//                                 </div>
//                             </div>

//                         }

//                     </div>
//                 </div>
//             </div>
//             <div
//                 style={{
//                     width: "50%",
//                     height: "100%",
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                 }}
//             >

//                 {/* Checks if the isRanking is false which means the game round is still going, display the chat box */}
//                 {
//                     isranking === 0 ? <div
//                         style={{
//                             width: "100%",
//                             backgroundColor: "#ffffff",
//                             height: "90%",
//                             borderRadius: "10px",
//                             display: "flex",
//                             flexDirection: "column",
//                             borderRadius: "10px"
//                         }}
//                     >

//                         {/* Div for the chat messages */}
//                         <div style={{ height: "95%", overflowY: 'auto', overflowX: 'hidden', background: "#bd392f", borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }} className="content">

//                             {
//                                 messageList.map((item) => {
//                                     // 0发送消息  1 接收消息
//                                     return <div key={item.id} style={{ color: 'black', padding: '20px 10px' }}>
//                                         {
//                                             item.type != 0 ? <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}><img src={tx} alt='' style={{ width: "40px", height: '40px', borderRadius: "50%" }} />
//                                                 <div style={{ minWidth: '15%', backgroundColor: '#E7E5E5', marginLeft: '30px', borderRadius: "10px" }}>
//                                                     <div >{item.type}</div></div>
//                                             </div> : <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
//                                                 <div style={{ minWidth: '15%', backgroundColor: '#E7E5E5', marginRight: '30px', borderRadius: "10px" }}>
//                                                     <div >{item.type}</div></div>
//                                                 <img src={tx} alt='' style={{ width: "40px", height: '40px', borderRadius: "50%" }} />
//                                             </div>
//                                         }

//                                     </div>
//                                 })
//                             }
//                         </div>

//                         {/* Div for the chat input */}
//                         <div
//                             style={{
//                                 height: "60px",
//                                 lineHeight: "60px",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 background: "#FFA500",
//                                 borderBottomRightRadius: "10px",
//                                 borderBottomLeftRadius: "10px"
//                             }}
//                         >
//                             <Input
//                                 style={{ marginLeft: '20px', height: "48px" }}
//                                 placeholder="Basic usage"
//                                 value={sendMessageValue}
//                                 onChange={(e) => {
//                                     onMessage(e.target.value);
//                                 }}
//                             />
//                             <div style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                             }}
//                             >
//                                 <img src={sendMs} style={{ width: "48px", marginRight: "20px" }} onClick={() => {
//                                     onSendMessage();
//                                 }}></img>
//                             </div>

//                         </div>
//                     </div> : ''
//                 }
//             </div>
//         </div>
//     </div>
// </div>

/*
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


function GamePage() {
    return (
        <div className="App-GamePage">
            <div className="game_header">
                <h3>ROUND # RESULTS</h3>
                <img src="../../../public/images/微信图片_20230508102928_03.gif" alt="" />
            </div>
            <div className="game_content">
                <ul>
                    <li>
                        <div className="imgUser">
                            <div style={{ color: "#fff" }}>1st</div>
                            <img src="../../../public/images/微信图片_20230508102928_10.gif" alt="" style={{ width: "250px", height: "180px" }} />
                        </div>
                        <div style={{ width: "280px", textAlign: "left", color: "#fff" }}>Flying Mooso</div>
                        <img src="../../../public/images/微信图片_20230508102928_13.gif" alt="" style={{ width: "140px", height: "180px" }} />
                    </li>
                    <li>
                    <div className="imgUser">
                            <div style={{ color: "#fff" }}>2nd</div>
                            <img src="../../../public/images/微信图片_20230508102928_10.gif" alt="" style={{ width: "200px", height: "130px" }} />
                        </div>
                        <div style={{ width: "280px", textAlign: "left", color: "#fff" }}>Moose with horse legs and edgie winds</div>
                        <img src="../../../public/images/微信图片_20230508102928_21.gif" alt="" style={{ width: "85px", height: "115px" }} />
                    </li>
                    <li>
                    <div className="imgUser">
                            <div style={{ color: "#fff" }}>3rd</div>
                            <img src="../../../public/images/微信图片_20230508102928_10.gif" alt="" style={{ width: "150px", height: "100px" }} />
                        </div>
                        <div style={{ width: "280px", textAlign: "left", color: "#fff" }}>Donkey</div>
                        <img src="../../../public/images/微信图片_20230508102928_29.gif" alt="" style={{ width: "42px", height: "77px" }} />
                    </li>
                </ul>
            </div>
            <div className="game_bottom" style={{textAlign:"right"}}>
                <img src="../../../public/images/微信图片_20230508102928_38.gif" alt="" style={{ width: "58px", height: "50px" }} />
                <img src="../../../public/images/微信图片_20230508102928_35.gif" alt="" style={{ width: "77px", height: "70px" ,margin:"0 30px"}} />
            </div>
        </div>
    );
}

export default GamePage;
*/
