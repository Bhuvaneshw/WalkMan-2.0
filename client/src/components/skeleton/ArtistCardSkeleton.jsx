import {Skeleton} from "@chakra-ui/react";
import Stack from "../Stack.jsx";

export default function ArtistCardSkeleton({loading = true}) {
    return loading ? <Stack mWidth={'200px'} pad={'15px'} className={'fill'}>
        <Skeleton style={{
            margin: '4px',
            borderRadius: '10px',
            height: '170px',
        }}/>
        <Stack width={'70%'}>
            <Skeleton height='20px' style={{
                margin: '4px',
            }}/>
        </Stack>
    </Stack> : <></>
}