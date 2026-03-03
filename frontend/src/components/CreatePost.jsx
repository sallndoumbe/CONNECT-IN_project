import { useState } from 'react'
import api from '../services/api'
import { Card, Textarea, Button, Error } from './UI'

export function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/posts', { content })
      onPostCreated(response.data)
      setContent('')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création du post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-white to-[#fdfaf5] border-2">
      <h2 className="mb-4 text-xl font-bold text-[#1f3b3b] flex items-center gap-2">
        ✍️ Créer un post
      </h2>
      {error && <Error message={error} />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Quoi de neuf ? Partage quelque chose... ✨"
          rows={3}
          required
        />
        <Button type="submit" disabled={loading || !content.trim()} className="w-full">
          {loading ? '📤 Publication...' : '🚀 Publier'}
        </Button>
      </form>
    </Card>
  )
}
