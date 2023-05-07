import { useEffect, useState } from "react";
import { Button, Input, Modal, Space, message } from "antd";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { CopyOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";
import CustomButton from "../../components/CustomButton";
import PlayerProfile from "../../components/player-profile";
import useGet from "../../hooks/useGet";
import defaultLogo from "./../../assets/default-profile.jpg"

import usePost from "../../hooks/usePost";
import usePut from "../../hooks/usePut";
import useDelete from "../../hooks/useDelete";


function Home() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [userName, setUserName] = useState("test");
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [data, setData] = useState([]);
  const [profilePrompt, setProfilePrompt] = useState('');
  const [logo, setLogo] = useState(null);
  if (typeof logo !== 'undefined' && logo !== null && logo.length !== 0) {
    const logoToRender = logo.length === 0 ? null : logo;
  }
  else {
    const logoToRender = defaultLogo;
  }



  const generateImage = async () => {
    event.preventDefault();
    console.log(profilePrompt);
    let response = await useGet(`http://localhost:5001/api/openai/generate/${profilePrompt}`);
    setData(response);

  }
  useEffect(() => {
    if (data) {
      setLogo(data);
    }
  }, [data]);


  const [roomInfo, setRoomInfo] = useState("test");


  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setUserInfo(JSON.parse(userInfo));
  }, []);

  useEffect(() => {
    if(roomInfo !== "test"){
      navigate("/lobby", {state: {roomInfo: roomInfo, userName: userName}});
    }
  }, [roomInfo, navigate]);

  const onCreateRoom = async() => {
    event.preventDefault();
    setUserInfo()
    let roomCode = await usePost("http://localhost:5001/api/room/", {owner: userName});
    console.log(roomCode);
    setRoomInfo(roomCode.code);
  };
  const onJoinRoom = () => {
    setIsModalOpen(true);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onCopy = () => {
    copy("123");
    message.success("copy success");
  };
  const onJoin = () => {
    navigate("/gameInfo");
  };
  const onCancel = () => {
    setIsModalOpen(false);
  };
  
  const handleInputChange = (event) => {
    setProfilePrompt(event.target.value);
  };
  console.log('logo:', logo);
console.log('defaultLogo:', defaultLogo);

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };
  return (
    <header className="App-header">
      <Modal
        title="Create Room"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        bodyStyle={{ backgroundColor: "#282c34" }}
        className="modal"
        footer={null}
      >
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        >
          <div style={{ width: "20%" }}>Room name:</div>
          <Input placeholder="Basic usage" style={{ width: "80%" }} />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginTop: "20px" }}
        >
          <div style={{ width: "30%" }}>Generate room number:</div>
          <div style={{ width: "40%" }}>123</div>
          <div style={{ width: "30%" }}>
            {" "}
            <Space>
              <CopyOutlined
                onClick={() => {
                  onCopy();
                }}
                style={{ color: "#5DF609" }}
              />
            </Space>{" "}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
            justifyContent: "space-around",
          }}
        >
          <CustomButton
            type="primary"
            onClick={() => {
              onJoin();
            }}
          >
            join
          </CustomButton>
          <CustomButton
            type="primary"
            onClick={() => {
              onCancel();
            }}
          >
            cancel
          </CustomButton>
        </div>
      </Modal>
      <div className="content">
        <div className="logo">
          <p id="logoTitle">Promptaloo</p>
        </div>
        <div id="userInfoHolder">

          <div id="UserName"><Input placeholder="Username" onChange={handleNameChange} /></div>

          <div>
            <PlayerProfile picture={logoToRender || defaultLogo} random = "false"></PlayerProfile>
          </div>
          <div>
            {" "}
            <div id="userImgInput">
              {" "}
              <Input placeholder="prompt" onChange={handleInputChange} />
            </div>
            <div>
              <CustomButton onClick={generateImage}>
                Generate
                </CustomButton>
            </div>
          </div>
        </div>

        <div className="roomButtons">
          <CustomButton
            onClick={() => {
              onJoinRoom();
            }}
            className="homeButton"
          >
            Join room
          </CustomButton>
          <CustomButton
            onClick={() => {
              onCreateRoom();
            }}
            className="homeButton"
          >
            Create room
          </CustomButton>
        </div>
      </div>
    </header>
  );
}

export default Home;
