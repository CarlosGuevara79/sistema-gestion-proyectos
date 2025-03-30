export default function InputField({ label, value, onChange, name, required = false, error, type = "text", ...props }) {
  /// creacion de inputField
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full border p-2 rounded ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none`}
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    )
  }
  