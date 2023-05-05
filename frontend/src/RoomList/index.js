import React, { useState } from "react";
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';
import main from './../Asstes/image13.jpg'
const Roomlist = () => {
    const roomlist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
    const navigate = useNavigate()
    const [isLeader] = useState(1)
    const onJoin = () => {
        navigate('/game')
    }
    const onStart = () => {
        navigate('/game')
    }

    return (
        <div className="App-header" style={{ backgroundColor: "rgba(0, 0, 255)", height: '100%', width: '100%', overflow: 'hidden', fontSize: '20px' }}>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    backgroundColor: "rgba(255, 255, 255,0.5)",
                }}
            >
                <div style={{ display: "flex", flexDirection: "row", padding: "20px 0 0 20px" }}>
                    <img src={main} style={{width:"48px",height:"48px"}} onClick={() => {
                        window.history.back()
                    }}></img>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'scroll', height: window.innerHeight - 90, width: '100%', overflowX: 'hidden' }}>
                    {
                        roomlist.map((item, index) => {
                            return <div style={{ width: '18%', backgroundColor: 'rgba(17, 83, 165, 0.5)', height: '300px', margin: '2.5%', borderRadius: '10px', color: "white", display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '10px' }}>
                                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}> <div>Room name:</div><h2>123</h2></div>
                                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>  <div>Room name:</div><h2>{item}</h2></div>
                                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>  <div>Member:</div><h2>{item}</h2></div>
                                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} > {
                                    isLeader === index ? <Button type="primary" className="button_sb" style={{height:"43px",backgroundColor:"#00ffff"}} onClick={() => { onStart() }}>start</Button> : <Button type="primary" className="button_sb" style={{height:"43px",backgroundColor:"#00ffff"}} onClick={() => { onJoin() }}>join</Button>
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