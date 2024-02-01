import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  customStyles?: string;
}

const Button = ({ customStyles, ...props }: ButtonProps) => {
  const defaultStyles = `px-4 py-2 font-semibold bg-black text-white rounded-sm`;

  return (
    <button
      {...props}
      className={`${defaultStyles} ${customStyles ? customStyles : ""}`}
    />
  );
};

export default Button;
