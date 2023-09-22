import Content from "../components/Content.jsx";
import Card from "../components/Card.jsx";
import Title from "../components/Title.jsx";
import Text from "../components/Text.jsx";
import {Button} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import Icons from "../components/Icons.js";
import {getGenreColors} from "../components/util.js";

export default function Profile() {
    let navigate = useNavigate();

    function logout() {
        window.sessionStorage.removeItem('token')
        localStorage.removeItem("token");
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
                <Icons.USER_CIRCLE_2 size={'180px'} style={{
                    color: 'white',
                    borderRadius: '50%',
                    padding: '30px',
                    background: `linear-gradient(135deg, ${getGenreColors()[0]})`
                }}/>
                <Text>{localStorage.getItem('name')}</Text>
                <Text>{localStorage.getItem('email')}</Text>
                <Button colorScheme={'primary'} onClick={logout}>Logout</Button>
            </Card>
        </Content>
    )
}