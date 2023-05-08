import React, { useRef, useState, useEffect } from "react";
import { Button } from "antd";
import PlayerProfile from "../../components/player-profile";
import Logo from "../../assets/logo.png";
import StartIcon from "../../assets/start-icon.png";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import socket from "../../socket";
import useGet from "../../hooks/useGet";
import useDelete from "../../hooks/useDelete";
import usePut from "../../hooks/usePut";
import Password from "antd/es/input/Password";


export default function Lobby() {
  const navigate = useNavigate();
  // const [isConnected, setIsConnected] = useState(socket.connected);

  // const onConnect = () => {
  //     setIsConnected(true);
  // }
  const [player, setPlayer] = useState({});
  const [playerList, setPlayerList] = useState([]);
  const [isGame, setIsGame] = useState(false);
  
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    isNavigatingRef.current = isGame;
    console.log(isNavigatingRef.current, "isNavigatingRef.current");
  }, [isGame]);

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
              `http://localhost:5001/api/player/${playerId}`
            );
            console.log(response);
            response = await usePut(
              `http://localhost:5001/api/room/deletePlayer/${roomInfo}`,
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
      let player = await useGet(`http://localhost:5001/api/player/${playerId}`);
      addPlayer(player);

      console.log(playerList);
    });
    socket.on("playerRemoved", async (playerId) => {
      console.log("Player removed: " + playerId);
      removePlayer(playerId);
    });

    socket.on("gameStarted", () => {
      setIsGame(true);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  useEffect(() => {
    const getUser = async () => {
      let response = await useGet(
        `http://localhost:5001/api/player/${playerId}`
      );
      console.log(response);
      setPlayer(response);
      addPlayer(response);
    };
    const getPlayersInRoom = async () => {
      try {
        let response = await useGet(
          `http://localhost:5001/api/room/${roomInfo}`
        );
        console.log(response);

        // Check if playerIds is defined before calling map
        if (response.playersID) {
          // Wait for the Promise to resolve before iterating over playerIds
          await Promise.all(
            response.playersID.map(async (playerId) => {
              let player = await useGet(
                `http://localhost:5001/api/player/${playerId}`
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
    console.log(playerList, "updted and checking");
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
      navigate("/test", {
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
    if(isGame == true){
    window.addEventListener("beforeunload", handleBeforeUnload);
  }
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  
  const onSelectStart = () => {
    console.log("start game", isGame);
    setIsGame(true);
    socket.emit("startGame", { roomCode: roomInfo });
    // socket.emit("startGame", { roomCode: roomInfo });
  };
  return (
    <div>
      <div className="container">
        <PlayerProfile
          picture={player.profileURL}
          name={userName}
          random="false"
        />
        <h2 style={{ marginTop: "50px" }}>Room Code {roomInfo}</h2>
        <Button
          icon={<img src={StartIcon} alt="My Image" style={{ width: 100 }} />}
          style={{ width: 200, height: 100 }}
          onClick={() => {
            onSelectStart();
          }}
        ></Button>
      </div>

      {playerProfile}
    </div>
  );
}
