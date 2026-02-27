import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#e2d9cf] bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1f3b3b] text-sm font-bold text-[#f6f1e9]">
            CI
          </div>
          <span className="hidden font-semibold text-[#1f3b3b] sm:inline">Connect'In</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          {user && (
            <>
              <Link to="/home" className="text-[#1f3b3b] hover:underline">
                Fil
              </Link>
              <Link to="/profile" className="text-[#1f3b3b] hover:underline">
                Profil
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden text-sm text-[#4a4a4a] sm:inline">{user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-full bg-[#1f3b3b] px-4 py-2 text-xs font-semibold text-[#f6f1e9] hover:bg-[#0f2f2f]"
              >
                Deconnecter
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-[#1f3b3b] px-4 py-2 text-xs font-semibold text-[#f6f1e9] hover:bg-[#0f2f2f]"
            >
              Connexion
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
