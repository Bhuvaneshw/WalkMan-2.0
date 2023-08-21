import Card from "./Card.jsx";
import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import BorderedCard from "./BorderedCard.jsx";
import Icon from "./Icon.jsx";
import Gap from "./Gap.jsx";
import Stack from "./Stack.jsx";
import ArtistCardSkeleton from "./skeleton/ArtistCardSkeleton.jsx";
import {useNavigate} from "react-router-dom";

export default function Artist({data}) {
    let loading = data.length < 1;
    let navigate = useNavigate();
    return (
        <Card flex="1">
            <Title variant="black70 title-margin">Artist</Title>
            <HStack scrollable>
                <ArtistCardSkeleton loading={loading}/>
                <ArtistCardSkeleton loading={loading}/>
                <ArtistCardSkeleton loading={loading}/>
                <ArtistCardSkeleton loading={loading}/>
                {data.map((value) => {
                    return (
                        <BorderedCard className="flex" key={value} onClick={() => {
                            navigate('/search?q=' + value)
                        }}>
                            <Icon src="/music.png" className="big-icon"/>
                            <Gap height="10px"/>
                            <HStack justifyContent="space-between" alignItems="center">
                                <Stack>
                                    <Title className='noWrap'>{value}</Title>
                                </Stack>
                                <Gap width="10px"/>
                            </HStack>
                        </BorderedCard>
                    );
                })}
            </HStack>
        </Card>
    );
}
