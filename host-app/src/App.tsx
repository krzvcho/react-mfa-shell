import { RemoteComponentWrapper } from './components/RemoteComponentWrapper';
import { RemoteComponentWrapperDatarouter } from './components/RemoteComponentWrapperDatarouter';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { fetchIndependentCountries } from './api/restcountries';
import AdminLayout from './layouts/HostAppLayout';
import ReactForms from './pages/ReactForms';
import LoaderWrapper from './pages/RouteLoader/LoaderWrapper';
import StandardTable from './pages/RouteLoader/StandardTable';
import VirtualizedTable from './pages/RouteLoader/VirtualizedTable';
import ErrorComponent from './components/ErrorComponent';
import './styles.css';
import { getUser } from './api/usermock';
import UserContainer, { deleteUser } from './pages/User';
import EditUserForm, { editUser } from './pages/User/Edit';
import Counter from './pages/Counter/Counter';

const router = createBrowserRouter([
  {
    element: <AdminLayout />,
    children: [
      { path: '/', element: <span> root </span> },
      { path: '/counter', element: <Counter /> },
      {
        path: '/loader',
        element: <LoaderWrapper />,
        errorElement: <ErrorComponent />,
        loader: fetchIndependentCountries,
        id: 'loader-main-route',
        children: [
          {
            index: true,
            element: <StandardTable />,
          },
          {
            path: 'virtualized',
            element: <VirtualizedTable />,
          },
        ],
      },
      {
        path: '/user',
        id: 'user-container-route',
        loader: getUser,
        errorElement: <ErrorComponent />,
        children: [
          { index: true, element: <UserContainer />, action: deleteUser },
          { path: 'edit', element: <EditUserForm />, action: editUser },
        ],
      },
      {
        path: '/react-forms',
        element: <ReactForms />,
        errorElement: <div>Error loading React Forms</div>,
      },
      {
        path: '/remote-app/*',
        element: <RemoteComponentWrapper />,
        errorElement: <div>Error loading Remote App</div>,
      },
      {
        path: '/remote-app-datarouter/*',
        element: <RemoteComponentWrapperDatarouter />,
        errorElement: <div>Error loading Remote App Datarouter</div>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
