import React from "react";
import "./CheckboxInput.css";

export default function CheckboxInput({
  checked,
  onChange,
  className,
  label,
  name,
}) {
  return (
    <div className={className}>
      <input
        type="checkbox"
        className="select-all-input"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label className="form-check-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
}
