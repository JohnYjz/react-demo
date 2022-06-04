import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadServer, DevTools } from 'jira-dev-tool';
import 'antd/dist/antd.less'; // 放在 jira-dev-tool 后面是为了覆盖该包的内置antd，引入less而不是css是为了自定义样式主题
import { AppProviders } from 'context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

loadServer(() =>
  root.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
    </React.StrictMode>
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
