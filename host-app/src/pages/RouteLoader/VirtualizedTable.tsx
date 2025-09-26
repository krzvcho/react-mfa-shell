import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useRouteLoaderData } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import type { GridRowsProp, GridColDef } from '@mui/x-data-grid';
import type { Country } from '../../api/restcountries';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'flag',
    headerName: 'Flag',
    width: 70,
    renderCell: (params) => {
      return (
        <img
          src={params.value?.png || ''}
          alt={params.value?.alt || 'flag'}
          style={{ width: '100%', height: 'auto' }}
        />
      );
    },
  },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'description', headerName: 'Description', width: 400 },
];

const VirtualizedTable: React.FC = () => {
  const countries = useRouteLoaderData('loader-main-route') as Country[];
  const [rows, setRows] = React.useState<GridRowsProp>([]);

  useEffect(() => {
    if (countries.length) {
      const formattedRows = countries.map((country: Country, index) => ({
        id: index,
        flag: country.flags,
        name: country.name.common,
        description: country.region,
      }));
      setRows(formattedRows);
    }
  }, [countries]);

  return (
    <Box >
      <Typography variant="h6">X-data-grid MUI</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        sx={{
          height: 500,
          border: 1,
          borderColor: '#ccc',
          boxShadow: 2,
          borderRadius: 2,
        }}
      />
    </Box>
  );
};

export default VirtualizedTable;
