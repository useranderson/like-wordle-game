const LettersRows: React.FC<React.ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => (
  <div
    data-cy="letters-row"
    className={`flex flex-row py-1 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default LettersRows;
