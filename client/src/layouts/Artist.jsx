import Content from "../components/Content.jsx";
import HStack from "../components/HStack.jsx";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ArtistCard from "../components/ArtistCard.jsx";
import ArtistCardSkeleton from "../components/skeleton/ArtistCardSkeleton.jsx";
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

export default function Artist() {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef = React.useRef();
    const [retry, setRetry] = useState(false);
    const [data, setData] = useState([]);
    let loading = data.length < 1;
    let toast = useToast();

    useEffect(() => {
        (async () => {
            let res;
            await fetch(import.meta.env.VITE_URL + "/artists", {
                headers: {token: sessionStorage.token}
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
    }, [retry]);

    const navigate = useNavigate();
    return (
        <Content>
            <HStack wrap="wrap" alignItems="stretch" className={'centerOnMobile'}>
                <ArtistCardSkeleton loading={loading}/>
                <ArtistCardSkeleton loading={loading}/>
                <ArtistCardSkeleton loading={loading}/>
                <ArtistCardSkeleton loading={loading}/>
                {data.map((artist) => {
                    return (
                        <ArtistCard
                            key={artist._id}
                            artist={artist.name}
                            icon={import.meta.env.VITE_URL + '/assets' + artist.url}
                            onClick={() => {
                                navigate("/home/search?q=" + artist.name);
                            }}
                        ></ArtistCard>
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
