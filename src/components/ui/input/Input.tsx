import {
  LegacyRef,
  forwardRef,
  ReactElement,
  InputHTMLAttributes,
  ForwardRefExoticComponent,
} from "react";

import { getClasses } from "../../../utils/general";
import { IModifyClass } from "../../../types/IModifyClass";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  Icon?: ReactElement;
} & IModifyClass;

const Input: ForwardRefExoticComponent<InputProps> = forwardRef(
  (
    {
      className,
      appendClass,
      removeClass,
      label,
      type,
      name,
      error,
      Icon,
      ...props
    },
    ref
  ) => {
    const defaultClass =
      "appearance-none rounded-md relative block w-full px-3 py-2 border border-secondary-300 placeholder-secondary-500 text-secondary-900 focus:outline-none focus:ring-brand-500 focus:border-brand-500 focus:z-10 sm:text-sm";

    const classes = getClasses(
      className || defaultClass,
      appendClass || "",
      removeClass || ""
    );
    const id = props.id || name;

    return (
      <>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div
          className={`relative ${
            type === "checkbox" ? "flex content-center" : ""
          }`}
        >
          <input
            type={type || "text"}
            id={id}
            name={name}
            className={className ? className : classes}
            ref={ref as LegacyRef<HTMLInputElement> | undefined}
            {...props}
          />
          {Icon && Icon}
        </div>
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      </>
    );
  }
);

export default Input;
