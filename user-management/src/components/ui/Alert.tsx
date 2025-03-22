interface AlertProps {
  type : 'error' | 'success' | 'info';
  message : string;
  onClose : () => void;
}

const Alert : React.FC<AlertProps> = ({ type, message, onClose }) => {
  const bgColor = 
  type === 'error' ? 'bg-red-100 text-red-700 border-red-200' :
  type === 'success' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-blue-100 text-blue-700 border-blue-200';

  return (
    <div className={`${bgColor} px-4 py-3 rounded-md border mb-4 flex justify-between items-center`}>
      <p>{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path 
              fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;

