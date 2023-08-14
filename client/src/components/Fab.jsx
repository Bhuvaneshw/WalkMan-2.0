import {Img} from "@chakra-ui/react";

export default function Fab({size = '40px', src = "/play.svg", className}) {
    return <div className={'moveTopOnHover lightOnHover ' + className} style={{
        borderRadius: '50%',
        background: '#5F04A7',
        width: size,
        minWidth: size,
        height: size,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <Img src={src} style={{
            width: "35%",
            height: "35%",
            marginLeft: '4%'
        }}/>
    </div>
}