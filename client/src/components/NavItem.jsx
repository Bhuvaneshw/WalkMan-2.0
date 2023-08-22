import HStack from "./HStack.jsx";
import Text from "./Text.jsx";
import {NavLink} from "react-router-dom";

function SelectedLine() {
    return <div style={{
        width: '4px',
        height: '3vh',
        background: '#5F04A7',
        borderTopLeftRadius: '5px',
        borderBottomLeftRadius: '5px',
    }}/>;
}

export default function NavItem({nav}) {
    return <NavLink
        to={nav.route}>
        {({isActive}) => (
            isActive ?
                <HStack justifyContent='space-between' alignItems='center' pad='5px 0 5px 10px'>
                    <HStack pad='0 0 0 10px' alignItems='center'>
                        <nav.icon color='#5F04A7'/>
                        <Text pad='10px' variant='primary'>{nav.name}</Text>
                    </HStack>
                    <SelectedLine/>
                </HStack>
                :
                <HStack justifyContent='space-between' alignItems='center' pad='5px 0 5px 10px'>
                    <HStack pad='0 0 0 10px' alignItems='center'>
                        <nav.icon/>
                        <Text pad='10px'>{nav.name}</Text>
                    </HStack>
                </HStack>
        )}
    </NavLink>
}