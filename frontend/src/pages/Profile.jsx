import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import api from '../services/api'
import { Error, Success, Input, Button, Card } from '../components/UI'
import ProfilePictureUpload from '../components/ProfilePictureUpload'

export function Profile() {
  const { user, updateUser, logout } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Formulaire de profil
  const [firstname, setFirstname] = useState(user?.firstname || '')
  const [lastname, setLastname] = useState(user?.lastname || '')
  const [email, setEmail] = useState(user?.email || '')

  // Formulaire de changement de mot de passe
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname)
      setLastname(user.lastname)
      setEmail(user.email)
    }
  }, [user])

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await api.put('/users/profile', { firstname, lastname, email })
      updateUser(response.data)
      setSuccess('Profil mis à jour avec succès')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour du profil')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (newPassword !== newPasswordConfirm) {
      setError('Les nouveaux mots de passe ne correspondent pas')
      return
    }

    setLoading(true)

    try {
      await api.put('/users/password', {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirm
      })
      setSuccess('Mot de passe changé avec succès')
      setCurrentPassword('')
      setNewPassword('')
      setNewPasswordConfirm('')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du changement de mot de passe')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm('Es-tu sûr de vouloir supprimer ton compte ? Cette action est irréversible.')) {
      return
    }

    try {
      await api.delete('/users/profile')
      await logout()
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la suppression du compte')
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <div className="mb-8 fade-in">
        <h1 className="text-4xl font-bold text-[#1f3b3b] mb-2 bg-gradient-to-r from-[#1f3b3b] to-[#2d5555] bg-clip-text text-transparent">
          Mon Profil 👤
        </h1>
        <p className="text-[#4a4a4a]">Gère tes informations personnelles</p>
      </div>

      {error && <Error message={error} />}
      {success && <Success message={success} />}

      <div className="space-y-6">
        {/* Photo de profil */}
        <ProfilePictureUpload 
          currentPicture={user?.profile_picture}
          onUpdate={(updatedUser) => updateUser(updatedUser)}
        />

        {/* Informations du profil */}
        <Card>
          <h2 className="mb-4 text-xl font-semibold text-[#1f3b3b]">Informations personnelles</h2>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <Input
              label="Prénom"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <Input
              label="Nom"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              💾 Mettre à jour le profil
            </Button>
          </form>
        </Card>

        {/* Changement de mot de passe */}
        <Card>
          <h2 className="mb-4 text-xl font-semibold text-[#1f3b3b]">Changer le mot de passe</h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <Input
              label="Mot de passe actuel"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <Input
              label="Nouveau mot de passe"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Input
              label="Confirmer le nouveau mot de passe"
              type="password"
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              Changer le mot de passe
            </Button>
          </form>
        </Card>

        {/* Suppression du compte */}
        <Card>
          <h2 className="mb-4 text-xl font-semibold text-red-600">Zone de danger</h2>
          <p className="mb-4 text-sm text-[#4a4a4a]">
            La suppression de ton compte est définitive et irréversible.
          </p>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Supprimer mon compte
          </Button>
        </Card>
      </div>
    </div>
  )
}
