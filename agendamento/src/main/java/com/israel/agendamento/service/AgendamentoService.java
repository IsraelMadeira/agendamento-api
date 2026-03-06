package com.israel.agendamento.service;

import com.israel.agendamento.controller.AgendamentoRequestDTO;
import com.israel.agendamento.dto.AgendamentoResponseDTO;
import com.israel.agendamento.model.Agendamento;
import jakarta.validation.Valid;

import java.util.List;
import java.util.UUID;

public interface AgendamentoService {
    List<Agendamento> listAgendamentos();
    Agendamento getAgendamento(UUID id);
    Agendamento createAgendamento(Agendamento agendamento);
    void deleteAgendamento(UUID id);
    AgendamentoResponseDTO criar(@Valid AgendamentoRequestDTO dto);
}
