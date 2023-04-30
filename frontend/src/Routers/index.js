import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./../Login";
import Reg from "./../Regset";
import Home from "./../Home";
import Roomlist from "./../RoomList";
import Game from './../Game'
import GameInfo from './../GameInfo'
const Routers= ()=>{
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/reg" element={ <Reg />} />
          <Route path="/roomlist" element={ <Roomlist />} />
          <Route path="/game" element={ <Game />} />
          <Route path="/gameInfo" element={ <GameInfo />} />
          <Route path="*" element={<Navigate to="/login"/>} />
        </Routes>
      </BrowserRouter>
    )
   
}
export default Routers;
 
