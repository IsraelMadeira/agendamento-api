package com.israel.agendamento.dto;

import com.israel.agendamento.enums.StatusAgendamento;
import java.time.LocalDateTime;
import java.util.UUID;

public class AgendamentoResponseDTO {
    private UUID id;
    private String nome;
    private String email;
    private LocalDateTime dataHora;
    private StatusAgendamento status;

    public AgendamentoResponseDTO() {}
    public AgendamentoResponseDTO(UUID id, String nome, String email, LocalDateTime dataHora, StatusAgendamento status) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.dataHora = dataHora;
        this.status = status;
    }
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public LocalDateTime getDataHora() {
        return dataHora;
    }
    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }
    public StatusAgendamento getStatus() {
        return status;
    }
    public void setStatus(StatusAgendamento status) {
        this.status = status;
    }
}