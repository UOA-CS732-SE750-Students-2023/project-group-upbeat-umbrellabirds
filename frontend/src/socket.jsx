import { io }  from 'socket.io-client';

const URL = 'http:/13.237.34.23/:4000/';

const socket = io(URL, {
    autoConnect: false
})

export default socket;