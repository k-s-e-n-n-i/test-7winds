import React from 'react';
import './Main.styles.scss';
import Dashboard from '../../components/Dashboard/Dashboard';
import ContentProject from '../../components/ContentProject/ContentProject';
import { ListItemText } from '@mui/material';

const Main = () => {
  return (
    <div className="page-main">
      <ListItemText className="page-main__select" primary={'Название проекта'} secondary={'Аббревиатура'} />

      <ListItemText className="page-main__name-project" primary="Строительно-монтажные работы" />

      <Dashboard />

      <ContentProject />
    </div>
  );
};

export default Main;
