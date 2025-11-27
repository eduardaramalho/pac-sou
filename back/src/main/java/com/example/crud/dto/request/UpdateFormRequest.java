package com.example.crud.dto.request;

import jakarta.validation.constraints.NotEmpty;

import java.util.Optional;

public record UpdateFormRequest(@NotEmpty(message = "id é obrigatório") Long id, Optional<String> profissional,
                                Optional<String> observations,
                                @NotEmpty(message = "time é obrigatório") java.time.LocalTime time,
                                @NotEmpty(message = "date é obrigatório") java.time.LocalDate date) {
}
