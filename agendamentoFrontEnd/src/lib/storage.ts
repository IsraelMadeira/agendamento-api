const TOKEN_KEY = 'agendamento_token'
const USER_KEY = 'agendamento_user'

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
