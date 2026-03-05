import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useTranslation } from 'react-i18next'
import NotificationBell from './NotificationBell'
import LanguageSwitcher from './LanguageSwitcher'

export function Header() {
  const { user, logout } = useAuth()
  const { t } = useTranslation()
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

        <nav className="flex items-center gap-6 text-sm font-medium">
          {user && (
            <>
              <Link 
                to="/home" 
                className="text-[#1f3b3b] hover:text-[#2d5555] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#1f3b3b] after:transition-all hover:after:w-full"
              >
                🏠 {t('header.feed')}
              </Link>
              <Link 
                to="/profile" 
                className="text-[#1f3b3b] hover:text-[#2d5555] transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#1f3b3b] after:transition-all hover:after:w-full"
              >
                👤 {t('header.profile')}
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {user ? (
            <>
              <NotificationBell />
              <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-xl bg-gradient-to-r from-[#f6f1e9] to-[#fdfaf5] border border-[#e2d9cf]">
                {user.profile_picture ? (
                  <img
                    src={`${import.meta.env.VITE_API_URL}/storage/${user.profile_picture}`}
                    alt={`${user.firstname} ${user.lastname}`}
                    className="h-8 w-8 rounded-full object-cover shadow-md"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#1f3b3b] to-[#2d5555] flex items-center justify-center text-white text-xs font-bold shadow-md">
                    {user.firstname?.[0]}{user.lastname?.[0]}
                  </div>
                )}
                <span className="text-sm font-semibold text-[#1f3b3b]">
                  {user.firstname} {user.lastname}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-xl bg-gradient-to-r from-[#1f3b3b] to-[#2d5555] px-5 py-2.5 text-xs font-bold text-[#f6f1e9] hover:from-[#0f2f2f] hover:to-[#1f3b3b] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                {t('header.logout')}
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-xl bg-gradient-to-r from-[#1f3b3b] to-[#2d5555] px-5 py-2.5 text-xs font-bold text-[#f6f1e9] hover:from-[#0f2f2f] hover:to-[#1f3b3b] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              {t('header.login')}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
