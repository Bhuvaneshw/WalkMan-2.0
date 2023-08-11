import {Box, Img, Slider, SliderFilledTrack, SliderThumb, SliderTrack} from "@chakra-ui/react";
import './style.css'
import ResponsiveHStack from "./components/ResponsiveHStack.jsx";
import Card from "./components/Card.jsx";
import Title from "./components/Title.jsx";
import HStack from "./components/HStack.jsx";
import BorderedCard from "./components/BorderedCard.jsx";
import Icon from "./components/Icon.jsx";
import Gab from "./components/Gap.jsx";
import Stack from "./components/Stack.jsx";
import Text from "./components/Text.jsx";
import Fab from "./components/Fab.jsx";
import {useState} from "react";

function toMinutesText(sec) {
    let m = Math.trunc(sec / 60);
    let s = sec - m * 60;
    return `${m}:${s}`;
}

function App() {
    let a = []
    let i = 15, j = 0;
    while (j++ < i) a.push(j);

    let totalTime = 296;

    function artist() {
        return <Card flex='1' height='350px' overflow='hidden' className='artist'>
            <Title variant='black70 title-margin'>Artists</Title>
            <Stack height='100%' scrollable>
                {a.map((value, index, array) => {
                    return <BorderedCard className="flex" key={value} height='100%' width='auto' pad='4px'>
                        <HStack justifyContent='space-between' alignItems='center' width='100%'>
                            <Icon src="/music.png" className="fill small-icon"/>
                            <Gab width='20px'/>
                            <Stack className='fill'>
                                <Title>Believer</Title>
                                <Text>Top #{value}</Text>
                            </Stack>
                            <Gab width='10px'/>
                            <Img src={value % 2 === 0 ? "/liked.svg" : "/like.svg"} style={{
                                width: "25px",
                                height: "25px",
                            }}/>
                            <Text>123</Text>
                            <Gab width='30px'/>
                            <Img src="/play-primary.svg" style={{
                                width: "23px",
                                height: "23px",
                            }}/>
                            <Gab width='30px'/>
                        </HStack>
                    </BorderedCard>
                })}
                <BorderedCard className="flex" height='80%' width='auto'/>
            </Stack>
        </Card>;
    }

    function topSongs() {
        return <Card flex='1'>
            <Title variant='black70 title-margin'>Top Songs</Title>
            <HStack scrollable>
                {a.map((value, index, array) => {
                    return <BorderedCard className="flex" key={value}>
                        <Icon src="/music.png" className="fill big-icon"/>
                        <Gab height="10px"/>
                        <HStack justifyContent='space-between' alignItems='center'>
                            <Stack>
                                <Title>Believer</Title>
                                <Text>Believer{value}</Text>
                            </Stack>
                            <Gab width='10px'/>
                            <Fab/>
                        </HStack>
                    </BorderedCard>
                })}
            </HStack>
        </Card>;
    }

    function genre() {
        return <Card flex='2'>
            <Title variant='black70 title-margin'>Genre</Title>
            <HStack scrollable>
                {a.map((value, index, array) => {
                    return <BorderedCard className="flex" key={value}>
                        <Icon src="/music.png" className="fill big-icon"/>
                        <Gab height="10px"/>
                        <HStack justifyContent='space-between' alignItems='center'>
                            <Stack>
                                <Title>Believer</Title>
                                <Text>Believer{value}</Text>
                            </Stack>
                            <Gab width='10px'/>
                            <Fab/>
                        </HStack>
                    </BorderedCard>
                })}
            </HStack>
        </Card>;
    }

    function player() {
        return <Card flex='1' className='flex player' pad='10px'>
            <Icon src="/music.png" className="fill" radius='18px'/>
            <Gab height="10px"/>
            <Stack justifyContent='center' alignItems='center'>
                <Title>Believer</Title>
                <Text>Top #1</Text>
                <Box style={{padding: '10px 30px', width: '100%'}}>
                    <Slider defaultValue={90} max={totalTime} onChange={update}>
                        <SliderTrack>
                            <SliderFilledTrack/>
                        </SliderTrack>
                        <SliderThumb/>
                    </Slider>
                    <HStack justifyContent='space-between' width='100%'>
                        <Text>{toMinutesText(playbackTime)}</Text>
                        <Text>{toMinutesText(totalTime)}</Text>
                    </HStack>
                    <Gab height='20px'/>
                    <HStack justifyContent='space-between' width='100%'>
                        <Fab/>
                        <Fab/>
                        <Fab/>
                        <Fab/>
                        <Fab/>
                    </HStack>
                </Box>
            </Stack>
        </Card>;
    }

    let [playbackTime, setPlaybackTime] = useState(90)

    function update(e) {
        setPlaybackTime(e)
    }

    return <>
        <ResponsiveHStack width='100%'>

            {topSongs()}

            {artist()}

        </ResponsiveHStack>

        <ResponsiveHStack width='100%'>

            {genre()}

            {player()}

        </ResponsiveHStack>
    </>;
}

export default App;
