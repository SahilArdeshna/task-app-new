import React, { FC, ReactElement } from "react";

import { getClasses } from "../../../utils/general";

type IIcon = {
  className?: string;
  appendClass?: string;
  removeClass?: string;
  tooltip?: string;
  key?: string;
  children: ReactElement;
};

const Icon: FC<IIcon> = ({
  children,
  key,
  className,
  appendClass,
  removeClass,
}) => {
  const defaultClass = "h-5 w-5 fill-current text-gray-400 cursor-pointer";

  const classes = getClasses(
    className || defaultClass,
    appendClass || "",
    removeClass || ""
  );

  return <>{React.cloneElement(children, { key, className: classes })}</>;
};

export default Icon;
