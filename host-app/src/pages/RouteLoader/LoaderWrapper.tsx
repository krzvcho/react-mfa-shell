import { Outlet } from 'react-router-dom';

import { Link, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function LoaderWrapper() {
  const location = useLocation();
  // Determine which tab is active
  const tabValue = location.pathname.endsWith('/virtualized') ? 'virtualized' : 'standard';

  return (
    <div>
      <Tabs value={tabValue} sx={{ mb: 2 }}>
        <Tab
          label="Standard Table"
          value="standard"
          component={Link}
          to="."
        />
        <Tab
          label="Virtualized Table"
          value="virtualized"
          component={Link}
          to="virtualized"
        />
      </Tabs>
      <Outlet />
    </div>
  );
}
