import { useEffect } from 'react';
import { User } from 'screens/project-list';
import { cleanObject } from 'utils';
import { useHttp } from './http';
import { useAsync } from './use-async';

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...res } = useAsync<User[]>();

  useEffect(() => {
    run(
      client('users', {
        data: cleanObject(param || {}),
      })
    );
    // eslint-disable-next-line
  }, [param]);

  return res;
};
