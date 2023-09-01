import { Box, Text } from "@chakra-ui/react";
import Player from "../layouts/Player";
import { getMusic, getSocket } from "./util";
import { useEffect } from "react";

export default function GroupRoomPlayer() {
  const audio = getMusic();
  const socket = getSocket();

  return (
    <Box h={"100%"}>
      <Text>{Math.random()}</Text>
      <Player></Player>
    </Box>
  );
}
