import qs from 'qs';
import * as auth from 'auth-provider'; // 纯粹的登录流程、token管理工具方法
import { useAuth } from 'context/auth-context';

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (endpoint: string, { data, token, headers, ...options }: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...options,
  };

  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data);
  }
  return window.fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: '请重新登录' });
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    }
    return Promise.reject(data);
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  // TODO TS操作符
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, {
      ...config,
      token: user?.token,
    });
};
