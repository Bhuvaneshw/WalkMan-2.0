import {useContext, useEffect, useState} from "react";
import Content from "../components/Content.jsx";
import searchContext from "../searchContext";
import MusicCard from "../components/MusicCard";
import HStack from "../components/HStack.jsx";

export default function Search() {
    const [searchRes, setSearchRes] = useState([]);
    const {searchQuery, setSearchQuery} = useContext(searchContext);
    useEffect(() => {
        fetch("http://localhost:3000/song/" + searchQuery)
            .then((res) => res.json())
            .then((res) => setSearchRes(res));
    }, [searchQuery]);

    return (
        <Content>
            <HStack wrap='wrap' alignItems='stretch'>
                {searchRes.map((music) => {
                    return (
                        <MusicCard
                            key={music._id}
                            title={music.title}
                            artist={music.artist}
                        ></MusicCard>
                    );
                })}
            </HStack>
        </Content>
    );
}
