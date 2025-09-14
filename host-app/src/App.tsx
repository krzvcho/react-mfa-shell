import { RemoteComponentWrapper } from './components/RemoteComponentWrapper';
import AdminLayout from './layouts/HostAppLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<span> root </span>} />
          <Route path="/settings" element={<span>settings</span>} />
          <Route path="/remote-app" element={<RemoteComponentWrapper />} />
        </Routes>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default App;
