package com.oualanger.grhBackEnd.Technicien.model;

import com.oualanger.grhBackEnd.Evaluation.Model.Evaluation;
import com.oualanger.grhBackEnd.Pointage.Model.Pointage;
import com.oualanger.grhBackEnd.Projet.model.Projet;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

// Update the Technicien entity to include a ManyToMany relationship with Evaluation
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Technicien {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String matricule;
    private String nom;
    private String prenom;
    private LocalDate dateRecrutement;
    private LocalDate dateNaissance;
    private String telephone;
    private String email;
    private String cin;

    private String adresseRue;
    private String adresseVille;
    private String adresseRegion;
    private String adresseCodePostal;

    private String situationFamiliale;
    private String fonction;

    @ManyToMany
    @JoinTable(
            name = "technicien_projet",
            joinColumns = @JoinColumn(name = "technicien_id"),
            inverseJoinColumns = @JoinColumn(name = "projet_id")
    )
    private List<Projet> projets;

    @ManyToMany
    @JoinTable(
            name = "technicien_evaluation",
            joinColumns = @JoinColumn(name = "technicien_id"),
            inverseJoinColumns = @JoinColumn(name = "evaluation_id")
    )
    private List<Evaluation> evaluations;

    @ManyToMany
    @JoinTable(
            name = "pointage_technicien",
            joinColumns = @JoinColumn(name = "pointage_id"),
            inverseJoinColumns = @JoinColumn(name = "technicien_id"))
    private List<Pointage> pointages;
}
