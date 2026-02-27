package com.israel.agendamento.controller;

import com.israel.agendamento.model.Agendamento;
import com.israel.agendamento.repository.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/agendamentos")
public class AgendamentoController {
    private final AgendamentoRepository repository;

    public AgendamentoController(AgendamentoRepository repository) {
        this.repository = repository;

    }

    @GetMapping
    public List<Agendamento> findAll() {
        return repository.findAll();
    }


}
