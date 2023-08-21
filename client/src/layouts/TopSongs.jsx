import Content from "../components/Content.jsx";
import MusicCard from "../components/MusicCard";
import HStack from "../components/HStack.jsx";
import {useEffect, useState} from "react";
import SongCardSkeleton from "../components/skeleton/SongCardSkeleton.jsx";
import {getMusic} from "../components/util.js";
import {useToast} from "@chakra-ui/react";

export default function TopSongs() {
    const [data, setData] = useState([]);
    let loading = data.length < 1;
    let toast = useToast();
    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:3000/song/top");
            setData(await res.json());
        })();
    }, []);
    // console.log(data)
    return (
        <Content>
            <HStack wrap="wrap" alignItems="stretch">
                <SongCardSkeleton loading={loading}/>
                <SongCardSkeleton loading={loading}/>
                <SongCardSkeleton loading={loading}/>
                <SongCardSkeleton loading={loading}/>
                {data.map((music) => {
                    return (music.title &&
                        <MusicCard
                            icon={music.icon}
                            key={music._id}
                            title={music.title}
                            artist={music.artist}
                            _id={music._id}
                            onClick={() => {
                                toast({
                                    title: music.title,
                                    description: 'Playing now!',
                                    duration: 3000,
                                    status: 'success',
                                    position: 'top-right',
                                });
                                getMusic().setSrc(music.url, music).play()
                            }}
                        ></MusicCard>
                    );
                })}
            </HStack>
        </Content>
    );
}
