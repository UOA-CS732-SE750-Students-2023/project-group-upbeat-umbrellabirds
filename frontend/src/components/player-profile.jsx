import React from 'react';
import PropTypes from 'prop-types';
import './player-profile.css'

function PlayerProfile(props) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const radius = 500; // distance from center to avoid

  let x, y;
  do {
    x = Math.random() * (window.innerWidth - 200);
    y = Math.random() * (window.innerHeight - 200);
  } while (Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) < radius);

  if (props.random == "true" ){
    const style = {
      position: 'absolute',
      top: y + 'px',
      left: x + 'px',
      margin: "10px"
    };
    return (
      <div className="player-profile" style={style}>
        <img className="player-picture" src={props.picture} alt="Player" />
        <h2 className='player-name'>{props.name}</h2>
      </div>
    );
  }else{
    const style = {
      position: 'absolute',
    };
    return (
      <div className="player-profile" style={style}>
        <img className="player-picture" src={props.picture} alt="Player" />
        <h2 className='player-name'>{props.name}</h2>
      </div>
    );
  }



}

PlayerProfile.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default PlayerProfile;