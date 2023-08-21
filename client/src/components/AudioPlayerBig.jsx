import {Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack, useToast,} from "@chakra-ui/react";
import Card from "./Card.jsx";
import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import ClickableIcon from "./ClickableIcon.jsx";
import Gap from "./Gap.jsx";
import Stack from "./Stack.jsx";
import Text from "./Text.jsx";
import Fab from "./Fab.jsx";
import {useEffect, useState} from "react";
import {downloadSong, getMusic, toMinutesText} from "./util.js";
import Icon from "./Icon.jsx";
import {useNavigate} from "react-router-dom";

function ProgressBar({audio}) {
    const [currentTime, setCurrentTime] = useState(Math.round(audio.currentTime));
    const [totalTime, setTotalTime] = useState(Math.round(!isNaN(audio.duration) ? audio.duration : 0));

    audio.onUpdateTime = (currentTime) => {
        setCurrentTime(currentTime);
    };
    audio.onLoad = (currentTime, duration) => {
        setCurrentTime(currentTime);
        setTotalTime(duration);
    };

    function setAudioTime(s) {
        audio.currentTime = s;
    }

    return (<Stack mar={"auto"} className="audioSeekWidth">
        <Slider
            defaultValue={currentTime}
            value={currentTime}
            max={totalTime}
            onChange={(e) => {
                setAudioTime(e);
            }}
            colorScheme="primary"
            focusThumbOnChange={false}
            onChangeEnd={() => {
            }}
        >
            <SliderTrack>
                <SliderFilledTrack/>
            </SliderTrack>
            <SliderThumb/>
        </Slider>
        <HStack justifyContent="space-between" width="100%">
            <Text>{toMinutesText(currentTime)}</Text>
            <Text>{toMinutesText(totalTime)}</Text>
        </HStack>
    </Stack>);
}

export default function AudioPlayerBig() {
    let audio = getMusic();
    window.audio = audio;
    const toaster = useToast();
    const [isPlaying, setIsPlaying] = useState(!audio.paused);
    const [data, setData] = useState(audio.data);
    const [repeat, setRepeat] = useState(false);

    audio.onEnd = () => {
        if (repeat) {
            audio.intimatePlay()
        } else setIsPlaying(false);
    };

    audio.onPlay = () => {
        if (!isPlaying) setIsPlaying(true);
    };

    audio.onPause = () => {
        if (isPlaying) setIsPlaying(false);
    };

    audio.intimatePlay = () => {
        audio
            .play()
            .then(() => audio.onPlay())
            .catch((error) => {
                audio.onPause();
                return toast(error);
            });
    };

    let navigate = useNavigate()
    useEffect(() => {
        if (audio.data === '') navigate('/')
    }, [])

    function toast(msg, status = "error") {
        return toaster({
            title: "Error while trying to play",
            description: msg.message,
            duration: 2000,
            status: status,
            position: "top-right",
        });
    }

    function playOrPause() {
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.intimatePlay();
        }
    }

    function seekBack() {
        audio.currentTime -= 10;
    }

    function seekForward() {
        audio.currentTime += 10;
    }

    function moveBack() {
        // setName(setRandAudio(audio))
    }

    function moveNext() {
        // setName(setRandAudio(audio))
    }

    return (<Card
        flex="1"
        className="flex player"
        pad="10px"
        height={"80vh"}
        mar={"auto"}
        style={{minWidth: '420px'}}
    >
        <Stack className="fill">
            <Icon src={data.icon} radius="18px" width={'60vw'} height='55vh' fit='cover'
                  style={{maxWidth: '600px', minWidth: '100%'}}/>
        </Stack>
        <Gap height="10px"/>
        <Stack justifyContent="center" alignItems="center">
            <Title>{data.name}</Title>
            <Text>Top #1</Text>
            <Box style={{padding: "10px 30px", width: "100%"}}>
                <ProgressBar audio={audio}/>
                <Gap height="20px"/>
                <HStack
                    justifyContent="space-between"
                    alignItems='center'
                >
                    <ClickableIcon
                        src="/like.svg"
                        size='30px'
                    />
                    <HStack
                        justifyContent="space-between"
                        mar="auto"
                        className="audioBtnWidth"
                    >
                        <ClickableIcon
                            src="/previous.svg"
                            onClick={moveBack}
                        />
                        <ClickableIcon
                            src="/seek-back.svg"
                            onClick={seekBack}
                        />
                        <Fab
                            className="playBtn"
                            size="50px"
                            onClick={playOrPause}
                            src={isPlaying ? "/pause.svg" : "/play.svg"}
                        />
                        <ClickableIcon
                            src="/seek-forward.svg"
                            onClick={seekForward}
                        />
                        <ClickableIcon
                            src="/next.svg"
                            onClick={moveNext}
                        />
                    </HStack>
                    <ClickableIcon
                        src={repeat ? "/repeat.svg" : "/no-repeat.svg"}
                        size='30px'
                        onClick={() => setRepeat(!repeat)}
                    />
                    <Gap width={'20px'}/>
                    <ClickableIcon
                        src="/download.svg"
                        size='30px'
                        onClick={() => {
                            downloadSong(audio.src)
                        }}
                    />
                </HStack>
            </Box>
        </Stack>
    </Card>);
}
