package com.oualanger.grhBackEnd.Projet.model;

import com.oualanger.grhBackEnd.Evaluation.Model.Evaluation;
import com.oualanger.grhBackEnd.Technicien.model.Technicien;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Projet {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String nom;
        private String emplacement;
        private LocalDate dateDebut;
        private LocalDate dateFin;
        private String responsable;
        private String etat;
        private String commentaire;

        @ManyToMany
        @JoinTable(
                name = "projet_technicien",
                joinColumns = @JoinColumn(name = "projet_id"),
                inverseJoinColumns = @JoinColumn(name = "technicien_id"))
        private List<Technicien> techniciens;

        private LocalDate dateCreationRapport;  // Peut être null
        private String contenuRapport;

        // Méthode pour ajouter un technicien sans doublon
        public void addTechnicien(Technicien newTechnicien) {
                // Vérifie si le technicien n'est pas déjà dans la liste avant de l'ajouter
                if (!this.techniciens.contains(newTechnicien)) {
                        this.techniciens.add(newTechnicien);
                }
        }

        // Méthode pour retirer un technicien
        public void removeTechnicien(Technicien technicien) {
                // Vérifie si le technicien est présent dans la liste
                if (this.techniciens.contains(technicien)) {
                        this.techniciens.remove(technicien); // Retire le technicien de la liste
                }
        }

}
