import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Error } from '../components/UI'

export function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== passwordConfirm) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    setLoading(true)
    try {
      await register(name, email, password, passwordConfirm)
      navigate('/home')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de l\'inscription')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-shell min-h-screen">
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="glass-card w-full max-w-md rounded-3xl p-8">
          <div className="mb-8 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1f3b3b] text-sm font-bold text-[#f6f1e9]">
              CI
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-[#1f3b3b]">Inscription</h1>
            <p className="mt-2 text-sm text-[#4a4a4a]">Rejoins Connect In aujourd hui</p>
          </div>

          {error && <Error message={error} />}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1f3b3b]">Nom</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#e2d9cf] bg-white px-4 py-2 text-sm focus:border-[#1f3b3b] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1f3b3b]">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#e2d9cf] bg-white px-4 py-2 text-sm focus:border-[#1f3b3b] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1f3b3b]">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#e2d9cf] bg-white px-4 py-2 text-sm focus:border-[#1f3b3b] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1f3b3b]">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[#e2d9cf] bg-white px-4 py-2 text-sm focus:border-[#1f3b3b] focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#1f3b3b] py-2 text-sm font-semibold text-[#f6f1e9] hover:bg-[#0f2f2f] disabled:opacity-50"
            >
              {loading ? 'Inscription en cours...' : 'S\'inscrire'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#4a4a4a]">
            Deja inscrit?{' '}
            <Link to="/login" className="font-semibold text-[#1f3b3b] hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
