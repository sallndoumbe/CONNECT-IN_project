import { useState } from 'react'
import api from '../services/api'
import { Card, Textarea, Button, Error } from './UI'

export function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // Vérifier le type et la taille
      if (!file.type.startsWith('image/')) {
        setError('Veuillez sélectionner une image valide')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('L\'image ne doit pas dépasser 5MB')
        return
      }
      setImage(file)
      setError('')
      
      // Créer un aperçu
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const clearImage = () => {
    setImage(null)
    setImagePreview('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('content', content)
      if (image) {
        formData.append('image', image)
      }

      const response = await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      onPostCreated(response.data)
      setContent('')
      clearImage()
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création du post')
      console.error('Erreur:', err)
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
        
        {/* Image Preview */}
        {imagePreview && (
          <div className="relative rounded-lg overflow-hidden border-2 border-[#e2d9cf]">
            <img src={imagePreview} alt="Preview" className="w-full h-auto max-h-64 object-cover" />
            <button
              type="button"
              onClick={clearImage}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
            >
              ✕
            </button>
          </div>
        )}

        {/* File Input */}
        <label className="flex items-center gap-3 cursor-pointer px-4 py-3 rounded-lg border-2 border-dashed border-[#e2d9cf] hover:border-[#1f3b3b] hover:bg-[#fdfaf5] transition text-[#4a4a4a] font-medium">
          <span className="text-xl">📷</span>
          <span>{image ? 'Changer l\'image' : 'Ajouter une image'}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <Button 
          type="submit" 
          disabled={loading || !content.trim()} 
          className="w-full"
        >
          {loading ? '📤 Publication...' : '🚀 Publier'}
        </Button>
      </form>
    </Card>
  )
}
