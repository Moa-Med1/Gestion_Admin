package com.oualanger.grhBackEnd.Evaluation.Model;

import com.fasterxml.jackson.annotation.JsonFormat;

import com.oualanger.grhBackEnd.Technicien.model.Technicien;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Evaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JoinTable(
            name = "evaluation_technicien",
            joinColumns = @JoinColumn(name = "evaluation_id"),
            inverseJoinColumns = @JoinColumn(name = "technicien_id")
    )
    private List<Technicien> techniciens;

    private String qualite;
    private String delai;
    private String cooperation;
    private String commentaire;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateEvaluation;

    private int scoreTotal;
    private String formation; // Formation recommandée
}
