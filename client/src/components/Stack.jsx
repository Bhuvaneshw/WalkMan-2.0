export default function Stack({
                                  scrollable,
                                  width,
                                  height,
                                  className,
                                  justifyContent,
                                  alignItems,
                                  mar,
                                  onClick,
                                  children
                              }) {
    let overFlow = scrollable ? 'auto' : 'none';
    return <div className={className} style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: justifyContent,
        alignItems: alignItems,
        height: height,
        width: width,
        margin: mar,
        overflowY: overFlow,
    }} onClick={onClick}>{children}</div>
}