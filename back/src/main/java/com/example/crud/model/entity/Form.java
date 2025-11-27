package com.example.crud.model.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "forms")
public class Form {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String name;

    @Column
    private Integer age;

    @Column
    private java.time.LocalDate birthDate;

    @Column
    private String course;

    @Column
    private String phase;

    @Column
    private String shift;

    @Column
    private String difficulty;

    @Column
    private Boolean discipline;

    @Column
    private Boolean explanation;

    @Column
    private Boolean room;

    @Column
    private Boolean colleagues;

    @Column
    private String preference;

    @Column
    private java.time.LocalTime time;

    @Column
    private java.time.LocalDate date;

    @Column(nullable = true)
    private String observations;

    @Column(nullable = true)
    private String profissional;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;


}
