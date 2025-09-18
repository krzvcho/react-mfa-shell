import './App.css';
// import { Card, CardContent } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import BookList from './modules/Books/BookList';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import Header from './layout/Header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './modules/Home/Home.tsx';
import BookGrid from './modules/Books/BootGrid.tsx';
import Blood from './modules/BloodPressure/Blood.tsx';
import FormActions from './modules/FormActions/FormActions.tsx';
import Root from './layout/Root.tsx';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/books', element: <BookGrid /> },
        { path: '/blood', element: <Blood /> },
        { path: '/formactions', element: <FormActions /> },
      ],
    },
  ],
);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
