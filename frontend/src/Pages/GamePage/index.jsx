import ChatBox from '../../components/chatbox';
import './index.css'
import Logo from '../../assets/logo.png'

export default function Game() {

    return (
        <div className='container'>
            <h1>Round 1/5</h1>
            <img src={Logo} style={ {width: 200, height: 200} }/>
            <ChatBox/>
            <label htmlFor="prompt-input">Enter Prompt:</label>
            <input type="text" id="prompt-input" />
        </div>
    );
}