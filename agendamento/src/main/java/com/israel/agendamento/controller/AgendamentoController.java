package com.israel.agendamento.controller;
import com.israel.agendamento.dto.AgendamentoResponseDTO;
import com.israel.agendamento.model.Agendamento;
import com.israel.agendamento.service.AgendamentoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.UUID;
import java.util.List;


@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {

    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;

    }

    @GetMapping
    public List<Agendamento> findAll() {
        return agendamentoService.listAgendamentos();
    }

    @GetMapping("/{id}")
    public Agendamento findById(@PathVariable UUID id) {
        return agendamentoService.getAgendamento(id);
    }

    @PostMapping
    public ResponseEntity<AgendamentoResponseDTO> criar(
            @Valid @RequestBody AgendamentoRequestDTO dto) {

        AgendamentoResponseDTO response = agendamentoService.criar(dto);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.getId())
                .toUri();

        return ResponseEntity
                .created(location)
                .body(response);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable UUID id) {
        agendamentoService.deleteAgendamento(id);
    }
}


