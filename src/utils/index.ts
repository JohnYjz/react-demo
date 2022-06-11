import { useEffect, useRef, useState } from 'react';

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

export const useDocumentTitile = (title: string, keepOnUnmount: boolean = true) => {
  // 如果不用useRef，则每次在下面useEffect[title]变化的时候，会把这句也刷新赋值（组件会整体刷新，所有的语句都会重新执行）
  // 而用了useRef，则只会保留最初（理解为vue的created）的赋值
  const oldTitle = useRef(document.title).current;
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};

export const resetRoute = () => (window.location.href = window.location.origin);

export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
