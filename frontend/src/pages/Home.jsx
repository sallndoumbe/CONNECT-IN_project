import { useState, useEffect } from 'react'
import api from '../services/api'
import { CreatePost } from '../components/CreatePost'
import { PostCard } from '../components/PostCard'
import { Loading, Error } from '../components/UI'

export function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadPosts = async () => {
    try {
      const response = await api.get('/posts')
      console.log('Response from /posts:', response.data)
      // Gérer la structure paginée du backend
      const postsData = response.data.data || response.data
      console.log('Posts data:', postsData)
      setPosts(Array.isArray(postsData) ? postsData : [])
    } catch (err) {
      setError('Erreur lors du chargement des posts')
      console.error('Erreur:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts])
  }

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter(post => post.id !== postId))
  }

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post))
  }

  if (loading) return <Loading />

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <div className="mb-8 fade-in">
        <h1 className="text-4xl font-bold text-[#1f3b3b] mb-2 bg-gradient-to-r from-[#1f3b3b] to-[#2d5555] bg-clip-text text-transparent">
          Fil d'actualité ✨
        </h1>
        <p className="text-[#4a4a4a]">Découvre ce que tes amis partagent</p>
      </div>
      
      <CreatePost onPostCreated={handlePostCreated} />

      {error && <Error message={error} />}

      <div className="mt-8 space-y-6">
        {posts.length === 0 ? (
          <div className="fade-in rounded-3xl border-2 border-dashed border-[#e2d9cf] bg-gradient-to-br from-white to-[#fdfaf5] p-12 text-center shadow-lg">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-lg font-semibold text-[#1f3b3b] mb-2">
              Aucun post pour le moment
            </p>
            <p className="text-[#4a4a4a]">
              Sois le premier à publier quelque chose !
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handlePostDeleted}
              onUpdate={handlePostUpdated}
            />
          ))
        )}
      </div>
    </div>
  )
}
