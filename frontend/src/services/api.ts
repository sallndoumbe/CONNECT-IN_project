import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { User, Post, Comment, AuthResponse } from '../types/api'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

class ApiService {
  private axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Add token to requests
    this.axiosInstance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
  }

  // Auth endpoints
  async register(email: string, firstname: string, lastname: string, password: string, passwordConfirmation: string) {
    const response = await this.axiosInstance.post<AuthResponse>('/register', {
      email,
      firstname,
      lastname,
      password,
      password_confirmation: passwordConfirmation,
    })
    return response.data
  }

  async login(email: string, password: string) {
    const response = await this.axiosInstance.post<AuthResponse>('/login', { email, password })
    return response.data
  }

  async logout() {
    const response = await this.axiosInstance.post('/logout')
    return response.data
  }

  // User endpoints
  async getProfile() {
    const response = await this.axiosInstance.get<User>('/users/profile')
    return response.data
  }

  async updateProfile(data: Partial<User>) {
    const response = await this.axiosInstance.put<AuthResponse>('/users/profile', data)
    return response.data
  }

  async changePassword(currentPassword: string, newPassword: string, newPasswordConfirmation: string) {
    const response = await this.axiosInstance.put('/users/password', {
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: newPasswordConfirmation,
    })
    return response.data
  }

  async deleteAccount(keepContent: boolean = false) {
    const response = await this.axiosInstance.delete('/users/profile', {
      data: { keep_content: keepContent },
    })
    return response.data
  }

  // Post endpoints
  async getPosts(perPage: number = 10) {
    const response = await this.axiosInstance.get<{ data: Post[] }>('/posts', {
      params: { per_page: perPage },
    })
    return response.data
  }

  async getPost(id: number) {
    const response = await this.axiosInstance.get<Post>(`/posts/${id}`)
    return response.data
  }

  async createPost(content: string, image?: string) {
    const response = await this.axiosInstance.post<{ message: string; post: Post }>('/posts', {
      content,
      image,
    })
    return response.data
  }

  async updatePost(id: number, content: string, image?: string) {
    const response = await this.axiosInstance.put<{ message: string; post: Post }>(`/posts/${id}`, {
      content,
      image,
    })
    return response.data
  }

  async deletePost(id: number) {
    const response = await this.axiosInstance.delete(`/posts/${id}`)
    return response.data
  }

  // Comment endpoints
  async getComments(postId: number) {
    const response = await this.axiosInstance.get<{ data: Comment[] }>(`/posts/${postId}/comments`)
    return response.data
  }

  async createComment(postId: number, content: string) {
    const response = await this.axiosInstance.post<{ message: string; comment: Comment }>(`/posts/${postId}/comments`, {
      content,
    })
    return response.data
  }

  async updateComment(id: number, content: string) {
    const response = await this.axiosInstance.put<{ message: string; comment: Comment }>(`/comments/${id}`, {
      content,
    })
    return response.data
  }

  async deleteComment(id: number) {
    const response = await this.axiosInstance.delete(`/comments/${id}`)
    return response.data
  }

  // Like endpoints
  async likePost(postId: number) {
    const response = await this.axiosInstance.post(`/posts/${postId}/like`)
    return response.data
  }

  async unlikePost(postId: number) {
    const response = await this.axiosInstance.delete(`/posts/${postId}/like`)
    return response.data
  }
}

export default new ApiService()
