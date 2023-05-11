import React from "react";
import UserScore from "../../components/userScore";
import image from "../../assets/timer.png"
// import ChatBox from "../../components/chatBox";
import { useLocation } from "react-router";

function TestPage() {
  // const playerName = 'Player 1';
  // const gameRoom = 'Game Room 1';
  // const location = useLocation();
  // const { roomInfo, userName, isNewRoom, playerId } = location.state;

  return (
    <div>
      <h1>Game Screen</h1>
      <UserScore
        avatar={image} 
        score={10000} 
      />
      {/* <ChatBox roomInfo = {roomInfo} userName = {userName}/> */}
      {/* your game UI goes here */}
    </div>
  );
};

export default TestPage;
