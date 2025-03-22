interface ButtonProps {
  children : React.ReactNode;
  type? : 'button' | 'submit' | 'reset';
  variant ? : 'primary' | 'secondary' | 'danger' | 'outline';
  size? : 'sm' | 'md' | 'lg';
  className : string;
  disabled? : boolean;
  onClick? : () => void;
}

const Button : React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size ='md',
  className = '',
  disabled = false,
  onClick,
}) => {
  const baseStyles = 'font-medium rounded-md focus:outline-none transition-colors';

  const variantStyles = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50',
    outline: 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;

