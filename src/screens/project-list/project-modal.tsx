import { Button, Drawer } from 'antd';
import React from 'react';

export const ProjectModal = ({ projectModalOpen, onClose }: { projectModalOpen: boolean; onClose: () => void }) => {
  return (
    <Drawer visible={projectModalOpen} width="100%" onClose={onClose}>
      <h1>Project Modal</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  );
};
