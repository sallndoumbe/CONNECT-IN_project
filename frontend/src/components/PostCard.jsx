import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import api from '../services/api'
import { Card, Button, Textarea } from './UI'

export function PostCard({ post, onDelete, onUpdate, detailed = false }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(post.content)
  const [liked, setLiked] = useState(post.user_has_liked)
  const [likesCount, setLikesCount] = useState(post.likes_count || 0)
  const [loading, setLoading] = useState(false)

  const isOwner = user?.id === post.user_id

  const handleLike = async () => {
    try {
      if (liked) {
        await api.delete(`/posts/${post.id}/like`)
        setLiked(false)
        setLikesCount(likesCount - 1)
      } else {
        await api.post(`/posts/${post.id}/like`)
        setLiked(true)
        setLikesCount(likesCount + 1)
      }
    } catch (err) {
      console.error('Erreur lors du like:', err)
    }
  }

  const handleUpdate = async () => {
    setLoading(true)
    try {
      const response = await api.put(`/posts/${post.id}`, { content: editContent })
      onUpdate(response.data)
      setIsEditing(false)
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Supprimer ce post ?')) return

    try {
      await api.delete(`/posts/${post.id}`)
      onDelete(post.id)
    } catch (err) {
      console.error('Erreur lors de la suppression:', err)
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

  return (
    <Card className="hover-lift p-6">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {post.user?.profile_picture ? (
              <img
                src={`${import.meta.env.VITE_API_URL}/storage/${post.user.profile_picture}`}
                alt={`${post.user.firstname} ${post.user.lastname}`}
                className="h-14 w-14 rounded-full object-cover shadow-md"
              />
            ) : (
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#1f3b3b] to-[#2d5555] flex items-center justify-center text-white font-bold shadow-md text-lg">
                {post.user ? `${post.user.firstname?.[0]}${post.user.lastname?.[0]}` : '?'}
              </div>
            )}
            <div>
              <h3 className="font-bold text-lg text-[#1f3b3b]">
                {post.user ? `${post.user.firstname} ${post.user.lastname}` : 'Utilisateur'}
              </h3>
              <p className="text-sm text-[#4a4a4a]">📅 {formatDate(post.created_at)}</p>
            </div>
          </div>
          {isOwner && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 text-sm font-medium text-[#1f3b3b] hover:bg-[#f6f1e9] rounded-lg transition-colors"
              >
                {isEditing ? '❌ Annuler' : '✏️ Modifier'}
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                🗑️ Supprimer
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        {isEditing ? (
          <div className="space-y-4 p-5 rounded-xl bg-[#f6f1e9]">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={4}
              className="text-base"
            />
            <Button onClick={handleUpdate} disabled={loading}>
              💾 Enregistrer
            </Button>
          </div>
        ) : (
          <>
            <p className="whitespace-pre-wrap text-lg text-[#1f3b3b] leading-relaxed">{post.content}</p>
            
            {/* Image */}
            {post.image && (
              <div className="mt-5 rounded-xl overflow-hidden border-2 border-[#e2d9cf] shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="w-full h-auto max-h-96 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
          </>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4 border-t border-[#e2d9cf] pt-5">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-medium transition-all duration-300 ${
              liked 
                ? 'bg-red-50 text-red-600 shadow-sm' 
                : 'text-[#4a4a4a] hover:bg-[#f6f1e9] hover:text-red-600'
            }`}
          >
            <span className="text-lg">{liked ? '❤️' : '🤍'}</span>
            <span>{likesCount}</span>
          </button>

          {!detailed && (
            <Link
              to={`/posts/${post.id}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-medium text-[#4a4a4a] hover:bg-[#f6f1e9] hover:text-[#1f3b3b] transition-all duration-300"
            >
              <span className="text-lg">💬</span>
              <span>{post.comments_count || 0}</span>
            </Link>
          )}
        </div>
      </div>
    </Card>
  )
}
