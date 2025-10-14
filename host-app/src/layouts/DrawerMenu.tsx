import React from 'react';
import {
  Toolbar,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import * as MuiIcons from '@mui/icons-material';

import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { counterActions } from '../store';
import { useDispatch } from 'react-redux';

import { menuItems } from '../menuItems';

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

interface DrawerMenuProps {
  open: boolean;
  drawerWidth?: number;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ open, drawerWidth }) => {
  const dispatch = useDispatch();
  return (
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
        {menuItems.map((item) => {
          const IconComponent = MuiIcons[item.icon as keyof typeof MuiIcons];
          return (
            <StyledListItem to={item.to} key={item.to}>
              <ListItemIcon sx={{ color: 'inherit' }}>
                {IconComponent ? <IconComponent /> : null}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </StyledListItem>
          );
        })}
      </List>
      <Button onClick={() => dispatch(counterActions.decrement())}>
        Decrement Counter
      </Button>
    </Drawer>
  );
};

export default DrawerMenu;
