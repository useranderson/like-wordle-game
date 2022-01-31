const Modal: React.FC<React.ComponentProps<"div">> = ({
  children,
  ...props
}) => (
  <div className="absolute w-full h-full z-10 flex items-center justify-center">
    <div
      className="bg-neutral-800 w-11/12 md:w-96 rounded-lg shadow-lg opacity-95 text-white text-center p-4 border border-solid border-neutral-600"
      {...props}
    >
      {children}
    </div>
  </div>
);

export default Modal;
