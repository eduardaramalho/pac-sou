package com.example.crud.dto.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record CreateFormRequest(
        @NotNull(message = "name é obrigatório") @NotEmpty(message = "name não pode ser vazio") String name,
        @NotNull(message = "age é obrigatório") Integer age,
        @NotNull(message = "birth_date é obrigatório") java.time.LocalDate birth_date,
        @NotNull(message = "course é obrigatório") @NotEmpty(message = "course não pode ser vazio") String course,
        @NotNull(message = "phase é obrigatório") @NotEmpty(message = "phase não pode ser vazio") String phase,
        @NotNull(message = "shift é obrigatório") @NotEmpty(message = "shift não pode ser vazio") String shift,
        @NotNull(message = "difficulty é obrigatório") @NotEmpty(message = "difficulty não pode ser vazio") String difficulty,
        @NotNull(message = "discipline é obrigatório") Boolean discipline,
        @NotNull(message = "explanation é obrigatório") Boolean explanation,
        @NotNull(message = "room é obrigatório") Boolean room,
        @NotNull(message = "colleagues é obrigatório") Boolean colleagues,
        @NotNull(message = "preference é obrigatório") @NotEmpty(message = "preference não pode ser vazio") String preference,
        @NotNull(message = "time é obrigatório") java.time.LocalTime time,
        @NotNull(message = "date é obrigatório") java.time.LocalDate date) {
}
