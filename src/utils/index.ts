import { useEffect, useState } from 'react';

export const isFalsy = (val: unknown) => (val === 0 ? false : !val);

export const isVoid = (val: unknown) => val === undefined || val === null || val === '';

export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (isVoid(val)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (cb: () => void) => {
  useEffect(() => {
    cb();
    // TODO 加上依赖cb会造成无限循环，这和useCallback和useMemo有关
    // eslint-disable-next-line
  }, []);
};

export const useDebounce = <T>(val: T, delay?: number) => {
  const [debounceVal, setDebounceVal] = useState(val);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceVal(val), delay);
    return () => clearTimeout(timeout);
  }, [val, delay]);
  return debounceVal;
};
