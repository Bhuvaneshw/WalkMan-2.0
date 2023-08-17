import Card from "./Card.jsx";
import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import BorderedCard from "./BorderedCard.jsx";
import Icon from "./Icon.jsx";
import Gab from "./Gap.jsx";
import Stack from "./Stack.jsx";
import Text from "./Text.jsx";
import {getMusic, getRandMusic} from "./util.js";
import Fab from "./Fab.jsx";
import SongCardSkeleton from "./skeleton/SongCardSkeleton.jsx";

export default function TopSongs({data}) {
    let loading = data.length<1;
    console.log('top song data', data, 'loading: ',loading);
    return (
        <Card flex="1" height="350px" overflow="hidden">
            <Title variant="black70 title-margin">Top Songs</Title>
            <HStack height="100%" scrollable>
                <SongCardSkeleton loading={loading}/>
                <SongCardSkeleton loading={loading}/>
                <SongCardSkeleton loading={loading}/>
                <SongCardSkeleton loading={loading}/>
                {data.map(({artist, title}) => {
                    return (
                        <BorderedCard className="flex" key={title}>
                            <Icon src="/music.png" className="big-icon"/>
                            <Gab height="10px"/>
                            <HStack justifyContent="space-between" alignItems="center">
                                <Stack>
                                    <Title className='noWrap'>{title}</Title>
                                    <Text className='noWrap'>{artist}</Text>
                                </Stack>
                                <Gab width="10px"/>
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
