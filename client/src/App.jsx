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
import Content from "./components/Root.jsx";
import Searchbar from "./components/Searchbar.jsx";
import Profile from "./components/Profile.jsx";
import {toMinutesText} from "./components/util.js";

function App() {
    let a = []
    let i = 15, j = 0;
    while (j++ < i) a.push(j);

    let [playbackTime, setPlaybackTime] = useState(90)
    let totalTime = 296;

    function Header() {
        return <HStack height='70px' justifyContent='space-between' alignItems='center'>
            <Title mar='0 0 0 20px'>Home</Title>
            <Searchbar/>
            <Profile name='Bhuvanesh'/>
        </HStack>;
    }

    function syncSongSeconds(second) {
        //TODO: Sync song with second
    }

    function Artist() {
        return <Card flex='1' height='350px' overflow='hidden' className='artist'>
            <Title variant='black70 title-margin'>Artists</Title>
            <Stack height='100%' scrollable>
                {a.map((value) => {
                    return <BorderedCard className="flex" key={value} height='100%' width='auto' pad='4px'>
                        <HStack justifyContent='space-between' alignItems='center' width='100%'>
                            <Icon src="/music.png" className="fill small-icon"/>
                            <Gab width='20px'/>
                            <Stack className='fill'>
                                <Title>Believer</Title>
                                <Text>Top #{value}</Text>
                            </Stack>
                            <Gab width='10px'/>
                            <Img className='moveTopOnHover lightOnHover'
                                 src={value % 2 === 0 ? "/liked.svg" : "/like.svg"} style={{
                                width: "25px",
                                height: "25px",
                            }}/>
                            <Text>123</Text>
                            <Gab width='30px'/>
                            <Img className='moveTopOnHover lightOnHover' src="/play-primary.svg" style={{
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

    function TopSongs() {
        return <Card flex='1'>
            <Title variant='black70 title-margin'>Top Songs</Title>
            <HStack scrollable>
                {a.map((value) => {
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

    function Genre() {
        return <Card flex='2'>
            <Title variant='black70 title-margin'>Genre</Title>
            <HStack scrollable>
                {a.map((value) => {
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

    function Player() {
        return <Card flex='1' className='flex player' pad='10px'>
            <Icon src="/music.png" className="fill" radius='18px'/>
            <Gab height="10px"/>
            <Stack justifyContent='center' alignItems='center'>
                <Title>Believer</Title>
                <Text>Top #1</Text>
                <Box style={{padding: '10px 30px', width: '100%'}}>
                    <Slider defaultValue={90} max={totalTime} onChange={setPlaybackTime} colorScheme='primary'
                            onChangeEnd={syncSongSeconds}>
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
                        <Icon src='/previous.svg' className='moveTopOnHover lightOnHover'/>
                        <Icon src='/seek-back.svg' className='moveTopOnHover lightOnHover'/>
                        <Fab className='playBtn' size='50px'/>
                        <Icon src='/seek-forward.svg' className='moveTopOnHover lightOnHover'/>
                        <Icon src='/next.svg' className='moveTopOnHover lightOnHover'/>
                    </HStack>
                </Box>
            </Stack>
        </Card>;
    }

    return <>
        <Header/>
        <Content>
            <ResponsiveHStack width='100%'>
                <TopSongs/>
                <Artist/>
            </ResponsiveHStack>

            <ResponsiveHStack width='100%'>
                <Genre/>
                <Player/>
            </ResponsiveHStack>
        </Content>
    </>;
}

export default App;
