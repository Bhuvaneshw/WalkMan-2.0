import BorderedCard from "./BorderedCard";
import HStack from "./HStack";
import Icon from "./Icon";
import Gap from "./Gap";
import Title from "./Title";
import Stack from "./Stack";
import Text from "./Text";
import Fab from "./Fab";

export default function MusicCard({title, artist, icon, onClick}) {
    return (
        <BorderedCard className="flex responseFill" height width maxW='max-content'>
            <Icon src={icon} className="big-icon" style={{aspectRatio: '1/1'}}/>
            <Gap height="10px"/>
            <HStack justifyContent="space-between" alignItems="center" className='fill'>
                <Stack>
                    <Title minW='60%'>{title}</Title>
                    <Text>{artist}</Text>
                </Stack>
                <Gap width="10px"/>
                <Fab onClick={onClick}/>
            </HStack>
        </BorderedCard>
    );
}
