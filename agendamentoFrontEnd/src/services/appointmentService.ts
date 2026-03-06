import { http } from '../lib/http'
import type { Appointment } from '../types/api'

interface AppointmentPayload {
  clienteId: number
  servico: string
  dataHora: string
  observacoes?: string
}

export const appointmentService = {
  async list(): Promise<Appointment[]> {
    const { data } = await http.get<Appointment[]>('/agendamentos')
    return data
  },

  async create(payload: AppointmentPayload): Promise<Appointment> {
    const { data } = await http.post<Appointment>('/agendamentos', payload)
    return data
  },

  async updateStatus(id: number, status: Appointment['status']): Promise<Appointment> {
    const { data } = await http.patch<Appointment>(`/agendamentos/${id}/status`, { status })
    return data
  }
}
