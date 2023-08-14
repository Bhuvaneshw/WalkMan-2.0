import HStack from "./HStack.jsx";
import Text from "./Text.jsx";
import Icon from "./Icon.jsx";

function SelectedLine() {
  return (
    <div
      style={{
        width: "4px",
        height: "3vh",
        background: "#5F04A7",
        borderTopLeftRadius: "5px",
        borderBottomLeftRadius: "5px",
      }}
    />
  );
}

export default function NavItem({ title, activated }) {
  if (activated)
    return (
      <HStack
        justifyContent="space-between"
        alignItems="center"
        pad="5px 0 5px 10px"
      >
        <HStack pad="0 0 0 10px" alignItems="center">
          <Icon src="/home-primary.svg" size="30px" />
          <Text pad="10px" variant="primary">
            {title}
          </Text>
        </HStack>
        <SelectedLine />
      </HStack>
    );
  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      pad="5px 0 5px 10px"
    >
      <HStack pad="0 0 0 10px" alignItems="center">
        <Icon src="/home-primary.svg" size="30px" />
        <Text pad="10px">{title}</Text>
      </HStack>
      {activated && <SelectedLine />}
    </HStack>
  );
}
