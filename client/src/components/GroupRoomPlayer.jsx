import { Box, Text } from "@chakra-ui/react";
import Player from "../layouts/Player";
import ChatBox from "./ChatBox.jsx";

export default function GroupRoomPlayer() {
  return (
    <Box h={"100%"}>
      <Player></Player>
      <ChatBox />
    </Box>
  );
}
