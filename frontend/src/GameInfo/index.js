import { useEffect, useState } from "react";
import logo from "./../Asstes/3.jpg";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
const GameInfo = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setUserInfo(JSON.parse(userInfo));
  }, []);
  const onStart = () => {
    navigate("/game");
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
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          backgroundColor: "rgba(255, 255, 255,0.5)",
          display:"flex",alignItems:"center",justifyContent:'center'
        }}
      >
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "10%",
                flexDirection: "column",
              }}
            >
              <div>
                <img src={logo} className="userImg" alt=""></img>
              </div>
              <div>{userInfo.username}</div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "10%",
                flexDirection: "column",
              }}
            >
              <div>
                <img src={logo} className="userImg" alt=""></img>
              </div>
              <div>{userInfo.username}</div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "10%",
                flexDirection: "column",
              }}
            >
              <div>
                <img src={logo} className="userImg" alt=""></img>
              </div>
              <div>{userInfo.username}</div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "10%",
                flexDirection: "column",
              }}
            >
              <div>
                <img src={logo} className="userImg" alt=""></img>
              </div>
              <div>{userInfo.username}</div>
            </div>
          </div>
          <div className="logo">
            <div
              style={{
                width: "30%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifycontent: "center",
                fontStyle: "italic",
                fontSize: "40px",
                fontWeight: "bold",
              }}
            >
              promptaloo
            </div>
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            <Button
              type="primary"
              onClick={() => {
                onStart();
              }}
              style={{ width: "50%", height: "50px" }}
            >
              Start Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GameInfo;
