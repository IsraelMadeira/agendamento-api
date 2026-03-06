import { FormEvent, useEffect, useState } from 'react'
import { clientService } from '../services/clientService'
import type { Client } from '../types/api'
import { EmptyState } from '../components/ui/EmptyState'

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
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

    if (telefone.length !== 11) {
      setError('Telefone deve conter exatamente 11 numeros, incluindo DDD.')
      return
    }

    try {
      setSubmitting(true)
      const payload = { nome, telefone, email: email || undefined, observacoes: observacoes || undefined }

      if (editingId) {
        await clientService.update(editingId, payload)
      } else {
        await clientService.create(payload)
      }

      resetForm()
      await loadClients()
    } catch {
      setError('Erro ao salvar cliente. Tente novamente em instantes.')
    } finally {
      setSubmitting(false)
    }
  }

  function handleEdit(client: Client) {
    setEditingId(client.id)
    setNome(client.nome)
    setTelefone(client.telefone)
    setEmail(client.email ?? '')
    setObservacoes(client.observacoes ?? '')
    setError(null)
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm('Deseja realmente excluir este cliente?')
    if (!confirmed) {
      return
    }

    try {
      await clientService.delete(id)
      if (editingId === id) {
        resetForm()
      }
      await loadClients()
    } catch {
      setError('Nao foi possivel excluir o cliente.')
    }
  }

  function resetForm() {
    setEditingId(null)
    setNome('')
    setTelefone('')
    setEmail('')
    setObservacoes('')
  }

  return (
    <div className="page-grid">
      <article className="card">
        <header>
          <h3>{editingId ? 'Editar cliente' : 'Novo cliente'}</h3>
        </header>
        <form className="form-grid" onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome</label>
          <input id="nome" value={nome} onChange={(event) => setNome(event.target.value)} />

          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            value={telefone}
            onChange={(event) => setTelefone(event.target.value.replace(/\D/g, '').slice(0, 11))}
            placeholder="11999999999"
            maxLength={11}
            inputMode="numeric"
            pattern="[0-9]{11}"
          />

          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />

          <label htmlFor="obs">Observacoes</label>
          <textarea id="obs" rows={3} value={observacoes} onChange={(event) => setObservacoes(event.target.value)} />

          {error ? <div className="alert-error">{error}</div> : null}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Salvando...' : editingId ? 'Atualizar cliente' : 'Cadastrar cliente'}
          </button>

          {editingId ? (
            <button type="button" className="ghost-button" onClick={resetForm}>
              Cancelar edicao
            </button>
          ) : null}
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
                  <th>Acoes</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.nome}</td>
                    <td>{formatPhone(client.telefone)}</td>
                    <td>{client.email ?? '-'}</td>
                    <td>{client.observacoes ?? '-'}</td>
                    <td>
                      <div className="actions-inline">
                        <button type="button" className="ghost-button" onClick={() => handleEdit(client)}>
                          Editar
                        </button>
                        <button type="button" className="danger-button" onClick={() => handleDelete(client.id)}>
                          Excluir
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

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length < 3) {
    return digits
  }
  const ddd = digits.slice(0, 2)
  const first = digits.slice(2, 7)
  const last = digits.slice(7, 11)
  if (digits.length <= 7) {
    return `(${ddd}) ${digits.slice(2)}`
  }
  return `(${ddd}) ${first}-${last}`
}
