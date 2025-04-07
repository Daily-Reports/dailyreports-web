import React from "react";

type InputValueProps = {
  title: string;
  value: string;
  setValue: (val: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputValue = ({ title, value, setValue, ...rest }: InputValueProps) => {
  return (
    <div className="App">
      <h2 className={"text-lg text-gray-600 mt-3 text-left"}>{title}</h2>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        className="w-full px-2 py-1 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-black"
        {...rest}
      />
    </div>
  );
};

export default InputValue;
