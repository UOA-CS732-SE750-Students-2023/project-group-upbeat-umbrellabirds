import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

function CustomButton(props) {
  const styles = makeStyles({
    root: {
      color: "#000000",
      backgroundColor: "#40b811",
    },
  });

  const classes = styles();
  return (
    <>
      <Button classes={{root: classes.root}}>
        {props.children}
      </Button>
    </>
  );
}

export default CustomButton;
