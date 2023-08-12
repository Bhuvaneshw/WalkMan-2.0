export default function Title({variant = 'black70', mar, size, children}) {
    return <h3 className={"title color-" + variant} style={{
        margin: mar,
        fontSize: size,
    }}>{children}</h3>;
}