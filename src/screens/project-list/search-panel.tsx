import { Form, Input } from 'antd';
import { UserSelect } from 'components/user-select';
import { User, Project } from './index';

export const SearchPanel = ({
  param,
  setParam,
  users,
}: {
  param: Partial<Project>;
  setParam: (params: Partial<Project>) => void;
  users: User[];
}) => {
  return (
    <Form layout="inline" style={{ marginBottom: '2rem' }}>
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={param.personId}
          defaultOptionName="负责人"
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};
