import React from 'react';
import { Button } from 'antd';
import PlayerProfile from '../../components/player-profile';
import Logo from "../../assets/logo.png";
import StartIcon from "../../assets/start-icon.png";
import './index.css';
import { useLocation } from 'react-router';
export default function Lobby() {

    const location = useLocation();

    const {roomInfo} = location.state;

    console.log(roomInfo);
    return (
        <div>
            <div className="container">
                
                <PlayerProfile
                picture={Logo}
                name="Player 1"
                random="false"
                />
                <h2 style={{marginTop: "50px"}}>Room Code {roomInfo}</h2>
                <Button
                    icon={<img src={StartIcon} alt="My Image" style={{ width: 100 }} />}
                    style={{ width: 200, height: 100}}>
                </Button>
            </div>

            <PlayerProfile
            picture={Logo}
            name="Player 1"
            random="true"
            />

            <PlayerProfile
            picture={Logo}
            name="Player 2"
            random="true"
            />

            <PlayerProfile
            picture={Logo}
            name="Player 3"
            random="true"
            />
        </div>
    );
}
