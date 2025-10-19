export interface BloodPressureRecord {
  id: number;
  systolic: number;
  diastolic: number;
  pulse: number;
  measuredAt: string; // ISO date string
}

const mockBloodPressureRecords: BloodPressureRecord[] = [
  {
    id: 1,
    systolic: 120,
    diastolic: 80,
    pulse: 72,
    measuredAt: '2025-10-10T08:30:00Z',
  },
  {
    id: 2,
    systolic: 130,
    diastolic: 85,
    pulse: 75,
    measuredAt: '2025-10-11T09:00:00Z',
  },
  {
    id: 3,
    systolic: 125,
    diastolic: 82,
    pulse: 70,
    measuredAt: '2025-10-12T07:45:00Z',
  },
];

export function getRecords(): Promise<BloodPressureRecord[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockBloodPressureRecords);
    }, 1000); // 1 second delay
  });
}

export function convertBPDataForLineChart(data: BloodPressureRecord[]) {
  // sort by measuredAt ascending (oldest -> newest)
  const sortedData = [...data].sort(
    (a, b) => new Date(a.measuredAt).getTime() - new Date(b.measuredAt).getTime()
  );

  // use ISO date (YYYY-MM-DD) for x axis labels
  const xData = sortedData.map((item) => {
    const date = new Date(item.measuredAt);
    return date.toISOString().slice(0, 10); // e.g. "2025-10-10"
  });

  // use the sorted data for the subsequent mappings
  data = sortedData;

  const systolicData = data.map((item) => item.systolic);
  const diastolicData = data.map((item) => item.diastolic);

  return { xData, systolicData, diastolicData };
}
