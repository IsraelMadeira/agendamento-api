package com.israel.agendamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.israel.agendamento.model.Agendamento;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
}