import React from 'react';
import './Dashboard.styles.scss';

import DashboardIcon from '@mui/icons-material/Dashboard';
import { List, ListItem, ListItemText } from '@mui/material';
import { ListDashboard } from './Dashboard.constants';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <List>
        {ListDashboard.map((item, i) => (
          <ListItem key={i}>
            <DashboardIcon />
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Dashboard;
