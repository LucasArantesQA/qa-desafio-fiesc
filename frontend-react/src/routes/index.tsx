import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AdminPage from '../pages/AdminPage';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}
