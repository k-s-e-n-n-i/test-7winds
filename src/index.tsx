import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/App/App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { ProjectProvider } from './redux/contexts/ProjectProvider';
import { ServiceData } from './redux/services/ServiceRedux';
import service from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={service}>
      <ErrorBoundary>
        <ProjectProvider value={ServiceData}>
          <App />
        </ProjectProvider>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
