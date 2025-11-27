package com.example.crud.dto.request;

import jakarta.validation.constraints.NotEmpty;

public record RegisterUserRequest(@NotEmpty(message = "Username é obrigatório") String username,
                                  @NotEmpty(message = "Email é obrigatório") String email,
                                  @NotEmpty(message = "Password é obrigatório") String password,
                                  @NotEmpty(message = "role é obrigatório") String role) {
}
