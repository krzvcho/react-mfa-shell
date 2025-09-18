import { RemoteComponentWrapper } from './components/RemoteComponentWrapper';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLayout from './layouts/HostAppLayout';
import ReactForms from './pages/ReactForms';
import './App.css';

const router = createBrowserRouter([
  {
    element: <AdminLayout />,
    children: [
      { path: '/', element: <span> root </span> },
      { path: '/react-forms', element: <ReactForms /> },
      { path: '/remote-app/*', element: <RemoteComponentWrapper /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
