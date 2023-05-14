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
import ChatBox from "./../../components/chatBox";
import CustomButton from "./../../components/customButton";
import UserScore from "../../components/userScore";
import socket from "../../socket";
import useGet from "../../hooks/useGet";
import usePut from "../../hooks/usePut";
import RoundResults from "../../Pages/RoundResultsPage/index.jsx";
import defaultLogo from "../../assets/default-profile.jpg";
import { update } from "react-spring";

export default function Game() {
  const URI = import.meta.env.VITE_API_URL;
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
  const [first, setFirst] = useState({});
  const [second, setSecond] = useState({});
  const [third, setThird] = useState({});
  const [currentPlayer, setCurrentPlayer] = useState({});

  const { roomInfo, userName, isNewRoom, playerId, playerList, gameID } =
    location.state;
  const navigate = useNavigate();
  const [userScore, setUserScore] = useState(0);
  const [playerURL, setPlayerURL] = useState(defaultLogo);

  let playerGuesses = [];

  //user effect that loads all the images url into the image array
  useEffect(() => {
    async function initialise() {
      //i want to use placeholder and defaultImage for now
      // setImageArray([placeholder, defaultLogo, logo, defaultLogo, placeholder]);
      await checkOwner();
      const player = await useGet(`${URI}api/player/${playerId}/`);
      setPlayerURL(player.profileURL);
      socket.emit("tester", { tester: "hello worlds", roomInfo });
    }
    console.log("gameInfo", gameInfo);
    console.log("gameID", gameID);
    initialise();
  }, []);

  const handleRoundDisplay = async () => {
    const players = [];
    const scores = [];

    for (let i = 0; i < playerList.length; i++) {
      let player = await useGet(`${URI}api/player/${playerList[i]._id}/`);
      players.push(player);
      console.log(player, player._id);
      scores.push(player.score);
    }
    const indices = scores.map((value, index) => index);
    indices.sort((a, b) => scores[b] - scores[a]);
    const sortedScores = indices.map((index) => scores[index]);
    const sortedPlayers = indices.map((index) => players[index]);
    const firstPlayer = sortedPlayers[0];
    const secondPlayer = sortedPlayers[1];
    const thirdPlayer = sortedPlayers[2];

    socket.emit("roundResults", {
      firstPlayer,
      secondPlayer,
      thirdPlayer,
      roomInfo,
    });

    socket.emit("roundDone", { roomInfo });

    //setting states of the round results
    //setGameState to results

    //in round page take in props
    // isRoundDone = false;
    //state to check when it is end of round
    // navigate("/roundResults", {
    //   state: {
    //     roomInfo: roomInfo,
    //     userName: userName,
    //     isNewRoom: isNewRoom,
    //     playerId: playerId,
    //     playerList: playerList,
    //     gameID: gameID,
    //   },
    // });
  };

  useEffect(() => {
    async function handleIsRoundDone() {
      if (isRoundDone === true) {
        const thisPlayer = await useGet(`${URI}api/player/${playerId}/`);
        setCurrentPlayer(thisPlayer);
        setUserScore(thisPlayer.score)
        console.log(
          "isRoundDone",
          isRoundDone,
          "roundNumber",
          roundNumber,
          "first",
          first,
          "second",
          second,
          "third",
          third,
          "currentPlayer",
          currentPlayer
        );

        if (roundNumber >= 5) {
          const timeout = setTimeout(() => {
            setIsGame(false);
          }, 10000);
          return () => clearTimeout(timeout); // Change the value to the desired time in milliseconds
        } else {
          const timeout = setTimeout(() => {
            setIsRoundDone(false);

            setSubmit(false);
          }, 10000); // Change the value to the desired time in milliseconds
          return () => clearTimeout(timeout);
        }
      }
      if (isRoundDone === false && isOwner === true) {
        updateGame();
      }
    }
    handleIsRoundDone();
    //   // <div>
    //   {isRoundDone && <RoundResult prompt={prompt}
    //      round={roundNumber}
    //      firstPlayer={first}
    //     secondPlayer={second}
    //     thirdPlayer={third}
    //     currentPlayer={currentPlayer}/>}
    //   {!isRoundDone && <OriginalPage />}
    // {/* </div> */}
  }, [isRoundDone]);

  useEffect(() => {
    if (isGame == false) {
      navigate("/gameResults", {
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
        //   `${URI}api/game/newImages/${gameID}`
        // );
        await updateGame();
        console.log("gameInfo", gameInfo);
        console.log("I am owner");
      }
    }
    initialise();
  }, [isOwner]);

  /**
   * useEffect hook for handling game updates and socket events based on the user's ownership status.
   * If the user is not the owner of the game, this hook listens for "setGameInfo", "tester", "timerReset", and "roundDone" socket events and updates the state accordingly.
   * If the user is the owner of the game, this hook listens for "allGuessed" and "getRoundNumber" socket events and calls the "handleNextRound" and "setRoundNumber" functions, respectively.
   * @param {boolean} isOwner - A boolean that indicates whether the current user is the owner of the game.
   */

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
        guessedPlayers.forEach((player) => {
          playerGuesses.push(player);
        });
        console.log("all guessed", guessedPlayers);

        handleNextRound();
      });
    }
    socket.on("getRoundNumber", (roundNum) => {
      console.log("roundNumber", roundNum);
      setRoundNumber(roundNum);
    });
    socket.on("getRoundResults", (firstPlayer, secondPlayer, thirdPlayer) => {
      console.log("getRoundResults");
      setFirst(firstPlayer);
      setSecond(secondPlayer);
      setThird(thirdPlayer);
    });
  }, [isOwner]);
  const updateGame = async () => {
    //update the game
    console.log("update game");
    let data = await usePut(`${URI}api/game/round/${gameID}`);
    socket.emit("setRoundNumber", { roomInfo, roundNum: data.rounds.length });
    console.log("data", data);
    setGameInfo(data);
  };

  const checkRoundScores = async () => {
    const gameState = await useGet(`${URI}api/game/${gameID}`);
    let roundNum = gameState.rounds.length;
    console.log(
      "data of game",
      gameState,
      gameState.rounds[roundNum - 1],
      "ruond number",
      roundNum
    );
    const guesses = await useGet(
      `${URI}api/game/guesses/${gameID}/${roundNum}`
    );
    const guessesArray = [];
    const playersArray = [];
    const numGuesses = guesses.length;
    console.log("guesses", guesses, "numGuesses", numGuesses);
    for (let i = 0; i < numGuesses; i++) {
      guessesArray.push(guesses[i].guess);
      playersArray.push(guesses[i].playerID);
    }
    console.log("guessesArray", guessesArray, "playersArray", playersArray);
    console.log("player list", playerList);
    console.log("gameInfo", gameInfo);
    const ratios = await useGet(`${URI}api/sentence/check`, {
      params: { prompt: prompt, guesses: guessesArray },
    });
    console.log("ratios", ratios);

    for (let i = 0; i < ratios.length; i++) {
      
      if(guesses[i].guess === "No Guess"){
        await usePut(`${URI}api/player/${playersArray[i]}`, {
          score: 0,
        });
      }else{
        ratios[i] = ratios[i] * 1000;
        await usePut(`${URI}api/player/${playersArray[i]}`, {
          score: ratios[i],
        });
      }

      await usePut(`${URI}api/player/guesses/${playersArray[i]}`, {
        guess: guessesArray[i],
      });
    }

    guessesArray.length = 0;
    playersArray.length = 0;
    ratios.length = 0;
  };

  useEffect(() => {
    setSubmit(false);
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
        console.log(gameInfo, "gameInfo");
        console.log(roundNumber, "roundNum");
        let curRound = gameInfo.rounds.length;

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

    socket.emit("guessed", { playerId, roomInfo, curGuess });
    setSubmit(true);
    setGuess("");
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

  const submitAllGuesses = async () => {
    const state = await useGet(`${URI}api/game/${gameID}`);
    for (let i = 0; i < playerGuesses.length; i++) {
      console.log(playerGuesses[i]);
      let strID = playerGuesses[i].playerID.toString();
      let response = await usePut(`${URI}api/game/guess/${gameID}`, {
        playerId: strID,
        guess: playerGuesses[i].curGuess,
        roundNumber: state.rounds.length,
      });
      console.log("response from submit all guesses", response);
    }
    return;
  };

  const handleNextRound = async () => {
    console.log("next round");
    await submitAllGuesses();
    playerGuesses = [];
    await checkRoundScores();
    await handleRoundDisplay();
    if (roundNumber < 5) {
      const playerScore = await useGet(`${URI}api/player/score/${playerId}/`);
      setUserScore(playerScore);
    } else {
      setIsGame(false);
    }
    const image = document.querySelector(".GuessButton");
    image.style.visibility = "visible";
  };

  const checkOwner = async () => {
    let curRoom = await useGet(`${URI}api/room/${roomInfo}/`);
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
    <div>
      {isRoundDone ? (
        <RoundResults
          prompt={prompt}
          round={roundNumber}
          firstPlayer={first}
          secondPlayer={second}
          thirdPlayer={third}
          currentPlayer={currentPlayer}
        />
      ) : (
        <div class="game-page-container">
          <div class="RoundImage">
            <img src={currentImage} style={{ width: 512, height: 512 }} />
          </div>

          <div class="Chatbox">
            <ChatBox roomInfo={roomInfo} userName={userName} gameId={gameID} />
          </div>

          <div class="RoundHeader">
            <h1 id="RoundText">Round {roundNumber}/5</h1>
          </div>

          <div class="PromptInput">
            <Input
              placeholder="Enter your guess: "
              onChange={handleGuessChange}
              style={{ height: 50 }}
            ></Input>
          </div>

          <div class="Button">
            <div class="GuessButton">
              <CustomButton
                text="Guess"
                image={submitIcon}
                onClick={submitGuess}
              />
            </div>
          </div>
          <div class="UserScore">
            <UserScore score={userScore} avatar={playerURL}></UserScore>
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
                <div style={{ color: "black", marginLeft: "20px" }}>
                  {timer}s
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
