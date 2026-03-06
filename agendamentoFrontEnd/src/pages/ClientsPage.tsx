import { FormEvent, useEffect, useState } from 'react'
import { clientService } from '../services/clientService'
import type { Client } from '../types/api'
import { EmptyState } from '../components/ui/EmptyState'

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [observacoes, setObservacoes] = useState('')

  async function loadClients() {
    try {
      setLoading(true)
      const data = await clientService.list()
      setClients(data)
    } catch {
      setError('Nao foi possivel carregar os clientes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClients()
  }, [])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)

    if (!nome || !telefone) {
      setError('Nome e telefone sao obrigatorios.')
      return
    }

    try {
      setSubmitting(true)
      await clientService.create({ nome, telefone, email: email || undefined, observacoes: observacoes || undefined })
      setNome('')
      setTelefone('')
      setEmail('')
      setObservacoes('')
      await loadClients()
    } catch {
      setError('Erro ao cadastrar cliente. Tente novamente em instantes.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page-grid">
      <article className="card">
        <header>
          <h3>Novo cliente</h3>
        </header>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome</label>
          <input id="nome" value={nome} onChange={(event) => setNome(event.target.value)} />

          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
            placeholder="(00) 00000-0000"
          />

          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />

          <label htmlFor="obs">Observacoes</label>
          <textarea id="obs" rows={3} value={observacoes} onChange={(event) => setObservacoes(event.target.value)} />

          {error ? <div className="alert-error">{error}</div> : null}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Salvando...' : 'Cadastrar cliente'}
          </button>
        </form>
      </article>

      <article className="card">
        <header>
          <h3>Lista de clientes</h3>
        </header>

        {loading ? (
          <div className="loader" />
        ) : clients.length === 0 ? (
          <EmptyState
            title="Nenhum cliente encontrado"
            description="Adicione clientes para facilitar novos agendamentos."
          />
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Email</th>
                  <th>Observacoes</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.nome}</td>
                    <td>{client.telefone}</td>
                    <td>{client.email ?? '-'}</td>
                    <td>{client.observacoes ?? '-'}</td>
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
