import { FormEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const justRegistered = Boolean((location.state as { registered?: boolean } | null)?.registered)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)

    if (!email || !senha) {
      setError('Informe email e senha para continuar.')
      return
    }

    try {
      setSubmitting(true)
      await login({ email, senha })
      const redirectPath = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname
      navigate(redirectPath ?? '/dashboard', { replace: true })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Falha ao autenticar. Verifique as credenciais e tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-screen">
      <section className="login-card">
        <h1>AgendaFlow</h1>
        <p>Plataforma inteligente para operacao de agendamentos.</p>

        {justRegistered ? (
          <div className="alert-success">Conta criada com sucesso. Faca login para continuar.</div>
        ) : null}

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />

          {error ? <div className="alert-error">{error}</div> : null}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="auth-card-actions">
          Novo por aqui? <Link to="/register">Criar conta</Link>
        </p>
      </section>
    </div>
  )
}
