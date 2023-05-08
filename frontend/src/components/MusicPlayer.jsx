import { useState, useEffect } from "react";
import musicIcon from "./../assets/icons8-music.svg";


function MusicPlayer(props) {
  const [audio] = useState(new Audio(props.audioUrl));
  const [volume, setVolume] = useState(props.volume || 1);
  const [isMuted, setIsMuted] = useState(props.isMuted || false);
  const [isHovering, setIsHovering] = useState(false);

  const style = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
    transform: isHovering ? 'scale(1.1)' : 'scale(1)'
  };

  const iconStyle = {
    width: '30px',
    height: '30px'
  }

  useEffect(() => {
    audio.volume = volume;
    audio.muted = isMuted;
    audio.loop = true;
    audio.play();
  }, [audio, volume, isMuted]);


  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div 
      className="music-player"
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMuteToggle}
    >
      <img
        src={musicIcon}
        alt="music icon"
        style={iconStyle}
      />
    </div>
  );
}

export default MusicPlayer;