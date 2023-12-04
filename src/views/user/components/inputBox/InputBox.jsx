import React from "react";
import "./inputBox.css";

const InputBox = ({
  label = null,
  type,
  nameIdHtmlFor,
  placeholder,
  options,
  disabled = false,
  value = "",
  className = "",
  onChange,
  rows = 3
}) => {
  return (
    <>
      <div
        className={`${className} user_input_box ${disabled ? "user_input_box_disabled" : ""
          }`}>
        {label && <label htmlFor={nameIdHtmlFor}>{label}</label>}
        {(type === "text" ||
          type === "number" ||
          type === "email" ||
          type === "password") && (
          <input
            type={type}
            id={nameIdHtmlFor}
            name={nameIdHtmlFor}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={onChange}
          />
        )}
        {type === "date" && (
          <input
            type={type}
            id={nameIdHtmlFor}
            name={nameIdHtmlFor}
            placeholder={placeholder}
            disabled={disabled}
            value={value}
            onChange={onChange}
          />
        )}
        {type === "textarea" && (
          <textarea
            rows={rows}
            name={nameIdHtmlFor}
            id={nameIdHtmlFor}
            value={value}
            onChange={onChange}
            placeholder={placeholder}></textarea>
        )}
        {type === "select" && (
          <select
            name={nameIdHtmlFor}
            id={nameIdHtmlFor}
            onChange={onChange}
            value={value}>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
};

export default InputBox;
