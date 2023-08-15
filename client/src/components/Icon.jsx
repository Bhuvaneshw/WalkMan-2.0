import {Image} from "@chakra-ui/react";

export default function Icon({src, radius = "10px", size, mar, onClick, className}) {
    return (
        <>
            <Image
                src={src}
                className={className}
                onClick={onClick}
                style={{
                    margin: mar,
                    borderRadius: radius,
                    width: size,
                    height: size,
                }}
            ></Image>
        </>
    );
}
