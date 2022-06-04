import { Input, Select } from 'antd';
import { User, SearchParam } from './index';

export const SearchPanel = ({
  param,
  setParam,
  users,
}: {
  param: SearchParam;
  setParam: React.Dispatch<React.SetStateAction<SearchParam>>;
  users: User[];
}) => {
  return (
    <form>
      <div>
        <Input
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value="">负责人</Select.Option>
          {users.map((user) => (
            <Select.Option value={user.id}>{user.name}</Select.Option>
          ))}
        </Select>
      </div>
    </form>
  );
};
