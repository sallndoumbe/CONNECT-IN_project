import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Error, Input, Button } from '../components/UI'

export function Login() {
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
      <div className="fade-in w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl border border-[#e2d9cf]">
        <div className="mb-8 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#1f3b3b] to-[#2d5555] text-lg font-bold text-[#f6f1e9] shadow-xl mb-4">
            CI
          </div>
          <h1 className="text-3xl font-bold text-[#1f3b3b] mb-2">Connexion</h1>
          <p className="text-sm text-[#4a4a4a]">Content de te revoir ! 👋</p>
        </div>

        {error && <Error message={error} />}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ton@email.com"
            required
          />
          <Input
            label="Mot de passe"
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
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/forgot-password" className="text-sm text-[#1f3b3b] hover:text-[#2d5555] font-medium hover:underline transition-colors">
            Mot de passe oublié ? 🔑
          </Link>
        </div>

        <div className="mt-6 text-center text-sm text-[#4a4a4a]">
          Pas encore de compte ?{' '}
          <Link to="/register" className="font-bold text-[#1f3b3b] hover:text-[#2d5555] hover:underline transition-colors">
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  )
}
