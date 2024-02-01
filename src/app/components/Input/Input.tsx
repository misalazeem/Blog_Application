import React, { ChangeEvent } from "react";

interface InputProps {
  type: any;
  value: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  textarea?: boolean;
  id: string;
  placeholder?: string;
  big?: boolean;
  customStyles?: string;
}

const Input = ({
  type,
  value,
  onChange,
  name,
  textarea,
  id,
  placeholder,
  big,
  customStyles,
}: InputProps) => {
  const defaultStyles = `w-full p-2 font-light bg-white border-gray-300 border-2 outline-none text-black ${
    big ? "w-[480px] pb-[6rem]" : ""
  }`;

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      placeholder={placeholder}
      className={`${defaultStyles} ${customStyles ? customStyles : ""}`}
    />
  );
};

export default Input;
