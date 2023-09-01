import Content from "../components/Content.jsx";
import AudioPlayerBig from "../components/AudioPlayerBig.jsx";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import wave from "../anim/wave.json";
import { useEffect, useRef } from "react";
import { getMusic } from "../components/util.js";

export default function Player() {
  useEffect(() => {}, []);
  let lottieRef = useRef();
  return (
    <Content
      style={{
        position: "relative",
        maxHeight: "calc(100vh - 80px)",
        height: "calc(100vh - 80px)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        {/*<Lottie animationData={wave} style={{position: 'absolute', transform: 'translateY(-40%)'}}/>*/}
        <Lottie
          autoplay={!getMusic().paused}
          lottieRef={lottieRef}
          animationData={wave}
          style={{ position: "absolute", transform: "translateY(0)" }}
        />
        {/*<Lottie animationData={wave} style={{position: 'absolute', transform: 'translateY(40%)'}}/>*/}
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.main
          initial={{ scale: 0.5, x: "50%", y: "50%" }}
          animate={{ scale: 1, x: 0, y: 0 }}
          exit={{ scale: 0.5, x: "50%", y: "50%" }}
          transition={{ duration: 0.3 }}
        >
          <AudioPlayerBig lottieRef={lottieRef} />
        </motion.main>
      </div>
    </Content>
  );
}
