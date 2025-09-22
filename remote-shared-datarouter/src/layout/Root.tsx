import React from 'react';
import { styled } from '@mui/material/styles';
import { Outlet } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Header from './Header';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const Root: React.FC = () => {
  return (
    <>
      <Grid container>
        <Grid size={12}>
          <Header />
        </Grid>
        <Grid size={12}>
          <Item>
            <Outlet />
          </Item>
        </Grid>
      </Grid>
      <Grid container marginTop={2} spacing={2}>
        <Grid size={6}>
          <Item>© {new Date().getFullYear()}</Item>
        </Grid>
        <Grid size={6}>
          <Item>contact: 911</Item>
        </Grid>
      </Grid>
    </>
  );
};

export default Root;
