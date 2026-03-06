import { http } from '../lib/http'
import type { Client } from '../types/api'

interface ClientPayload {
  nome: string
  telefone: string
  email?: string
  observacoes?: string
}

export const clientService = {
  async list(): Promise<Client[]> {
    const { data } = await http.get<Client[]>('/clientes')
    return data
  },

  async create(payload: ClientPayload): Promise<Client> {
    const { data } = await http.post<Client>('/clientes', payload)
    return data
  }
}
