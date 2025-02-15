import React from "react";

const Button = ({ handleClick, index, label, variant }) => {
  return (
    <>
      <button className={`btn ${variant}`} onClick={() => handleClick(index)}>
        {label}
      </button>
    </>
  );
};

export default Button;
