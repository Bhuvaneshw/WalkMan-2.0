import Text from "./Text";
import {getGenreColors} from "./util.js";

export default function GenreCard({title, onClick, index}) {
    return (
        <div key={title} onClick={onClick} style={{
            minWidth: '150px',
            maxWidth: '200px',
            height: '150px',
            background: `linear-gradient(135deg, ${getGenreColors()[index % getGenreColors().length]})`,
            margin: '10px',
            display: "flex",
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "center",
            borderRadius: '10px',
            flex: '1'
        }}>
            <Text style={{textAlign: 'center', fontSize: "22px"}} variant={'white'}>{title}</Text>
        </div>
    );
}
