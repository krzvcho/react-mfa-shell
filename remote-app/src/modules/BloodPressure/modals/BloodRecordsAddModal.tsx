import React, { useActionState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  Box,
} from '@mui/material';
import { validateFormData } from './utils';

type BloodRecordsAddModalProps = {
  open: boolean;
  onClose: () => void;
  onSave?: (data?: any) => void;
  title?: string;
};
type FormErrors = Record<string, string> | null;
type FieldName = 'systolic' | 'diastolic' | 'pulse' | 'measuredAt';

// Field config to avoid repetition
const FIELDS: Array<{
  name: FieldName;
  label: string;
  type: React.InputHTMLAttributes<unknown>['type'];
  required?: boolean;
  slotProps?: { htmlInput?: Record<string, any>; inputLabel?: Record<string, any> };
}> = [
  {
    name: 'systolic',
    label: 'Systolic',
    type: 'number',
    required: true,
    slotProps: { htmlInput: { inputMode: 'numeric', min: 0 } },
  },
  {
    name: 'diastolic',
    label: 'Diastolic',
    type: 'number',
    required: true,
    slotProps: { htmlInput: { inputMode: 'numeric', min: 0 } },
  },
  {
    name: 'pulse',
    label: 'Pulse',
    type: 'number',
    required: true,
    slotProps: { htmlInput: { inputMode: 'numeric', min: 0 } },
  },
  {
    name: 'measuredAt',
    label: 'Measured At',
    type: 'datetime-local',
    required: true,
    slotProps: { inputLabel: { shrink: true } },
  },
];

const BloodRecordsAddModal: React.FC<BloodRecordsAddModalProps> = ({
  open,
  onClose,
  onSave,
  title = 'Add Blood Pressure Record',
}) => {
  const handleSave = (
    _prevState: any,
    formData: FormData
  ): { errors: FormErrors; enteredValues: Record<string, any> } => {
    let errors: Record<string, string> = {};

    const rawSystolic = formData.get('systolic');
    const rawDiastolic = formData.get('diastolic');
    const rawPulse = formData.get('pulse');
    const rawMeasuredAt = formData.get('measuredAt');

    const systolic = Number(rawSystolic);
    const diastolic = Number(rawDiastolic);
    const pulse = Number(rawPulse);
    const measuredAtStr =
      typeof rawMeasuredAt === 'string' ? rawMeasuredAt : '';
    const measuredAt = measuredAtStr ? new Date(measuredAtStr) : null;

    errors = validateFormData(
      systolic,
      diastolic,
      pulse,
      measuredAt,
      rawSystolic,
      rawDiastolic,
      rawPulse,
      measuredAtStr
    );

    if (Object.keys(errors).length > 0) {
      return {
        errors,
        enteredValues: {
          systolic: rawSystolic,
          diastolic: rawDiastolic,
          pulse: rawPulse,
          measuredAt: rawMeasuredAt,
        },
      };
    }

    // Valid -> pass to onSave
    onSave?.({
      systolic,
      diastolic,
      pulse,
      measuredAt: measuredAt!.toISOString(),
    });

    return { errors: null, enteredValues: {} };
  };

  const [formState, formAction, pending] = useActionState(handleSave, {
    errors: null,
    enteredValues: {},
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <form action={formAction} id="bloodRecordForm">
          <Box display="grid" gap={2}>
            {FIELDS.map(({ name, label, type, required, slotProps }) => (
              <TextField
                key={name}
                id={name}
                name={name}
                type={type}
                label={label}
                required={required}
                fullWidth
                disabled={pending}
                error={Boolean(formState.errors?.[name])}
                helperText={formState.errors?.[name] ?? ' '}
                defaultValue={
                  formState.enteredValues?.[name]
                    ? type === 'datetime-local' && typeof formState.enteredValues[name] === 'string'
                      ? new Date(formState.enteredValues[name]).toISOString().slice(0, 16)
                      : formState.enteredValues[name]
                    : undefined
                }
                slotProps={{
                  htmlInput: slotProps?.htmlInput,
                  inputLabel: slotProps?.inputLabel,
                }}
              />
            ))}
          </Box>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={pending}>Cancel</Button>
        <Button
          variant="contained"
          type="submit"
          form="bloodRecordForm"
          disabled={pending}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BloodRecordsAddModal;
