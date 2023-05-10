import React from "react";
import "./index.css";
import PlayerProfile from "../../components/player-profile";
import StartIcon from "../../assets/start-icon.png";

function RoundResults() {
  return (
    <div className="page-container">
      <div className="first-place">
        <PlayerProfile picture={StartIcon} name={"aden"} random="false" />
      </div>
      <div className="page-header">
        <h1>Round # Results</h1>
      </div>
      <div className="second-place">
        <PlayerProfile picture={StartIcon} name={"aden"} random="false" />
      </div>
      <div className="third-place">
        <PlayerProfile picture={StartIcon} name={"aden"} random="false" />
      </div>
      <div className="page-footer">
        <h1>test</h1>
      </div>
    </div>
  );
}

export default RoundResults;
