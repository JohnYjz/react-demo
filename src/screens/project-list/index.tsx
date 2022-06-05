import { SearchPanel } from './search-panel';
import { List } from './list';
import { useState } from 'react';
import { useDebounce, useDocumentTitile } from 'utils';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';

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
  personId: number | string;
  pin: boolean;
  organization: string;
  created: number;
}

export interface SearchParam {
  name: string;
  personId: string;
}

export const ProjectListScreen = () => {
  const [param, setParam] = useState<Partial<Project>>({
    name: '',
    personId: '',
  });

  const debounceParam = useDebounce(param, 500);
  const { isLoading, error, data: list } = useProjects(debounceParam);

  const { data: users } = useUsers();

  useDocumentTitile('项目列表', false);

  return (
    <Container>
      <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List loading={isLoading} dataSource={list || []} users={users || []}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
