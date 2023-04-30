import React, { useEffect, useState,useRef } from "react";
import { Button, Input } from "antd";
import src from "./../Asstes/1.png";
import mu from "./../music/1.ogg";
import tx from "./../Asstes/t.png"
import {CiOutlined} from '@ant-design/icons'
import one from './../Asstes/1_1.png'
import two from './../Asstes/2_1.png'
import three from './../Asstes/3_1.png'
const Game = () => {
  const rankImg = [one,two,three]
  const [isranking,setRanking] = useState(0);
  const [rankingStatus,setRankingStatus] = useState(false);
  const [socket, setSocket] = useState(null);
  const [sendMessageValue, setOnMessage] = useState("");
  const [messageList,setMessageList] =useState ([]);
	const [time,setTime]=useState(0)//倒计时时间
  const timeRef=useRef()//设置延时器
//倒计时
  useEffect(()=>{
    //如果设置倒计时且倒计时不为0
      if(time&&time!==0){
        timeRef.current=setTimeout(()=>{
          setTime(time=>time-1)
      },1000)
      }
      //清楚延时器
      return ()=>{
        
          clearTimeout(timeRef.current)
      }
  },[time])


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
  const addList =(data)=>{
    const list = JSON.parse(data)
    const arry= JSON.parse(JSON.stringify(messageList))
    arry.push(list)
    setMessageList(arry)
  }
  const onSendMessage =()=>{
    const data = JSON.stringify({ type: "0", msg: sendMessageValue });
    socket.send(data);
    setOnMessage('')
    document.getElementsByClassName('content')[0].srollTop = 10000000;
  
  }
  const onMessage = (val) => {
    setOnMessage(val);
    // 点击发送webscoket
  };
  const onStart =()=>{
    setTime(5);
    setTimeout(() => {
      setRanking(1)
    }, 5000);
  }
  return (
    <div
      style={{
        backgroundColor: "#282c34",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        cursor:'pointer'
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
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
            cursor:'pointer'
          }}
        >
          <div className="logo" style={{ width: "20%" }}>
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
          <div style={{position:'relative',left:200,display:'flex',alignItems:'center'}}>
          <CiOutlined />
            {
              time == '0'? '':<div style={{color:'black',marginLeft:'20px'}} >{time}s</div>
            }
           </div>
        </div>
        <audio
          controls
          src={mu}
          autoPlay={true}
          style={{ Visibility: "Visibility", opacity: 0 }}
          loop="loop"
        ></audio>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            height: "80%",
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
              style={{ width: "100%", height: "60%", borderRadius: "10px" }}
            />
            <div
              style={{
                width: "100%",
                height: "20%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  marginTop: "50px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {
                  isranking  != 0 ? <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%'}}><div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'50%',backgroundColor:'#ffffff',color:'black'}}>生成文本信息</div></div>:<div style={{width:'100%',display:'flex',justifyContent:'space-between'}}>
                          <div style={{ width: "80%" }}>
                        <Input placeholder="Basic usage" />
                      </div>
                      <div style={{ width: "10%" }}>
                        <Button type="primary" style={{ width: "100%" }} onClick={()=>onStart()}>
                          guess
                        </Button>
                      </div>
                    </div>

                }
                
              </div>
            </div>
          </div>
          <div
            style={{
              width: "40%",
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
              }}
            >
              <div style={{ height: "95%",overflowY: 'scroll',overflowX: 'hidden'}} className="content">
               
                {
                messageList.map((item)=>{
                    // 0发送消息  1 接收消息
                    return <div key={item.id} style={{color:'black',padding:'20px 10px'}}>
                          {
                            item.type != 0 ?<div style={{width:'100%',display:'flex',alignItems:'center'}}><img src={tx} alt='' style={{width:"40px",height:'40px',borderRadius:"50%"}}/>
                            <div style={{minWidth:'15%',backgroundColor:'#E7E5E5',marginLeft:'30px',borderRadius:"10px"}}>
                            <div >{item.type}</div></div>
                              </div>:<div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                              <div style={{minWidth:'15%',backgroundColor:'#E7E5E5',marginRight:'30px',borderRadius:"10px"}}>
                                <div >{item.type}</div></div>
                                <img src={tx} alt='' style={{width:"40px",height:'40px',borderRadius:"50%"}}/>
                              </div>
                          }
                   
                      </div>
                  })
                }
                </div>
              <div
                style={{
                  width: "90%",
                  height: "5%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Input
                  style={{ marginLeft:'20px'}}
                  placeholder="Basic usage"
                  value={sendMessageValue}
                  onChange={(e) => {
                    onMessage(e.target.value);
                  }}
                />
                <div  style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft:'20px'
                }}
              >
                  <Button
                    type="primary"
                    onClick={() => {
                      onSendMessage();
                    }}
                  >
                    send
                  </Button>
                </div>
              </div>
            </div>: ''
            }
            {
              isranking === 1?<div style={{width:'100%',height:'100%',display:'flex',flexWrap:'wrap'}}> 
                {
                  [0,0,0,0,0,0,0,0,0,0,0,0,0].map((item)=>{
                    return  <div style={{color:'black',display:'flex',width:'45%',padding:'20px'}}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'15%'}}>
                      <img alt="" src={tx}  style={{width:'60px',height:'60px',borderRadius:'50%',}}/>
                      <div style={{marginLeft:'20px'}}>name</div>
                      </div>
                      
                      <div style={{width:'82%',borderRadius:'10px',marginLeft:'20px'}}>
                        <div style={{marginTop:'-20px',width:'80%',textAlign:'right'}}>+300</div>
                        <div style={{width:'100%',display:'flex',textAlign:'center'}} onClick={()=>{
                          setRanking(2)
                        }}>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',backgroundColor:"#2874A6",width:'80%',borderRadius:'10px',marginLeft:'20px',height:'80%'}}>name</div>
                        <div style={{width:'20%'}}>👍</div> </div>
                        
                      </div>
                  </div>
                  })
                }
            
            </div>:''
            }
            {
              isranking === 2?<div style={{width:'100%',display:"flex",height:'60%',flexWrap:'warp',flexDirection:'column'}}> 
                 {
                  [0,0,0].map((item,index)=>{
                    return  <div style={{color:'black',display:'flex',width:'100%',padding:'20px',flex:1}}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'15%'}}>
                      <img alt="" src={rankImg[index]}  style={{width:'60px',height:'60px',borderRadius:'50%',}}/>
                      </div>
                      
                      <div style={{width:'82%',borderRadius:'10px',marginLeft:'20px',display:'flex'}}>
                        <img src={tx} alt="" style={{width:'80px',height:'80px',borderRadius:'50%'}}></img>
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',backgroundColor:"#2874A6",width:'80%',borderRadius:'10px',marginLeft:'20px',height:'60%'}}>name</div>
                      </div>
                  </div>
                  })
                }
                <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}> <Button
                    type="primary"
                    style={{width:'30%',height:'80px',fontSize:'25px'}}
                    onClick={() => {
                      setRanking(0)
                    }}
                  >
                    continue
                  </Button> </div>
              </div>:''
            }
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
