import { FC, InputHTMLAttributes, ReactElement } from "react";

import Input from "../input/Input";

type ICheckbox = InputHTMLAttributes<HTMLInputElement> & {
  label?: string | ReactElement;
};

const Checkbox: FC<ICheckbox> = ({ label, disabled, ...props }) => {
  return (
    <div className="flex flex-row items-center space-x-4">
      <Input
        className={`h-4 w-4 border-secondary-300 rounded ${
          disabled
            ? "text-gray-500 cursor-not-allowed bg-gray-100 focus:ring-gray-500"
            : "text-brand-600 cursor-pointer focus:ring-brand-500"
        }`}
        type="checkbox"
        disabled={disabled}
        {...props}
      />
      {label && (
        <label
          htmlFor={props.id || props.name || ""}
          className="block text-sm text-secondary-900"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
