import {useContext, useEffect} from "react";
import Content from "../components/Content.jsx";
import searchContext from "../searchContext";
import MusicCard from "../components/MusicCard";
import HStack from "../components/HStack.jsx";
import {getMusic} from "../components/util.js";

export default function Search() {
    const {searchRes} = useContext(searchContext);
    useEffect(() => {
    }, []);

    return (
        <Content>
            <HStack wrap="wrap" alignItems="stretch">
                {searchRes.map((music) => {
                    return (
                        <MusicCard
                            key={music._id}
                            title={music.title}
                            artist={music.artist}
                            icon={music.icon}
                            onClick={() => {
                                getMusic().setSrc(music.url, music).play()
                            }}
                        ></MusicCard>
                    );
                })}
            </HStack>
        </Content>
    );
}
