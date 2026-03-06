package com.israel.agendamento.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ClienteRequestDTO {
    @NotBlank
    private String nome;

    @NotBlank
    @Size(min = 11, max = 11, message = "Telefone deve conter exatamente 11 digitos")
    @Pattern(regexp = "^[0-9]{11}$", message = "Telefone deve conter apenas numeros")
    private String telefone;

    private String email;
    private String observacoes;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}
