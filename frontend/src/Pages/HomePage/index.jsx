import { useEffect, useState } from "react";
import { Input, Modal, message } from "antd";
import "./index.css";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/custom-button";
import usePost from "../../hooks/usePost";
import useGet from "../../hooks/useGet";
import usePut from "../../hooks/usePut";
import PlayerProfile from "../../components/player-profile";
import defaultLogo from "./../../assets/default-profile.jpg";
import promptalooLogo from "./../../assets/promptaloo-logo.png";
import socket from "../../socket";


function Home() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [userName, setUserName] = useState("test");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState([]);
  const [profilePrompt, setProfilePrompt] = useState("");
  const [logo, setLogo] = useState(null);

  let logoToRender = null;
  if (typeof logo !== "undefined" && logo !== null && logo.length !== 0) {
    logoToRender = logo.length === 0 ? null : logo;
  } else {
    logoToRender = defaultLogo;
  }

  const generateImage = async () => {
    event.preventDefault();
    console.log(profilePrompt);
    let response = await useGet(
      `http://localhost:5001/api/openai/generate/${profilePrompt}`
    );
    setData(response);

    console.log(data);
  };
  useEffect(() => {
    if (data) {
      setLogo(data);
    }
  }, [data]);


  const [roomInfo, setRoomInfo] = useState("test");
  const [isNewRoom, setIsNewRoom] = useState(false);
  const [roomInput, setRoomInput] = useState("");
  const [playerId, setPlayerId] = useState("test");

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setUserInfo(JSON.parse(userInfo));
    socket.disconnect();
  }, []);

  useEffect(() => {
    if (roomInfo !== "test") {
      navigate("/lobby", {
        state: { roomInfo: roomInfo, userName: userName, isNewRoom: isNewRoom, playerId: playerId },
      });
    }
  }, [roomInfo, navigate]);

  const onCreateRoom = async () => {
    event.preventDefault();
    setIsNewRoom(true);
    console.log(userName + "uname ");
    let curlogo = logoToRender || defaultLogo;
    console.log(curlogo + "logo ");
    console.log(typeof curlogo + "logo type")
    let player = await usePost("http://localhost:5001/api/player/", {
      name: userName,
      url: curlogo
    });

    setPlayerId(player._id);

    let roomCode = await usePost("http://localhost:5001/api/room/", {
      owner: player._id,
    });
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

  const onJoin = async () => {
    setIsNewRoom(false);
    console.log(roomInput);

    let response = await useGet(`http://localhost:5001/api/room/${roomInput}`);

    if (response == null) {
      message.error("Room does not exist");
      return;
    } else {
      console.log("Found room");
    }
    console.log(userName + "uname ");
    let curlogo = logoToRender || defaultLogo;
    console.log(curlogo + "logo ");
    console.log(typeof curlogo + "logo type")
    let player = await usePost("http://localhost:5001/api/player/", {
      name: userName,
      url: curlogo
    });

    setPlayerId(player._id);

    let room = await usePut(`http://localhost:5001/api/room/newPlayer/${roomInput}`, {
      playerID: player._id
    })
    setRoomInfo(roomInput);
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => {
    setProfilePrompt(event.target.value);
  };
  console.log("logo:", logo);
  console.log("defaultLogo:", defaultLogo);

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleRoomChange = (event) => {
    setRoomInput(event.target.value);
  };

  console.log(userName);

  return (
    <div className="page-container">

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
          <Input
            placeholder="Enter a room code here i.e. ABC123"
            onChange={handleRoomChange}
            style={{ width: "80%" }}
          />
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

      <div className="home-page">

        <div className="logo-container">
          <img className="logo-image" src={promptalooLogo} />
        </div>

        <div className="user-info-container">

          <div className="username-container">
            <Input placeholder="Username" onChange={handleNameChange} className="username-input" />
          </div>

          <div className="profile-container">
            <PlayerProfile
              picture={logoToRender || defaultLogo}
              random="false"
            ></PlayerProfile>
          </div>

          <div className="user-img-input-container">
            <Input placeholder="Enter a prompt to generate a profile image" onChange={handleInputChange} className="user-img-input" />
            <CustomButton onClick={generateImage}>Generate</CustomButton>
          </div>
          
        </div>

        <div className="roomButtons">
          <div className="joinButton">
            <CustomButton
              onClick={() => {
                onJoinRoom();
              }}
              className="joinButton"
            >
              Join room
            </CustomButton>
          </div>
          <div className="createButton">
            <CustomButton
              onClick={() => {
                onCreateRoom();
              }}
              className="createButton"
            >
              Create room
            </CustomButton>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
