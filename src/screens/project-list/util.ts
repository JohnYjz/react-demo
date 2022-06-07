import { useMemo } from 'react';
import { useUrlQueryParam } from 'utils/url';

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId']);
  const projectsParam = { ...param, personId: Number(param.personId) || undefined };
  // eslint-disable-next-line
  return [useMemo(() => projectsParam, [param]), setParam] as const;
};
