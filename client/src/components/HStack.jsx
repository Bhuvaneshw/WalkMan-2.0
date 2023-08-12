export default function HStack({width, height, justifyContent, alignItems, scrollable, children}) {
    let overFlow = scrollable ? 'auto' : 'none';
    return <div style={{
        width: width,
        height: height,
        display: 'flex',
        justifyContent: justifyContent,
        alignItems: alignItems,
        overflowX: overFlow,
    }}>{children}</div>
}