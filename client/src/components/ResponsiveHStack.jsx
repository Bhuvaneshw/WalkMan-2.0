export default function ResponsiveHStack({justifyContent, alignItems, className, children}) {
    return <div className={'ResponsiveHStack ' + className} style={{
        display: 'flex',
        justifyContent: justifyContent,
        alignItems: alignItems,
    }}>{children}</div>
}