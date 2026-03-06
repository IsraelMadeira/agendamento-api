# AgendaFlow Frontend

Frontend React da aplicacao de agendamento, com autenticacao, dashboard, modulo de clientes e modulo de agendamentos.

## Stack

- React + Vite + TypeScript
- React Router DOM
- Axios para integracao HTTP
- Day.js para datas

## Configuracao

1. Copie `.env.example` para `.env`.
2. Ajuste `VITE_API_BASE_URL` para a URL do seu `agendamento-api`.
3. Instale dependencias e execute:

```bash
npm install
npm run dev
```

## Integracao com Backend

O frontend foi preparado para os endpoints abaixo:

- `POST /auth/login`
- `GET /users/me`
- `GET /dashboard/metrics`
- `GET /clientes`
- `POST /clientes`
- `GET /agendamentos`
- `POST /agendamentos`
- `PATCH /agendamentos/:id/status`

Caso seu backend use nomes diferentes, ajuste os caminhos em:

- `src/services/authService.ts`
- `src/services/clientService.ts`
- `src/services/appointmentService.ts`
- `src/services/dashboardService.ts`

## Seguranca e UX

- Token JWT enviado automaticamente via interceptor (`Authorization: Bearer ...`).
- Logout automatico em `401` para evitar sessao invalida.
- Rotas protegidas para impedir acesso sem autenticacao.
- Estado de carregamento e mensagens de erro para evitar travamentos visuais.
