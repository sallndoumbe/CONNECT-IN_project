import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import api from '../services/api'
import { Error, Success, Input, Button } from '../components/UI'

export function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [email, setEmail] = useState(searchParams.get('email') || '')
  const [token, setToken] = useState(searchParams.get('token') || '')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!token) {
      setError('Token de réinitialisation manquant')
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password !== passwordConfirmation) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères')
      return
    }

    setLoading(true)

    try {
      const response = await api.post('/reset-password', {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      })
      setSuccess(response.data.message)
      
      // Rediriger vers la page de connexion après 2 secondes
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err) {
      const errorMessage = err.response?.data?.errors
        ? Object.values(err.response.data.errors).flat().join(', ')
        : err.response?.data?.message || 'Erreur lors de la réinitialisation du mot de passe'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-[#e2d9cf] bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1f3b3b] text-sm font-bold text-[#f6f1e9]">
            CI
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-[#1f3b3b]">
            Nouveau mot de passe
          </h1>
          <p className="mt-2 text-sm text-[#4a4a4a]">
            Entre ton nouveau mot de passe
          </p>
        </div>

        {error && <Error message={error} />}
        {success && (
          <div className="space-y-4">
            <Success message={success} />
            <p className="text-sm text-center text-[#4a4a4a]">
              Redirection vers la page de connexion...
            </p>
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Token de réinitialisation"
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Colle le token reçu"
              required
            />
            <Input
              label="Nouveau mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Au moins 8 caractères"
              required
            />
            <Input
              label="Confirmer le mot de passe"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
            </Button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-[#4a4a4a]">
          <Link to="/login" className="font-medium text-[#1f3b3b] hover:underline">
            ← Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  )
}
