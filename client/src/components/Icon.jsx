import {Image} from "@chakra-ui/react";

export default function Icon({
                                 src,
                                 radius = "10px",
                                 size,
                                 mar,
                                 height,
                                 width,
                                 onClick,
                                 fit,
                                 className,
                                 style,
                             }) {
    return (
        <>
            <Image
                src={src}
                className={className + ' nonSelectable'}
                onClick={onClick}
                style={{
                    ...style,
                    margin: mar,
                    borderRadius: radius,
                    width: size ? size : width,
                    height: size ? size : height,
                    objectFit: fit,
                    cursor: onClick ? 'pointer' : null,
                }}
            ></Image>
        </>
    );
}
