import {Image} from "@chakra-ui/react";

export default function Icon({src, radius = "10px", size, className}) {
    return <>
        <Image src={src} className={className} style={{
            borderRadius: radius,
            width: size,
            height: size,
        }}
        ></Image>
    </>
}