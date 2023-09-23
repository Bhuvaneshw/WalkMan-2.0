import Title from "./Title.jsx";
import Icons from "./Icons.js";
import { useState } from "react";
import Text from "./Text.jsx";

export default function ChatBox() {
  const [msg, setMsg] = useState("");
  const [showChat, setShowChat] = useState(false);

  function sendMessage() {
    //TODO: send msg
  }

  return (
    <>
      <div
        style={{
          width: "60px",
          height: "60px",
          position: "fixed",
          top: "calc(100vh - 90px)",
          right: "30px",
          cursor: "pointer",
          background: "white",
          boxShadow: "0 0 30px 10px #b7b7b7",
          padding: "10px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={() => {
          setShowChat(true);
        }}
      >
        <Icons.CHAT size={"75%"} />
      </div>
      <div
        style={{
          background: "white",
          boxShadow: "0 0 50px 16px #b7b7b7",
          position: "fixed",
          top: "calc(100vh - 530px)",
          right: "30px",
          width: "400px",
          height: "500px",
          borderRadius: "30px",
          display: showChat ? "block" : "none",
        }}
      >
        <div
          style={{
            width: "100%",
            background: "#f0f0f0",
            padding: "15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopLeftRadius: "30px",
            borderTopRightRadius: "30px",
          }}
        >
          <Title variant={"primary"}>Group Chat</Title>
          <Icons.CLOSE
            size={"30px"}
            style={{
              padding: "8px",
              cursor: "pointer",
            }}
            onClick={() => {
              setShowChat(false);
            }}
          />
        </div>
        <div
          style={{
            height: "calc(100% - 60px)",
            display: "flex",
            flexDirection: "column",
            borderBottomLeftRadius: "30px",
            borderBottomRightRadius: "30px",
          }}
        >
          <div
            style={{
              width: "100%",
              padding: "0 15px",
              flex: "1",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                background: "#ECEDEF",
                padding: "10px 15px",
                borderRadius: "8px",
                width: "60%",
                margin: "20px 0",
              }}
            >
              <Title variant={"primary"}>Arun</Title>
              <Text style={{ margin: "0 10px" }}>Hi</Text>
            </div>
            <div
              style={{
                background: "#ECEDEF",
                padding: "10px 15px",
                borderRadius: "8px",
                width: "60%",
                margin: "20px 0 20px auto",
              }}
            >
              <Title variant={"primary"}>Bhuvanesh</Title>
              <Text style={{ margin: "0 10px" }}>Hello world</Text>
            </div>
          </div>
          <div
            style={{
              background: "#E9E0F4",
              width: "calc(100% - 20px)",
              margin: "10px",
              display: "flex",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              style={{
                background: "transparent",
                padding: "10px",
                border: "none",
                outline: "none",
                flex: "1",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                background: "#5F04A7",
                padding: "0 15px",
                color: "white",
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
