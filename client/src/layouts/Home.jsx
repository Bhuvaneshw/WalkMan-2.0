import Content from "../components/Content.jsx";
import ResponsiveHStack from "../components/ResponsiveHStack";
import Artist from "../components/Artist.jsx";
import Genre from "../components/Genre";
import AudioPlayerSmall from "../components/AudioPlayerSmall.jsx";
import TopSongs from "../components/TopSongs.jsx";
import React, {useEffect, useState} from "react";
import Stack from "../components/Stack.jsx";
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
import {useNavigate} from "react-router-dom";

export default function Home() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef = React.useRef();
    const [retry, setRetry] = useState(false);
    const [data, setData] = useState({songs: [], artist: [], genre: []});
    let toast = useToast();
    let navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.token === undefined || sessionStorage.token === 'undefined')
            navigate('/login');
    }, []);

    useEffect(() => {
        if (sessionStorage.token !== undefined && sessionStorage.token !== 'undefined') {
            (async () => {
                let res;
                await fetch(import.meta.env.VITE_URL + "/songs/home", {
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
            <ResponsiveHStack width="100%">
                <TopSongs data={data.songs}/>
                <AudioPlayerSmall songs={data.songs}/>
            </ResponsiveHStack>
            <Stack width="100%">
                <Genre data={data.genre.splice(0, 10)}/>
                <Artist data={data.artist.splice(0, 10)}/>
            </Stack>
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
