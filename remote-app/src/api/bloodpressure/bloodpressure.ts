import { v4 as uuidv4 } from 'uuid';

export interface BloodPressureRecord {
  id: number | string;
  systolic: number;
  diastolic: number;
  pulse: number;
  measuredAt: string; // ISO date string
}

const STORAGE_KEY = 'bloodPressureRecords';

const defaultRecords: BloodPressureRecord[] = [];

// Initialize from localStorage or use default records
const initializeRecords = (): BloodPressureRecord[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to parse stored records:', error);
      return defaultRecords;
    }
  }
  // If nothing in localStorage, save defaults and return them
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultRecords));
  return defaultRecords;
};

const mockBloodPressureRecords: BloodPressureRecord[] = initializeRecords();

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

export function saveRecord(record: Omit<BloodPressureRecord, 'id'>): Promise<BloodPressureRecord[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRecord: BloodPressureRecord = {
        ...record,
        id: uuidv4()
      };
      mockBloodPressureRecords.push(newRecord);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockBloodPressureRecords));
      resolve(mockBloodPressureRecords);
    }, 1500); // 1.5 second delay to simulate backend save
  });
}
