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
import placeholder from "./../../assets/placeholder-img.png"
import audioOn from "./../../assets/audio-on.png"
import homeIcon from "./../../assets/home-icon.png"


function GameResults() {
    return (
        <div className="App-ResultsPage">
            <div className="Results_header">
                <h3>Final Score Screen</h3>
                <img src={audioOn} alt="" style={{ right: "20px", }} />
                <img src={homeIcon} alt="" style={{ left: "20px", }} />
            </div>
            <div className="Results_content">
                <div className="Results_content_top">
                    <div className="Results_content_item">
                        <p>13 pts</p>
                        <img src={placeholder} alt=""/>
                        <p style={{  background: "#2095f2", borderTopLeftRadius: "20px" }}></p>
                        <p >2</p>
                    </div>
                    <div className="Results_content_item">
                        <p>19 pts</p>
                        <img src={placeholder} alt=""/>
                        <p style={{  background: "#fe3c00",  borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}></p>
                        <p>1</p>
                    </div>
                    <div className="Results_content_item">
                        <p>9 pts</p>
                        <img src={placeholder} alt=""/>
                        <p style={{  background: "#4baf4f",  borderTopRightRadius: "20px" }}></p>
                        <p>3</p>
                    </div>
                </div>
                <div className="Results_content_bot">
                    <ul>
                        <li>
                            <span>#4</span>
                            <img src={placeholder} alt="" />
                            <span>Name</span>
                            <span>8pts</span>
                        </li>
                        <li>
                            <span>#5</span>
                            <img src={placeholder} alt="" />
                            <span>Name</span>
                            <span>7pts</span>
                        </li>
                        <li>
                            <span>#6</span>
                            <img src={placeholder} alt="" />
                            <span>Name</span>
                            <span>5pts</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>#7</span>
                            <img src={placeholder} alt="" />
                            <span>Name</span>
                            <span>4pts</span>
                        </li>
                        <li>
                            <span>#8</span>
                            <img src={placeholder} alt="" />
                            <span>Name</span>
                            <span>3pts</span>
                        </li>
                        <li>
                            <span>#9</span>
                            <img src={placeholder} alt="" />
                            <span>Name</span>
                            <span>2pts</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="Results_bottom">
                <CustomButton>Play Again</CustomButton>
            </div>
        </div>
    );
}

export default GameResults;
