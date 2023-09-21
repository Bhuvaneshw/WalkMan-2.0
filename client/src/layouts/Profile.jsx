import Content from "../components/Content.jsx";
import Card from "../components/Card.jsx";
import Icon from "../components/Icon.jsx";
import Title from "../components/Title.jsx";
import Text from "../components/Text.jsx";
import {Button} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export default function Profile() {
    let navigate = useNavigate();

    function logout() {
        window.sessionStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <Content
            style={{
                position: "relative",
                maxHeight: "calc(100vh - 80px)",
                height: "calc(100vh - 80px)",
                overflow: "hidden",
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Card pad={'25px'} minWidth={'200px'} maxWidth={'400px'} width={'100%'}
                  style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px'}}>
                <Title size={'20px'} minW={'100%'}>Profile</Title>
                <Icon size={'220px'} src={'/music.png'}/>
                <Text>Bhuvanesh</Text>
                <Button colorScheme={'primary'} onClick={logout}>Logout</Button>
            </Card>
        </Content>
    )
}