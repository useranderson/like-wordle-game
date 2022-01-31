const KeyContainer: React.FC<React.ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => (
  <div
    data-cy="key-container"
    className={`flex items-center justify-center font-bold text-white rounded h-12 mx-1 cursor-pointer ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default KeyContainer;
