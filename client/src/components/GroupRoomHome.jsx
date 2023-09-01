import { Box, Button, Input, calc } from "@chakra-ui/react";
import { getSocket } from "./util";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function GroupRoomHome() {
  const socket = getSocket();
  const navigate = useNavigate();
  const { setRoomId } = useOutletContext();

  function createRoom() {
    socket.createRoom();
  }
  function joinRoom() {
    socket.createRoom(navigate);
  }
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      h={"100%"}
    >
      <Box display={"flex"} w={"30vw"}>
        <Button
          variant={"primary"}
          bgColor={"#5F04A7"}
          color={"white"}
          onClick={createRoom}
        >
          New room
        </Button>
        <Input placeholder="Enter room id" onClick={joinRoom}></Input>
      </Box>
    </Box>
  );
}
