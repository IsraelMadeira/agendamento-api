package com.israel.agendamento.service;

import com.israel.agendamento.controller.AgendamentoRequestDTO;
import com.israel.agendamento.dto.AgendamentoResponseDTO;
import com.israel.agendamento.enums.StatusAgendamento;
import com.israel.agendamento.model.Agendamento;
import com.israel.agendamento.repository.AgendamentoRepository;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.UUID;

@Service
public class AgendamentoServiceImpl implements AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    public AgendamentoServiceImpl(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }

    @Override
    public List<Agendamento> listAgendamentos() {
        return agendamentoRepository.findAll();
    }

    @Override
    public Agendamento getAgendamento(UUID id){
        return (Agendamento) agendamentoRepository.findById(id)
                .orElseThrow(() ->new RuntimeException("Agendamento não encontrado"));
    }

    @Override
    public Agendamento createAgendamento(Agendamento agendamento){
        agendamento.setStatus(StatusAgendamento.PENDENTE);
        return agendamentoRepository.save(agendamento);
    }

    @Override
    public void deleteAgendamento(UUID id) {
        agendamentoRepository.deleteById(id);
    }

    @Override
    public AgendamentoResponseDTO criar(AgendamentoRequestDTO dto) {
        return new AgendamentoResponseDTO();
    }

}
