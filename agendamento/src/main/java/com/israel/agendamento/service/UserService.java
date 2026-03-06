package com.israel.agendamento.service;

import com.israel.agendamento.dto.UserRequestDTO;
import com.israel.agendamento.model.User;
import com.israel.agendamento.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User createUser(@Valid UserRequestDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado");
        }
        User user = new User();
        user.setNome(dto.getNome());
        user.setEmail(dto.getEmail());
        user.setSenha(dto.getSenha()); // Em produção, use hash!
        return userRepository.save(user);
    }
}

