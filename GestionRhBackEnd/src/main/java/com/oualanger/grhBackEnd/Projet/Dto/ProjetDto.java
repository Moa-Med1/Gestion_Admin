package com.oualanger.grhBackEnd.Projet.Dto;

import com.oualanger.grhBackEnd.Evaluation.Dto.EvaluationDto; // Importez EvaluationDto
import com.oualanger.grhBackEnd.Evaluation.Mappers.EvaluationMapper;
import com.oualanger.grhBackEnd.Projet.model.Projet;
import com.oualanger.grhBackEnd.Technicien.Dto.TechnicienDto;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ProjetDto {

    private Long id;
    private String nom;
    private String emplacement;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private String responsable;
    private String etat;
    private String commentaire;
    private List<TechnicienDto> techniciens; // Liste des techniciens sous forme de DTO

    private LocalDate dateCreationRapport;
    private String contenuRapport;

    // Méthode de mappage d'un projet vers un ProjetDto
    public static ProjetDto mapToProjetDto(Projet projet) {
        ProjetDto projetDto = new ProjetDto();
        projetDto.setId(projet.getId());
        projetDto.setNom(projet.getNom());
        projetDto.setEmplacement(projet.getEmplacement());
        projetDto.setDateDebut(projet.getDateDebut());
        projetDto.setDateFin(projet.getDateFin());
        projetDto.setResponsable(projet.getResponsable());
        projetDto.setEtat(projet.getEtat());
        projetDto.setCommentaire(projet.getCommentaire());
        projetDto.setDateCreationRapport(projet.getDateCreationRapport());
        projetDto.setContenuRapport(projet.getContenuRapport());

        // Ajouter le mappage des techniciens si nécessaire
        // projetDto.setTechniciens(projet.getTechniciens().stream()
        //        .map(TechnicienDto::mapToTechnicienDto)
        //        .collect(Collectors.toList()));

        return projetDto;
    }
}
