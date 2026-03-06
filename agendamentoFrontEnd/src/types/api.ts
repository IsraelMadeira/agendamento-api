export interface User {
  id: string | number
  nome: string
  email: string
  role?: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface Appointment {
  id: string | number
  clienteId: number
  clienteNome: string
  servico: string
  dataHora: string
  status: 'PENDENTE' | 'CONFIRMADO' | 'CANCELADO' | 'CONCLUIDO'
  observacoes?: string
}

export interface Client {
  id: number
  nome: string
  telefone: string
  email?: string
  observacoes?: string
}

export interface DashboardMetrics {
  totalClientes: number
  agendamentosHoje: number
  confirmadosSemana: number
  taxaComparecimento: number
}
