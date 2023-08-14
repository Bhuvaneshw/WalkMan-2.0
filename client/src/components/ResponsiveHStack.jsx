export default function ResponsiveHStack({justifyContent, alignItems, className, wrap, children}) {
    return <div className={'ResponsiveHStack ' + className} style={{
        display: 'flex',
        justifyContent: justifyContent,
        alignItems: alignItems,
        flexWrap: wrap,
    }}>{children}</div>
}