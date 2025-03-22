interface FormInputProps {
  id : string;
  name : string;
  label : string;
  type? : string;
  value : string;
  onChange : (e : React.ChangeEvent<HTMLInputElement>) => void;
  placeholder? : string;
  required? : boolean;
  error? : string;
}

const FormInput : React.FC<FormInputProps> = ({ 
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  error,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-medium mb-2">{label} {required && <span className="text-red-500">*</span>}</label>
      <input 
        type={type} 
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;

