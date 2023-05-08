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
  const [time, setTime] = useState(0)//倒计时时间
  const timeRef = useRef()//设置延时器
  const [isPlay,setPlay]=useState(true);
  const result = [{data:0,isGood:0},{data:0,isGood:0},{data:0,isGood:0},{data:0,isGood:0}];
  const [gameResult, setGameResult] = useState(result);
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


  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000/");
    setSocket(socket);
    socket.onopen = function () {
      console.log("websocket open");
    };
    // 结束websocket
    socket.onclose = function () {
      console.log("websocket close");
    };
    // 接受到信息
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
    // 点击发送webscoket
  };
  const onStart = () => {
    setTime(5);
    setTimeout(() => {
      setRanking(1)
    }, 5000);
  }
  const updateGameResult=(idx,val)=>{
    let newGameResult = gameResult.map(function(item,index){
      if(index===idx){
        return {
          ...item,
          isGood:val
        }
      }else{
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
      > <div style={{ display: "flex", justifyContent:"space-between", padding: "20px 0 0 20px" }}>
                    <img src={main} style={{width:"48px",height:"48px"}} onClick={() => {
                        window.history.back()
                    }}></img>
                    {isPlay==true?<img src={radio} style={{width:"48px",height:"48px",marginRight:"30px"}} onClick={() => {
                        const bjmusic=document.getElementById("bjmusic");
                        setPlay(false);
                        bjmusic.pause();
                    }}></img>:<img src={noradio} style={{width:"48px",height:"48px",marginRight:"30px"}} onClick={() => {
                      const bjmusic=document.getElementById("bjmusic");
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
          <div className="logo" style={{ width: "300px",color:"white" }}>
            ROUND 1/5
          </div>
          <div style={{ position: 'relative', left: 200, display: 'flex', alignItems: 'center' }}>
          <img src={nz} style={{width:"48px",height:"48px"}}></img>
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
          style={{ Visibility: "Visibility", opacity: 0, width: "0", height: "0" }}
          loop="loop"
        ></audio>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            height: window.innerHeight-290,
            width: "100%",
            overflow: "hidden",
            justifyContent: "space-around",
          }}
        >
          <div
            style={{
              width: "40%",
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "column",
            }}
          >
            <img
              src={src}
              alt=""
              style={{ width: "100%", height: "67%", borderRadius: "10px" }}
            />
            <div
              style={{
                width: "100%",
                height: "80px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  marginTop: "30px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {
                  isranking != 0 ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50%', backgroundColor: '#ffffff', color: 'black' }}>生成文本信息</div></div> : <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: "350px" }}>
                      <Input placeholder="Basic usage" style={{ height: "48px" }} />
                    </div>
                    <div style={{background:"springgreen",marginLeft:"10px",borderRadius:"20px",display:"flex",alignItems:"center",flexDirection:"row"}}>
                    <Button type="primary"
                      className="button_sb" style={{ width: "100px",height:"50px" }} onClick={() => onStart()}>
                      guess
                    </Button>
                    <img src={guess} style={{borderRadius:"20px"}}></img>
                    </div>
                  </div>

                }

              </div>
            </div>
          </div>
          <div
            style={{
              width: "50%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {
              isranking === 0 ? <div
                style={{
                  width: "100%",
                  backgroundColor: "#ffffff",
                  height: "90%",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius:"10px"
                }}
              >
                <div style={{ height: "95%", overflowY: 'auto', overflowX: 'hidden', background:"#bbbdd9",borderTopRightRadius:"10px",borderTopLeftRadius:"10px"}} className="content">

                  {
                    messageList.map((item) => {
                      // 0发送消息  1 接收消息
                      return <div key={item.id} style={{ color: 'black', padding: '20px 10px' }}>
                        {
                          item.type != 0 ? <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}><img src={tx} alt='' style={{ width: "40px", height: '40px', borderRadius: "50%" }} />
                            <div style={{ minWidth: '15%', backgroundColor: '#E7E5E5', marginLeft: '30px', borderRadius: "10px" }}>
                              <div >{item.type}</div></div>
                          </div> : <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <div style={{ minWidth: '15%', backgroundColor: '#E7E5E5', marginRight: '30px', borderRadius: "10px" }}>
                              <div >{item.type}</div></div>
                            <img src={tx} alt='' style={{ width: "40px", height: '40px', borderRadius: "50%" }} />
                          </div>
                        }

                      </div>
                    })
                  }
                </div>
                <div
                  style={{
                    height: "60px",
                    lineHeight: "60px",
                    display: "flex",
                    alignItems: "center",
                    background:"#bbbdd9",
                    borderBottomRightRadius:"10px",
                    borderBottomLeftRadius:"10px"
                  }}
                >
                  <Input
                    style={{ marginLeft: '20px', height: "48px" }}
                    placeholder="Basic usage"
                    value={sendMessageValue}
                    onChange={(e) => {
                      onMessage(e.target.value);
                    }}
                  />
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  >
                    <img src={sendMs} style={{width:"48px",marginRight:"20px"}} onClick={() => {
                        onSendMessage();
                      }}></img>
                  </div>
                </div>
              </div> : ''
            }
            {
              isranking === 1 ? <div style={{ width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap' }}>
                {
                  gameResult.map((item,index) => {
                    return <div style={{ color: 'black', display: 'flex', width: '100%', padding: '0px' }}>
                        <img alt="" src={tx} style={{ width: '60px', height: '60px', borderRadius: '50%', }} />
                      <div style={{ width: '82%', borderRadius: '10px', marginLeft: '20px' }}>
                      <div style={{ marginLeft: '20px',color:"white" }}>Player Name</div>
                        <div style={{ width: '100%', display: 'flex',  }} onClick={() => {
                        }}>
                        <div style={{ marginLeft: '20px',color:"white",width:"60%" }}>Prompt guess blah blah</div>
                        {item.isGood===0?<img alt="" src={ax1} style={{ width: '40px', height: '40px' }} onClick={()=>{
                          updateGameResult(index,1);
                        }}/>:<img alt="" src={ax21} style={{ width: '40px', height: '40px' }} onClick={()=>{
                          updateGameResult(index,0);
                        }}/>}
                        </div>
                      </div>
                    </div>
                  })
                }
 <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
          <CustomButton
            buttonName= "finish"
            cfunc={()=>{
              setGameResult(result);
              setRanking(2)
            }}
          >
          </CustomButton></div>
              </div> : ''
            }
            {
              isranking === 2 ? <div style={{ width: '100%', display: "flex", height: '60%', flexWrap: 'warp', flexDirection: 'column' }}>
                <div style={{ display: "flex", flexWrap: 'warp' }}>
                  {
                    [0, 0, 0].map((item, index) => {
                      return <div style={{
                        color: 'black', display: 'flex', width: '240px', padding: '20px', flex: 1, height: "120px",
                        backgroundColor: "rgb(131 ,74 ,228 ,0.7)", margin: "10px 10px 10px 10px", padding: "30px 10px 20px 40px", borderRadius: "50px", marginTop: (index == 1) ? "-50px" : "10px"
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100px' }}>
                          <img alt="" src={rankImg[index]} style={{ width: '120px', height: '120px', borderRadius: '50%', }} />
                        </div>

                        <div style={{ width: '220px', borderRadius: '10px', marginLeft: '20px', display: 'flex', alignItems: "center", flexDirection: "row" }}>
                          {/* <img src={tx} alt="" style={{ width: '80px', height: '80px', borderRadius: '50%' }}></img> */}
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{
                              display: 'flex', flexDirection: 'column', color: "#ffffff", fontSize: "30px",
                              justifyContent: 'center', width: '100px', borderRadius: '10px', marginLeft: '20px', height: '40px'
                            }}>name</div>
                            <div style={{
                              display: 'flex', flexDirection: 'column',
                              justifyContent: 'center', width: '100px', borderRadius: '10px', marginLeft: '20px', height: '40px'
                            }}>2000</div>
                          </div>
                        </div>
                      </div>
                    })
                  }
                </div>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>  <CustomButton
            buttonName= "finish"
            cfunc={()=>{
              setRanking(0)
            }}
          >
          </CustomButton></div>
              </div> : ''
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
