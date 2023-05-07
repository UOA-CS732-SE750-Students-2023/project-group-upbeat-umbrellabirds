import { useEffect, useState } from "react";
import { Button, Input, Modal, Space, message } from "antd";
import "./index.css";
import logo from "./../../assets/react.svg";
import { useNavigate } from "react-router-dom";
import { CopyOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";
import CustomButton from "../../components/CustomButton";
import PlayerProfile from "../../components/player-profile";
import useGet from "../../hooks/useGet";



function Home() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState([]);
  const [profilePrompt, setProfilePrompt] = useState('');
  const [logo, setLogo] = useState(null);



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



  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setUserInfo(JSON.parse(userInfo));
  }, []);
  const onJoinRoom = () => {
    // navigate("/roomlist");
    // navigate()
  };
  const onCreateRoom = () => {
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
    message.success("cpoy success");
  };
  const onJoin = () => {
    navigate("/gameInfo");
  };
  const oncCncel = () => {
    setIsModalOpen(false);
  };
  const handleInputChange = (event) => {
    setProfilePrompt(event.target.value);
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
              oncCncel();
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
          <Input placeholder="Name: " />
          <div>
            <PlayerProfile picture={logo} random = "false"></PlayerProfile>
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
