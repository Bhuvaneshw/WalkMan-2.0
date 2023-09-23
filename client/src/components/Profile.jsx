import Stack from "./Stack.jsx";
import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import Gap from "./Gap.jsx";
import Icon from "./Icon.jsx";
import {getGenreColors} from "./util.js";
import Icons from "./Icons.js";

export default function Profile({name, className, onClick}) {
    return <HStack alignItems='center' className={className} onClick={onClick} style={{cursor: 'pointer'}}>
        <Icons.USER_CIRCLE_2 size={'40px'} style={{
            color: 'white',
            borderRadius: '50%',
            padding: '8px',
            background: `linear-gradient(135deg, ${getGenreColors()[0]})`
        }}/>
        <Gap width='10px'/>
        <Stack>
            <Title size='16px'>{name}</Title>
            {/*<Text style={{fontSize: '12px'}}>User</Text>*/}
        </Stack>
        <Gap width='10px'/>
        <Icon src='/arrow-down.svg' radius='10px' size='10px'/>
        <Gap width='30px'/>
    </HStack>
}