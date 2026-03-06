import { useEffect, useState } from 'react'
import { CalendarClock, House, LogOut, Users } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Accordion, AccordionTab } from 'primereact/accordion'
import { ColorPicker, type ColorPickerChangeEvent } from 'primereact/colorpicker'
import { Dropdown } from 'primereact/dropdown'
import { useAuth } from '../../context/AuthContext'
import { env } from '../../config/env'
import { getAppAccent, getAppTheme, setAppAccent, setAppTheme } from '../../lib/storage'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: House },
  { to: '/agendamentos', label: 'Agendamentos', icon: CalendarClock },
  { to: '/clientes', label: 'Clientes', icon: Users }
]

type ThemeOption = {
  label: string
  value: string
  palette: {
    bg: string
    panel: string
    text: string
    muted: string
    line: string
    accent2: string
    sidebarStart: string
    sidebarEnd: string
  }
}

const themeOptions: ThemeOption[] = [
  {
    label: 'Bosque',
    value: 'forest',
    palette: {
      bg: '#f4f7f3',
      panel: '#ffffff',
      text: '#182218',
      muted: '#5c705c',
      line: '#d5e0d4',
      accent2: '#e57f2a',
      sidebarStart: '#122a20',
      sidebarEnd: '#0f1f17'
    }
  },
  {
    label: 'Areia',
    value: 'sand',
    palette: {
      bg: '#f7f1e8',
      panel: '#fffaf2',
      text: '#2f2417',
      muted: '#7d6b59',
      line: '#e5d4c4',
      accent2: '#c96d32',
      sidebarStart: '#3a261a',
      sidebarEnd: '#241710'
    }
  },
  {
    label: 'Oceano',
    value: 'ocean',
    palette: {
      bg: '#edf5fb',
      panel: '#ffffff',
      text: '#13283a',
      muted: '#587185',
      line: '#cfe0ee',
      accent2: '#ff9f5a',
      sidebarStart: '#10283d',
      sidebarEnd: '#0d1a29'
    }
  },
  {
    label: 'Grafite',
    value: 'graphite',
    palette: {
      bg: '#eef0f3',
      panel: '#ffffff',
      text: '#1f232b',
      muted: '#606a78',
      line: '#d9dee6',
      accent2: '#f08a32',
      sidebarStart: '#1f2530',
      sidebarEnd: '#131821'
    }
  }
]

export function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [theme, setTheme] = useState(() => getAppTheme() ?? 'forest')
  const [accentColor, setAccentColor] = useState(() => normalizeHex(getAppAccent() ?? '#13795b'))
  const [themePanelOpen, setThemePanelOpen] = useState<number | null>(null)
  const selectedTheme = themeOptions.find((item) => item.value === theme) ?? themeOptions[0]

  useEffect(() => {
    document.documentElement.style.setProperty('--bg', selectedTheme.palette.bg)
    document.documentElement.style.setProperty('--panel', selectedTheme.palette.panel)
    document.documentElement.style.setProperty('--text', selectedTheme.palette.text)
    document.documentElement.style.setProperty('--muted', selectedTheme.palette.muted)
    document.documentElement.style.setProperty('--line', selectedTheme.palette.line)
    document.documentElement.style.setProperty('--accent', accentColor)
    document.documentElement.style.setProperty('--accent-2', selectedTheme.palette.accent2)
    document.documentElement.style.setProperty('--sidebar-start', selectedTheme.palette.sidebarStart)
    document.documentElement.style.setProperty('--sidebar-end', selectedTheme.palette.sidebarEnd)

    setAppTheme(selectedTheme.value)
    setAppAccent(accentColor)
  }, [theme, accentColor])

  function handleColorChange(event: ColorPickerChangeEvent) {
    const value = typeof event.value === 'string' ? event.value : String(event.value)
    setAccentColor(normalizeHex(value))
  }

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
          <Accordion activeIndex={themePanelOpen} onTabChange={(event) => setThemePanelOpen(event.index as number | null)}>
            <AccordionTab
              header={
                <div className="theme-toggle-header">
                  <div>
                    <strong>Aparencia</strong>
                    <small>{selectedTheme.label}</small>
                  </div>
                  <span className="theme-accent-chip" style={{ backgroundColor: accentColor }} aria-hidden="true" />
                </div>
              }
            >
              <div className="theme-toggle-body">
                <span>Tema da pagina</span>
                <Dropdown
                  value={theme}
                  options={themeOptions}
                  optionLabel="label"
                  optionValue="value"
                  onChange={(event) => setTheme(event.value)}
                  placeholder="Selecione um tema"
                />
                <span>Cor de destaque</span>
                <ColorPicker format="hex" value={accentColor.replace('#', '')} onChange={handleColorChange} />
                <small>{accentColor.toUpperCase()}</small>
              </div>
            </AccordionTab>
          </Accordion>
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

function normalizeHex(color: string): string {
  return color.startsWith('#') ? color : `#${color}`
}
