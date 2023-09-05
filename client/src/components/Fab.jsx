import {motion} from "framer-motion";
import {Img} from "@chakra-ui/react";

export default function Fab({size = '40px', src = "/play.svg", className, onClick}) {
    return <motion.div
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}}
        className={className} style={{
        borderRadius: '50%',
        background: '#5F04A7',
        width: size,
        minWidth: size,
        height: size,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : null,
    }} onClick={onClick}>
        <Img src={src} style={{
            width: "35%", height: "35%", marginLeft: '4%'
        }}/>
    </motion.div>
}