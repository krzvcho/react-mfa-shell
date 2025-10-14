import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import  {
  type BloodPressureRecord,
  convertBPDataForLineChart,
} from '../../../api/bloodpressure/bloodpressure';

interface BloodRecordsListProps {
  bloodPressureRecords?: BloodPressureRecord[];
}

const BloodRecordsLineChart: React.FC<BloodRecordsListProps> = ({
  bloodPressureRecords,
}) => {
  console.log(bloodPressureRecords);
  const {
    xData,
    systolicData,
    diastolicData,
  } = convertBPDataForLineChart(bloodPressureRecords || []);

  return (
    <LineChart
      series={[
        { data: systolicData, label: 'Systolic', color: 'blue' },
        { data: diastolicData, label: 'Diastolic', color: 'red' },
      ]}
      xAxis={[{ data: xData, scaleType: 'point' }]}
      width={500}
      height={300}
    />
  );
};

export default BloodRecordsLineChart;
