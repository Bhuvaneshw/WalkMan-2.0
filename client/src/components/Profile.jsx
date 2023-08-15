import Stack from "./Stack.jsx";
import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import Gab from "./Gap.jsx";
import Icon from "./Icon.jsx";
import Text from "./Text.jsx";

export default function Profile({name, className}) {
    return <HStack alignItems='center' className={className}>
        <Icon src='/music.png' radius='10px' size='50px'/>
        <Gab width='10px'/>
        <Stack>
            <Title size='16px'>{name}</Title>
            <Text>Premium</Text>
        </Stack>
        <Gab width='10px'/>
        <Icon src='/arrow-down.svg' radius='10px' size='10px'/>
        <Gab width='30px'/>
    </HStack>
}