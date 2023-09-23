export default function HStack({
  width,
  height,
  justifyContent,
  alignItems,
  pad,
  wrap,
  scrollable,
  className,
  flex,
  mar,
  children,
  onClick,
  style,
}) {
  let overFlow = scrollable ? "auto" : "none";
  return (
    <div
      className={className}
      style={{
        width: width,
        height: height,
        display: "flex",
        flexWrap: wrap,
        justifyContent: justifyContent,
        alignItems: alignItems,
        padding: pad,
        overflowX: overFlow,
        margin: mar,
        flex: flex,
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
