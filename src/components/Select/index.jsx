import React from "react";

const Select = ({ options, error, ...restProps }) => {
  return (
    <select
      className={`select form__input ${error ? "formerror" : ""}`}
      {...restProps}
    >
      {options.map((option, index) => {
        return (
          <option key={option?.value || index} value={option?.value}>
            {option?.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
