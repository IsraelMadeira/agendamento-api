import type { Appointment } from '../../types/api'

interface StatusBadgeProps {
  status: Appointment['status']
}

const labels: Record<Appointment['status'], string> = {
  PENDENTE: 'Pendente',
  CONFIRMADO: 'Confirmado',
  CANCELADO: 'Cancelado',
  CONCLUIDO: 'Concluido'
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`status-badge ${status.toLowerCase()}`}>{labels[status]}</span>
}
