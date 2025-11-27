package com.example.crud.service;

import com.example.crud.dto.request.CreateFormRequest;
import com.example.crud.dto.request.UpdateFormRequest;
import com.example.crud.dto.response.*;
import com.example.crud.model.entity.Form;
import com.example.crud.model.entity.User;
import com.example.crud.repository.FormRepository;
import com.example.crud.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@AllArgsConstructor
public class FormService {

    private final UserRepository userRepository;

    private final FormRepository formRepository;

    public CreateFormResponse createForm(@Valid @RequestBody CreateFormRequest request, Long userId) {
        Form newForm = new Form();
        newForm.setAge(request.age());
        newForm.setName(request.name());
        newForm.setBirthDate(request.birth_date());
        newForm.setCourse(request.course());
        newForm.setPhase(request.phase());
        newForm.setShift(request.shift());
        newForm.setDifficulty(request.difficulty());
        newForm.setDiscipline(request.discipline());
        newForm.setExplanation(request.explanation());
        newForm.setRoom(request.room());
        newForm.setColleagues(request.colleagues());
        newForm.setPreference(request.preference());
        newForm.setTime(request.time());
        newForm.setDate(request.date());
        newForm.setUser(userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado")));
        Form form = formRepository.save(newForm);

        return new CreateFormResponse(form.getId(), userId, form.getName(), form.getAge(), form.getBirthDate(), form.getCourse(), form.getPhase(), form.getShift(), form.getDifficulty(), form.getDiscipline(), form.getExplanation(), form.getRoom(), form.getColleagues(), form.getPreference(), form.getTime(), form.getDate());
    }

    public GetUserInfosToFormResponse getUserInfosToForm(Long userId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        return new GetUserInfosToFormResponse(user.getUsername(), java.time.Period.between(user.getBirthDate(), java.time.LocalDate.now()).getYears(), user.getBirthDate(), user.getRole());
    }

    public List<GetFormsResponse> getForms(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        List<Form> forms;
        if (Objects.equals(user.getRole(), "professor")) {
            forms = formRepository.findAll();
        } else if (Objects.equals(user.getRole(), "aluno")) {
            forms = formRepository.findByUserId(userId).orElseThrow(() -> new IllegalArgumentException("Formulários não encontrados"));

        } else {
            throw new IllegalArgumentException("Usuário não é valido");
        }
        System.out.println("Forms encontrados:");
        forms.forEach(form -> System.out.println(form));
        return forms.stream().map(form -> new GetFormsResponse(form.getId(), form.getUser().getId(), form.getName(), form.getAge(), form.getBirthDate(), form.getCourse(), form.getPhase(), form.getShift(), form.getDifficulty(), form.getDiscipline(), form.getExplanation(), form.getRoom(), form.getColleagues(), form.getPreference(), form.getTime(), form.getDate(), Optional.ofNullable(form.getProfissional()), Optional.ofNullable(form.getObservations()), form.getObservations() != null ? "Finalizado" : (form.getProfissional() != null ? "Em andamento" : "Não iniciado"))).toList();
    }

    public FormByIdResponse getFormById(Long userId, Long id) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        Form form;
        form = formRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Formulário não encontrado"));
        if (Objects.equals(user.getRole(), "professor")) {
            return new FormByIdResponse(form.getId(), form.getUser().getId(), form.getName(), form.getAge(), form.getBirthDate(), form.getCourse(), form.getPhase(), form.getShift(), form.getDifficulty(), form.getDiscipline(), form.getExplanation(), form.getRoom(), form.getColleagues(), form.getPreference(), form.getTime(), form.getDate(), Optional.ofNullable(form.getProfissional()), Optional.ofNullable(form.getObservations()));
        } else if (Objects.equals(user.getRole(), "aluno")) {
            if (form.getUser().getId().equals(userId)) {
                return new FormByIdResponse(form.getId(), form.getUser().getId(), form.getName(), form.getAge(), form.getBirthDate(), form.getCourse(), form.getPhase(), form.getShift(), form.getDifficulty(), form.getDiscipline(), form.getExplanation(), form.getRoom(), form.getColleagues(), form.getPreference(), form.getTime(), form.getDate(), Optional.ofNullable(form.getProfissional()), Optional.empty());
            } else {
                throw new IllegalArgumentException("Acesso negado ao formulário");
            }
        } else {
            throw new IllegalArgumentException("Usuário não é valido");
        }

    }

    public UpdateFormResponse updateForm(@Valid @RequestBody UpdateFormRequest request, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado"));
        System.out.println(user.getRole());
        if (Objects.equals(user.getRole(), "professor")) {
            Form newForm = formRepository.findById(request.id()).orElseThrow(() -> new IllegalArgumentException("Formulário não encontrado"));
            newForm.setTime(request.time());
            newForm.setDate(request.date());
            newForm.setProfissional(request.profissional().orElse(null));
            newForm.setObservations(request.observations().orElse(null));
            Form form = formRepository.save(newForm);

            return new UpdateFormResponse(form.getId(), userId, form.getName(), form.getAge(), form.getBirthDate(), form.getCourse(), form.getPhase(), form.getShift(), form.getDifficulty(), form.getDiscipline(), form.getExplanation(), form.getRoom(), form.getColleagues(), form.getPreference(), form.getTime(), form.getDate(), Optional.ofNullable(form.getProfissional()), Optional.ofNullable(form.getObservations()));
        } else {
            throw new IllegalArgumentException("Usuário não é valido");
        }
    }
}
