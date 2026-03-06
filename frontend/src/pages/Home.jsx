import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../services/api'
import { CreatePost } from '../components/CreatePost'
import { PostCard } from '../components/PostCard'
import { Loading, Error } from '../components/UI'
import SearchAndFilters from '../components/SearchAndFilters'

export function Home() {
  const { t } = useTranslation()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({})

  const loadPosts = async (filterParams = {}) => {
    setLoading(true)
    try {
      const response = await api.get('/posts', { params: filterParams })
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
    loadPosts(filters)
  }, [filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts])
  }

  const handlePostDeleted = (postId) => {
    setPosts(posts.filter(post => post.id !== postId))
  }

  const handlePostUpdated = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f1e9] to-[#fdfaf5]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-32 fade-in">
          <h1 className="text-5xl font-bold text-[#1f3b3b] mb-8 bg-gradient-to-r from-[#1f3b3b] to-[#2d5555] bg-clip-text text-transparent">
            {t('home.title')}
          </h1>
          <p className="text-lg text-[#4a4a4a]">{t('home.subtitle')}</p>
        </div>
        
        <div className="mb-20">
          <CreatePost onPostCreated={handlePostCreated} />
        </div>

        <div className="mb-16">
          <SearchAndFilters 
            onSearch={(term) => console.log('Search:', term)} 
            onFilter={handleFilterChange}
          />
        </div>

        {error && <Error message={error} />}

        {loading ? (
          <Loading />
        ) : (
          <div className="mt-16 space-y-8">
            {posts.length === 0 ? (
              <div className="fade-in rounded-3xl border-2 border-dashed border-[#e2d9cf] bg-gradient-to-br from-white to-[#fdfaf5] p-16 text-center shadow-lg">
                <div className="text-7xl mb-6">📝</div>
                <p className="text-2xl font-semibold text-[#1f3b3b] mb-3">
                  {t('home.noPost')}
                </p>
                <p className="text-lg text-[#4a4a4a]">
                  {t('home.beFirst')}
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
        )}
      </div>
    </div>
  )
}
