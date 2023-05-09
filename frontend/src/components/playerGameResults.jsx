import React from 'react'
import "./playerGameResults.css"
import { Avatar } from 'antd';

export default function PlayerGameResults({ place, avatarUrl, name, points }) {
  return (
    <div className="player-card">
      <div className="player-place">{place}</div>
      <Avatar src={avatarUrl} />
      <div className="player-details">
        <div className="player-name">{name}</div>
        <div className="player-points">{points} points</div>
      </div>
    </div>
  );
};

