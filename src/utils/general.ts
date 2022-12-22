import { concat, isArray, without } from "lodash";

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export const getClasses = (
  defaultClass: string[] | string,
  appendClass?: string[] | string,
  removeClass?: string[] | string
) => {
  defaultClass = !isArray(defaultClass)
    ? defaultClass.split(" ")
    : defaultClass;
  appendClass =
    !isArray(appendClass) && appendClass ? appendClass.split(" ") : appendClass;
  removeClass =
    !isArray(removeClass) && removeClass
      ? removeClass.split(" ")
      : (removeClass as string[]);

  const allClasses = concat(defaultClass || [], appendClass || []);
  return without(allClasses, ...(removeClass || [])).join(" ");
};
