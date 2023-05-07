import { useEffect, useState } from "react";
import { Input, Modal, Space, message } from "antd";
import "./index.css";
import logo from "./../../assets/react.svg";
import { useNavigate } from "react-router-dom";
import { CopyOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";
import CustomButton from "../../components/customButton";

function Home() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setUserInfo(JSON.parse(userInfo));
  }, []);
  const onCreateRoom = () => {
    navigate("/lobby");
    navigate()
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
    message.success("cpoy success");
  };
  const onJoin = () => {
    navigate("/gameInfo");
  };
  const oncCncel = () => {
    setIsModalOpen(false);
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
          <div id="UserName">UserName</div>
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
