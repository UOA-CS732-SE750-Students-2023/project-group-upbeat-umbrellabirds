import { useState } from "react";
import React from 'react';

function UserScore({score, avatar }) {
    const [isHover, setIsHover] = useState(false);
    const profileStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: '50%',
      padding: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer'
    }
  
    const imageStyle = {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      border: '2px solid #fff',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      marginRight: '10px'
    }
  
    const scoreStyle = {
      fontWeight: 'bold',
      fontSize: '20px',
      color: '#333'
    }
  
    const hoverStyle = {
      transform: 'translateY(-5px)',
      boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.3)'
    }
  
    
  
    return (
        <div style={{ ...profileStyle, ...(isHover ? hoverStyle : {}) }}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <img src={avatar} alt="User avatar" style={imageStyle} />
          <div style={scoreStyle}>{score}</div>
        </div>
      );
  
    }
export default UserScore;
