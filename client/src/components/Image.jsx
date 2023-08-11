import {Image} from "@chakra-ui/react";

export default function Img({src, radius = "10px"}) {
    return <>
        <Image src={src} style={{
            borderRadius: radius
        }}
        ></Image>
    </>
}