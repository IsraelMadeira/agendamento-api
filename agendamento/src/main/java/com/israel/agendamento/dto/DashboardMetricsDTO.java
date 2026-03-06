package com.israel.agendamento.dto;

public class DashboardMetricsDTO {
    private long totalClientes;
    private long agendamentosHoje;
    private long confirmadosSemana;
    private double taxaComparecimento;

    public DashboardMetricsDTO() {
    }

    public DashboardMetricsDTO(long totalClientes, long agendamentosHoje, long confirmadosSemana, double taxaComparecimento) {
        this.totalClientes = totalClientes;
        this.agendamentosHoje = agendamentosHoje;
        this.confirmadosSemana = confirmadosSemana;
        this.taxaComparecimento = taxaComparecimento;
    }

    public long getTotalClientes() {
        return totalClientes;
    }

    public void setTotalClientes(long totalClientes) {
        this.totalClientes = totalClientes;
    }

    public long getAgendamentosHoje() {
        return agendamentosHoje;
    }

    public void setAgendamentosHoje(long agendamentosHoje) {
        this.agendamentosHoje = agendamentosHoje;
    }

    public long getConfirmadosSemana() {
        return confirmadosSemana;
    }

    public void setConfirmadosSemana(long confirmadosSemana) {
        this.confirmadosSemana = confirmadosSemana;
    }

    public double getTaxaComparecimento() {
        return taxaComparecimento;
    }

    public void setTaxaComparecimento(double taxaComparecimento) {
        this.taxaComparecimento = taxaComparecimento;
    }
}
