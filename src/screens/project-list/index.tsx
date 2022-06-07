import { SearchPanel } from './search-panel';
import { List } from './list';
import { useDebounce, useDocumentTitile } from 'utils';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useProjects } from 'utils/project';
import { useUsers } from 'utils/user';
import { useProjectsSearchParams } from './util';

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
  personId: number;
}

export const ProjectListScreen = () => {
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list, retry } = useProjects(useDebounce(param, 500));

  const { data: users } = useUsers();

  useDocumentTitile('项目列表', false);

  return (
    <Container>
      <SearchPanel param={param} setParam={setParam} users={users || []}></SearchPanel>
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List refresh={retry} loading={isLoading} dataSource={list || []} users={users || []}></List>
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
