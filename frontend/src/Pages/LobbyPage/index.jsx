import React, { useState, useEffect } from "react";
import { Button } from "antd";
import PlayerProfile from "../../components/player-profile";
import Logo from "../../assets/logo.png";
import StartIcon from "../../assets/start-icon.png";
import "./index.css";
import { useLocation } from "react-router";
import socket from "../../socket";
import useGet from "../../hooks/useGet";

export default function Lobby() {
  // const [isConnected, setIsConnected] = useState(socket.connected);

  // const onConnect = () => {
  //     setIsConnected(true);
  // }

  

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    return () => {
      socket.off("connect");
    };
  }, []);

  const location = useLocation();

  const { roomInfo, userName, isNewRoom } = location.state;

  console.log(roomInfo, userName, isNewRoom);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to server");
      const roomName = roomInfo;
      const playerName = userName;
      socket.emit("joinRoom", { roomName, playerName });
    });

    socket.on("playerJoined", (playerName) => {
        console.log("Player joined: " + playerName);
    });
    return () => {
      socket.off("connect");
    };
    
  }, []);

  let player = useGet(`http://localhost:5001/api/player/${userName}`)

  return (
    <div>
      <div className="container">
        <PlayerProfile picture={player.url} name={userName} random="false" />
        <h2 style={{ marginTop: "50px" }}>Room Code {roomInfo}</h2>
        <Button
          icon={<img src={StartIcon} alt="My Image" style={{ width: 100 }} />}
          style={{ width: 200, height: 100 }}
        ></Button>
      </div>

      <PlayerProfile picture={Logo} name="Player 1" random="true" />

      <PlayerProfile picture={Logo} name="Player 2" random="true" />

      <PlayerProfile picture={Logo} name="Player 3" random="true" />
    </div>
  );
}
