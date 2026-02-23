// User types
export interface User {
  id: number
  email: string
  firstname: string
  lastname: string
  bio?: string
  image?: string
  created_at?: string
}

// Post types
export interface Post {
  id: number
  user_id: number
  content: string
  image?: string
  created_at: string
  updated_at: string
  user?: User
  comments?: Comment[]
  likes?: Like[]
}

// Comment types
export interface Comment {
  id: number
  post_id: number
  user_id: number
  content: string
  created_at: string
  updated_at: string
  user?: User
}

// Like types
export interface Like {
  id: number
  post_id: number
  user_id: number
  created_at: string
}

// Auth response types
export interface AuthResponse {
  message: string
  user: User
  token?: string
}

// API Error type
export interface ApiError {
  message: string
  errors?: Record<string, string[]>
}
