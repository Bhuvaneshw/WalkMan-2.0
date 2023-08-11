export default function Title({variant = 'black70', mar, children}) {
    return <h3 className={"title color-" + variant} style={{
        margin: mar,
    }}>{children}</h3>;
}