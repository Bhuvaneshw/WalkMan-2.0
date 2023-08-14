import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import Card from "./Card.jsx";
import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import Icon from "./Icon.jsx";
import Gab from "./Gap.jsx";
import Stack from "./Stack.jsx";
import Text from "./Text.jsx";
import Fab from "./Fab.jsx";
import { toMinutesText } from "./util.js";
export default function Player() {
  return (
    <Card flex="1" className="flex player" pad="10px">
      <Icon src="/music.png" className="fill" radius="18px" />
      <Gab height="10px" />
      <Stack justifyContent="center" alignItems="center">
        <Title>Believer</Title>
        <Text>Top #1</Text>
        <Box style={{ padding: "10px 30px", width: "100%" }}>
          <Slider
            defaultValue={90}
            max={200}
            onChange={() => {}}
            colorScheme="primary"
            onChangeEnd={() => {}}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <HStack justifyContent="space-between" width="100%">
            <Text>{toMinutesText(200)}</Text>
            <Text>{toMinutesText(300)}</Text>
          </HStack>
          <Gab height="20px" />
          <HStack justifyContent="space-between" width="100%">
            <Icon src="/previous.svg" className="moveTopOnHover lightOnHover" />
            <Icon
              src="/seek-back.svg"
              className="moveTopOnHover lightOnHover"
            />
            <Fab className="playBtn" size="50px" />
            <Icon
              src="/seek-forward.svg"
              className="moveTopOnHover lightOnHover"
            />
            <Icon src="/next.svg" className="moveTopOnHover lightOnHover" />
          </HStack>
        </Box>
      </Stack>
    </Card>
  );
}
