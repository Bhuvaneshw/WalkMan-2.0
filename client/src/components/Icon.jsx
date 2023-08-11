import {Image} from "@chakra-ui/react";

export default function Icon({src, radius = "10px", className}) {
    return <>
        <Image src={src} className={className} style={{
            borderRadius: radius
        }}
        ></Image>
    </>
}