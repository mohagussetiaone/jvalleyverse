import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import "./style.scss";

const LabelInput = ({
  type,
  label,
  placeholder = "Add placeholder",
  classLabel = "form-label",
  className = "",
  register,
  name,
  readonly,
  value,
  error,
  disabled,
  id,
  horizontal,
  validate,
  isMask,
  msgTooltip,
  description,
  hasicon,
  onChange,
  defaultValue,
  required,
  optional,
  min,
  max,
  suffix,
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={`${error ? "has-error" : ""} ${horizontal ? "flex" : ""} ${validate ? "is-valid" : ""}`}>
      {label && (
        <label htmlFor={id} className={`block capitalize ${classLabel} ${horizontal ? "flex-0 mr-6 md:w-[100px] w-[60px] break-words" : ""}`}>
          {label} {required && <span className="text-red-800">*</span>} {optional && <span className="text-sm text-gray-700">(optional)</span>}
        </label>
      )}
      <div className={`relative ${horizontal ? "flex-1" : ""}`}>
        {name && !isMask && (
          <input
            type={type === "password" && open === true ? "text" : type}
            {...register(name)}
            {...rest}
            className={`${error ? "has-error" : ""} form-control py-2 px-2 w-full border border-gray-200 rounded-[4px] focus:outline-none focus:border-gray-400 outline-gray-500 ${className}`}
            placeholder={placeholder}
            readOnly={readonly}
            defaultValue={defaultValue}
            disabled={disabled}
            id={id}
            value={value}
            autoComplete="off"
            onChange={onChange}
            min={min}
            max={max}
          />
        )}
        {!name && !isMask && (
          <input
            type={type === "password" && open === true ? "text" : type}
            className={`form-control w-full py-2 ${className}`}
            placeholder={placeholder}
            readOnly={readonly}
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={onChange}
            id={id}
            min={min}
            autoComplete="off"
          />
        )}
        {suffix && <span className="absolute inset-y-0 right-0 flex items-center text-sm pr-3 text-gray-500">{suffix}</span>}
        <div className="flex text-xl absolute right-2 top-2">
          {hasicon && type === "password" && (
            <span className="cursor-pointer text-gray-700 dark:text-neutral-200" onClick={handleOpen}>
              {open ? <IoMdEye /> : <IoMdEyeOff />}
            </span>
          )}
        </div>
      </div>
      {/* Error message */}
      {error && <div className={`mt-2 ${msgTooltip ? "inline-block bg-red-500 text-white text-[10px] px-2 py-1 rounded" : "text-red-500 block text-xs"}`}>{error.message}</div>}
      {/* Validation message */}
      {validate && <div className={`mt-2 ${msgTooltip ? "inline-block bg-green-500 text-white text-[10px] px-2 py-1 rounded" : "text-green-500 block text-sm"}`}>{validate}</div>}
      {/* Description */}
      {description && <span className="input-description">{description}</span>}
    </div>
  );
};

export default LabelInput;
