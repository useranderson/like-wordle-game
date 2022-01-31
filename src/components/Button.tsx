const Button: React.FC<React.ComponentProps<"button">> = ({
  children,
  ...props
}) => (
  <button className="bg-blue-500 p-4 rounded-lg" {...props}>
    {children}
  </button>
);

export default Button;
