import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  variant = "primary",
  className = "",
  link,
  children,
  ...restProps
}) => {
  let variantClass = "";

  switch (variant) {
    case "primary":
      variantClass = "btn btn--primary";
      break;
    case "border":
      variantClass = "btn btn--border --black";
      break;
    case "grey":
      variantClass = "btn btn--grey";
    default:
      break;
  }

  if (link) {
    return (
      <Link to={link} className={`${variantClass} ${className}`} {...restProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${variantClass} ${className}`} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
