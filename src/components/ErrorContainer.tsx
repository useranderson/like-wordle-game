const ErrorContainer: React.FC = ({ children }) => (
  <div
    data-cy="error-container"
    className="text-center font-bold text-white p-2 bg-blue-600 rounded-lg"
  >
    {children}
  </div>
);

export default ErrorContainer;
