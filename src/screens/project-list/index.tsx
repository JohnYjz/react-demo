import { SearchPanel } from './search-panel';
import { List } from './list';
import { useEffect, useState } from 'react';
import { cleanObject, useDebounce, useMount } from 'utils';
import { useHttp } from 'utils/http';

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

export interface SearchParam {
  name: string;
  personId: string;
}

export const ProjectListScreen = () => {
  const [param, setParam] = useState<SearchParam>({
    name: '',
    personId: '',
  });
  const debounceParam = useDebounce(param, 500);
  const [list, setList] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const client = useHttp();

  useEffect(() => {
    client('projects', {
      data: cleanObject(debounceParam),
    }).then(setList);
  }, [debounceParam]);

  useMount(() => {
    client('users').then(setUsers);
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users}></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  );
};
