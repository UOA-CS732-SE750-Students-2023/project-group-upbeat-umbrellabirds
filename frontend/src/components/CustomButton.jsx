import Button from "@mui/material/Button";
import {styled}from "@mui/material/styles";

function CustomButton(props) {


  const StyledButton = styled(Button)({
    color: "#000000",
    backgroundColor: "#40b811",
    "&:hover": {
      color: "#40b811",
      backgroundColor: "#000000",
    },
  });
  const handleClick = () => {
    if(props.onClick){
      props.onClick();
    }
  };

  const handleClick = () => {
    if(props.onClick){
      props.onClick();
    }
  };

  return (
    <>
      <StyledButton onClick={handleClick}>
        {props.children}
      </StyledButton>
    </>
  );
}

export default CustomButton;
