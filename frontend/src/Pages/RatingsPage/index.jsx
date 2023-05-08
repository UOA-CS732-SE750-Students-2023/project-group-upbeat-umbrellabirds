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


function Ratings() {
    return (
        <div className="App-RatingsPage">
            <div className="Ratings_header">
                <h3>Rate the quesses</h3>
                <img src="../../../public/images/微信图片_20230508102928_03.gif" alt="" />
            </div>
            <div className="Ratings_content">
                <div style={{ textAlign: "center" }}>
                    <p>ROUND 5/5</p>
                    <img src="../../../public/images/微信图片_20230508102928_16.gif" alt="" style={{ width: "250px", height: "250px" }} />
                </div>
                <ul>
                    <li>
                        <img src="../../../public/images/微信图片_20230508102928_16.gif" alt="" style={{ width: "50px", height: "50px" }} />
                        <div style={{width:"250px",marginLeft:"30px"}}>
                            <p style={{fontWeight:"bold"}}>Plager 1 Name</p>
                            <p style={{paddingLeft:"20px"}}>Prompt quuzs bilah bilah</p>
                        </div>
                        <img src="../../../public/images/微信图片_20230508102928_23.gif" alt="" style={{ width: "45px", height: "40px" }} />
                    </li>
                    <li>
                        <img src="../../../public/images/微信图片_20230508102928_16.gif" alt="" style={{ width: "50px", height: "50px" }} />
                        <div style={{width:"250px",marginLeft:"30px"}}>
                            <p style={{fontWeight:"bold"}}>Plager 2 Name</p>
                            <p style={{paddingLeft:"20px"}}>Prompt quuzs bilah bilah</p>
                        </div>
                        <img src="../../../public/images/微信图片_20230508102928_23.gif" alt="" style={{ width: "45px", height: "40px" }} />
                    </li>
                    <li>
                        <img src="../../../public/images/微信图片_20230508102928_16.gif" alt="" style={{ width: "50px", height: "50px" }} />
                        <div style={{width:"250px",marginLeft:"30px"}}>
                            <p style={{fontWeight:"bold"}}>Plager 3 Name</p>
                            <p style={{paddingLeft:"20px"}}>Prompt quuzs bilah bilah</p>
                        </div>
                        <img src="../../../public/images/微信图片_20230508102928_23.gif" alt="" style={{ width: "45px", height: "40px" }} />
                    </li>
                    <li>
                        <img src="../../../public/images/微信图片_20230508102928_16.gif" alt="" style={{ width: "50px", height: "50px" }} />
                        <div style={{width:"250px",marginLeft:"30px"}}>
                            <p style={{fontWeight:"bold"}}>Plager 4 Name</p>
                            <p style={{paddingLeft:"20px"}}>Prompt quuzs bilah bilah</p>
                        </div>
                        <img src="../../../public/images/微信图片_20230508102928_27.gif" alt="" style={{ width: "45px", height: "45px" }} />
                    </li>
                </ul>
            </div>
            <div className="Ratings_bottom" style={{justifyContent:"flex-end",display:"flex",alignItems:"center"}}>
                <p>Finish</p>
                <img src="../../../public/images/微信图片_20230508102928_38.gif" alt="" style={{ width: "58px", height: "50px", marginRight:"30px"}} />
            </div>

        </div>
    );
}

export default Ratings;
