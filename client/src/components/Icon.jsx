import {Image} from "@chakra-ui/react";

export default function Icon({src, radius = "10px", size, mar, width, onClick, className, style}) {
    return (
        <>
            <Image
                src={src}
                className={className}
                onClick={onClick}
                style={{
                    ...style,
                    margin: mar,
                    borderRadius: radius,
                    width: size ? size : width,
                    height: size,
                }}
            ></Image>
        </>
    );
}
