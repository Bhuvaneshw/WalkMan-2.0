import BorderedCard from "./BorderedCard";
import Icon from "./Icon";
import Gap from "./Gap";
import Text from "./Text";

export default function ArtistCard({icon, artist, onClick}) {
    return (
        <BorderedCard className="flex responseFill" height width maxW='max-content' onClick={onClick}>
            <Icon src={icon} className="big-icon"/>
            <Gap height="10px"/>
            <Text style={{textAlign: 'center'}}>{artist}</Text>
        </BorderedCard>
    );
}
