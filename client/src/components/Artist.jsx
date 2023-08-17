import Card from "./Card.jsx";
import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import BorderedCard from "./BorderedCard.jsx";
import Icon from "./Icon.jsx";
import Gab from "./Gap.jsx";
import Stack from "./Stack.jsx";
import Fab from "./Fab.jsx";
import {getMusic, getRandMusic} from "./util.js";
import SongCardSkeleton from "./skeleton/SongCardSkeleton.jsx";

export default function Artist({data}) {
    let loading = data.length < 1;
    return (
        <Card flex="1">
            <Title variant="black70 title-margin">Artist</Title>
            <HStack scrollable>
                <SongCardSkeleton loading={loading}/>
                <SongCardSkeleton loading={loading}/>
                <SongCardSkeleton loading={loading}/>
                <SongCardSkeleton loading={loading}/>
                {data.map((value) => {
                    return (
                        <BorderedCard className="flex" key={value}>
                            <Icon src="/music.png" className="big-icon"/>
                            <Gab height="10px"/>
                            <HStack justifyContent="space-between" alignItems="center">
                                <Stack>
                                    <Title className='noWrap'>{value}</Title>
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
