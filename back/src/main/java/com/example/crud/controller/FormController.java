package com.example.crud.controller;

import com.example.crud.dto.request.CreateFormRequest;
import com.example.crud.dto.request.UpdateFormRequest;
import com.example.crud.dto.response.*;
import com.example.crud.service.FormService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/form")
public class FormController {

    private final FormService formService;

    @PostMapping("/create")
    public ResponseEntity<CreateFormResponse> createForm(@RequestBody @Valid CreateFormRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = null;
        if (authentication != null && authentication.getPrincipal() instanceof com.example.crud.config.JWTUserData jwtUserData) {
            userId = jwtUserData.UserId();
        } else {
            return ResponseEntity.status(401).build();
        }
        CreateFormResponse form = formService.createForm(request, userId);
        return ResponseEntity.ok(form);
    }

    @GetMapping("/user/infos")
    public ResponseEntity<GetUserInfosToFormResponse> getUserInfosToForm() {
        System.out.println("Entrou no controller");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Long userId = null;
        if (authentication != null && authentication.getPrincipal() instanceof com.example.crud.config.JWTUserData jwtUserData) {
            userId = jwtUserData.UserId();
        } else {
            return ResponseEntity.status(401).build();
        }
        GetUserInfosToFormResponse userInfos = formService.getUserInfosToForm(userId);
        return ResponseEntity.ok(userInfos);
    }

    @GetMapping("/")
    public ResponseEntity<List<GetFormsResponse>> getForms() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Long userId = null;
        if (authentication != null && authentication.getPrincipal() instanceof com.example.crud.config.JWTUserData jwtUserData) {
            userId = jwtUserData.UserId();
        } else {
            return ResponseEntity.status(401).build();
        }
        List<GetFormsResponse> forms = formService.getForms(userId);
        return ResponseEntity.ok(forms);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FormByIdResponse> getFormById(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Long userId = null;
        if (authentication != null && authentication.getPrincipal() instanceof com.example.crud.config.JWTUserData jwtUserData) {
            userId = jwtUserData.UserId();
        } else {
            return ResponseEntity.status(401).build();
        }
        FormByIdResponse forms = formService.getFormById(userId, id);
        return ResponseEntity.ok(forms);
    }

    @PutMapping("/update")
    public ResponseEntity<UpdateFormResponse> updateForm(@Valid @RequestBody UpdateFormRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = null;
        if (authentication != null && authentication.getPrincipal() instanceof com.example.crud.config.JWTUserData jwtUserData) {
            userId = jwtUserData.UserId();
        } else {
            return ResponseEntity.status(401).build();
        }
        System.out.println(userId);
        UpdateFormResponse form = formService.updateForm(request, userId);
        return ResponseEntity.ok(form);
    }
}
