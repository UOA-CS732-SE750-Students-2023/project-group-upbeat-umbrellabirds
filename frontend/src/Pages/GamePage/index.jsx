import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import { Button, Input, List } from "antd";
import music from "./../../assets/music.mp3";      // music
import likedIcon from "./../../assets/liked.png"       // empty heart
import unlikedIcon from "./../../assets/unliked.png"      // full heart
import firstIcon from './../../assets/1st.png'               // medal 1st
import secondIcon from './../../assets/2nd.png'           // medal 2nd
import thirdIcon from './../../assets/3rd.png'             // medal 3rd
import sendMs from './../../assets/logo.png'       // next arrow icon
import homeIcon from './../../assets/home-icon.png'          // home icon
import audioOn from './../../assets/audio-on.png'           // audio icon
import audioOff from './../../assets/audio-off.png'       // disabled audo icon
import timerIcon from './../../assets/timer.png'                 // timer icon
import submitIcon from './../../assets/submit-icon.png'                 // submit icon
import placeholder from './../../assets/placeholder-img.png'

import CustomButton from "./../../components/custom-button";
import MusicPlayer from "../../components/MusicPlayer";

export default function Game() {
    const rankImg = [secondIcon, firstIcon, thirdIcon]
    const [isranking, setRanking] = useState(0);
    const [rankingStatus, setRankingStatus] = useState(false);
    //   const [socket, setSocket] = useState(null);
    const [sendMessageValue, setOnMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [time, setTime] = useState(0)//倒计时时间
    const timeRef = useRef()//设置延时器
    const [isPlay, setPlay] = useState(true);
    const result = [{ data: 0, isGood: 0 }, { data: 0, isGood: 0 }, { data: 0, isGood: 0 }, { data: 0, isGood: 0 }];
    const [gameResult, setGameResult] = useState(result);

    const roundNumber = 3;
    const roundImage = placeholder;

    // Timer use effect function
    useEffect(() => {
        //如果设置倒计时且倒计时不为0
        if (time && time !== 0) {
            timeRef.current = setTimeout(() => {
                setTime(time => time - 1)
            }, 1000)
        }
        //清楚延时器
        return () => {

            clearTimeout(timeRef.current)
        }
    }, [time])


    //   useEffect(() => {
    //     const socket = new WebSocket("ws://localhost:4000/");
    //     setSocket(socket);
    //     socket.onopen = function () {
    //       console.log("websocket open");
    //     };
    //     // 结束websocket
    //     socket.onclose = function () {
    //       console.log("websocket close");
    //     };
    //     // 接受到信息
    //     socket.onmessage = function (e) {
    //       addList(e.data)
    //     };
    //     // eslint-disable-next-line no-unused-expressions
    //   }, [messageList]);

    //   const addList = (data) => {
    //     const list = JSON.parse(data)
    //     const arry = JSON.parse(JSON.stringify(messageList))
    //     arry.push(list)
    //     setMessageList(arry)
    //   }
    //   const onSendMessage = () => {
    //     const data = JSON.stringify({ type: "0", msg: sendMessageValue });
    //     socket.send(data);
    //     setOnMessage('')
    //     document.getElementsByClassName('content')[0].srollTop = 10000000;

    //   }
    //   const onMessage = (val) => {
    //     setOnMessage(val);
    //     // 点击发送webscoket
    //   };

    // Starts the timer on 5 seconds and then sets the setranking state to 1
    const onStart = () => {
        setTime(5);
        setTimeout(() => {
            setRanking(1)
        }, 5000);
    }


    const updateGameResult = (idx, val) => {
        let newGameResult = gameResult.map(function (item, index) {
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

        <div class="page">
            <div class="RoundImage">
                <img
                    src={roundImage}
                    style={{ width: 200, height: 200 }}
                />
            </div>

            <div class="Chatbox">

                <div id="text-container"></div>
                <Input></Input>

            </div>

            <div class="RoundHeader">
                <h1 id="RoundText">Round {roundNumber}/5</h1>
            </div>

            <div class="PromptInput">
                <Input></Input>
            </div>

            <div class="Button">
                <div class="GuessButton">
                    <Button class="SubmitButton"
                        style={{ width: 150, height: 60 }}>
                        <span>Guess</span>
                        <img src={submitIcon} style={{ width: 30, height: 30, marginLeft: 20 }} />
                    </Button>
                </div>
            </div>

            <div class="Audio">
                <div class="AudioIcon">
                    <MusicPlayer audioURL={music} volume={1} isMuted={false} />
                </div>
            </div>

            <div class="Home">
                <div class="HomeIcon">
                    <img src={homeIcon} style={{ width: "48px", height: "48px" }} onClick={() => {
                        window.history.back()
                    }}></img>
                </div>
            </div>

            <div class="Timer">
                <div class="TimerIcon">
                    <img src={timerIcon} style={{ width: "48px", height: "48px" }}></img>
                    {
                        time == '0' ? '' : <div style={{ color: 'black', marginLeft: '20px' }} >{time}s</div>
                    }
                </div>
            </div>
        </div>

        // // Div for the whole page
        // <div
        //     className="App-header"

        // >
        //     {/* Div for the game content */}
        //     <div
        //         style={{
        //             width: "100%",
        //             height: "100%",
        //             position: "relative",
        //             backgroundColor: "#5c06bf",
        //         }}

        //     >
        //         {/* Div for music and home button */}
        //         <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 0 0 20px", backgroundColor: "#cc14ff" }}>
        //             <img src={homeIcon} style={{ width: "48px", height: "48px" }} onClick={() => {
        //                 window.history.back()
        //             }}></img>
        //             {isPlay == true ? <img src={audioOn} style={{ width: "48px", height: "48px", marginRight: "30px" }} onClick={() => {
        //                 const bjmusic = document.getElementById("bjmusic");
        //                 setPlay(false);
        //                 bjmusic.pause();
        //             }}></img> : <img src={audioOff} style={{ width: "48px", height: "48px", marginRight: "30px" }} onClick={() => {
        //                 const bjmusic = document.getElementById("bjmusic");
        //                 setPlay(true);
        //                 bjmusic.play();
        //             }}></img>}
        //         </div>
        //         <div
        //             style={{
        //                 width: "100%",
        //                 display: "flex",
        //                 alignItems: "center",
        //                 justifyContent: "center",
        //                 marginTop: "20px",
        //                 cursor: 'pointer',
        //                 backgroundColor: "#2146db"
        //             }}
        //         >
        //             {/* Div for the round header */}
        //             <div className="logo" style={{ width: "300px", color: "white", backgroundColor: "#db9a21" }}>
        //                 ROUND 1/5
        //             </div>

        //             {/* Div for the timer */}
        //             <div style={{ position: 'relative', left: 200, display: 'flex', alignItems: 'center', backgroundColor: "#db9a21" }}>
        //                 <img src={timerIcon} style={{ width: "48px", height: "48px" }}></img>
        //                 {
        //                     time == '0' ? '' : <div style={{ color: 'black', marginLeft: '20px' }} >{time}s</div>
        //                 }
        //             </div>
        //         </div>

        //         {/* Audio */}
        //         <audio
        //             controls
        //             id="bjmusic"
        //             src={mu}
        //             autoPlay={false}
        //             style={{ Visibility: "Visibility", opacity: 0, width: "0", height: "0" }}
        //             loop="loop"
        //         ></audio>

        //         {/* Div for the image and chatbox*/}
        //         <div
        //             style={{
        //                 display: "flex",
        //                 flexWrap: "wrap",
        //                 height: window.innerHeight - 290,
        //                 width: "100%",
        //                 overflow: "hidden",
        //                 justifyContent: "space-around",
        //                 backgroundColor: "#e3e03d"
        //             }}
        //         >

        //             {/* Div for the round image */}
        //             <div
        //                 style={{
        //                     width: "40%",
        //                     display: "flex",
        //                     justifyContent: "space-around",
        //                     flexDirection: "column",
        //                     backgroundColor: "#1a9628"
        //                 }}
        //             >
        //                 <img
        //                     src={placeholder}
        //                     alt=""
        //                     style={{ width: "80%", height: "67%", borderRadius: "10px" }}
        //                 />

        //                 <div
        //                     style={{
        //                         width: "100%",
        //                         height: "80px",
        //                         display: "flex",
        //                         flexDirection: "column",
        //                         alignItems: "center",
        //                         backgroundColor: "#1a2628"
        //                     }}
        //                 >

        //                     {/* Div displays the prompt input and guess button */}
        //                     <div
        //                         style={{
        //                             width: "100%",
        //                             marginTop: "30px",
        //                             display: "flex",
        //                             justifyContent: "space-between",
        //                             backgroundColor: "#1a9628"
        //                         }}
        //                     >


        //                         {
        //                             isranking != 0 ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', backgroundColor: '#ffffff', color: 'black' }}>生成文本信息</div></div> : <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        //                                 <div style={{ width: "350px" }}>
        //                                     <Input placeholder="Basic usage" style={{ height: "48px" }} />
        //                                 </div>
        //                                 <div style={{ background: "springgreen", marginLeft: "10px", borderRadius: "20px", display: "flex", alignItems: "center", flexDirection: "row" }}>
        //                                     <Button type="primary"
        //                                         className="button_sb" style={{ width: "100px", height: "50px" }} onClick={() => onStart()}>
        //                                         Guess
        //                                     </Button>
        //                                     <img src={submitIcon} style={{ borderRadius: "20px", height: "50px", width: "50px" }}></img>
        //                                 </div>
        //                             </div>

        //                         }

        //                     </div>
        //                 </div>
        //             </div>
        //             <div
        //                 style={{
        //                     width: "50%",
        //                     height: "100%",
        //                     display: "flex",
        //                     justifyContent: "center",
        //                     alignItems: "center",
        //                 }}
        //             >

        //                 {/* Checks if the isRanking is false which means the game round is still going, display the chat box */}
        //                 {
        //                     isranking === 0 ? <div
        //                         style={{
        //                             width: "100%",
        //                             backgroundColor: "#ffffff",
        //                             height: "90%",
        //                             borderRadius: "10px",
        //                             display: "flex",
        //                             flexDirection: "column",
        //                             borderRadius: "10px"
        //                         }}
        //                     >

        //                         {/* Div for the chat messages */}
        //                         <div style={{ height: "95%", overflowY: 'auto', overflowX: 'hidden', background: "#bd392f", borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }} className="content">

        //                             {
        //                                 messageList.map((item) => {
        //                                     // 0发送消息  1 接收消息
        //                                     return <div key={item.id} style={{ color: 'black', padding: '20px 10px' }}>
        //                                         {
        //                                             item.type != 0 ? <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}><img src={tx} alt='' style={{ width: "40px", height: '40px', borderRadius: "50%" }} />
        //                                                 <div style={{ minWidth: '15%', backgroundColor: '#E7E5E5', marginLeft: '30px', borderRadius: "10px" }}>
        //                                                     <div >{item.type}</div></div>
        //                                             </div> : <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        //                                                 <div style={{ minWidth: '15%', backgroundColor: '#E7E5E5', marginRight: '30px', borderRadius: "10px" }}>
        //                                                     <div >{item.type}</div></div>
        //                                                 <img src={tx} alt='' style={{ width: "40px", height: '40px', borderRadius: "50%" }} />
        //                                             </div>
        //                                         }

        //                                     </div>
        //                                 })
        //                             }
        //                         </div>

        //                         {/* Div for the chat input */}
        //                         <div
        //                             style={{
        //                                 height: "60px",
        //                                 lineHeight: "60px",
        //                                 display: "flex",
        //                                 alignItems: "center",
        //                                 background: "#FFA500",
        //                                 borderBottomRightRadius: "10px",
        //                                 borderBottomLeftRadius: "10px"
        //                             }}
        //                         >
        //                             <Input
        //                                 style={{ marginLeft: '20px', height: "48px" }}
        //                                 placeholder="Basic usage"
        //                                 value={sendMessageValue}
        //                                 onChange={(e) => {
        //                                     onMessage(e.target.value);
        //                                 }}
        //                             />
        //                             <div style={{
        //                                 display: "flex",
        //                                 alignItems: "center",
        //                             }}
        //                             >
        //                                 <img src={sendMs} style={{ width: "48px", marginRight: "20px" }} onClick={() => {
        //                                     onSendMessage();
        //                                 }}></img>
        //                             </div>

        //                         </div>
        //                     </div> : ''
        //                 }
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

