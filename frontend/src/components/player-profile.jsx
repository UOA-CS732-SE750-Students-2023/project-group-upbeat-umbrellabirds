import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import './player-profile.css';

function PlayerProfile(props) {
  const [hovered, setHovered] = useState(false);

  const { x, y } = useSpring({
    from: { x: 0, y: 0 },
    to: async next => {
      while (true) {
        const newX = Math.random() * (window.innerWidth - 200);
        const newY = Math.random() * (window.innerHeight - 200);
        const distance = Math.sqrt(Math.pow(newX - window.innerWidth / 2, 2) + Math.pow(newY - window.innerHeight / 2, 2));
        if (distance > 300) {
          await next({ x: newX, y: newY });
        }
      }
    },
    
    config: { mass: 200, tension: 300, friction: 200 },
  });

  const style = {
    position: 'absolute',
    top: y.to(y => `${y}px`),
    left: x.to(x => `${x}px`),
  };

  if (props.random == "false"){
    return (
      <div className="player-profile" >
        <img className="player-picture" src={props.picture} alt="Player" />
        <h2 className='player-name'>{props.name}</h2>
      </div>
    );
  }else{
    return (
      <animated.div
        className="player-profile"
        style={style}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img className="player-picture" src={props.picture} alt="Player" />
        {hovered && <h2 className="player-name">{props.name}</h2>}
      </animated.div>
    );
  }

}

PlayerProfile.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default PlayerProfile;
