import Card from "./Card.jsx";
import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import BorderedCard from "./BorderedCard.jsx";
import Icon from "./Icon.jsx";
import Gab from "./Gap.jsx";
import Stack from "./Stack.jsx";
import Text from "./Text.jsx";
import Fab from "./Fab.jsx";
export default function Genre() {
  const a = [1, 1, 1, 1, 1, 1];
  return (
    <Card flex="2">
      <Title variant="black70 title-margin">Genre</Title>
      <HStack scrollable>
        {a.map((value) => {
          return (
            <BorderedCard className="flex" key={value}>
              <Icon src="/music.png" className="fill big-icon" />
              <Gab height="10px" />
              <HStack justifyContent="space-between" alignItems="center">
                <Stack>
                  <Title>Believer</Title>
                  <Text>Believer{value}</Text>
                </Stack>
                <Gab width="10px" />
                <Fab />
              </HStack>
            </BorderedCard>
          );
        })}
      </HStack>
    </Card>
  );
}
