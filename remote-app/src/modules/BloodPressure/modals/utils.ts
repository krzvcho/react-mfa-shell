export const validateFormData = (
  systolic: number,
  diastolic: number,
  pulse: number,
  measuredAt: Date | null,
  rawSystolic: any,
  rawDiastolic: any,
  rawPulse: any,
  measuredAtStr: any
): Record<string, string> => {
  const errors = {} as Record<string, string>;
  if (rawSystolic === null || Number.isNaN(systolic)) {
    errors.systolic = 'Systolic is required and must be a number.';
  } else if (systolic <= 0) {
    errors.systolic = 'Systolic must be greater than 0.';
  }

  if (rawDiastolic === null || Number.isNaN(diastolic)) {
    errors.diastolic = 'Diastolic is required and must be a number.';
  } else if (diastolic <= 0) {
    errors.diastolic = 'Diastolic must be greater than 0.';
  }

  if (
    !Number.isNaN(systolic) &&
    !Number.isNaN(diastolic) &&
    systolic <= diastolic
  ) {
    errors.diastolic =
      errors.diastolic ?? 'Diastolic must be less than systolic.';
  }

  if (rawPulse === null || Number.isNaN(pulse)) {
    errors.pulse = 'Pulse is required and must be a number.';
  } else if (pulse <= 0) {
    errors.pulse = 'Pulse must be greater than 0.';
  }

  if (!measuredAtStr) {
    errors.measuredAt = 'Measured At is required.';
  } else if (!measuredAt || Number.isNaN(measuredAt.getTime())) {
    errors.measuredAt = 'Measured At must be a valid date/time.';
  }

  return errors;
};
