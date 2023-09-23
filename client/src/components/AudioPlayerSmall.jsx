import {Box, Skeleton, Slider, SliderFilledTrack, SliderThumb, SliderTrack, useToast,} from "@chakra-ui/react";
import Card from "./Card.jsx";
import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import ClickableIcon from "./ClickableIcon.jsx";
import Gap from "./Gap.jsx";
import Stack from "./Stack.jsx";
import Text from "./Text.jsx";
import Fab from "./Fab.jsx";
import {useState} from "react";
import {getMusic, toMinutesText} from "./util.js";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import Icon from "./Icon.jsx";

function ProgressBar({audio}) {
    const [currentTime, setCurrentTime] = useState(Math.round(audio.currentTime));
    const [totalTime, setTotalTime] = useState(
        Math.round(!isNaN(audio.duration) ? audio.duration : 0)
    );

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

    return (
        <Stack>
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
        </Stack>
    );
}

export default function AudioPlayerSmall({songs}) {
    let audio = getMusic();
    window.audio = audio;
    const toaster = useToast();
    const [isPlaying, setIsPlaying] = useState(!audio.paused);
    const [loading, setLoading] = useState(audio.paused && audio.data === "");

    audio.onEnd = () => {
        setIsPlaying(false);
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

    audio.onSetSrc = () => {
        setLoading(true);
    };

    audio.canPlay = () => {
        setLoading(false);
    };

    if (songs.length > 0 && audio.data === "") {
        audio.setSrc(songs[0].url, songs[0]);
    }

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

    audio.onKeyboardSpacePressed = () => {
        playOrPause();
    }

    audio.isChatBoxOpened = () => {
        return false;
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

    const navigate = useNavigate();
    return (
        <Card flex="1" className="flex player-small" pad="10px">
            <motion.div
                className="fill"
                whileHover={{scale: 1.05}}
                whileTap={{scale: 0.9}}
            >
                <Skeleton isLoaded={!loading} style={{borderRadius: "18px"}}>
                    <Icon
                        src={import.meta.env.VITE_URL + "/assets" + audio.data.icon}
                        radius="18px"
                        fit="cover"
                        onClick={() => navigate("/home/player")}
                        className={"small-player-icon"}
                    />
                </Skeleton>
            </motion.div>
            <Gap height="10px"/>
            <Stack justifyContent="center" alignItems="center">
                <Skeleton isLoaded={!loading}>
                    <Title>{audio.data.title}</Title>
                </Skeleton>
                <Box style={{padding: "10px 30px", width: "100%"}}>
                    <Skeleton isLoaded={!loading}>
                        <ProgressBar audio={audio}/>
                    </Skeleton>
                    <Gap height="20px"/>
                    <HStack
                        justifyContent="space-between"
                        alignItems={"center"}
                        width="100%"
                    >
                        {/*<Skeleton isLoaded={!loading} style={{borderRadius: "50%"}}>*/}
                        {/*    <ClickableIcon*/}
                        {/*        src="/previous.svg"*/}
                        {/*        className="moveTopOnHover lightOnHover"*/}
                        {/*        onClick={moveBack}*/}
                        {/*        size={"30px"}*/}
                        {/*    />*/}
                        {/*</Skeleton>*/}
                        <Skeleton isLoaded={!loading} style={{borderRadius: "50%"}}>
                            <ClickableIcon
                                src="/seek-back.svg"
                                className="moveTopOnHover lightOnHover"
                                onClick={seekBack}
                                size={"30px"}
                            />
                        </Skeleton>
                        <Skeleton isLoaded={!loading} style={{borderRadius: "50%"}}>
                            <Fab
                                className="playBtn"
                                size="50px"
                                onClick={playOrPause}
                                src={isPlaying ? "/pause.svg" : "/play.svg"}
                            />
                        </Skeleton>
                        <Skeleton isLoaded={!loading} style={{borderRadius: "50%"}}>
                            <ClickableIcon
                                src="/seek-forward.svg"
                                className="moveTopOnHover lightOnHover"
                                onClick={seekForward}
                                size={"30px"}
                            />
                        </Skeleton>
                        {/*<Skeleton isLoaded={!loading} style={{borderRadius: "50%"}}>*/}
                        {/*    <ClickableIcon*/}
                        {/*        src="/next.svg"*/}
                        {/*        className="moveTopOnHover lightOnHover"*/}
                        {/*        onClick={moveNext}*/}
                        {/*        size={"30px"}*/}
                        {/*    />*/}
                        {/*</Skeleton>*/}
                    </HStack>
                </Box>
            </Stack>
        </Card>
    );
}
