import {useContext} from "react";
import Content from "../components/Content.jsx";
import {searchContext} from "../searchContext";
import MusicCard from "../components/MusicCard";
import HStack from "../components/HStack.jsx";
import {getMusic} from "../components/util.js";
import {useToast} from "@chakra-ui/react";
import SongCardSkeleton from "../components/skeleton/SongCardSkeleton.jsx";

export default function Search() {
    const {searchRes} = useContext(searchContext);
    const isLoading = searchRes.length < 1;
    const toast = useToast();

    return (
        <Content>
            <HStack wrap="wrap" alignItems="stretch">
                <SongCardSkeleton loading={isLoading}/>
                <SongCardSkeleton loading={isLoading}/>
                <SongCardSkeleton loading={isLoading}/>
                <SongCardSkeleton loading={isLoading}/>
                {searchRes.map((music) => {
                    return (
                        <MusicCard
                            key={music._id}
                            title={music.title}
                            artist={music.artist}
                            icon={music.icon}
                            onClick={() => {
                                getMusic().setSrc(music.url, music)
                                    .play()
                                    .then(() => {
                                        toast({
                                            title: music.title,
                                            description: "Playing now!",
                                            duration: 1000,
                                            status: "success",
                                            position: "top-right",
                                        });
                                    })
                                    .catch((error) => {
                                        toast({
                                            title: "Error while trying to play",
                                            description: error.message,
                                            duration: 2000,
                                            status: "error",
                                            position: "top-right",
                                        });
                                    });
                            }}
                        ></MusicCard>
                    );
                })}
            </HStack>
        </Content>
    );
}
