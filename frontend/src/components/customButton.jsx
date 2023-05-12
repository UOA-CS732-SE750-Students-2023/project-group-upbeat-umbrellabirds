import React, { useState } from "react";
import "@testing-library/jest-dom/extend-expect";


function CustomButton(props) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: props.image ? "space-between" : "center",
    padding: "10px 15px",
    backgroundColor: "#e6e6ff",
    borderRadius: "8px",
    border: "2px solid #845EC2",
    color: "#551a8b",
    fontSize: "20px",
    fontWeight: "bold",
    transform: `${isHovered ? "scale(1.2)" : "scale(1)"}`
  };

  const textStyle = {
    marginRight: "10px",
    textAlign: props.image ? "left" : "center",
  };

  const imageStyle = {
    height: "30px",
    width: "auto",
  };

  return (
    <button
      onClick={handleClick}
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={textStyle}>{props.text}</span>
      {props.image && <img src={props.image} alt="icon" style={imageStyle} />}
    </button>
  );
}

export default CustomButton;
