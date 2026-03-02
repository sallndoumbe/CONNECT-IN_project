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
    <header className="sticky top-0 z-50 border-b border-[#e2d9cf] bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f3b3b] to-[#2d5555] text-sm font-bold text-[#f6f1e9] shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
            CI
          </div>
          <span className="hidden font-bold text-xl text-[#1f3b3b] sm:inline group-hover:text-[#2d5555] transition-colors">
            Connect'In
          </span>
        </Link>

        <nav className="flex items-center gap-8 text-sm font-medium">
          {user && (
            <>
              <Link 
                to="/home" 
                className="text-[#1f3b3b] hover:text-[#2d5555] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#1f3b3b] after:transition-all hover:after:w-full"
              >
                🏠 Fil
              </Link>
              <Link 
                to="/profile" 
                className="text-[#1f3b3b] hover:text-[#2d5555] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#1f3b3b] after:transition-all hover:after:w-full"
              >
                👤 Profil
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-[#f6f1e9] to-[#fdfaf5] border border-[#e2d9cf]">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#1f3b3b] to-[#2d5555] flex items-center justify-center text-white text-xs font-bold shadow-md">
                  {user.firstname?.[0]}{user.lastname?.[0]}
                </div>
                <span className="text-sm font-semibold text-[#1f3b3b]">
                  {user.firstname} {user.lastname}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-xl bg-gradient-to-r from-[#1f3b3b] to-[#2d5555] px-5 py-2.5 text-xs font-bold text-[#f6f1e9] hover:from-[#0f2f2f] hover:to-[#1f3b3b] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Déconnecter
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-xl bg-gradient-to-r from-[#1f3b3b] to-[#2d5555] px-5 py-2.5 text-xs font-bold text-[#f6f1e9] hover:from-[#0f2f2f] hover:to-[#1f3b3b] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Connexion
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
