import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useToast,
} from "@chakra-ui/react";
import Card from "./Card.jsx";
import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import ClickableIcon from "./ClickableIcon.jsx";
import Gap from "./Gap.jsx";
import Stack from "./Stack.jsx";
import Text from "./Text.jsx";
import Fab from "./Fab.jsx";
import { useEffect, useState } from "react";
import {
  downloadSong,
  fetchPost,
  getMusic,
  getSocket,
  toMinutesText,
} from "./util.js";
import Icon from "./Icon.jsx";
import { useNavigate } from "react-router-dom";
import Lyrics from "./Lyrics.jsx";

function ProgressBar({ audio }) {
  const [currentTime, setCurrentTime] = useState(Math.round(audio.currentTime));
  const [totalTime, setTotalTime] = useState(
    Math.round(!isNaN(audio.duration) ? audio.duration : 0)
  );
  const socket = getSocket();

  audio.onUpdateTime = (currentTime) => {
    setCurrentTime(currentTime);
    if (audio.onUpdateTimeLyrics) audio.onUpdateTimeLyrics(currentTime);
  };
  audio.onLoad = (currentTime, duration) => {
    setCurrentTime(currentTime);
    setTotalTime(duration);
  };

  function setAudioTime(s) {
    audio.currentTime = s;
    if (socket) socket.emit("audioSeeked", { curTime: s });
  }

  return (
    <Stack mar={"auto"} className="audioSeekWidth">
      <Slider
        defaultValue={currentTime}
        value={currentTime}
        max={totalTime}
        onChange={(e) => {
          setAudioTime(e);
        }}
        colorScheme="primary"
        focusThumbOnChange={false}
        onChangeEnd={() => {}}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <HStack justifyContent="space-between" width="100%">
        <Text>{toMinutesText(currentTime)}</Text>
        <Text>{toMinutesText(totalTime)}</Text>
      </HStack>
    </Stack>
  );
}

export default function AudioPlayerBig({ lottieRef }) {
  let audio = getMusic();
  window.audio = audio;
  const toaster = useToast();
  const [isPlaying, setIsPlaying] = useState(!audio.paused);
  const [data, setData] = useState(audio.data);
  const [repeat, setRepeat] = useState(false);
  const [liked, setLiked] = useState(audio.data.liked);
  const socket = getSocket();

  audio.onPlay = () => {
    setIsPlaying(true);
    lottieRef.current?.play();
  };

  audio.onPause = () => {
    setIsPlaying(false);
    lottieRef.current?.pause();
  };

  audio.onEnd = () => {
    if (repeat) {
      audio.intimatePlay();
    } else setIsPlaying(false);
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

  let navigate = useNavigate();
  useEffect(() => {
    if (audio.data === "") navigate("/");
  }, []);

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
      if (socket) socket.emit("pause");
    } else {
      audio.intimatePlay();
      if (socket) socket.emit("play", { curTime: new Date() });
    }
  }

  function seekBack() {
    audio.currentTime -= 10;
    if (socket) socket.emit("seekBack");
  }

  function seekForward() {
    audio.currentTime += 10;
    if (socket) socket.emit("seekForward");
  }

  function moveBack() {
    // setName(setRandAudio(audio))
  }

  function moveNext() {
    // setName(setRandAudio(audio))
  }

  async function postLike() {
    setLiked((prev) => !prev);
    console.log("liked");
    fetchPost(import.meta.env.VITE_URL + "/songs/like", { songId: data._id });
  }

  return (
    <Stack height={"100%"} width={"100%"} scrollable>
      <Card
        flex="1"
        className="flex player"
        pad="10px"
        height={"80vh"}
        mar={"auto"}
        minWidth={"420px"}
      >
        <Stack className="fill">
          <Icon
            src={import.meta.env.VITE_URL + "/assets" + data.icon}
            radius="18px"
            width={"60vw"}
            height="55vh"
            fit="cover"
            style={{ maxWidth: "600px", minWidth: "100%" }}
          />
        </Stack>
        <Gap height="10px" />
        <Stack justifyContent="center" alignItems="center">
          <HStack
            style={{ width: "100%" }}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box />
            <Stack alignItems={"center"}>
              <Title>{audio.data.title + isPlaying}</Title>
              <Text>{audio.data.artist}</Text>
            </Stack>
            <HStack>
              <ClickableIcon
                src="/download.svg"
                size="18px"
                onClick={() => {
                  downloadSong(audio.src);
                }}
              />
            </HStack>
          </HStack>
          <Box style={{ padding: "10px 30px", width: "100%" }}>
            <ProgressBar audio={audio} />
            <Gap height="20px" />
            <HStack justifyContent="space-between" alignItems="center">
              <ClickableIcon
                src={liked ? "/liked.svg" : "/like.svg"}
                size="20px"
                onClick={postLike}
              />
              <HStack
                justifyContent="space-between"
                mar="auto"
                className="audioBtnWidth"
              >
                <ClickableIcon src="/previous.svg" onClick={moveBack} />
                <ClickableIcon src="/seek-back.svg" onClick={seekBack} />
                <Fab
                  className="playBtn"
                  size="50px"
                  onClick={playOrPause}
                  src={isPlaying ? "/pause.svg" : "/play.svg"}
                />
                <ClickableIcon src="/seek-forward.svg" onClick={seekForward} />
                <ClickableIcon src="/next.svg" onClick={moveNext} />
              </HStack>
              <ClickableIcon
                src={repeat ? "/repeat.svg" : "/no-repeat.svg"}
                size="20px"
                onClick={() => setRepeat(!repeat)}
              />
            </HStack>
          </Box>
        </Stack>
      </Card>
      {data.lyrics !== "null" && <Lyrics />}
    </Stack>
  );
}
