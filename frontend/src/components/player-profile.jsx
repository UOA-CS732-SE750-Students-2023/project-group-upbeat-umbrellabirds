import React from 'react';
import PropTypes from 'prop-types';
import './player-profile.css'

function PlayerProfile(props) {

    return (
        <div className="player-profile">
        <img className="player-picture" src={props.picture} alt="Player" />
        <h2 className='player-name'>{props.name}</h2>
        </div>
    );
}

PlayerProfile.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default PlayerProfile;


