import PropTypes from "prop-types";
import clsx from "clsx";

const Button = ({ variant = "default", size = "md", className, children, ...props }) => {
  const baseStyles = "px-4 py-2 rounded transition-colors";
  const variantStyles = {
    default: "bg-brand-500 text-white hover:bg-brand-600",
    outline: "border border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white",
    ghost: "bg-transparent hover:bg-gray-200",
  };
  const sizeStyles = {
    sm: "text-sm py-1 px-2",
    md: "text-md py-2 px-3",
    lg: "text-lg py-3 px-4",
  };

  return (
    <button className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["default", "outline", "ghost"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
