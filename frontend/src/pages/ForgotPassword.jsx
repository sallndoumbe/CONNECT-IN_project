import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { Error, Success, Input, Button } from '../components/UI'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [resetToken, setResetToken] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await api.post('/forgot-password', { email })
      setSuccess(response.data.message)
      
      // En développement, afficher le token
      if (response.data.token) {
        setResetToken(response.data.token)
        console.log('Token de réinitialisation:', response.data.token)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la demande de réinitialisation')
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
          <h1 className="mt-4 text-2xl font-semibold text-[#1f3b3b]">Mot de passe oublié</h1>
          <p className="mt-2 text-sm text-[#4a4a4a]">
            Entre ton email pour réinitialiser ton mot de passe
          </p>
        </div>

        {error && <Error message={error} />}
        {success && (
          <div className="space-y-4">
            <Success message={success} />
            {resetToken && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <p className="text-sm font-semibold text-blue-800 mb-2">
                  Mode développement - Token de réinitialisation :
                </p>
                <p className="text-xs font-mono break-all text-blue-700 bg-white p-2 rounded">
                  {resetToken}
                </p>
                <Link
                  to={`/reset-password?token=${resetToken}&email=${email}`}
                  className="mt-3 inline-block text-sm text-blue-600 hover:underline"
                >
                  → Cliquer ici pour réinitialiser maintenant
                </Link>
              </div>
            )}
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton@email.com"
              required
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Envoi...' : 'Envoyer le lien de réinitialisation'}
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
