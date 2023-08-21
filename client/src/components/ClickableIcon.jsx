import {Image} from "@chakra-ui/react";
import {motion} from "framer-motion";

export default function ClickableIcon({src, radius = "10px", size, mar, width, onClick, className, style}) {
    return (
        <motion.div
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            className={className}
            style={{
                margin: mar,
                borderRadius: radius,
                width: size ? size : width,
                height: size,
                ...style,
            }}>
            <Image
                src={src}
                onClick={onClick}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            ></Image>
        </motion.div>
    );
}
