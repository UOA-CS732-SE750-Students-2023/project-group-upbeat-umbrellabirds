import './index.css'
import { Button } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons';
import PlayerProfile from '../../components/player-profile';
import Logo from "../../assets/logo.png"
import StartIcon from "../../assets/start-icon.png"

{/* <img src="../../assets/start-icon.png" alt="My Image" /> */}

export default function Lobby() {

    return (
        <div>
            

            <Button
            icon={<img src={StartIcon} alt="My Image" style={{ width: 100}}/>}
            style={{ width: 200,height: 100 }}
            >
            Start
            </Button>

            <PlayerProfile
            picture={Logo}
            name="Player 1"
            />

            <PlayerProfile
            picture={Logo}
            name="Player 2"
            />

            <PlayerProfile
            picture={Logo}
            name="Player 3"
            />

            
            <h2 className='room-code'>Room Code: </h2>

            
        </div>

        
    );
}
