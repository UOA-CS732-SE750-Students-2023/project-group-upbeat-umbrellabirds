import { useEffect, useState } from "react";
import { Button, Input, Modal, Space, message } from "antd";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { CopyOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";
import CustomButton from "../../components/custom-button";
import usePost from "../../hooks/usePost";
import useGet from "../../hooks/useGet";
import PlayerProfile from "../../components/player-profile";
import defaultLogo from "./../../assets/default-profile.jpg"


function GamePage() {
    return (
        <div className="App-GamePage">
            <div className="game_header">
                <h3>ROUND # RESULTS</h3>
                <img src="../../../public/images/微信图片_20230508102928_03.gif" alt="" />
            </div>
            <div className="game_content">
                <ul>
                    <li>
                        <div className="imgUser">
                            <div style={{ color: "#fff" }}>1st</div>
                            <img src="../../../public/images/微信图片_20230508102928_10.gif" alt="" style={{ width: "250px", height: "180px" }} />
                        </div>
                        <div style={{ width: "280px", textAlign: "left", color: "#fff" }}>Flying Mooso</div>
                        <img src="../../../public/images/微信图片_20230508102928_13.gif" alt="" style={{ width: "140px", height: "180px" }} />
                    </li>
                    <li>
                    <div className="imgUser">
                            <div style={{ color: "#fff" }}>2nd</div>
                            <img src="../../../public/images/微信图片_20230508102928_10.gif" alt="" style={{ width: "200px", height: "130px" }} />
                        </div>
                        <div style={{ width: "280px", textAlign: "left", color: "#fff" }}>Moose with horse legs and edgie winds</div>
                        <img src="../../../public/images/微信图片_20230508102928_21.gif" alt="" style={{ width: "85px", height: "115px" }} />
                    </li>
                    <li>
                    <div className="imgUser">
                            <div style={{ color: "#fff" }}>3rd</div>
                            <img src="../../../public/images/微信图片_20230508102928_10.gif" alt="" style={{ width: "150px", height: "100px" }} />
                        </div>
                        <div style={{ width: "280px", textAlign: "left", color: "#fff" }}>Donkey</div>
                        <img src="../../../public/images/微信图片_20230508102928_29.gif" alt="" style={{ width: "42px", height: "77px" }} />
                    </li>
                </ul>
            </div>
            <div className="game_bottom" style={{textAlign:"right"}}>
                <img src="../../../public/images/微信图片_20230508102928_38.gif" alt="" style={{ width: "58px", height: "50px" }} />
                <img src="../../../public/images/微信图片_20230508102928_35.gif" alt="" style={{ width: "77px", height: "70px" ,margin:"0 30px"}} />
            </div>
        </div>
    );
}

export default GamePage;
