package com.israel.agendamento.controller;

import com.israel.agendamento.dto.DashboardMetricsDTO;
import com.israel.agendamento.enums.StatusAgendamento;
import com.israel.agendamento.model.Agendamento;
import com.israel.agendamento.repository.AgendamentoRepository;
import com.israel.agendamento.repository.ClienteRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {
    private final ClienteRepository clienteRepository;
    private final AgendamentoRepository agendamentoRepository;

    public DashboardController(ClienteRepository clienteRepository, AgendamentoRepository agendamentoRepository) {
        this.clienteRepository = clienteRepository;
        this.agendamentoRepository = agendamentoRepository;
    }

    @GetMapping("/metrics")
    public DashboardMetricsDTO metrics() {
        var agendamentos = agendamentoRepository.findAll();

        LocalDate hoje = LocalDate.now();
        LocalDate seteDiasAtras = hoje.minusDays(7);

        long agendamentosHoje = agendamentos.stream()
                .map(Agendamento::getDataHora)
                .filter(data -> data != null && data.toLocalDate().isEqual(hoje))
                .count();

        long confirmadosSemana = agendamentos.stream()
                .filter(item -> item.getStatus() == StatusAgendamento.CONFIRMADO)
                .map(Agendamento::getDataHora)
                .filter(data -> data != null && !data.toLocalDate().isBefore(seteDiasAtras))
                .count();

        long concluidos = agendamentos.stream()
                .filter(item -> item.getStatus() == StatusAgendamento.CONCLUIDO)
                .count();

        long confirmados = agendamentos.stream()
                .filter(item -> item.getStatus() == StatusAgendamento.CONFIRMADO)
                .count();

        long baseComparecimento = concluidos + confirmados;
        double taxaComparecimento = baseComparecimento == 0
                ? 0
                : ((double) concluidos / (double) baseComparecimento) * 100.0;

        return new DashboardMetricsDTO(
                clienteRepository.count(),
                agendamentosHoje,
                confirmadosSemana,
                Math.round(taxaComparecimento * 100.0) / 100.0
        );
    }
}
