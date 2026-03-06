import { FormEvent, useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import type { Appointment, Client } from '../types/api'
import { appointmentService } from '../services/appointmentService'
import { clientService } from '../services/clientService'
import { StatusBadge } from '../components/ui/StatusBadge'
import { EmptyState } from '../components/ui/EmptyState'

export function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [clienteId, setClienteId] = useState('')
  const [servico, setServico] = useState('')
  const [dataHora, setDataHora] = useState('')
  const [observacoes, setObservacoes] = useState('')

  const sorted = useMemo(
    () => [...appointments].sort((a, b) => dayjs(a.dataHora).unix() - dayjs(b.dataHora).unix()),
    [appointments]
  )

  async function loadPage() {
    try {
      setLoading(true)
      const [listAppointments, listClients] = await Promise.all([
        appointmentService.list(),
        clientService.list()
      ])
      setAppointments(listAppointments)
      setClients(listClients)
    } catch {
      setError('Nao foi possivel carregar os dados de agendamentos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPage()
  }, [])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)

    if (!clienteId || !servico || !dataHora) {
      setError('Preencha cliente, servico e data/hora para salvar.')
      return
    }

    try {
      setSubmitting(true)
      await appointmentService.create({
        clienteId: Number(clienteId),
        servico,
        dataHora: new Date(dataHora).toISOString(),
        observacoes: observacoes || undefined
      })
      setServico('')
      setDataHora('')
      setObservacoes('')
      await loadPage()
    } catch {
      setError('Erro ao criar agendamento. Confirme os dados e tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleStatusChange(id: number, status: Appointment['status']) {
    try {
      await appointmentService.updateStatus(id, status)
      await loadPage()
    } catch {
      setError('Nao foi possivel alterar o status deste agendamento.')
    }
  }

  return (
    <div className="page-grid">
      <article className="card">
        <header>
          <h3>Novo agendamento</h3>
        </header>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label htmlFor="cliente">Cliente</label>
          <select id="cliente" value={clienteId} onChange={(event) => setClienteId(event.target.value)}>
            <option value="">Selecione</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.nome}
              </option>
            ))}
          </select>

          <label htmlFor="servico">Servico</label>
          <input
            id="servico"
            type="text"
            value={servico}
            onChange={(event) => setServico(event.target.value)}
            placeholder="Ex.: Corte + Escova"
          />

          <label htmlFor="dataHora">Data e hora</label>
          <input
            id="dataHora"
            type="datetime-local"
            value={dataHora}
            onChange={(event) => setDataHora(event.target.value)}
          />

          <label htmlFor="obs">Observacoes</label>
          <textarea
            id="obs"
            rows={3}
            value={observacoes}
            onChange={(event) => setObservacoes(event.target.value)}
            placeholder="Opcional"
          />

          {error ? <div className="alert-error">{error}</div> : null}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Salvando...' : 'Salvar agendamento'}
          </button>
        </form>
      </article>

      <article className="card">
        <header>
          <h3>Agenda completa</h3>
        </header>

        {loading ? (
          <div className="loader" />
        ) : sorted.length === 0 ? (
          <EmptyState
            title="Nenhum agendamento registrado"
            description="Use o formulario para cadastrar o primeiro horario."
          />
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Servico</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Acoes</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((item) => (
                  <tr key={item.id}>
                    <td>{item.clienteNome}</td>
                    <td>{item.servico}</td>
                    <td>{dayjs(item.dataHora).format('DD/MM/YYYY HH:mm')}</td>
                    <td>
                      <StatusBadge status={item.status} />
                    </td>
                    <td>
                      <div className="actions-inline">
                        <button type="button" onClick={() => handleStatusChange(item.id, 'CONFIRMADO')}>
                          Confirmar
                        </button>
                        <button type="button" onClick={() => handleStatusChange(item.id, 'CONCLUIDO')}>
                          Concluir
                        </button>
                        <button type="button" onClick={() => handleStatusChange(item.id, 'CANCELADO')}>
                          Cancelar
                        </button>
                      </div>
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
