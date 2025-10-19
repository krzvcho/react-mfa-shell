import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import BloodRecordsList from './components/BloodRecordsList';
import {
  getRecords,
  saveRecord,
  type BloodPressureRecord,
} from '../../api/bloodpressure/bloodpressure';
import BloodRecordsLineChart from './components/BloodRecordsLineChart';
import BloodRecordsAddModal from './modals/BloodRecordsAddModal';
import { Button, Tab, Tabs } from '@mui/material';
import BloodRecordsTable from './components/BloodRecordsTable';

const Blood: React.FC = () => {
  const [bloodRecords, setBloodRecords] = useState<BloodPressureRecord[]>([]);
  const [activeTab, setActiveTab] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const onSave = async (newRecord?: BloodPressureRecord) => {
    if (!newRecord) return;
    try {
      const updatedRecords = await saveRecord(newRecord);
      setBloodRecords(updatedRecords);
      setIsAddOpen(false);
    } catch (e) {
      console.error('Failed to save record:', e);
      throw e;
    }
  };

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
        <Grid
          size={12}
          container
          justifyContent="flex-end"
          sx={{ borderBottom: '1px solid #ccc', pb: 1 }}
        >
          <Button variant="contained" onClick={() => setIsAddOpen(true)}>
            Add Record
          </Button>
        </Grid>
        <Grid size={4}>
          {loading && 'Loading...'}
          {!loading && (
            <>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                aria-label="basic tabs example"
              >
                <Tab label="Cards" value={1} />
                <Tab label="Table" value={2} />
              </Tabs>
              {activeTab === 1 && (
                <BloodRecordsList bloodPressureRecords={bloodRecords} />
              )}
              {activeTab === 2 && 
                <BloodRecordsTable records={bloodRecords} />
              }
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
        onSave={onSave}
      />
    </>
  );
};

export default Blood;
