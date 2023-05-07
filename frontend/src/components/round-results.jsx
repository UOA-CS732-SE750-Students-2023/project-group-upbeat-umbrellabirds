import React from 'react'
import medal1st from '../assets/logo.png'
import medal2nd from '../assets/logo.png'
import medal3rd from '../assets/logo.png'

export default function RoundResult(props) {

    let medalImg = null;

    switch (place) {
      case '1st':
        medalImg = medal1st;
        break;
      case '2nd':
        medalImg = medal2nd;
        break;
      case '3rd':
        medalImg = medal3rd;
        break;
      default:
        medalImg = null;
    }

  return (
    <div className="player-card">
      <img src={player1} alt="Player" className="player-image" />
      <div className="player-info">
        <h2 className="player-name">{playerName}</h2>
        <p className="player-prompt">{prompt}</p>
      </div>
      {medalImg && <img src={medalImg} alt="Medal" className="player-medal" />}
    </div>
  );
}
