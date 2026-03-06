import { CalendarClock, House, LogOut, Users } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { env } from '../../config/env'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: House },
  { to: '/agendamentos', label: 'Agendamentos', icon: CalendarClock },
  { to: '/clientes', label: 'Clientes', icon: Users }
]

export function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>{env.appTitle}</h1>
        <p>Gestao de agenda em tempo real</p>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <Icon size={18} /> {item.label}
              </NavLink>
            )
          })}
        </nav>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <span>Bem-vindo</span>
            <h2>{user?.nome ?? 'Usuario'}</h2>
          </div>
          <button type="button" className="ghost-button" onClick={handleLogout}>
            <LogOut size={16} /> Sair
          </button>
        </header>

        <section className="page-panel">
          <Outlet />
        </section>
      </main>
    </div>
  )
}
