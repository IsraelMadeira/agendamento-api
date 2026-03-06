import axios from 'axios'
import { http } from '../lib/http'
import type { AuthResponse, User } from '../types/api'

interface LoginPayload {
  email: string
  senha: string
}

interface RegisterPayload {
  nome: string
  email: string
  senha: string
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    try {
      const { data } = await http.post<AuthResponse>('/auth/login', payload)
      return data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error('A API atual nao possui endpoint de login em /auth/login.')
      }

      throw new Error(readApiErrorMessage(error, 'Falha ao autenticar.'))
    }
  },

  async register(payload: RegisterPayload): Promise<void> {
    try {
      await http.post('/auth/register', payload)
      return
    } catch (error) {
      if (!axios.isAxiosError(error) || error.response?.status !== 404) {
        throw new Error(readApiErrorMessage(error, 'Nao foi possivel criar sua conta.'))
      }
    }

    try {
      await http.post('/usuarios', payload)
    } catch (error) {
      throw new Error(readApiErrorMessage(error, 'Nao foi possivel criar sua conta.'))
    }
  },

  async me(): Promise<User> {
    const { data } = await http.get<User>('/users/me')
    return data
  }
}

function readApiErrorMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error)) {
    return fallback
  }

  const responseData = error.response?.data as { message?: string; error?: string } | undefined
  const apiMessage = responseData?.message ?? responseData?.error
  if (apiMessage) {
    return apiMessage
  }

  if (error.code === 'ECONNABORTED') {
    return 'A requisicao expirou. Verifique se a API esta ativa.'
  }

  if (error.message === 'Network Error') {
    return 'Nao foi possivel conectar na API. Verifique a URL e CORS do backend.'
  }

  return fallback
}
