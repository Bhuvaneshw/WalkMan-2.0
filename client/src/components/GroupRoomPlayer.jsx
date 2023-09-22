import { Box, Text } from "@chakra-ui/react";
import Player from "../layouts/Player";
export default function GroupRoomPlayer() {
  return (
    <Box h={"100%"}>
      <Text>{Math.random()}</Text>
      <Player></Player>
    </Box>
  );
}
