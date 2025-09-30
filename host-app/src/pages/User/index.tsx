import React from 'react';
import { Card, CardActions, CardHeader, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {
  useRouteLoaderData,
  useNavigate,
  useSubmit,
  redirect,
} from 'react-router-dom';
import { DeleteOutline } from '@mui/icons-material';

const UserContainer: React.FC = () => {
  const user = useRouteLoaderData('user-container-route');
  const submit = useSubmit();
  const navigate = useNavigate();

  const deleteHandler = () => {
    const proceed = window.confirm(
      'Are you sure you want to delete this user?'
    );
    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };

  if (!user) return <div>Loading user data...</div>;

  return (
    <Card sx={{ p: 2, mt: 2 }}>
      <CardHeader
        title={user.username}
        action={
          <>
            <IconButton size="large" onClick={() => navigate('edit')}>
              <EditIcon />
            </IconButton>
            <IconButton size="large" onClick={deleteHandler}>
              <DeleteOutline />
            </IconButton>
          </>
        }
        sx={{ backgroundColor: '#d3e9cdff' }}
      />
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Age:</strong> {user.age}
      </p>
      <p>
        <strong>Status:</strong> {user.isActive ? 'Active' : 'Inactive'}
      </p>
      <p style={{ fontSize: '0.9em', color: '#888' }}>
        <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
      </p>
      <p style={{ fontSize: '0.8em', color: '#bbb' }}>User ID: {user.id}</p>
    </Card>
  );
};

export default UserContainer;

export async function deleteUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('mockUser');
  }
  redirect('');
}
