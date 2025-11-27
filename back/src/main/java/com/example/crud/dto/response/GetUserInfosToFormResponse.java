package com.example.crud.dto.response;

public record GetUserInfosToFormResponse(String nome, Integer idade, java.time.LocalDate dataNascimento, String role) {
}