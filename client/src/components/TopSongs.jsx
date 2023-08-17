import { Img } from "@chakra-ui/react";
import Card from "./Card.jsx";
import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import BorderedCard from "./BorderedCard.jsx";
import Icon from "./Icon.jsx";
import Gab from "./Gap.jsx";
import Stack from "./Stack.jsx";
import Text from "./Text.jsx";
import { getMusic, getRandMusic } from "./util.js";

export default function TopSongs({ data }) {
  const a = [1, 11, 12, 13, 14, 15];
  console.log(data);
  return (
    <Card flex="1" height="350px" overflow="hidden" className="artist">
      <Title variant="black70 title-margin">Top Songs</Title>
      <Stack height="100%" scrollable>
        {data.map(({ artist, title }) => {
          return (
            <BorderedCard
              className="flex"
              key={artist}
              height="100%"
              width="auto"
              pad="4px"
            >
              <HStack
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Icon src="/music.png" className="fill small-icon" />
                <Gab width="20px" />
                <Stack className="fill">
                  <Title>{title}</Title>
                  <Text>{artist}</Text>
                </Stack>
                <Gab width="10px" />
                <Img
                  className="moveTopOnHover lightOnHover"
                  src={"/liked.svg"}
                  style={{
                    width: "25px",
                    height: "25px",
                  }}
                />
                <Text>123</Text>
                <Gab width="30px" />
                <Img
                  className="moveTopOnHover lightOnHover"
                  src="/play-primary.svg"
                  style={{
                    width: "23px",
                    height: "23px",
                  }}
                  onClick={() => {
                    getMusic().setSrc(getRandMusic()).play();
                  }}
                />
                <Gab width="30px" />
              </HStack>
            </BorderedCard>
          );
        })}
        <BorderedCard className="flex" height="80%" width="auto" />
      </Stack>
    </Card>
  );
}
