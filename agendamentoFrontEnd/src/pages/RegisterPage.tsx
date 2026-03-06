import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'

export function RegisterPage() {
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)

    if (!nome || !email || !senha || !confirmarSenha) {
      setError('Preencha todos os campos para continuar.')
      return
    }

    if (senha.length < 6) {
      setError('A senha deve ter ao menos 6 caracteres.')
      return
    }

    if (senha !== confirmarSenha) {
      setError('As senhas informadas nao conferem.')
      return
    }

    try {
      setSubmitting(true)
      await authService.register({ nome, email, senha })
      navigate('/login', {
        replace: true,
        state: { registered: true }
      })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Nao foi possivel criar sua conta. Tente novamente em instantes.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="login-screen">
      <section className="login-card">
        <h1>Criar conta</h1>
        <p>Cadastre-se para acessar a plataforma de agendamentos.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            placeholder="Seu nome completo"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />

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
            placeholder="Crie uma senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />

          <label htmlFor="confirmarSenha">Confirmar senha</label>
          <input
            id="confirmarSenha"
            type="password"
            placeholder="Repita a senha"
            value={confirmarSenha}
            onChange={(event) => setConfirmarSenha(event.target.value)}
          />

          {error ? <div className="alert-error">{error}</div> : null}

          <button type="submit" disabled={submitting}>
            {submitting ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="auth-card-actions">
          Ja possui conta? <Link to="/login">Entrar</Link>
        </p>
      </section>
    </div>
  )
}
