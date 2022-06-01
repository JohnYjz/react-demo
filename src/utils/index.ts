import { useEffect, useState } from 'react';

export const isFalsy = (val: unknown) => (val === 0 ? false : !val);

export const cleanObject = (obj: object) => {
  const result = { ...obj };
  Object.keys(obj).forEach((key) => {
    // @ts-ignore
    const val = obj[key];
    if (isFalsy(val)) {
      // @ts-ignore
      delete result[key];
    }
  });
  return result;
};

export const useMount = (cb: () => void) => {
  useEffect(() => {
    cb();
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
