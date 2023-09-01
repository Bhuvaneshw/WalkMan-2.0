import Stack from "./Stack.jsx";
import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import Gap from "./Gap.jsx";
import Icon from "./Icon.jsx";
import Text from "./Text.jsx";

export default function Profile({name, className, onClick}) {
    return <HStack alignItems='center' className={className} onClick={onClick}>
        <Icon src='/music.png' radius='10px' size='50px'/>
        <Gap width='10px'/>
        <Stack>
            <Title size='16px'>{name}</Title>
            <Text style={{fontSize: '12px'}}>User</Text>
        </Stack>
        <Gap width='10px'/>
        <Icon src='/arrow-down.svg' radius='10px' size='10px'/>
        <Gap width='30px'/>
    </HStack>
}