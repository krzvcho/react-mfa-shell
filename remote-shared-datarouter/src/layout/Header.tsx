import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// Example routes
const isDev = import.meta.env.DEV;
const routes = [
  { label: 'Home', path: '/' },
 
];
const baseUrl = isDev ? '' : '/remote-app';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Find the current tab index based on location
  const currentTab = routes.findIndex(
    (route) => route.path === location.pathname
  );

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    navigate(`${baseUrl}${routes[newValue].path}`);
  };

  return (
    <Tabs value={currentTab} onChange={handleChange}>
      {routes.map((route) => (
        <Tab key={route.path} label={route.label} />
      ))}
    </Tabs>
  );
};

export default Header;
