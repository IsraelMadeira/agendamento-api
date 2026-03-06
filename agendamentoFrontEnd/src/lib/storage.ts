const TOKEN_KEY = 'agendamento_token'
const USER_KEY = 'agendamento_user'
const APP_THEME_KEY = 'agendamento_app_theme'
const APP_ACCENT_KEY = 'agendamento_app_accent'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function getUserStorage(): string | null {
  return localStorage.getItem(USER_KEY)
}

export function setUserStorage(userJson: string): void {
  localStorage.setItem(USER_KEY, userJson)
}

export function clearUserStorage(): void {
  localStorage.removeItem(USER_KEY)
}

export function getAppTheme(): string | null {
  return localStorage.getItem(APP_THEME_KEY)
}

export function setAppTheme(theme: string): void {
  localStorage.setItem(APP_THEME_KEY, theme)
}

export function getAppAccent(): string | null {
  return localStorage.getItem(APP_ACCENT_KEY)
}

export function setAppAccent(color: string): void {
  localStorage.setItem(APP_ACCENT_KEY, color)
}
