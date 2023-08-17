import Content from "../components/Content.jsx";
import MusicCard from "../components/MusicCard";
import HStack from "../components/HStack.jsx";

export default function TopSongs() {
    let a = [
        {_id: 1, title: 'Hello', artist: 'world'},
        {_id: 12, title: 'Hello1', artist: 'world'},
        {_id: 13, title: 'Hello2', artist: 'world'},
        {_id: 14, title: 'Hello3', artist: 'world'},
        {_id: 15, title: 'Hello4', artist: 'world'},
        {_id: 16, title: 'Hello5', artist: 'world'},
        {_id: 116, title: 'Hello5', artist: 'world'},
        {_id: 126, title: 'Hello5', artist: 'world'},
        {_id: 136, title: 'Hello5', artist: 'world'},
        {_id: 146, title: 'Hello5', artist: 'world'},
        {_id: 156, title: 'Hello5', artist: 'world'},
        {_id: 166, title: 'Hello5', artist: 'world'},
        {_id: 176, title: 'Hello5', artist: 'world'},
        {_id: 186, title: 'Hello5', artist: 'world'},
        {_id: 1126, title: 'Hello5', artist: 'world'},
        {_id: 11126, title: 'Hello5', artist: 'world'},
        {_id: 11226, title: 'Hello5', artist: 'world'},
        {_id: 1236, title: 'Hello5', artist: 'world'},
        {_id: 1446, title: 'Hello5', artist: 'world'},
        {_id: 13436, title: 'Hello5', artist: 'world'},
        {_id: 13246, title: 'Hello5', artist: 'world'},
        {_id: 123236, title: 'Hello5', artist: 'world'},
    ]
    return (
        <Content>
            <HStack wrap="wrap" alignItems="stretch">
                {a.map((music) => {
                    return (
                        <MusicCard
                            key={music._id}
                            title={music.title}
                            artist={music.artist}
                        ></MusicCard>
                    );
                })}
            </HStack>
        </Content>
    );
}
