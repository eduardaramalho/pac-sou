package com.example.pac_sou.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/sou") // rota principal do projeto
public class SouController {

    // ===== GET =====
    @GetMapping
    public ResponseEntity<List<String>> getAll() {
        // Retorna todos os registros
        return ResponseEntity.ok(List.of("Item 1", "Item 2", "Item 3"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getById(@PathVariable Long id) {
        // Busca registro por ID
        return ResponseEntity.ok("Registro com id: " + id);
    }

    // ===== POST =====
    @PostMapping
    public ResponseEntity<String> create(@RequestBody String payload) {
        // Cria novo registro
        return ResponseEntity.ok("Registro criado: " + payload);
    }

    // ===== PUT =====
    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody String payload) {
        // Atualiza registro pelo ID
        return ResponseEntity.ok("Registro atualizado id: " + id + " com dados: " + payload);
    }

    // ===== DELETE =====
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        // Remove registro pelo ID
        return ResponseEntity.ok("Registro excluído id: " + id);
    }
}
