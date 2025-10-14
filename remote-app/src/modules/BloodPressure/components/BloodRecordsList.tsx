import React from 'react';
import type { BloodPressureRecord } from '../../../api/bloodpressure/bloodpressure';
import BloodRecordsListItem from './BloodRecordsListItem';

interface BloodRecordsListProps {
  bloodPressureRecords?: BloodPressureRecord[];
}
const BloodRecordsList: React.FC<BloodRecordsListProps> = ({
  bloodPressureRecords,
}) => {
  return bloodPressureRecords?.length
    ? bloodPressureRecords.map((record: BloodPressureRecord) => (
        <BloodRecordsListItem key={record.measuredAt} record={record} />
      ))
    : 'loading...';
};

export default BloodRecordsList;
