import Card from "./Card.jsx";
import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import BorderedCard from "./BorderedCard.jsx";
import Icon from "./Icon.jsx";
import Gap from "./Gap.jsx";
import Stack from "./Stack.jsx";
import Text from "./Text.jsx";
import { getMusic } from "./util.js";
import Fab from "./Fab.jsx";
import SongCardSkeleton from "./skeleton/SongCardSkeleton.jsx";
import { useToast } from "@chakra-ui/react";

export default function TopSongs({ data }) {
  let loading = data.length < 1;
  const toast = useToast();

  // console.log('top song data', data, 'loading: ', loading);
  return (
    <Card flex="2" overflow="hidden">
      <Title variant="black70 title-margin">Top Songs</Title>
      <HStack scrollable>
        <SongCardSkeleton loading={loading} />
        <SongCardSkeleton loading={loading} />
        <SongCardSkeleton loading={loading} />
        <SongCardSkeleton loading={loading} />
        {data.map((item) => {
          let { url, title, artist, icon } = item;
          return (
            <BorderedCard className="flex" key={title}>
              <Icon
                src={import.meta.env.VITE_URL+'/assets' + icon}
                className="big-icon"
                fit="cover"
                style={{
                  aspectRatio: "1/1",
                }}
              />
              <Gap height="10px" />
              <HStack justifyContent="space-between" alignItems="center">
                <Stack>
                  <Title className="noWrap">{title}</Title>
                  <Text className="noWrap">{artist}</Text>
                </Stack>
                <Gap width="10px" />
                <Fab
                  onClick={() => {
                    getMusic()
                      .setSrc(url, item)
                      .play()
                      .then(() => {
                        toast({
                          title: title,
                          description: "Playing now!",
                          duration: 1000,
                          status: "success",
                          position: "top-right",
                        });
                      })
                      .catch((error) => {
                        toast({
                          title: "Error while trying to play",
                          description: error.message,
                          duration: 2000,
                          status: "error",
                          position: "top-right",
                        });
                      });
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
