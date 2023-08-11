import Title from "./components/Title.jsx";
import Card from "./components/Card.jsx";
import Img from "./components/Image.jsx";
import BorderedCard from "./components/BorderedCard.jsx";

export default function TestUiComponent() {
    return <>
        <Card>
            <Title variant='black70'>Hello</Title>
            <BorderedCard>
                <Img src="music.png" radius="40px"/>
            </BorderedCard>
        </Card>
    </>;
}