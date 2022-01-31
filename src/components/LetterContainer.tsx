const LetterContainer: React.FC<React.ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={`w-12 h-12 mx-1 rounded-lg text-3xl flex items-center justify-center font-bold text-white relative ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default LetterContainer;
