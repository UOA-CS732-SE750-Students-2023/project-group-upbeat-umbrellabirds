import { useEffect, useState } from "react";
import { Input, Modal, Space, message } from "antd";
import "./index.css";
import logo from "./../../assets/react.svg";
import { useNavigate } from "react-router-dom";
import { CopyOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";
import CustomButton from "../../components/custom-button";
import usePost from "../../hooks/usePost";
import useGet from "../../hooks/useGet";

function Home() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [userName, setUserName] = useState("test");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomInfo, setRoomInfo] = useState("test");
  const [isNewRoom, setIsNewRoom] = useState(false)
  const [roomInput, setRoomInput] = useState('');

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setUserInfo(JSON.parse(userInfo));
  }, []);

  useEffect(() => {
    if(roomInfo !== "test"){
      navigate("/lobby", {state: {roomInfo: roomInfo, userName: userName, isNewRoom: isNewRoom}});
    }
  }, [roomInfo, navigate]);

  const onCreateRoom = async() => {
    event.preventDefault();
    setIsNewRoom(true)
    let roomCode = await usePost("http://localhost:5001/api/room/", {owner: userName});
    console.log(roomCode);
    setRoomInfo(roomCode.code);
  };

  const onJoinRoom = () => {
    setIsModalOpen(true)
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

  const onJoin = async() => {
    setIsNewRoom(false)
    console.log(roomInput)

    let response = await useGet(`http://localhost:5001/api/room/${roomInput}`);

    if (response == null) {
      message.error("Room does not exist");
      return;
    } else {
      console.log('Found room');
    }
    setRoomInfo(roomInput)
  };


  const onCancel = () => {
    setIsModalOpen(false);
  };

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleRoomChange = (event) => {
    setRoomInput(event.target.value);
  };

  return (
    <header className="App-header">
      <Modal
        title="Join Room"
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
          <div style={{ width: "20%" }}>Room Code:</div>
          <Input placeholder="Enter a room code here i.e. ABC123" onChange={handleRoomChange} style={{ width: "80%" }} />
        </div>
        {/* <div
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
        </div> */}
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
          <div id="UserName"><Input placeholder="Enter a name" onChange={handleNameChange} /></div>
          <div>
            <img src={logo} className="userImg" alt=""></img>
          </div>
          <div>
            {" "}
            <div id="userImgInput">
              {" "}
              <Input placeholder="prompt" />
            </div>
            <div>
              <CustomButton type="primary" className="homeButton">
                Generate avatar
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
