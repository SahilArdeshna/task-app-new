export const getItem = (key: string): string | null => {
  return window.localStorage.getItem(key);
};

export const setItem = (key: string, value: string): void => {
  return window.localStorage.setItem(key, value);
};

export const deleteItem = (key: string): void => {
  return window.localStorage.removeItem(key);
};
