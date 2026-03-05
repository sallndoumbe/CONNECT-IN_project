import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth'
import { Error, Input, Button } from '../components/UI'

export function Login() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/home')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12 bg-gradient-to-br from-[#f6f1e9] via-[#fdfaf5] to-[#f6f1e9]">
      <div className="fade-in w-full max-w-2xl rounded-3xl bg-white p-16 shadow-2xl border border-[#e2d9cf]">
        <div className="mb-12 text-center">
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-[#1f3b3b] to-[#2d5555] text-3xl font-bold text-[#f6f1e9] shadow-xl mb-6">
            CI
          </div>
          <h1 className="text-5xl font-bold text-[#1f3b3b] mb-3">{t('auth.login')}</h1>
          <p className="text-lg text-[#4a4a4a]">{t('auth.loginSubtitle')}</p>
        </div>

        {error && <Error message={error} />}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <Input
            label={t('auth.email')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
          />
          <Input
            label={t('auth.password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? `${t('messages.loading')}` : t('auth.loginButton')}
          </Button>
        </form>

        <div className="mt-8 text-center text-base text-[#4a4a4a]">
          {t('auth.noAccount')}{' '}
          <Link to="/register" className="font-bold text-[#1f3b3b] hover:text-[#2d5555] hover:underline transition-colors">
            {t('auth.registerLink')}
          </Link>
        </div>
      </div>
    </div>
  )
}
