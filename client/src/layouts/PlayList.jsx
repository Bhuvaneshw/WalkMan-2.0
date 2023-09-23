import Content from "../components/Content.jsx";
import HStack from "../components/HStack.jsx";
import React, {useEffect, useState} from "react";
import SongCardSkeleton from "../components/skeleton/SongCardSkeleton.jsx";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import MusicCard from "../components/MusicCard.jsx";
import {getMusic} from "../components/util.js";

export default function PlayList() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef = React.useRef();
    const [retry, setRetry] = useState(false);
    const [data, setData] = useState([]);
    let loading = data.length < 1;
    let toast = useToast();
    useEffect(() => {
        if (sessionStorage.token !== undefined && sessionStorage.token !== 'undefined') {
            (async () => {
                let res;
                await fetch(import.meta.env.VITE_URL + "/playlist/", {
                    headers: {token: window.sessionStorage.getItem("token")},
                })
                    .then((r) => {
                        res = r;
                    })
                    .catch((error) => {
                        toast({
                            title: "Error",
                            description: error.message,
                            duration: 2000,
                            status: "error",
                            position: "top-right",
                        });
                        onOpen();
                    });
                setData(await res.json());
            })();
        }
    }, [retry]);

    return (
        <Content>
            <HStack wrap="wrap" alignItems="stretch" className={"centerOnMobile"}>
                <SongCardSkeleton loading={loading}/>
                <SongCardSkeleton loading={loading}/>
                <SongCardSkeleton loading={loading}/>
                <SongCardSkeleton loading={loading}/>
                {data.map((music) => {
                    return (
                        music.title && (
                            <MusicCard
                                icon={music.icon}
                                key={music._id}
                                title={music.title}
                                artist={music.artist}
                                _id={music._id}
                                onClick={() => {
                                    getMusic()
                                        .setSrc(music.url, music)
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
                        )
                    );
                })}
            </HStack>
            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay/>
                <AlertDialogContent>
                    <AlertDialogHeader>Something went wrong</AlertDialogHeader>
                    <AlertDialogCloseButton/>
                    <AlertDialogBody>
                        Please check your Internet connection and try again
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            colorScheme="primary"
                            ml={3}
                            onClick={() => {
                                setRetry(!retry);
                                onClose();
                            }}
                        >
                            Retry
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Content>
    );
}
