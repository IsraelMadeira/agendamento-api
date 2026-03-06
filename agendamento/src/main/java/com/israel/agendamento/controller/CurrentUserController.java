package com.israel.agendamento.controller;

import com.israel.agendamento.dto.UserResponseDTO;
import com.israel.agendamento.service.AuthService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class CurrentUserController {
    private final AuthService authService;

    public CurrentUserController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/me")
    public UserResponseDTO me(@RequestHeader("Authorization") String authorizationHeader) {
        return authService.me(authorizationHeader);
    }
}
