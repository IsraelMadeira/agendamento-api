package com.israel.agendamento.service;

import com.israel.agendamento.controller.AgendamentoRequestDTO;
import com.israel.agendamento.dto.AgendamentoResponseDTO;
import com.israel.agendamento.enums.StatusAgendamento;
import com.israel.agendamento.model.Agendamento;
import com.israel.agendamento.repository.AgendamentoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        return agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));
    }

    @Override
    @Transactional
    public Agendamento createAgendamento(Agendamento agendamento){
        agendamento.setStatus(StatusAgendamento.PENDENTE);
        return agendamentoRepository.save(agendamento);
    }

    @Override
    @Transactional
    public void deleteAgendamento(UUID id) {
        if (!agendamentoRepository.existsById(id)) {
            throw new RuntimeException("Agendamento não encontrado para exclusão");
        }
        agendamentoRepository.deleteById(id);
    }

    @Override
    @Transactional
    public AgendamentoResponseDTO criar(AgendamentoRequestDTO dto) {
        if (dto == null) throw new IllegalArgumentException("DTO não pode ser nulo");
        Agendamento agendamento = new Agendamento();
        agendamento.setNome(dto.getNome());
        agendamento.setEmail(dto.getEmail());
        agendamento.setDataHora(dto.getDataHora());
        agendamento.setStatus(StatusAgendamento.PENDENTE);
        Agendamento saved = agendamentoRepository.save(agendamento);
        return new AgendamentoResponseDTO(
                saved.getId(),
                saved.getNome(),
                saved.getEmail(),
                saved.getDataHora(),
                saved.getStatus()
        );
    }
}
