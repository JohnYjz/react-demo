import { useCallback, useState } from 'react';
import { useMountedRef } from 'utils';

interface State<D> {
  error: Error | null;
  data: D | null;
  status: 'idle' | 'loading' | 'error' | 'success';
}

const defaultInitialState: State<null> = {
  status: 'idle',
  data: null,
  error: null,
};

const defaultConfig = {
  throwOnError: false,
};

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState({
    ...defaultInitialState,
    ...initialState,
  });

  const mountedRef = useMountedRef();

  const [retry, setRetry] = useState(() => {
    // TODO 用useState保存函数必须这样(惰性初始化)
    return () => {};
  });

  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        status: 'success',
        error: null,
      }),
    []
  );
  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        status: 'error',
        data: null,
      }),
    []
  );

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('请传入Promise类型数据');
      }
      setRetry(() => {
        // TODO 用useState保存函数必须这样(惰性初始化)
        // TODO 不能直接传入这个promise作为请求方法，因为这个promise已经是执行过的promsie，只包含result
        return () => {
          if (runConfig?.retry) {
            run(runConfig?.retry(), runConfig);
          }
        };
      });
      setState((prevState) => {
        return {
          ...prevState,
          status: 'loading',
        };
      });
      return promise
        .then((data) => {
          if (mountedRef.current) {
            // 似乎当前版本不用设置这个也不会报错了
            setData(data);
          }
          return data;
        })
        .catch((err) => {
          setError(err);
          if (config.throwOnError) {
            return Promise.reject(err);
          }
          return err;
        });
    },
    [config.throwOnError, mountedRef, setData, setError]
  );

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
