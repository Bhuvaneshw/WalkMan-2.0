import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import Icon from "./Icon.jsx";
import Gap from "./Gap.jsx";
import Stack from "./Stack.jsx";
import {Navigation} from "./util.js";
import NavItem from "./NavItem.jsx";

export default function SideBar({width,onClick}) {
    return (
        <Stack className="navbar" width={width} onClick={onClick}>
            <HStack pad="20px" alignItems="center">
                <Icon src="/icon.svg" size="45px"/>
                <Title variant="primary" mar='20px'>Walkman</Title>
            </HStack>
            <Gap height="40px"/>
            <Title mar="0 0 0 10px">Menu</Title>
            <Gap height="10px"/>
            {
                Object.keys(Navigation).map(function (key) {
                    return <NavItem nav={Navigation[key]} key={key}></NavItem>
                })
            }
        </Stack>
    );
}