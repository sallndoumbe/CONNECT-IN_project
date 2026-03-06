import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { PostCard } from '../components/PostCard'
import { CommentList } from '../components/CommentList'
import { Loading, Error, Button } from '../components/UI'

export function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadPost = async () => {
    try {
      const response = await api.get(`/posts/${id}`)
      setPost(response.data)
    } catch (err) {
      setError('Erreur lors du chargement du post')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPost()
  }, [id])

  const handlePostDeleted = () => {
    navigate('/home')
  }

  const handlePostUpdated = (updatedPost) => {
    setPost(updatedPost)
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} />
  if (!post) return <Error message="Post non trouvé" />

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <Button
        variant="secondary"
        onClick={() => navigate('/home')}
        className="mb-6"
      >
        ← Retour au fil
      </Button>

      <PostCard
        post={post}
        onDelete={handlePostDeleted}
        onUpdate={handlePostUpdated}
        detailed={true}
      />

      <div className="mt-8">
        <CommentList postId={post.id} />
      </div>
    </div>
  )
}
