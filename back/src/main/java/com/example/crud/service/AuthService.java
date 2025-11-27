package com.example.crud.service;

import com.example.crud.config.TokenConfig;
import com.example.crud.dto.request.LoginRequest;
import com.example.crud.dto.request.RegisterUserRequest;
import com.example.crud.dto.response.LoginResponse;
import com.example.crud.dto.response.RegisterUserResponse;
import com.example.crud.model.entity.User;
import com.example.crud.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@AllArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final AuthenticationManager authenticationManager;
    private final TokenConfig tokenConfig;

    public LoginResponse login(LoginRequest request) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.email(), request.password());
        Authentication authentication = authenticationManager.authenticate(authToken);
        User user = (User) authentication.getPrincipal();

        String token = tokenConfig.genetateToken(user);
        return new LoginResponse(token, user.getRole());
    }

    public RegisterUserResponse register(RegisterUserRequest request) {
        String role = request.role();
        if (!"professor".equalsIgnoreCase(role) && !"aluno".equalsIgnoreCase(role)) {
            throw new IllegalArgumentException("Role inválido. Use 'professor' ou 'aluno'.");
        }
        User newUser = new User();
        newUser.setUsername(request.username());
        newUser.setEmail(request.email());
        newUser.setPassword(passwordEncoder.encode(request.password()));
        newUser.setRole(role);

        userRepository.save(newUser);

        return new RegisterUserResponse(newUser.getUsername(), newUser.getEmail());
    }
}
