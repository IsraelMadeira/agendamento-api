import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { MetricCard } from '../components/ui/MetricCard'
import { dashboardService } from '../services/dashboardService'
import { appointmentService } from '../services/appointmentService'
import type { Appointment, DashboardMetrics } from '../types/api'
import { StatusBadge } from '../components/ui/StatusBadge'
import { EmptyState } from '../components/ui/EmptyState'

export function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [metricsData, appointments] = await Promise.all([
          dashboardService.metrics(),
          appointmentService.list()
        ])
        setMetrics(metricsData)
        const today = dayjs().format('YYYY-MM-DD')
        setTodayAppointments(
          appointments.filter((item) => dayjs(item.dataHora).format('YYYY-MM-DD') === today)
        )
      } catch {
        setMetrics({
          totalClientes: 0,
          agendamentosHoje: 0,
          confirmadosSemana: 0,
          taxaComparecimento: 0
        })
        setTodayAppointments([])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) {
    return <div className="loader" />
  }

  return (
    <div className="page-grid">
      <div className="metrics-grid">
        <MetricCard
          label="Clientes"
          value={String(metrics?.totalClientes ?? 0)}
          helper="Base total de clientes ativos"
        />
        <MetricCard
          label="Hoje"
          value={String(metrics?.agendamentosHoje ?? 0)}
          helper="Agendamentos para o dia atual"
        />
        <MetricCard
          label="Semana"
          value={String(metrics?.confirmadosSemana ?? 0)}
          helper="Confirmados nos ultimos 7 dias"
        />
        <MetricCard
          label="Comparecimento"
          value={`${metrics?.taxaComparecimento ?? 0}%`}
          helper="Taxa media de comparecimento"
        />
      </div>

      <article className="card">
        <header>
          <h3>Agenda de hoje</h3>
        </header>

        {todayAppointments.length === 0 ? (
          <EmptyState
            title="Sem horarios hoje"
            description="Quando novos agendamentos forem criados, eles aparecerao aqui."
          />
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Servico</th>
                  <th>Horario</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {todayAppointments.map((item) => (
                  <tr key={item.id}>
                    <td>{item.clienteNome}</td>
                    <td>{item.servico}</td>
                    <td>{dayjs(item.dataHora).format('HH:mm')}</td>
                    <td>
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>
    </div>
  )
}
