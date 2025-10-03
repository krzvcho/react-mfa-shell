import React, { useState } from 'react';
import dayjs from 'dayjs';
import type { MockUser } from '../../api/usermock';
import {
  Form,
  useNavigation,
  useRouteLoaderData,
  useActionData,
} from 'react-router-dom';
// import dayjs from 'dayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const EditUserForm: React.FC = () => {
  const user = useRouteLoaderData('user-container-route') as MockUser;
  const navigation = useNavigation();
  const data = useActionData() as { errors?: string } | undefined;
  const isSubmitting = navigation.state === 'submitting';
  const [form, setForm] = useState<MockUser>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    console.log(name, value, type, checked);
    setForm((prev) => {
      let newValue: any = value;
      if (type === 'checkbox') {
        newValue = checked;
      } else if (type === 'number') {
        newValue = value === '' ? '' : Number(value);
      } else if (type === 'datetime-local') {
        newValue = value;
      }
      return {
        ...prev,
        [name]: newValue,
      };
    });
  };
  // const handleDateTimeChange = (newValue: dayjs.Dayjs | null) => {
  //   if (newValue) {
  //     setForm((prev) => ({
  //       ...prev,
  //       createdAt: newValue.toISOString(),
  //     }));
  //   }
  // };

  return (
    <Form method="post">
      {data?.errors && ( //backend validation errors
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}
      >
        <TextField
          label="Username"
          variant="outlined"
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Age"
          variant="outlined"
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          slotProps={{ htmlInput: { min: 0, max: 99 } }}
          required
        />
        <FormControlLabel
          label="Active"
          control={
            <Checkbox
              checked={form.isActive}
              name="isActive"
              onChange={handleChange}
            />
          }
        />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Created at"
            name="createdAt"
            value={dayjs(form.createdAt)}
            onChange={handleDateTimeChange}
          />
        </LocalizationProvider> */}
        <TextField
          label="Created at"
          name="createdAt"
          type="datetime-local"
          value={form.createdAt ? dayjs(form.createdAt).format('YYYY-MM-DDTHH:mm') : ''}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="outlined" type="submit" disabled={isSubmitting}>
          Save
        </Button>
      </Box>
    </Form>
  );
};

export default EditUserForm;

// data functions
import { redirect, type ActionFunctionArgs } from 'react-router-dom';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';

export async function editUser({
  request,
  params,
}: ActionFunctionArgs): Promise<Response | void> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const formData = await request.formData();
  // Extract and convert fields
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  const age = formData.get('age') ? Number(formData.get('age')) : undefined;
  const isActive =
    formData.get('isActive') === 'on' || formData.get('isActive') === 'true';
  const createdAt = formData.get('createdAt') as string;

  // Validation
  const errors: Record<string, string> = {};
  if (!username || username.length < 3) {
    errors.username = 'Username must be at least 3 characters.';
  }
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    errors.email = 'Invalid email address.';
  }
  if (typeof age !== 'number' || isNaN(age) || age < 0) {
    errors.age = 'Age must be a non-negative number.';
  }
  if (!createdAt || isNaN(Date.parse(createdAt))) {
    errors.createdAt = 'Invalid date.';
  }
  if (Object.keys(errors).length > 0) {
    return new Response(JSON.stringify({ errors }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Get current user from localStorage
  let user: MockUser | null = null;
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('mockUser');
    if (stored) {
      try {
        user = JSON.parse(stored) as MockUser;
      } catch {}
    }
  }
  // Update user fields
  if (user) {
    user.username = username;
    user.email = email;
    if (typeof age === 'number') user.age = age;
    user.isActive = isActive;
    user.createdAt = createdAt;
  } else {
    user = {
      id: Date.now(),
      username,
      email,
      age: typeof age === 'number' ? age : 0,
      isActive,
      createdAt,
    };
  }
  // Save updated user to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('mockUser', JSON.stringify(user));
  }
  // Optionally redirect or return a response
  return redirect('/user');
}
