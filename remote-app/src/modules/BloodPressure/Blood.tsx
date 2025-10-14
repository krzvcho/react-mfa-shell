import React, { use, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import BloodRecordsList from './components/BloodRecordsList';
import {
  getRecords,
  type BloodPressureRecord,
} from '../../api/bloodpressure/bloodpressure';
import BloodRecordsLineChart from './components/BloodRecordsLineChart';

const Blood: React.FC = () => {
  const [bloodRecords, setBloodRecords] = useState<BloodPressureRecord[]>([]);

  useEffect(() => {
    getRecords().then((data) => {
      console.log(data);
      setBloodRecords(data);
    });
  }, []);
  return (
    <>
      <Grid container marginTop={2} spacing={2}>
        <Grid size={4}>
          <BloodRecordsList bloodPressureRecords={bloodRecords} />
        </Grid>
        <Grid size={8}><BloodRecordsLineChart bloodPressureRecords={bloodRecords}/></Grid>
      </Grid>
    </>
  );
};

export default Blood;
