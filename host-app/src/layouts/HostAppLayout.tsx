import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Dashboard,
  Settings,
  Newspaper,
  FrontLoader,
  Person,
} from '@mui/icons-material';
import { Link as RouterLink, Outlet, useNavigation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const drawerWidth = 240;

// Styled ListItem with primary color for link
const StyledListItem = styled(RouterLink)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: theme.palette.primary.main,
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.primary.dark,
    textDecoration: 'none',
  },
  '&.active': {
    backgroundColor: theme.palette.action.selected,
    color: theme.palette.primary.dark,
  },
  span: {
    textAlign: 'left',
  },
}));

const menuItems = [
  {
    to: '/',
    icon: <Dashboard />,
    label: 'Root',
  },
  {
    to: '/loader',
    icon: <FrontLoader />,
    label: 'Loader demo',
  },
  { to: '/user', icon: <Person />, label: 'User' },
  {
    to: '/react-forms',
    icon: <Newspaper />,
    label: 'React Forms',
  },
  {
    to: '/remote-app',
    icon: <Settings />,
    label: 'Remote App',
  },
  {
    to: '/remote-app-datarouter',
    icon: <Settings />,
    label: 'Remote App Datarouter',
  },
];

export default function AdminLayout() {
  const [open, setOpen] = React.useState(true);
  const navigation = useNavigation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* Top Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Upskilling playground {navigation.state}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Left Drawer */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: open ? drawerWidth : 0,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <StyledListItem to={item.to} key={item.to}>
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </StyledListItem>
          ))}
        </List>
      </Drawer>

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
        {navigation.state === 'loading' && <CircularProgress />}
        <Outlet />
      </Box>
    </div>
  );
}
