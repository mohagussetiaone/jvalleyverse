import PropTypes from "prop-types";
import Select from "react-select";
import clsx from "clsx";
import useDarkMode from "@/hooks/useDarkMode";

const SelectInput = ({ label, placeholder = "Select...", options, isMulti = false, isClearable = true, isDisabled = false, isSearchable = true, className, error, helperText, onChange, ...props }) => {
  const { darkMode } = useDarkMode();

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: darkMode ? "#000" : "#fff", // Background color for input field
      borderColor: state.isFocused ? (darkMode ? "#4b5563" : "#4a5568") : "#d1d5db", // Border color when focused
      boxShadow: state.isFocused ? (darkMode ? "0 0 0 1px #4b5563" : "0 0 0 1px #4a5568") : "none", // Box shadow for focus
      "&:hover": {
        borderColor: darkMode ? "#4b5563" : "#4a5568", // Border color on hover
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: darkMode ? "#000" : "#fff", // Background color for dropdown menu
      borderColor: darkMode ? "#374151" : "#e2e8f0", // Border color for dropdown
      boxShadow: darkMode ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "0 4px 6px rgba(0, 0, 0, 0.05)", // Shadow for dropdown
      zIndex: 100,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? darkMode
          ? "#1a1a1a" // Slightly lighter black for selected item in dark mode
          : "#e2e8f0" // Background color for selected item in light mode
        : state.isFocused
        ? darkMode
          ? "#333" // Gray for focused item in dark mode
          : "#edf2f7" // Background color for focused item in light mode
        : darkMode
        ? "#000" // Default background color for options in dark mode
        : "#fff", // Default background color for options in light mode
      color: darkMode ? "#f3f4f6" : "#2d3748", // Text color for options
      "&:hover": {
        backgroundColor: darkMode ? "#333" : "#edf2f7", // Slightly brighter background on hover for dark mode
        color: darkMode ? "#e5e7eb" : "#2d3748", // Text color on hover
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: darkMode ? "#e2e8f0" : "#2d3748", // Selected value color
    }),
    placeholder: (base) => ({
      ...base,
      color: darkMode ? "#9ca3af" : "#a0aec0", // Placeholder color for dark and light mode
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? (darkMode ? "#9ca3af" : "#4a5568") : "#cbd5e0", // Color for dropdown indicator arrow
      "&:hover": {
        color: darkMode ? "#d1d5db" : "#4a5568", // Arrow color on hover
      },
    }),
  };

  return (
    <div className={clsx("mb-4", isDisabled && "opacity-50 cursor-not-allowed")}>
      {label && <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>}
      <Select
        styles={customStyles}
        placeholder={placeholder}
        options={options}
        isMulti={isMulti}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        onChange={onChange}
        classNamePrefix="react-select"
        className={clsx("react-select-container focus:border-gray-500", className, error && "border-red-500")}
        {...props}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      {helperText && !error && <p className="text-sm text-gray-500 mt-1">{helperText}</p>}
    </div>
  );
};

// PropTypes untuk properti yang sering digunakan pada Select
SelectInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired, // Wajib memiliki opsi dengan label dan value
  isMulti: PropTypes.bool,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isSearchable: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  onChange: PropTypes.func,
};

export default SelectInput;
