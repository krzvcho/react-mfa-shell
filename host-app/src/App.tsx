import { RemoteComponentWrapper } from './components/RemoteComponentWrapper';
import { RemoteComponentWrapperDatarouter } from './components/RemoteComponentWrapperDatarouter';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { fetchIndependentCountries } from './api/restcountries';
import AdminLayout from './layouts/HostAppLayout';
import ReactForms from './pages/ReactForms';
import LoaderWrapper from './pages/RouteLoader/LoaderWrapper';
import StandardTable from './pages/RouteLoader/StandardTable';
import VirtualizedTable from './pages/RouteLoader/VirtualizedTable';

const router = createBrowserRouter([
  {
    element: <AdminLayout />,
    children: [
      { path: '/', element: <span> root </span> },
      {
        path: '/loader',
        element: <LoaderWrapper />,
        children: [
          {
            index: true,
            element: <StandardTable />,
            loader: fetchIndependentCountries,
          },
          {
            path: 'virtualized',
            element: <VirtualizedTable />,
          },
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
