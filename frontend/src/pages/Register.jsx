import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth'
import { Error, Input, Button } from '../components/UI'

export function Register() {
  const { t } = useTranslation()
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== passwordConfirmation) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    setLoading(true)
    try {
      await register(firstname, lastname, email, password, passwordConfirmation)
      navigate('/home')
    } catch (err) {
      const errorMessage = err.response?.data?.errors 
        ? Object.values(err.response.data.errors).flat().join(', ')
        : err.response?.data?.message || 'Erreur lors de l\'inscription'
      setError(errorMessage)
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
          <h1 className="text-5xl font-bold text-[#1f3b3b] mb-3">{t('auth.register')}</h1>
          <p className="text-lg text-[#4a4a4a]">{t('auth.registerSubtitle')}</p>
        </div>

        {error && <Error message={error} />}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <Input
            label={t('auth.firstname')}
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Alice"
            required
          />
          <Input
            label={t('auth.lastname')}
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Martin"
            required
          />
          <Input
            label={t('auth.email')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alice@example.com"
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
          <Input
            label={t('auth.confirmPassword')}
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
            size="lg"
          >
            {loading ? `${t('messages.loading')}` : t('auth.registerButton')}
          </Button>
        </form>

        <div className="mt-10 text-center text-base text-[#4a4a4a]">
          Déjà inscrit ?{' '}
          <Link to="/login" className="font-bold text-[#1f3b3b] hover:text-[#2d5555] hover:underline transition-colors">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  )
}
