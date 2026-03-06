package com.israel.agendamento.service;

import com.israel.agendamento.controller.AgendamentoRequestDTO;
import com.israel.agendamento.dto.AgendamentoFrontResponseDTO;
import com.israel.agendamento.enums.StatusAgendamento;
import com.israel.agendamento.model.Agendamento;
import com.israel.agendamento.model.Cliente;
import com.israel.agendamento.repository.AgendamentoRepository;
import com.israel.agendamento.repository.ClienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class AgendamentoServiceImpl implements AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final ClienteRepository clienteRepository;

    public AgendamentoServiceImpl(AgendamentoRepository agendamentoRepository, ClienteRepository clienteRepository) {
        this.agendamentoRepository = agendamentoRepository;
        this.clienteRepository = clienteRepository;
    }

    @Override
    public List<AgendamentoFrontResponseDTO> listAgendamentos() {
        return agendamentoRepository.findAll().stream().map(this::toFrontResponse).toList();
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
    public AgendamentoFrontResponseDTO criar(AgendamentoRequestDTO dto) {
        if (dto == null) throw new IllegalArgumentException("DTO não pode ser nulo");
        Agendamento agendamento = new Agendamento();

        if (dto.getClienteId() != null) {
            Cliente cliente = clienteRepository.findById(dto.getClienteId())
                    .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
            agendamento.setClienteId(cliente.getId());
            agendamento.setNome(cliente.getNome());
            agendamento.setEmail(cliente.getEmail());
        } else {
            agendamento.setNome(dto.getClienteNome());
            agendamento.setEmail(dto.getEmail());
        }

        agendamento.setServico(dto.getServico());
        agendamento.setDataHora(dto.getDataHora());
        agendamento.setObservacoes(dto.getObservacoes());
        agendamento.setStatus(StatusAgendamento.PENDENTE);

        Agendamento saved = agendamentoRepository.save(agendamento);
        return toFrontResponse(saved);
    }

    @Override
    @Transactional
    public AgendamentoFrontResponseDTO atualizar(UUID id, AgendamentoRequestDTO dto) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

        if (dto.getClienteId() != null) {
            Cliente cliente = clienteRepository.findById(dto.getClienteId())
                    .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
            agendamento.setClienteId(cliente.getId());
            agendamento.setNome(cliente.getNome());
            agendamento.setEmail(cliente.getEmail());
        }

        agendamento.setServico(dto.getServico());
        agendamento.setDataHora(dto.getDataHora());
        agendamento.setObservacoes(dto.getObservacoes());

        Agendamento saved = agendamentoRepository.save(agendamento);
        return toFrontResponse(saved);
    }

    @Override
    @Transactional
    public AgendamentoFrontResponseDTO atualizarStatus(UUID id, StatusAgendamento status) {
        Agendamento agendamento = agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado"));

        agendamento.setStatus(status);
        Agendamento saved = agendamentoRepository.save(agendamento);
        return toFrontResponse(saved);
    }

    private AgendamentoFrontResponseDTO toFrontResponse(Agendamento agendamento) {
        AgendamentoFrontResponseDTO dto = new AgendamentoFrontResponseDTO();
        dto.setId(agendamento.getId());
        dto.setClienteId(agendamento.getClienteId());
        dto.setClienteNome(agendamento.getNome());
        dto.setServico(agendamento.getServico());
        dto.setDataHora(agendamento.getDataHora());
        dto.setStatus(agendamento.getStatus());
        dto.setObservacoes(agendamento.getObservacoes());
        return dto;
    }
}
