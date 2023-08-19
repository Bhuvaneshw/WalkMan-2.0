import {Skeleton} from "@chakra-ui/react";
import Stack from "../Stack.jsx";
import BorderedCard from "../BorderedCard.jsx";

export default function ArtistCardSkeleton({loading = true}) {
    return loading ? <BorderedCard className={'fill'}>
        <Stack mWidth={'200px'}>
            <Skeleton style={{
                marginBottom: '4px',
                borderRadius: '10px',
                height: '170px',
            }}/>
            <Skeleton height='20px' style={{
                margin: 'auto',
                width: '70%',
            }}/>
        </Stack>
    </BorderedCard> : <></>
}