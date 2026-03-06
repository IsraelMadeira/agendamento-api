import { useEffect, useState } from 'react'
import { CalendarClock, House, LogOut, Users } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { HexColorPicker } from 'react-colorful'
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
  const [bgColor, setBgColor] = useState(() => localStorage.getItem('agendamento_bg_color') ?? '#f4f7f3')

  useEffect(() => {
    document.documentElement.style.setProperty('--bg', bgColor)
    localStorage.setItem('agendamento_bg_color', bgColor)
  }, [bgColor])

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

        <section className="sidebar-tools">
          <span>Cor do fundo</span>
          <HexColorPicker color={bgColor} onChange={setBgColor} />
          <small>{bgColor.toUpperCase()}</small>
        </section>
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
