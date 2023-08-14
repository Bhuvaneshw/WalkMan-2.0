import BorderedCard from "./BorderedCard";
import HStack from "./HStack";
import Icon from "./Icon";
import Gab from "./Gap";
import Title from "./Title";
import Stack from "./Stack";
import Text from "./Text";
import Fab from "./Fab";
export default function MusicCard({ title, artist }) {
  return (
    <BorderedCard className="flex fill" height width maxW='max-content'>
      <Icon src="/music.png" className="fill big-icon" />
      <Gab height="10px" />
      <HStack justifyContent="space-between" alignItems="center">
        <Stack>
          <Title minW='60%'>{title}</Title>
          <Text>{artist}</Text>
        </Stack>
        <Gab width="10px" />
        <Fab />
      </HStack>
    </BorderedCard>
  );
}
