import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import PlayerProfile from '../../components/player-profile';
import Logo from "../../assets/logo.png";
import StartIcon from "../../assets/start-icon.png";
import './index.css';

export default function Lobby() {

    return (
        <div>

            <div className="container">
                <PlayerProfile
                picture={Logo}
                name="Player 1"
                random="false"
                />
                <Button
                    icon={<img src={StartIcon} alt="My Image" style={{ width: 100 }} />}
                    style={{ width: 200, height: 100, marginTop: "500px"  }}>
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

            <h2 className='room-code'>Room Code: </h2>
        </div>
    );
}
