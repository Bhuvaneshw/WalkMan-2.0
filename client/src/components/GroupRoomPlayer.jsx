import {Box, Text} from "@chakra-ui/react";
import Player from "../layouts/Player";
import {getMusic, getSocket} from "./util";
import React from "react";
import ChatBox from "./ChatBox.jsx";

export default function GroupRoomPlayer() {
    const audio = getMusic();
    const socket = getSocket();

    return (
        <Box h={"100%"}>
            <Text>{Math.random()}</Text>
            <Player></Player>
            <ChatBox/>
        </Box>
    );
}
