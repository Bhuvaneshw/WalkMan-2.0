import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { createSocket, destroySocket, getMusic } from "../components/util";

export default function GroupRoom() {
  const [roomId, setRoomId] = useState("");
  const [userCount, setUserCount] = useState(1);
  const [currentSong, setCurrentSong] = useState({ title: "" });
  const socket = createSocket();
  // window.socket = socket;
  const navigate = useNavigate();

  useEffect(() => {
    return () => destroySocket();
  }, []);

  socket.onRoomCreated = (roomId) => {
    // console.log("roomId", roomId);
    setRoomId(roomId);
    navigate("/home/groupRoom/search");
  };

  socket.AcceptConnection = (userId) => {
    socket.acceptConnection(userId, userCount);
    setUserCount((prev) => prev + 1);
  };

  socket.IncrementUserCount = (roomDetail) => {
    setUserCount(roomDetail.userCount + 1);
  };

  socket.onSongSelected = (music) => {
    setCurrentSong(music);
    getMusic().setSrc(music.url, music);
    getMusic().onUpdateForce();
    navigate("/home/groupRoom/player");
  };

  return (
    <Box h={"calc(100vh - 70px)"}>
      {/*{userCount}*/}
      {/*{currentSong.title}*/}
      <Outlet context={{ roomId, setRoomId, setCurrentSong }} />
    </Box>
  );
}
