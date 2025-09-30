import React, { useState } from 'react';
import type { MockUser } from '../../api/usermock';
import {
  Form,
  useNavigation,
  useRouteLoaderData,
  useActionData,
} from 'react-router-dom';

const EditUserForm: React.FC = () => {
  const user = useRouteLoaderData('user-container-route') as MockUser;
  const navigation = useNavigation();
  const data = useActionData() as { errors?: string } | undefined;
  const isSubmitting = navigation.state === 'submitting';
  const [form, setForm] = useState<MockUser>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
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

  return (
    <Form method="post">
      {data?.errors && ( //backend validation errors
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            min={0}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Active:
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Created At:
          <input
            type="datetime-local"
            name="createdAt"
            value={form.createdAt.slice(0, 16)}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button type="submit" disabled={isSubmitting}>
        Save
      </button>
    </Form>
  );
};

export default EditUserForm;

// data functions
import { redirect, type ActionFunctionArgs } from 'react-router-dom';

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
