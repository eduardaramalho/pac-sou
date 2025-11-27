package com.example.crud.repository;

import com.example.crud.model.entity.Form;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FormRepository extends JpaRepository<Form, Long> {


    Optional<List<Form>> findByUserId(Long userId);


    Optional<Form> findById(Long id);
}
