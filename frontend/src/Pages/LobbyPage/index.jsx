import './index.css'
import { Button } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons';

{/* <img src="../../assets/start-icon.png" alt="My Image" /> */}

export default function Lobby() {

    return (
        <div>
            <h1>Hello testing</h1>

            <Button
            icon={<CaretRightOutlined style={{ color: 'lightgreen' }}/>}
            style={{ width: 100 }}
            >
            Start
            </Button>
        </div>

        
    );
}
