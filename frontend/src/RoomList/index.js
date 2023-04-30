import React, { useState } from "react";
import {Button} from 'antd'
import { useNavigate } from 'react-router-dom';
const Roomlist = ()=>{
    const roomlist = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    const navigate =useNavigate()
    const [isLeader] = useState(1)
    const onJoin=()=>{
        navigate('/game')
    }
    const onStart = ()=>{
        navigate('/game')
    }
    
    return  (
        <div style={{backgroundColor:'#282c34',height:'100%',width:'100%',overflow:'hidden',fontSize:'20px'}} className="App-header">
            <div
                style={{
                width: "100%",
                height: "100%",
                position: "relative",
                backgroundColor: "rgba(255, 255, 255,0.5)",
                display:"flex",alignItems:"center",justifyContent:'center'
                }}
      >
            <div style={{display:'flex',flexWrap:'wrap',overflowY:'scroll',height:'100%',width:'100%',overflowX:'hidden'}}>
            {
                roomlist.map((item,index)=>{
                    return <div style={{width:'18%',backgroundColor:'rgba(17, 83, 165, 0.9)',height:'300px',margin:'2.5%',borderRadius:'10px',color:"white",display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',padding:'10px'}}>
                        <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-around'}}> <div>Room Name:</div><h2>123</h2></div>
                        <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-around'}}>  <div>Room Name:</div><h2>{item}</h2></div>
                        <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-around'}}>  <div>Member:</div><h2>{item}</h2></div>
                        <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}} > {
                            isLeader === index?<Button type="primary" onClick={()=>{onStart()}}>start</Button>:<Button type="primary" onClick={()=>{onJoin()}}>join</Button>
                        }  </div>
                        </div>
                })
            }
            </div>
            </div>
        </div>
    );
}
export default Roomlist;