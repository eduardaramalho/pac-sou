package com.example.pac_sou.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/sou")
public class SouController {
    @GetMapping
    public ResponseEntity<List<String>> getAll() {
        return ResponseEntity.ok(List.of("Item 1", "Item 2", "Item 3"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> getById(@PathVariable Long id) {
        return ResponseEntity.ok("Registro com id: " + id);
    }
    @PostMapping
    public ResponseEntity<String> create(@RequestBody String payload) {
        return ResponseEntity.ok("Registro criado: " + payload);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable Long id, @RequestBody String payload) {
        return ResponseEntity.ok("Registro atualizado id: " + id + " com dados: " + payload);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        return ResponseEntity.ok("Registro excluído id: " + id);
    }
}
