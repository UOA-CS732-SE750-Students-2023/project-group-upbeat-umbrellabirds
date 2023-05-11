import React, { useEffect, useState, useRef } from "react";
import { Button, Input } from "antd";
import src from "./../Asstes/1.png";
import mu from "./../music/1.ogg";
import tx from "./../Asstes/t.png"
import ax1 from "./../Asstes/image36.jpg"
import ax21 from "./../Asstes/image37.jpg"
import ax22 from "./../Asstes/image38.jpg"
import { CiOutlined } from '@ant-design/icons'
import one from './../Asstes/1_1.png'
import two from './../Asstes/2_1.png'
import three from './../Asstes/3_1.png'
import sendMs from './../Asstes/v107_221.png'
import main from './../Asstes/image13.jpg'
import radio from './../Asstes/radio.png'
import noradio from './../Asstes/noradio.jpg'
import nz from './../Asstes/nz.png'
import guess from './../Asstes/v116_66.png'
import CustomButton from "./../components/CustomButton";

const Game = () => {
  const rankImg = [two, one, three]
  const [isranking, setRanking] = useState(0);
  const [rankingStatus, setRankingStatus] = useState(false);
  const [socket, setSocket] = useState(null);
  const [sendMessageValue, setOnMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [time, setTime] = useState(0)// Countdown time
  const timeRef = useRef()// Set timeout
  const [isPlay,setPlay]=useState(true);
  const result = [{data:0,isGood:0},{data:0,isGood:0},{data:0,isGood:0},{data:0,isGood:0}];
  const [gameResult, setGameResult] = useState(result);

  useEffect(() => {
    // If countdown time is set and not zero
    if (time && time !== 0) {
      timeRef.current = setTimeout(() => {
        setTime(time => time - 1)
      }, 1000)
    }
    // Clear timeout
    return () => {
      clearTimeout(timeRef.current)
    }
  }, [time])

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000/");
    setSocket(socket);
    socket.onopen = function () {
      console.log("websocket open");
    };
    // Close websocket
    socket.onclose = function () {
      console.log("websocket close");
    };
    // Receive message
    socket.onmessage = function (e) {
      addList(e.data)
    };
    // eslint-disable-next-line no-unused-expressions
  }, [messageList]);

  const addList = (data) => {
    const list = JSON.parse(data)
    const arry = JSON.parse(JSON.stringify(messageList))
    arry.push(list)
    setMessageList(arry)
  }

  const onSendMessage = () => {
    const data = JSON.stringify({ type: "0", msg: sendMessageValue });
    socket.send(data);
    setOnMessage('')
    document.getElementsByClassName('content')[0].srollTop = 10000000;
  }

  const onMessage = (val) => {
    setOnMessage(val);
    // Send websocket message
  };

  const onStart = () => {
    setTime(5);
    setTimeout(() => {
      setRanking(1)
    }, 5000);
  }
  const updateGameResult = (idx, val) => {
    let newGameResult = gameResult.map(function(item, index) {
      if (index === idx) {
        return {
          ...item,
          isGood: val
        }
      } else {
        return item;
      }
    })
    setGameResult(newGameResult);
  }

  return (
    <div
      style={{
        backgroundColor: "#0000ff",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        cursor: 'pointer'
      }}
      className="App-header"
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          backgroundColor: "rgba(255, 255, 255,0.5)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 0 0 20px" }}>
          <img src={main} style={{ width: "48px", height: "48px" }} onClick={() => {
            window.history.back()
          }}></img>
          {isPlay === true ? <img src={radio} style={{ width: "48px", height: "48px", marginRight: "30px" }} onClick={() => {
            const bjmusic = document.getElementById("bjmusic");
            setPlay(false);
            bjmusic.pause();
          }}></img> : <img src={noradio} style={{ width: "48px", height: "48px", marginRight: "30px" }} onClick={() => {
            const bjmusic = document.getElementById("bjmusic");
            setPlay(true);
            bjmusic.play();
          }}></img>}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
            cursor: 'pointer'
          }}
        >
          <div className="logo" style={{ width: "300px", color: "white" }}>
            ROUND 1/5
          </div>
          <div style={{ position: 'relative', left: 200, display: 'flex', alignItems: 'center' }}>
            <img src={nz} style={{ width: "48px", height: "48px" }}></img>
            {
              time == '0' ? '' : <div style={{ color: 'black', marginLeft: '20px' }} >{time}s</div>
            }
          </div>
        </div>
        <audio
          controls
          id="bjmusic"
          src={mu}
          autoPlay={true}
          style={{ visibility: "hidden", opacity: 0, width: "0", height: "0" }}
          loop="loop"
        ></audio>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            height: window.innerHeight - 290,
            width: "100%",
            overflow: "hidden",
            justifyContent: "space-around",
          }}
        >
          {/* Rest of the code */}
        </div>
      </div>
    </div>
  );
};

export default Game;
