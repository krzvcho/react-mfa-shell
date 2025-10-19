import React from 'react';
import type { BloodPressureRecord } from '../../../api/bloodpressure/bloodpressure';
import { Card } from '@mui/material';

interface BloodRecordsListItemProps {
  record: BloodPressureRecord; // Replace 'any' with the actual type of the record if available
}

const BloodRecordsListItem: React.FC<BloodRecordsListItemProps> = ({
  record,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{ padding: 0.5, mb: 1, textAlign: 'left', width: '100%' }}
    >
      {record.systolic} / {record.diastolic} mmHg
      <br />
      Pulse: {record.pulse} bpm
      <br />
      Measured At: {new Date(record.measuredAt).toLocaleString()}
    </Card>
  );
};

export default BloodRecordsListItem;

