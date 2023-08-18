import Content from "../components/Content.jsx";
import MusicCard from "../components/MusicCard";
import HStack from "../components/HStack.jsx";
import {useEffect, useState} from "react";
import SongCardSkeleton from "../components/skeleton/SongCardSkeleton.jsx";

export default function Artist() {
    const [data, setData] = useState([]);
    let loading = data.length<1;
    useEffect(() => {
        (async () => {
            const res = await fetch("http://192.168.147.112:3000/song/artist");
            setData(await res.json());
        })();
    }, []);
    return (
        <Content>
            <HStack wrap="wrap" alignItems="stretch">
                <SongCardSkeleton loading={loading}/>
                <SongCardSkeleton loading={loading}/>
                <SongCardSkeleton loading={loading}/>
                <SongCardSkeleton loading={loading}/>
                {data.map((music) => {
                    return (
                        <MusicCard
                            key={music}
                            // title={music.title}
                            artist={music}
                        ></MusicCard>
                    );
                })}
            </HStack>
        </Content>
    );
}
