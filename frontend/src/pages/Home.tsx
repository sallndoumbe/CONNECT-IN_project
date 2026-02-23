import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiService from '../services/api'
import type { Post } from '../types/api'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const data = await apiService.getPosts()
      setPosts(data.data)
    } catch (err: any) {
      setError('Erreur lors du chargement des posts')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Connect'In</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/profile')}
              className="text-gray-600 hover:text-gray-900"
            >
              Profil
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('token')
                navigate('/login')
              }}
              className="text-gray-600 hover:text-gray-900"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto py-8 px-4">
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun post pour le moment</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center mb-4">
                  <div>
                    <h3 className="font-semibold">
                      {post.user?.firstname} {post.user?.lastname}
                    </h3>
                    <p className="text-sm text-gray-500">{post.created_at}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{post.content}</p>
                {post.image && (
                  <img src={post.image} alt="post" className="w-full rounded mb-4" />
                )}
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>{post.likes?.length || 0} likes</span>
                  <span>{post.comments?.length || 0} commentaires</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
