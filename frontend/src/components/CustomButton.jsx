
import {  Button } from "antd";
import './customButton.css';

function CustomButton(props) {

  return (
    <Button
            type="primary"
            className="button_sb"
            onClick={()=>{
              if(props.cfunc){
                props.cfunc();
              }
            }}
          >
            {props.buttonName}
          </Button>
  );
}

export default CustomButton;
