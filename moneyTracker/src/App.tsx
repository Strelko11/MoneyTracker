import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Overview from './pages/Overview'
import Investments from './pages/Investments'
import Expenses from './pages/Expenses'
import { useAuthStore } from './store/authStore'

function App() {
  const { session, isLoading } = useAuthStore()

  if (isLoading) {
    return null
  }

  if (!session) {
    return <Login />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/overview" element={<Overview />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="*" element={<Navigate to="/overview" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App