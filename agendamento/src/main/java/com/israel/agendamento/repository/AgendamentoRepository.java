package com.israel.agendamento.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.israel.agendamento.model.Agendamento;

import java.util.Optional;
import java.util.UUID;

public interface AgendamentoRepository extends JpaRepository<Agendamento, UUID> {
    Optional<Agendamento> findById(UUID id);
    void deleteById(UUID id);
}