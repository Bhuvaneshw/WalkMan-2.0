import Title from "./Title.jsx";
import HStack from "./HStack.jsx";
import Icon from "./Icon.jsx";
import Gab from "./Gap.jsx";
import Stack from "./Stack.jsx";

import NavItem from "./NavItem.jsx";
import {Navigation} from "./util.js";

export default function SideBar({location}) {
    return (
        <Stack className="navbar">
            <HStack pad="20px" alignItems="center">
                <Icon src="/icon.svg" size="50px"/>
                <Gab width="20px"/>
                <Title variant="primary">Walkman</Title>
            </HStack>
            <Gab height="40px"/>
            <Title mar="0 0 0 10px">Menu</Title>
            <a href={Navigation.HOME.route}>
                <NavItem title={Navigation.HOME.name} location={location}/>
            </a>
            <a href={Navigation.SEARCH.route}>
                <NavItem title={Navigation.SEARCH.name} location={location}/>
            </a>
        </Stack>
    );
}