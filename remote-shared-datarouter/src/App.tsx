import './App.css';
import {
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Home from './modules/Home/Home.tsx';
import Root from './layout/Root.tsx';

const routesConfig = [
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <Home /> },
    ],
  },
];

const isDev = import.meta.env.DEV;
const router = createBrowserRouter(routesConfig);

const App: React.FC = () => {
  if (isDev) {
    return <RouterProvider router={router} />;
  }
  return (
    <Routes>
      {routesConfig.map((route) => (
        <Route key={route.path} path={route.path} element={route.element}>
          {route.children?.map((child) => (
            <Route
              key={child.path}
              path={child.path === '/' ? '' : child.path.replace(/^\//, '')}
              element={child.element}
              index={child.path === '/'}
            />
          ))}
        </Route>
      ))}
    </Routes>
  );
};

export default App;
