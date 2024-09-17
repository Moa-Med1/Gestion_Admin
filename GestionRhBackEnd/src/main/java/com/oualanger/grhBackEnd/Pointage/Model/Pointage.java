package com.oualanger.grhBackEnd.Pointage.Model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Pointage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JoinTable(
            name = "technicien_pointage",
            joinColumns = @JoinColumn(name = "technicien_id"),
            inverseJoinColumns = @JoinColumn(name = "pointage_id")
    )
    private List<Pointage> techniciens;

    private LocalDate date;

    @Column(name = "heure_debut")
    private LocalTime heureDebut;

    @Column(name = "heure_fin")
    private LocalTime heureFin;

    @Column(name = "idTechPointage")
    private Long idTechPointage;

    @Column(name = "nomPrenomTechnicien")
    private String nomPrenomTechnicien;

    @Column(name = "commentaire")
    private String commentaire;

    @Column(name = "heureSup")
    private LocalTime heureSup;

    @Column(name = "heureTravail")
    private LocalTime heureTravail;

}
