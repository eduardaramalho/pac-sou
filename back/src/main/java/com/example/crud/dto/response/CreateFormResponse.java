package com.example.crud.dto.response;

public record CreateFormResponse(Long id, Long user_id, String nome, Integer idade, java.time.LocalDate dataNascimento,
                                 String curso, String fase, String turno, String dificuldade, Boolean disciplina,
                                 Boolean explicacao, Boolean sala, Boolean colegas, String preferencia,
                                 java.time.LocalTime horario, java.time.LocalDate data) {
}


