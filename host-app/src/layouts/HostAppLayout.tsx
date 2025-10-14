import React from 'react';
import { Toolbar, Box } from '@mui/material';
import { Outlet, useNavigation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Header from './Header';
import DrawerMenu from './DrawerMenu';

const drawerWidth = 240;

export default function AdminLayout() {
  const [open, setOpen] = React.useState(true);
  const navigation = useNavigation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* Top Bar */}
      <Header toggleDrawer={toggleDrawer} />
      {/* Left Drawer */}
      <DrawerMenu open={open} drawerWidth={drawerWidth} />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          transition: 'margin .3s',
          padding: 2,
          marginLeft: open ? `${drawerWidth}px` : 0,
        }}
      >
        <Toolbar />
        {navigation.state === 'loading' ? <CircularProgress /> : <Outlet />}
      </Box>
    </div>
  );
}
