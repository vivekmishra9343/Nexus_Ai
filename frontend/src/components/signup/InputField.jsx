const InputField = ({ label, type, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className='w-full mb-4'>
      <label className='block text-gray-600 mb-1'>{label}</label>
      <div className='relative'>
        <input
          type={inputType}
          className='w-full px-4 py-2 border border-gray-300 rounded-xl'
          placeholder={placeholder}
        />
        {type === "password" && (
          <button
            type='button'
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};
export default InputField;
