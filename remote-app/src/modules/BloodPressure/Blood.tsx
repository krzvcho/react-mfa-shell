import React, { use, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import BloodRecordsList from './components/BloodRecordsList';
import {
  getRecords,
  type BloodPressureRecord,
} from '../../api/bloodpressure/bloodpressure';
import BloodRecordsLineChart from './components/BloodRecordsLineChart';
import BloodRecordsAddModal from './modals/BloodRecordsAddModal';
import { Button } from '@mui/material';

const Blood: React.FC = () => {
  const [bloodRecords, setBloodRecords] = useState<BloodPressureRecord[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getRecords()
      .then((data) => {
        setBloodRecords(data);
      })
      .catch(() => {
        // optionally handle error
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Grid container marginTop={2} spacing={2}>
        <Grid size={4} container>
          {loading && 'Loading...'}
          {!loading && (
            <>
              <Button variant="contained" onClick={() => setIsAddOpen(true)}>
                Add Record
              </Button>
              <BloodRecordsList bloodPressureRecords={bloodRecords} />
            </>
          )}
        </Grid>
        <Grid size={8}>
          <BloodRecordsLineChart bloodPressureRecords={bloodRecords} />
        </Grid>
      </Grid>

      <BloodRecordsAddModal
        open={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSave={(newRecord?: BloodPressureRecord) => {
          if (newRecord) setBloodRecords((prev) => [newRecord, ...prev]);
          setIsAddOpen(false);
        }}
      />
    </>
  );
};

export default Blood;
