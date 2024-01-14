import React from 'react';
import { ServiceData } from '../services/ServiceRedux';

const { Provider: ProjectProvider, Consumer: ProjectConsumer } = React.createContext(ServiceData);

export { ProjectProvider, ProjectConsumer };
