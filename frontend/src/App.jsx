import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { Header } from './components/Header'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { ForgotPassword } from './pages/ForgotPassword'
import { ResetPassword } from './pages/ResetPassword'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { PostDetail } from './pages/PostDetail'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-[#1f3b3b]">Chargement...</div>
      </div>
    )
  }
  
  return user ? children : <Navigate to="/login" />
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-[#1f3b3b]">Chargement...</div>
      </div>
    )
  }
  
  return user ? <Navigate to="/home" /> : children
}

function App() {
  return (
    <div className="min-h-screen bg-[#f6f1e9]">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Header />
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Header />
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <ProtectedRoute>
              <Header />
              <PostDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
