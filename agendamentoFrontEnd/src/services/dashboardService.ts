import { http } from '../lib/http'
import type { DashboardMetrics } from '../types/api'

export const dashboardService = {
  async metrics(): Promise<DashboardMetrics> {
    const { data } = await http.get<DashboardMetrics>('/dashboard/metrics')
    return data
  }
}
