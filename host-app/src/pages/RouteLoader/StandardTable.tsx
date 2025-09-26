import React from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import type { Country } from '../../api/restcountries';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Tooltip,
} from '@mui/material';

const columns = [
  { id: 'flag', label: 'Flag' },
  { id: 'name', label: 'Name' },
  { id: 'region', label: 'Region' },
  { id: 'capital', label: 'Capital' },
  { id: 'population', label: 'Population' },
  { id: 'cca2', label: 'Code' },
];

const StandardTable: React.FC = () => {
  const countries = useRouteLoaderData('loader-main-route') as Country[];
  
  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 2,
        maxHeight: 'calc(100vh - 130px)', // 64px margin from bottom
        minHeight: 200,
        overflowY: 'auto',
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.id}
                align={col.id === 'flag' ? 'center' : 'left'}
              >
                <Typography variant="subtitle2">{col.label}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {countries.map((country) => (
            <TableRow key={country.cca2 || country.name.common}>
              <TableCell align="center">
                {country.flags?.png ? (
                  <Tooltip
                    title={country.flags.alt || country.name.common}
                    arrow
                  >
                    <Avatar
                      alt={country.flags.alt}
                      src={country.flags.png}
                      sx={{ width: 32, height: 32, mx: 'auto' }}
                    />
                  </Tooltip>
                ) : (
                  country.flag || ''
                )}
              </TableCell>
              <TableCell>{country.name.common}</TableCell>
              <TableCell>{country.region}</TableCell>
              <TableCell>{country.capital?.join(', ') || ''}</TableCell>
              <TableCell>
                {country.population?.toLocaleString() || ''}
              </TableCell>
              <TableCell>{country.cca2}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StandardTable;
