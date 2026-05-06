import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ThemesPage from './pages/ThemesPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/themes" element={<ThemesPage />} />
      </Routes>
    </BrowserRouter>
  )
}