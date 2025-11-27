package com.example.crud.controller;

import com.example.crud.dto.request.LoginRequest;
import com.example.crud.dto.request.RegisterUserRequest;
import com.example.crud.dto.response.LoginResponse;
import com.example.crud.dto.response.RegisterUserResponse;
import com.example.crud.service.AuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse tokenResponse = authService.login(request);
        return ResponseEntity.ok(new LoginResponse(tokenResponse.token(), tokenResponse.role()));
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponse> register(@Valid @RequestBody RegisterUserRequest request) {
        RegisterUserResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(new RegisterUserResponse(response.nome(), response.email()));
    }

}
