import {Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, useToast,} from "@chakra-ui/react";
import Card from "./Card.jsx";
import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import Icon from "./Icon.jsx";
import Gab from "./Gap.jsx";
import Stack from "./Stack.jsx";
import Text from "./Text.jsx";
import Fab from "./Fab.jsx";
import {useState} from "react";
import {getMusic, toMinutesText} from "./util.js";

export default function Player() {
    let audio = getMusic();
    window.audio = audio;
    const toaster = useToast()
    const [isPlaying, setIsPlaying] = useState(!audio.paused)
    const [currentTime, setCurrentTime] = useState(Math.round(audio.currentTime))
    const [totalTime, setTotalTime] = useState(Math.round(!isNaN(audio.duration) ? audio.duration : 0))

    audio.onLoad = (currentTime, duration) => {
        setCurrentTime(currentTime)
        setTotalTime(duration)
    }

    audio.onUpdateTime = (currentTime) => {
        setCurrentTime(currentTime)
    }

    audio.onEnd = () => {
        setIsPlaying(false)
    }

    audio.onPlay = () => {
        if (!isPlaying)
            setIsPlaying(true)
    }

    audio.onPause = () => {
        if (isPlaying)
            setIsPlaying(false)
    }

    audio.intimatePlay = () => {
        audio.play()
            .then(() => setIsPlaying(true))
            .catch(error => {
                setIsPlaying(false)
                return toast(error);
            })
    }

    function setAudioTime(s) {
        audio.currentTime = s
    }

    function toast(msg, status = 'error') {
        return toaster({
            title: 'Error while trying to play',
            description: msg.message,
            duration: 2000,
            status: status,
            position: 'top-right'
        });
    }

    function playOrPause() {
        if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
        } else {
            audio.intimatePlay()
        }
    }

    function seekBack() {
        audio.currentTime -= 10
    }

    function seekForward() {
        audio.currentTime += 10
    }

    function moveBack() {
        audio.setSrc('temp1.mp3')
    }

    function moveNext() {
        audio.setSrc('temp2.mp3')
    }

    return (
        <Card flex="1" className="flex player" pad="10px">
            <Icon src="/music.png" className="fill" radius="18px"/>
            <Gab height="10px"/>
            <Stack justifyContent="center" alignItems="center">
                <Title>Believer</Title>
                <Text>Top #1</Text>
                <Box style={{padding: "10px 30px", width: "100%"}}>
                    <Slider
                        defaultValue={currentTime}
                        value={currentTime}
                        max={totalTime}
                        onChange={(e) => {
                            setAudioTime(e)
                        }}
                        colorScheme="primary"
                        onChangeEnd={() => {
                        }}>
                        <SliderTrack>
                            <SliderFilledTrack/>
                        </SliderTrack>
                        <SliderThumb/>
                    </Slider>
                    <HStack justifyContent="space-between" width="100%">
                        <Text>{toMinutesText(currentTime)}</Text>
                        <Text>{toMinutesText(totalTime)}</Text>
                    </HStack>
                    <Gab height="20px"/>
                    <HStack justifyContent="space-between" width="100%">
                        <Icon src="/previous.svg" className="moveTopOnHover lightOnHover" onClick={moveBack}/>
                        <Icon
                            src="/seek-back.svg"
                            className="moveTopOnHover lightOnHover"
                            onClick={seekBack}
                        />
                        <Fab className="playBtn" size="50px" onClick={playOrPause}
                             src={isPlaying ? '/pause.svg' : '/play.svg'}/>
                        <Icon
                            src="/seek-forward.svg"
                            className="moveTopOnHover lightOnHover"
                            onClick={seekForward}
                        />
                        <Icon src="/next.svg" className="moveTopOnHover lightOnHover" onClick={moveNext}/>
                    </HStack>
                </Box>
            </Stack>
        </Card>
    );
}
