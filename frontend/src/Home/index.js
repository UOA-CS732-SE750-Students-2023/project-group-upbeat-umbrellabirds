import { useEffect, useState } from "react";
import { Input, Button, Modal, Space, message } from "antd";
import "./index.css";
import logo from "./../Asstes/3.jpg";
import { useNavigate } from "react-router-dom";
import { CopyOutlined } from "@ant-design/icons";
import copy from "copy-to-clipboard";
function App() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    setUserInfo(JSON.parse(userInfo));
  }, []);
  const onJoinRoom = () => {

    navigate("/roomlist");
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
          <Button
            type="primary"
            onClick={() => {
              onJoin();
            }}
          >
            join
          </Button>
          <Button
            type="primary"
            onClick={() => {
              oncCncel();
            }}
          >
            cancel
          </Button>
        </div>
      </Modal>
      <div className="contet">
        <div className="logo">
            promptaloo
        </div>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifycontent: "center",
          flexDirection: 'column',
          width: '800px',
          // backgroundColor: 'rgba(255, 255, 255,0.7)',
          borderRadius: '15px',
          color: "black",
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: "center", 
          justifycontent: "center",
          flexDirection: 'column', width: '50%' }}>
          <div style={{background:"#fff",borderRadius:"10px",padding:"10px",marginBottom:"20px"}}>{userInfo.username}</div>
            <div style={{padding:"10px",background:"#ccc",marginBottom:"20px"}}>
              <img src={logo} className="userImg" alt=""></img>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: "center", justifyContent: "center",flexDirection:"column" }}>
            {" "}
            <div style={{ width: "500px" ,marginBottom:"20px"}}>
              {" "}
              <Input placeholder="prompt" style={{width:"500px",height:"48px"}}/>
            </div>
            <div>
              <Button type="primary"
                className="button_sb">generate avatar</Button>
            </div>

          </div>
        </div>

        <div className="footer">
          <Button
            type="primary"
            onClick={() => {
              onJoinRoom();
            }}
            className="button_sb"
          >
            join Room
          </Button>
          <Button
            type="primary"
            onClick={() => {
              onCreateRoom();
            }}
            className="button_sb"
          >
            create Room
          </Button>
        </div>
      </div>
    </header>
  );
}

export default App;
