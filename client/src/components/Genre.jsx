import Card from "./Card.jsx";
import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import ArtistCardSkeleton from "./skeleton/ArtistCardSkeleton.jsx";
import {useNavigate} from "react-router-dom";
import Text from "./Text.jsx";
import {getGenreColors} from "./util.js";

export default function Genre({data = []}) {
    let loading = data.length < 1;
    let navigate = useNavigate();
    return (
        <Card flex="1">
            <Title variant="black70 title-margin">Genre</Title>
            <HStack scrollable>
                <ArtistCardSkeleton loading={loading}/>
                <ArtistCardSkeleton loading={loading}/>
                <ArtistCardSkeleton loading={loading}/>
                <ArtistCardSkeleton loading={loading}/>
                {data.map((value, index) => {
                    return (
                        <div key={value} onClick={() => {
                            navigate('/home/search?q=' + value)
                        }} style={{
                            minWidth: '140px',
                            height: '150px',
                            background: `linear-gradient(135deg, ${getGenreColors()[index % getGenreColors().length]})`,
                            margin: '10px',
                            display: "flex",
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: "center",
                            borderRadius: '10px'
                        }}>
                            <Text style={{textAlign: 'center', fontSize: "20px"}} variant={'white'}>{value}</Text>
                        </div>
                    );
                })}
            </HStack>
        </Card>
    );
}
