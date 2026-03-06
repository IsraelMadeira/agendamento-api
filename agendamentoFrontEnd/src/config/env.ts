const baseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined

if (!baseUrl) {
  // Keep runtime feedback explicit in dev when .env is missing.
  console.warn('VITE_API_BASE_URL nao definido. Usando fallback http://localhost:8080')
}

export const env = {
  apiBaseUrl: baseUrl ?? 'http://localhost:8080',
  appTitle: (import.meta.env.VITE_APP_TITLE as string | undefined) ?? 'AgendaFlow'
}
