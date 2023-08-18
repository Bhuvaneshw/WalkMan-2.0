import {Skeleton, SkeletonCircle} from "@chakra-ui/react";
import Stack from "../Stack.jsx";
import HStack from "../HStack.jsx";

export default function SongCardSkeleton({loading = true}) {
    return loading ? <Stack mWidth={'200px'} pad={'15px'} className={'fill'}>
        <Skeleton style={{
            margin: '4px',
            borderRadius: '10px',
            height: '170px',
        }}/>
        <HStack width={'100%'} alignItems={'center'}>
            <Stack width={'70%'}>
                <Skeleton height='20px' style={{
                    margin: '4px',
                }}/>
                <Skeleton height='18px' style={{
                    margin: '4px',
                }}/>
            </Stack>
            <SkeletonCircle width={'40px'} height={'40px'} style={{margin: '4px'}} isLoaded={!loading}/>
        </HStack>
    </Stack> : <></>
}