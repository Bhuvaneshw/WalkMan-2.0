export default function Title({variant, children}) {
    return <h3 className={"title color-" + variant}>{children}</h3>;
}