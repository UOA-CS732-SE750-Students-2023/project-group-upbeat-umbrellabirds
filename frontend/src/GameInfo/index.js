import { useEffect, useState } from "react";
import logo from "./../Asstes/3.jpg";
import newlogo from "./../Asstes/image1.jpg";
import start from "./../Asstes/image17.jpg";
import img1 from "./../Asstes/image23.jpg";
import img2 from "./../Asstes/image22.jpg";
import img3 from "./../Asstes/v109_39.png";
import main from './../Asstes/image13.jpg'
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PlayerProfile from './../components/player-profile';
const GameInfo = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [socket, setSocket] = useState(null);
  const [isStart, setStart] = useState(false);
  const img=[img1,img2,img3];
  const [index,setIndex]=useState(2);
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setUserInfo(JSON.parse(userInfo));
  }, []);
  const onStart = () => {
    setStart(true);
    setTimeout(function(){
      setIndex(1);
    },1000);
    setTimeout(function(){
      setIndex(0);
    },2000);
    setTimeout(function(){
      navigate("/game");
    },3000);
    
  };
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000/");
    // setSocket(socket);
    socket.onopen = function () {
      console.log("websocket open");
    };
    // 结束websocket
    socket.onclose = function () {
      console.log("websocket close");
    };
    // 接受到信息
    socket.onmessage = function (e) {
      // addList(e.data)
    };
    // eslint-disable-next-line no-unused-expressions
  }, []);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="App-header"
    >
    <div style={{width:"100%", display: "flex", justifyContent:"space-between" ,flexDirection:"row",backgroundColor: "rgba(255, 255, 255,0.5)"}}>
                <img src={main} style={{width:"48px",height:"48px"}} onClick={() => {
                    window.history.back()
                }}></img>
    </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          backgroundColor: "rgba(255, 255, 255,0.5)",
          display: "flex", alignItems: "center", justifyContent: 'center'
        }}
      >
        {isStart==true?
      <div style={{height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <img src={img[index]} style={{width:"150px"}}></img>
      </div>
      :
        <div
          style={{
            width: "50%",
            height: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <PlayerProfile
                picture={logo}
                name="Player 1"
                random="false"
                />
            <PlayerProfile
                picture={logo}
                name="Player 1"
                random="false"
                />
            <PlayerProfile
                picture={logo}
                name="Player 1"
                random="false"
                />
            <PlayerProfile
                picture={logo}
                name="Player 1"
                random="false"
                />
          </div>
          <div>
            <img src={newlogo} style={{width:"100px",paddingTop:"50px"}}></img>
          </div>
          <div className="logo" style={{ width: "300px" }}>
              promptaloo
          </div>
          <div >
              Room Code:12345678
          </div>
          <div
            style={{
              width: "180px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "150px",
              background:"#ffffff",
              borderRadius:"30px"
            }}
          >
          <div>
            <img src={start} style={{width:"32px",paddingTop:"8px"}}></img>
          </div>
            <Button
              type="primary"
              onClick={() => {
                onStart();
              }}
              style={{background:"#ffffff",color:"#000000",height:"35px",borderRadius:"0",border:"0"}}
            >
              start Game
            </Button>
          </div>
        </div>}
      </div>
    </div>
  );
};
export default GameInfo;
