import "regenerator-runtime";
import SpeechRecognition, {useSpeechRecognition,} from "react-speech-recognition";
import Mic from "../assets/micAnimation.json";
import Lottie from "lottie-react";
import Gap from "./Gap";

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Text,
} from "@chakra-ui/react";
import {useRef, useState} from "react";
import HStack from "./HStack";
import {useNavigate} from "react-router-dom";

export default function VoiceSearch({isOpen, onClose, setSearchQuery}) {
    const cancelRef = useRef();
    let {transcript, resetTranscript, listening, browserSupportsSpeechRecognition} =
        useSpeechRecognition();
    const [searchData, setSearchData] = useState("");
    let lottieRef = useRef();
    const navigate = useNavigate();

    return browserSupportsSpeechRecognition ? (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => {
                    onClose();
                    try {
                        SpeechRecognition.stopListening();
                    } catch (e) {
                    }
                    setSearchQuery(transcript);
                }}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader
                            fontSize="lg"
                            fontWeight="bold"
                            style={{margin: "0 auto"}}
                        >
                            Speak Now
                        </AlertDialogHeader>
                        <AlertDialogCloseButton/>
                        <AlertDialogBody style={{margin: "0 auto"}}>
                            <Lottie animationData={Mic} autoplay={listening} lottieRef={lottieRef}></Lottie>
                        </AlertDialogBody>
                        <Text align={"center"}>{transcript}</Text>
                        <HStack justifyContent={" space-evenly"}>
                            {!listening && <Button
                                onClick={() => {
                                    SpeechRecognition.startListening({continuous: true});
                                    lottieRef.current.play()
                                }}
                            >
                                Start
                            </Button>}
                            {listening && <Button
                                onClick={() => {
                                    lottieRef.current.pause()
                                    SpeechRecognition.stopListening();
                                    navigate('/home/search?q=' + transcript);
                                    resetTranscript()
                                    onClose()
                                }}
                            >
                                Search
                            </Button>}
                        </HStack>
                        <Gap height={"10px"}/>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    ) : (
        <>
            <Button colorScheme="red" onClick={onOpen}>
                Not Supported
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogCloseButton/>
                    <AlertDialogContent>
                        <AlertDialogBody>
                            <AlertDialogCloseButton/>
                            <Text fontSize="lg">
                                Your Browser Does not support this voice search
                            </Text>
                        </AlertDialogBody>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
}
