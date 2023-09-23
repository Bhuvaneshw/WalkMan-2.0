import { Box, Button, Input, InputGroup } from "@chakra-ui/react";
import { createSocket } from "./util";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function GroupRoomHome() {
  const socket = createSocket();
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
      <Box display={"flex"} alignItems={"center"} gap={"20px"}>
        <Button
          variant={"primary"}
          bgColor={"#5F04A7"}
          color={"white"}
          onClick={createRoom}
        >
          Enter room
        </Button>
        {/*<p>OR</p>
        <InputGroup
          style={{
            flex: 1,
            background: "#FBFCFE",
            zIndex: 2,
          }}
          colorScheme="primary"
        >
          <Input
            placeholder="Enter room id"
            onClick={joinRoom}
            focusBorderColor="#5F04A770 "
          ></Input>
        </InputGroup>*/}
      </Box>
    </Box>
  );
}
