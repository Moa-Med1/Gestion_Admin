package com.oualanger.grhBackEnd.Technicien.Dto;

import com.oualanger.grhBackEnd.Evaluation.Model.Evaluation;
import com.oualanger.grhBackEnd.Pointage.Model.Pointage;
import com.oualanger.grhBackEnd.Technicien.model.Technicien;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class TechnicienDto {

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
    private List<Pointage> pointages; // Liste des techniciens sous forme de DTO
    private List<Evaluation> evaluations;
    private String situationFamiliale;
    private String fonction;

    // Méthode de mapping d'un Technicien en TechnicienDto
    public static TechnicienDto mapToTechnicienRequest(Technicien technicien) {
        TechnicienDto mappedTechnicienRequest = new TechnicienDto();

        // Mapping des champs
        mappedTechnicienRequest.setId(technicien.getId());
        mappedTechnicienRequest.setMatricule(technicien.getMatricule());
        mappedTechnicienRequest.setNom(technicien.getNom());
        mappedTechnicienRequest.setPrenom(technicien.getPrenom());
        mappedTechnicienRequest.setDateRecrutement(technicien.getDateRecrutement()); // Conversion LocalDate en String
        mappedTechnicienRequest.setDateNaissance(technicien.getDateNaissance()); // Conversion LocalDate en String
        mappedTechnicienRequest.setTelephone(technicien.getTelephone());
        mappedTechnicienRequest.setEmail(technicien.getEmail());
        mappedTechnicienRequest.setCin(technicien.getCin());
        mappedTechnicienRequest.setAdresseRue(technicien.getAdresseRue());
        mappedTechnicienRequest.setAdresseVille(technicien.getAdresseVille());
        mappedTechnicienRequest.setAdresseRegion(technicien.getAdresseRegion());
        mappedTechnicienRequest.setAdresseCodePostal(technicien.getAdresseCodePostal());
        mappedTechnicienRequest.setSituationFamiliale(technicien.getSituationFamiliale());
        mappedTechnicienRequest.setFonction(technicien.getFonction());

        return mappedTechnicienRequest;
    }
}
