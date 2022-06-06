import { useMemo } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { cleanObject } from 'utils';

// TODO 理解这个泛型
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(() => {
      return keys.reduce((prev, key) => {
        return { ...prev, [key]: searchParams.get(key) || '' };
      }, {} as { [key in K]: string });
      // eslint-disable-next-line
    }, [searchParams]), // 这里不要加入keys，不然会造成无限渲染，除非将keys用useState生成的才可以放在这里的依赖里
    (params: Partial<{ [key in K]: unknown }>) => {
      // 为了将ts类型参数校验更强
      const o = cleanObject({ ...Object.fromEntries(searchParams), ...params });
      return setSearchParams(o as URLSearchParamsInit);
    },
  ] as const; // TODO 让数组内容不同的类型
};
