import { FC } from "react";

import Icon from "../icon/Icon";
import { getClasses } from "../../../utils/general";
import { IModifyClass } from "../../../types/IModifyClass";
import { ReactComponent as CircleNotchIcon } from "../../../icons/circle-notch.svg";

type ILoader = IModifyClass & { message?: string };

const Loader: FC<ILoader> = ({
  message,
  className,
  appendClass,
  removeClass,
}) => {
  const defaultClass = "h-8 w-8";
  const classes = getClasses(
    className || defaultClass,
    appendClass || "",
    removeClass || ""
  );

  return (
    <div className="flex items-center justify-center">
      <div className={classes}>
        <Icon
          appendClass="text-brand-500 h-8 w-8 animate-spin"
          removeClass="h-5 w-5 text-gray-400"
        >
          <CircleNotchIcon />
        </Icon>
      </div>
      {message && <div className="ml-2 text-md text-brand-500">{message}</div>}
    </div>
  );
};

export default Loader;
