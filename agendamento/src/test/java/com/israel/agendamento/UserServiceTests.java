package com.israel.agendamento;

import com.israel.agendamento.dto.UserRequestDTO;
import com.israel.agendamento.model.User;
import com.israel.agendamento.repository.UserRepository;
import com.israel.agendamento.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class UserServiceTests {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setup() {
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("Should create user successfully")
    void createUserSuccessfully() {
        UserRequestDTO dto = new UserRequestDTO();
        dto.setNome("Test User");
        dto.setEmail("test@example.com");
        dto.setSenha("password");
        User user = userService.createUser(dto);
        Assertions.assertNotNull(user.getId());
        Assertions.assertEquals("Test User", user.getNome());
        Assertions.assertEquals("test@example.com", user.getEmail());
    }

    @Test
    @DisplayName("Should not allow duplicate email")
    void duplicateEmailThrowsException() {
        UserRequestDTO dto = new UserRequestDTO();
        dto.setNome("User1");
        dto.setEmail("duplicate@example.com");
        dto.setSenha("password");
        userService.createUser(dto);
        UserRequestDTO dto2 = new UserRequestDTO();
        dto2.setNome("User2");
        dto2.setEmail("duplicate@example.com");
        dto2.setSenha("password2");
        Assertions.assertThrows(IllegalArgumentException.class, () -> userService.createUser(dto2));
    }

    @Test
    @DisplayName("Should not create user with blank fields")
    void blankFieldsThrowsException() {
        UserRequestDTO dto = new UserRequestDTO();
        dto.setNome("");
        dto.setEmail("");
        dto.setSenha("");
        Assertions.assertThrows(Exception.class, () -> userService.createUser(dto));
    }
}

