import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ThemesPage from './pages/ThemesPage'
import Registerpage from './pages/Registerpage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/themes" element={<ThemesPage />} />
        <Route path="/register" element={<Registerpage />} />
      </Routes>
    </BrowserRouter>
  )
}