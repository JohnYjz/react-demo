import styled from '@emotion/styled';
import { Button, Dropdown, Menu } from 'antd';
import { Row } from 'components/lib';
import { useAuth } from 'context/auth-context';
import { ProjectListScreen } from 'screens/project-list';
import { ReactComponent as Logo } from 'assets/software-logo.svg'; // TODO svg导入
import { Navigate, Route, Routes } from 'react-router';

import { ProjectScreen } from 'screens/project';
import { BrowserRouter } from 'react-router-dom';
import { resetRoute } from 'utils';

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <BrowserRouter>
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreen />} />
            <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
            <Route path="/" element={<Navigate to="/projects" replace={true} />} />
          </Routes>
        </BrowserRouter>
      </Main>
    </Container>
  );
};

const PageHeader = () => {
  const { user, logout } = useAuth();
  const handlerClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      logout();
    }
  };
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <Logo width="18rem" color="rgb(38,132, 255)" />
        </Button>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRgiht>
        <Dropdown overlay={<Menu onClick={handlerClick} items={[{ label: '登出', key: 'logout' }]}></Menu>}>
          <Button type="link" onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRgiht>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr; // 头、足固定 6rem，中间撑满
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;
const HeaderLeft = styled(Row)``;
const HeaderRgiht = styled.div``;
const Main = styled.main``;
