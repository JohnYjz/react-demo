import { useEffect } from 'react';
import { Project } from 'screens/project-list';
import { cleanObject } from 'utils';
import { useHttp } from './http';
import { useAsync } from './use-async';

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...res } = useAsync<Project[]>();

  useEffect(() => {
    run(
      client('projects', {
        data: cleanObject(param || {}),
      })
    );
    // eslint-disable-next-line
  }, [param]);

  return res;
};
