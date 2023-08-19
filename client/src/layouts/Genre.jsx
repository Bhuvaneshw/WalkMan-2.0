import Content from "../components/Content.jsx";
import HStack from "../components/HStack.jsx";
import {useEffect, useState} from "react";
import ArtistCard from "../components/ArtistCard.jsx";
import {useNavigate} from "react-router-dom";
import ArtistCardSkeleton from "../components/skeleton/ArtistCardSkeleton.jsx";

export default function Genre() {
    const [data, setData] = useState([]);
    let loading = data.length < 1;
    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:3000/song/genre");
            setData(await res.json());
        })();
    }, []);
    const navigate = useNavigate();

    return (
        <Content>
            <HStack wrap="wrap" alignItems="stretch">
                <ArtistCardSkeleton loading={loading}/>
                <ArtistCardSkeleton loading={loading}/>
                <ArtistCardSkeleton loading={loading}/>
                <ArtistCardSkeleton loading={loading}/>
                {data.map((music) => {
                    return (
                        <ArtistCard
                            key={music}
                            artist={music}
                            onClick={() => {
                                navigate('/search?q=' + music)
                            }}
                        ></ArtistCard>
                    );
                })}
            </HStack>
        </Content>
    );
}
