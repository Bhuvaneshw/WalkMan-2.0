import Card from "./Card.jsx";
import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import BorderedCard from "./BorderedCard.jsx";
import Icon from "./Icon.jsx";
import Gap from "./Gap.jsx";
import Stack from "./Stack.jsx";
import ArtistCardSkeleton from "./skeleton/ArtistCardSkeleton.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useToast} from "@chakra-ui/react";

export default function Artist({data}) {
    let loading = data.length < 1;
    let navigate = useNavigate();
    let toast = useToast();

    function ArtistCard({value}) {
        const [data, setData] = useState({url: '/music.png'})
        useEffect(() => {
            (async () => {
                let res;
                await fetch(import.meta.env.VITE_URL + "/artists/find?name=" + value, {
                    headers: {token: window.sessionStorage.getItem("token")},
                })
                    .then((r) => {
                        res = r;
                    })
                    .catch((error) => {
                        toast({
                            title: "Error",
                            description: error.message,
                            duration: 2000,
                            status: "error",
                            position: "top-right",
                        });
                    });
                setData(await res.json());
            })();
        }, []);

        return (
            <BorderedCard className="flex" onClick={() => {
                navigate('/home/search?q=' + value)
            }}>
                <Icon src={import.meta.env.VITE_URL + '/assets' + data?.url} className="big-icon"/>
                <Gap height="10px"/>
                <HStack justifyContent="space-between" alignItems="center">
                    <Stack>
                        <Title className='noWrap'>{value}</Title>
                    </Stack>
                    <Gap width="10px"/>
                </HStack>
            </BorderedCard>
        );
    }

    return (
        <Card flex="1">
            <Title variant="black70 title-margin">Artist</Title>
            <HStack scrollable>
                <ArtistCardSkeleton loading={loading}/>
                <ArtistCardSkeleton loading={loading}/>
                <ArtistCardSkeleton loading={loading}/>
                <ArtistCardSkeleton loading={loading}/>
                {data.map((value) => {
                    return <ArtistCard key={value} value={value}/>;
                })}
            </HStack>
        </Card>
    );
}
