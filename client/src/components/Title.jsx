export default function Title({variant = 'black70', mar, size, minW, children}) {
    return <h3 className={"title color-" + variant} style={{
        margin: mar,
        fontSize: size,
        minWidth: minW
    }}>{children}</h3>;
}