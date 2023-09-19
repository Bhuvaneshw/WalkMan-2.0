import Card from "./Card.jsx";
import Title from "./Title.jsx";
import {getMusic, parseLyrics} from "./util.js";
import {useEffect, useState} from "react";
import Text from "./Text.jsx";

export default function Lyrics({socket}) {
    const [data, setData] = useState([])
    useEffect(() => {
        parseLyrics(import.meta.env.VITE_URL + '/assets' + getMusic().data.lyrics)
            .then(d => setData(d))
            .catch(e => console.log("Error: " + e))
    }, []);

    function LyricsItem() {
        const [curSec, setCurSec] = useState(getMusic().currentTime);
        getMusic().onUpdateTimeLyrics = sec => {
            setCurSec(sec);
        };

        function getNextLineInfo(index) {
            if (index + 1 === data.length) index -= 1;
            return data[index + 1];
        }

        return data.map((line, index) => {
            const below = curSec >= getNextLineInfo(index).time;
            const selected = curSec >= line.time && curSec < getNextLineInfo(index).time;
            return <LyricText selected={selected} below={below} line={line} key={index} socket={socket}/>
        });
    }

    return <Card flex="1"
                 className="flex player"
                 pad="20px"
                 mar={"40px auto"}
                 width={'100%'}
                 minWidth={"420px"}
                 maxWidth={"620px"}>
        <Title mar={'10px'}>Lyrics</Title>
        <LyricsItem/>
    </Card>;
}

function LyricText({selected, line, below, socket}) {
    let color = selected ? '#5F04A7' : null;
    let opacity = below ? 0.3 : 1;
    let id = selected ? 'current' : null;
    return <Text id={id} style={{
        color: color,
        opacity: opacity,
    }} onClick={() => {
        getMusic().currentTime = line.time
        if (socket) socket.emit("audioSeeked", {curTime: line.time});
    }}>{line.lyric}</Text>;
}
