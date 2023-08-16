import Content from "../components/Content.jsx";
import AudioPlayerBig from "../components/AudioPlayerBig.jsx";
import {motion} from "framer-motion";

export default function Player() {
    return (
        <Content height={'100%'}>
            <motion.main
                initial={{scale: 0.5, x: '50%', y: '50%'}}
                animate={{scale: 1, x: 0, y: 0}}
                exit={{scale: 0.5, x: '50%', y: '50%'}}
                transition={{duration: .3}}>
                <AudioPlayerBig/>
            </motion.main>
        </Content>
    );
}
