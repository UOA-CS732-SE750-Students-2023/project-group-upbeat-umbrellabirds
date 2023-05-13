import React, { useRef, useState, useEffect } from "react";
import { Button } from "antd";
import PlayerProfile from "../../components/player-profile";
import StartIcon from "../../assets/start-icon.png";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import socket from "../../socket";
import useGet from "../../hooks/useGet";
import useDelete from "../../hooks/useDelete";
import usePost from "../../hooks/usePost";
import usePut from "../../hooks/usePut";
import num1 from "../../assets/num1.png";
import num2 from "../../assets/num2.png";
import num3 from "../../assets/num3.png";
import CustomButton from "./../../components/customButton";
import CopyIcon from "../../assets/icons8-copy-24.png";


export default function Lobby() {
  const URI = "http://localhost:5001";
  const navigate = useNavigate();
  // const [isConnected, setIsConnected] = useState(socket.connected);

  // const onConnect = () => {
  //     setIsConnected(true);
  // }
  const [player, setPlayer] = useState({});
  const [playerList, setPlayerList] = useState([]);
  const [isGame, setIsGame] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [gameID, setGameID] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    isNavigatingRef.current = isGame;
    console.log(isNavigatingRef.current, "isNavigatingRef.current");
  }, [isGame]);

  useEffect(() => {
    console.log(URI);  
    async function initialise() {
      await checkOwner();
    }
    initialise();
  }, []);

  useEffect(() => {
    return async () => {
      if (!isNavigatingRef.current) {
        console.log(roomInfo, playerId, "disconnecting");
        const roomCode = roomInfo;
        const playerID = String(playerId);
        console.log(roomCode, playerID, "disconnecting");
        socket.emit("removePlayer", { roomCode, playerID });

        console.log("Disconnecting from server");
        let response = await useDelete(
          `${URI}api/player/${playerId}`
        );
        console.log(response);
        response = await usePut(
          `${URI}api/room/deletePlayer/${roomInfo}`,
          {
            playerID: playerId,
          }
        );
        socket.disconnect(roomInfo);
      }
    };
  }, []);

  useEffect(() => {
    setPlayer(player);
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    return () => {
      socket.off("connect");
    };
  }, []);

  const location = useLocation();

  const { roomInfo, userName, isNewRoom, playerId } = location.state;

  console.log(roomInfo, userName, isNewRoom, playerId);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to server");
      const roomName = roomInfo;
      const playerName = playerId;
      socket.emit("joinRoom", { roomName, playerName });
    });

    socket.on("playerJoined", async (playerId) => {
      console.log("Player joined: " + playerId);
      let player = await useGet(`${URI}api/player/${playerId}`);
      addPlayer(player);

      console.log(playerList);
    });
    socket.on("playerRemoved", async (playerId) => {
      console.log("Player removed: " + playerId);
      removePlayer(playerId);
    });

    socket.on("gameStarted", () => {
      setIsGame(true);
      console.log("games started");
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  useEffect(() => {
    const getUser = async () => {
      let response = await useGet(
        `${URI}api/player/${playerId}`
      );
      console.log(response);
      setPlayer(response);
      addPlayer(response);
    };
    const getPlayersInRoom = async () => {
      try {
        let response = await useGet(
          `${URI}api/room/${roomInfo}`
        );
        console.log(response);

        // Check if playerIds is defined before calling map
        if (response.playersID) {
          // Wait for the Promise to resolve before iterating over playerIds
          await Promise.all(
            response.playersID.map(async (playerId) => {
              let player = await useGet(
                `${URI}api/player/${playerId}`
              );
              console.log(player, "calling add player with player");
              addPlayer(player);
            })
          );
        }
        console.log(playerList);
      } catch (error) {
        console.error(error);
      }
    };
    getPlayersInRoom();
    getUser();
  }, []);

  useEffect(() => {
    //create component of player profile
    playerProfile;
    console.log(playerList, "updated and checking");
  }, [playerList]);

  const playerProfile =
    playerList.length > 0 &&
    playerList.map((player) => {
      console.log(player._id, playerId);
      if (player._id === playerId) return null;
      return <PlayerProfile picture={player.profileURL} name={player.name} />;
    });

  const addPlayer = (newPlayer) => {
    setPlayerList((prevPlayerList) => {
      // Check if player already exists in the list
      const existingPlayer = prevPlayerList.find(
        (player) => player._id === newPlayer._id
      );
      if (!existingPlayer) {
        // Player does not exist in the list, add them
        return [...prevPlayerList, newPlayer];
      } else {
        // Player already exists in the list, return the existing list
        return prevPlayerList;
      }
    });
  };

  const removePlayer = (playerID) => {
    setPlayerList((prevPlayerList) => {
      const existingPlayer = prevPlayerList.find(
        (player) => player._id === player._id
      );
      if (existingPlayer) {
        //remove player rom prevPlayerList;
        return prevPlayerList.filter((player) => player._id !== playerID);
      } else {
        // Player already exists in the list, return the existing list
        return prevPlayerList;
      }
    });
  };

  useEffect(() => {
    if (isGame == true) {
      navigate("/game", {
        state: {
          roomInfo: roomInfo,
          userName: userName,
          isNewRoom: isNewRoom,
          playerId: playerId,
          playerList: playerList,
        },
      });
    }
  }, [isGame, navigate]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      // execute your code here
    };
    if (isGame == true) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const checkOwner = async () => {
    let curRoom = await useGet(`${URI}api/room/${roomInfo}/`);
    if (curRoom.owner === playerId) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  };

  {
    /* MAKE SURE TO UNCOMMENT THIS FOR REAL GAME THIS IS RESPONSIBLE TO CREATING IMAGES*/
  }


  useEffect(()=>{
    const getGameId = async ()=>{
      // const gameid = await usePost("${URI}api/game/")
      setGameID('645cf10a31070614bda343e4');
      
    }
    getGameId();
  },[]);


  const onSelectStart = () => {
    // usePut(`${URI}api/game/newImages/${gameID}`) THIS TOOOOOOOO
    const container = document.querySelector(".container");
    container.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    setCountdown(3);
    setTimeout(() => setCountdown(2), 1000);
    setTimeout(() => setCountdown(1), 2000);
    setTimeout(() => {
      setCountdown(0);
      console.log("start game", isGame);
      setIsGame(true);
      socket.emit("startGame", { roomCode: roomInfo });
      container.style.backgroundColor = "transparent";
    }, 3000);
  };

  const copy = () => {
    navigator.clipboard.writeText(roomInfo);
  };
  return (
    <div className="lobby">
    <div className="lobby-page-container">
      <PlayerProfile
        picture={player.profileURL}
        name={userName}
        random="false"
      />
      <div className="room-code">
        <h2 style={{ marginTop: "50px" }}>Room Code: {roomInfo}</h2>
        <img className="room-code-img" onClick={copy} src={CopyIcon}></img>
      </div>
      {isOwner ? (
        <CustomButton
          text={"Start"}
          onClick={onSelectStart}
          image={StartIcon}
        ></CustomButton>
      ) : null}
      
    </div>
    {playerProfile}
    {countdown > 0 && (
      <div
        className="countdown"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: "100",
        }}
      >
        {countdown === 3 && <img src={num3} alt="3" />}
        {countdown === 2 && <img src={num2} alt="2" />}
        {countdown === 1 && <img src={num1} alt="1" />}
      </div>
    )}
  </div>
);
}
