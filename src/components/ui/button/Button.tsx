import cx from "classnames";
import { ButtonHTMLAttributes, FC } from "react";
import { IModifyClass } from "../../../types/IModifyClass";

import { getClasses } from "../../../utils/general";
import ActivityLoader from "../loader/ActivityLoader";

type IButton = IModifyClass &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading?: boolean;
    type?: string;
    small?: boolean;
    variant?: string;
  };

const Button: FC<IButton> = ({
  isLoading,
  type,
  children,
  className,
  appendClass,
  removeClass,
  disabled,
  variant = "default",
  ...props
}) => {
  const styles = {
    "group relative flex items-center py-2 px-4 justify-center border border-transparent text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-default":
      variant === "default",
    "inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-brand-700 bg-brand-100 hover:bg-brand-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500":
      variant === "light",
  };

  const classes =
    className ||
    getClasses(cx({ ...styles }), appendClass || "", removeClass || "");

  return (
    <button
      type={type || "button"}
      className={classes}
      disabled={!!isLoading || disabled}
      {...props}
    >
      {isLoading && <ActivityLoader appendClass="mr-2" />}
      {children}
    </button>
  );
};

export default Button;
