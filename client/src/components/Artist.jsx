import Card from "./Card.jsx";
import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import BorderedCard from "./BorderedCard.jsx";
import Icon from "./Icon.jsx";
import Gab from "./Gap.jsx";
import Stack from "./Stack.jsx";
import Text from "./Text.jsx";
import Fab from "./Fab.jsx";
import { getMusic, getRandMusic } from "./util.js";

export default function Artist({ data }) {
  const a = [1, 11, 12, 13, 14, 15];
  return (
    <Card flex="1">
      <Title variant="black70 title-margin">Artist</Title>
      <HStack scrollable>
        {data.map((value) => {
          return (
            <BorderedCard className="flex" key={value}>
              <Icon src="/music.png" className="fill big-icon" />
              <Gab height="10px" />
              <HStack justifyContent="space-between" alignItems="center">
                <Stack>
                  <Title>{value}</Title>
                </Stack>
                <Gab width="10px" />
                <Fab
                  onClick={() => {
                    getMusic().setSrc(getRandMusic()).play();
                  }}
                />
              </HStack>
            </BorderedCard>
          );
        })}
      </HStack>
    </Card>
  );
}
