import styled from '@emotion/styled';
import { Button, Dropdown, Menu } from 'antd';
import { ButtonNoPadding, Row } from 'components/lib';
import { useAuth } from 'context/auth-context';
import { ProjectListScreen } from 'screens/project-list';
import { ReactComponent as Logo } from 'assets/software-logo.svg'; // TODO svg导入
import { Navigate, Route, Routes } from 'react-router';

import { ProjectScreen } from 'screens/project';
import { BrowserRouter } from 'react-router-dom';
import { resetRoute } from 'utils';
import { useState } from 'react';
import { ProjectModal } from 'screens/project-list/project-modal';
import { ProjectPopover } from 'components/project-popover';

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const onClose = () => {
    setProjectModalOpen(false);
  };
  return (
    <Container>
      <PageHeader setProjectModalOpen={setProjectModalOpen} />
      <Main>
        <BrowserRouter>
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreen setProjectModalOpen={setProjectModalOpen} />} />
            <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
            <Route path="/" element={<Navigate to="/projects" replace={true} />} />
          </Routes>
        </BrowserRouter>
      </Main>
      <ProjectModal projectModalOpen={projectModalOpen} onClose={onClose} />
    </Container>
  );
};

const PageHeader = ({ setProjectModalOpen }: { setProjectModalOpen: (isOpen: boolean) => void }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <Logo width="18rem" color="rgb(38,132, 255)" />
        </ButtonNoPadding>

        <ProjectPopover setProjectModalOpen={setProjectModalOpen} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRgiht>
        <User />
      </HeaderRgiht>
    </Header>
  );
};

const User = () => {
  const { user, logout } = useAuth();
  const handleClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      logout();
    }
  };
  return (
    <Dropdown overlay={<Menu onClick={handleClick} items={[{ label: '登出', key: 'logout' }]}></Menu>}>
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
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
