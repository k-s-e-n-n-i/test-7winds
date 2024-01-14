import React from 'react';
import './Header.scss';

import { Tabs, Tab } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import ReplyIcon from '@mui/icons-material/Reply';

const Header = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (e: React.SyntheticEvent, newValue: number) => setValue(newValue);

  return (
    <header className="header">
      <AppsIcon />
      <ReplyIcon />

      <Tabs className="header__tabs" value={value} onChange={handleChange}>
        <Tab label="Просмотр" />
        <Tab label="Управление" />
      </Tabs>
    </header>
  );
};

export default Header;
