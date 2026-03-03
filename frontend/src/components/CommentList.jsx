import { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import api from '../services/api'
import { Card, Textarea, Button, Loading, Error } from './UI'

export function CommentList({ postId }) {
  const { user } = useAuth()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editContent, setEditContent] = useState('')

  const loadComments = async () => {
    try {
      const response = await api.get(`/posts/${postId}/comments`)
      setComments(response.data)
    } catch (err) {
      setError('Erreur lors du chargement des commentaires')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadComments()
  }, [postId])

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await api.post(`/posts/${postId}/comments`, { content: newComment })
      setComments([...comments, response.data])
      setNewComment('')
    } catch (err) {
      setError('Erreur lors de l\'ajout du commentaire')
    } finally {
      setSubmitting(false)
    }
  }

  const handleEditComment = async (commentId) => {
    try {
      const response = await api.put(`/comments/${commentId}`, { content: editContent })
      setComments(comments.map(c => c.id === commentId ? response.data : c))
      setEditingId(null)
      setEditContent('')
    } catch (err) {
      setError('Erreur lors de la modification du commentaire')
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Supprimer ce commentaire ?')) return

    try {
      await api.delete(`/comments/${commentId}`)
      setComments(comments.filter(c => c.id !== commentId))
    } catch (err) {
      setError('Erreur lors de la suppression du commentaire')
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'À l\'instant'
    if (diffMins < 60) return `Il y a ${diffMins} min`
    if (diffHours < 24) return `Il y a ${diffHours}h`
    if (diffDays < 7) return `Il y a ${diffDays}j`
    return date.toLocaleDateString('fr-FR')
  }

  if (loading) return <Loading />

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-[#1f3b3b]">
        Commentaires ({comments.length})
      </h2>

      {error && <Error message={error} />}

      {/* Formulaire d'ajout de commentaire */}
      <Card>
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            rows={2}
            required
          />
          <Button type="submit" disabled={submitting || !newComment.trim()}>
            {submitting ? 'Envoi...' : 'Commenter'}
          </Button>
        </form>
      </Card>

      {/* Liste des commentaires */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <Card>
            <p className="text-center text-[#4a4a4a]">
              Aucun commentaire pour le moment. Sois le premier à commenter !
            </p>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-[#1f3b3b]">
                      {comment.user ? `${comment.user.firstname} ${comment.user.lastname}` : 'Utilisateur'}
                    </h4>
                    <p className="text-xs text-[#4a4a4a]">{formatDate(comment.created_at)}</p>
                  </div>
                  {user?.id === comment.user_id && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(comment.id)
                          setEditContent(comment.content)
                        }}
                        className="text-sm text-[#1f3b3b] hover:underline"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  )}
                </div>

                {editingId === comment.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <Button onClick={() => handleEditComment(comment.id)}>
                        Enregistrer
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setEditingId(null)
                          setEditContent('')
                        }}
                      >
                        Annuler
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#1f3b3b]">{comment.content}</p>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
