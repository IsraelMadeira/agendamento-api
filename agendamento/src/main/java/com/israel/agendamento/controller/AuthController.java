package com.israel.agendamento.controller;

import com.israel.agendamento.dto.AuthResponseDTO;
import com.israel.agendamento.dto.LoginRequestDTO;
import com.israel.agendamento.dto.UserRequestDTO;
import com.israel.agendamento.dto.UserResponseDTO;
import com.israel.agendamento.model.User;
import com.israel.agendamento.service.AuthService;
import com.israel.agendamento.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@Valid @RequestBody UserRequestDTO dto) {
        User user = userService.createUser(dto);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(user.getId())
                .toUri();

        return ResponseEntity.created(location).body(UserResponseDTO.from(user));
    }

    @PostMapping("/login")
    public AuthResponseDTO login(@Valid @RequestBody LoginRequestDTO dto) {
        return authService.login(dto);
    }

    @GetMapping("/me")
    public UserResponseDTO me(@RequestHeader("Authorization") String authorizationHeader) {
        return authService.me(authorizationHeader);
    }
}
