import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Mic from "../assest/micAnimation.json";
import Lottie from "lottie-react";
import Gap from "./Gap";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { useDisclosure, Button, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import HStack from "./HStack";

export default function VoiceSearch({ isOpen, onClose, setSearchQuery }) {
  const cancelRef = useRef();
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const [searchData, setSearchData] = useState("");
  return browserSupportsSpeechRecognition ? (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => {
          onClose();
          setSearchQuery(transcript);
        }}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              style={{ margin: "0 auto" }}
            >
              Speak Now
            </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody style={{ margin: "0 auto" }}>
              <Lottie animationData={Mic}></Lottie>
            </AlertDialogBody>
            <Text align={"center"}>{transcript}</Text>
            <HStack justifyContent={" space-evenly"}>
              <Button
                onClick={() => {
                  SpeechRecognition.startListening({ continuous: true });
                }}
              >
                Start
              </Button>
              <Button
                onClick={() => {
                  SpeechRecognition.stopListening();
                }}
              >
                Stop
              </Button>
            </HStack>
            <Gap height={"10px"} />
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {console.log(transcript)}
    </>
  ) : (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Delete Customer
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogCloseButton />
          <AlertDialogContent>
            <AlertDialogBody>
              <AlertDialogCloseButton />
              <Text fontSize="lg">
                Your Browser Does not support this functionality
              </Text>
            </AlertDialogBody>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
