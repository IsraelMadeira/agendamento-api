package com.israel.agendamento.dto;

import com.israel.agendamento.enums.StatusAgendamento;
import jakarta.validation.constraints.NotNull;

public class AgendamentoStatusUpdateDTO {
    @NotNull
    private StatusAgendamento status;

    public StatusAgendamento getStatus() {
        return status;
    }

    public void setStatus(StatusAgendamento status) {
        this.status = status;
    }
}
