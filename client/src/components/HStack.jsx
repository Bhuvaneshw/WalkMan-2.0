export default function HStack({width, justifyContent, alignItems, scrollable, children}) {
    let overFlow = scrollable ? 'auto' : 'none';
    return <div style={{
        width: width,
        display: 'flex',
        justifyContent: justifyContent,
        alignItems: alignItems,
        overflowX: overFlow,
    }}>{children}</div>
}