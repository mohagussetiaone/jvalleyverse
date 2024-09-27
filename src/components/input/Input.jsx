import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import ikon yang akan digunakan

const Input = ({ label, type = "text", variant = "default", size = "md", className, placeholder, icon, error, helperText, disabled = false, autoComplete = "off", required = false, max, min, showPasswordToggle = false, ...props }) => {
  // State untuk mengatur tampilan password show/hide
  const [showPassword, setShowPassword] = useState(false);

  // Tentukan tipe input (text/password)
  const inputType = type === "password" && showPassword ? "text" : type;

  // Konfigurasi styling untuk komponen
  const baseStyles = "block w-full rounded focus:outline-none transition-colors";
  const variantStyles = {
    default: "border border-gray-300 focus:border-blue-500",
    outline: "border-2 border-blue-500 focus:border-blue-600",
    ghost: "border-none focus:bg-gray-100",
  };
  const sizeStyles = {
    sm: "text-sm py-1 px-2",
    md: "text-md py-2 px-4",
    lg: "text-lg py-3 px-5",
  };
  const errorStyles = error ? "border-red-500 focus:border-red-500" : "";

  return (
    <div className={clsx(disabled && "opacity-50 cursor-not-allowed")}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</span>}
        <input
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          required={required}
          max={type === "number" ? max : undefined}
          min={type === "number" ? min : undefined}
          className={clsx(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            icon && "pl-10", // Menambahkan padding kiri jika ada ikon
            showPasswordToggle && type === "password" ? "pr-10" : "", // Padding kanan jika ada toggle
            errorStyles,
            className
          )}
          {...props}
        />
        {/* Show/Hide Toggle untuk Password */}
        {showPasswordToggle && type === "password" && (
          <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </button>
        )}
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      {helperText && !error && <p className="text-sm text-gray-500 mt-1">{helperText}</p>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "password", "email", "number", "tel", "url"]),
  variant: PropTypes.oneOf(["default", "outline", "ghost"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.node, // Ikon sebagai children
  error: PropTypes.string,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
  max: PropTypes.number,
  min: PropTypes.number,
  showPasswordToggle: PropTypes.bool, // Menentukan apakah tombol toggle untuk password ditampilkan
};

export default Input;
