package com.oualanger.grhBackEnd.Projet.service;

import com.oualanger.grhBackEnd.Evaluation.Dto.EvaluationDto;
import com.oualanger.grhBackEnd.Evaluation.Mappers.EvaluationMapper;
import com.oualanger.grhBackEnd.Evaluation.Model.Evaluation;
import com.oualanger.grhBackEnd.Projet.Dto.ProjetDto;
import com.oualanger.grhBackEnd.Projet.Mappers.ProjetMapper;
import com.oualanger.grhBackEnd.Projet.model.Projet;
import com.oualanger.grhBackEnd.Projet.repository.ProjetRepository;
import com.oualanger.grhBackEnd.Technicien.Mappers.TechnicienMapper;
import com.oualanger.grhBackEnd.Technicien.model.Technicien;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjetService {

    @Autowired
    private ProjetRepository projetRepository;

    @Autowired
    private ProjetMapper projetMapper;

    @Autowired
    private TechnicienMapper technicienMapper;

    @Autowired
    private EvaluationMapper evaluationMapper;

    // Récupère tous les projets et les convertit en ProjetDto
    public List<ProjetDto> findAll() {
        return projetMapper.toDTOs(projetRepository.findAll());
    }

    // Récupère un projet par son ID et le convertit en ProjetDto
    public Optional<ProjetDto> findById(Long id) {
        return projetRepository.findById(id)
                .map(projetMapper::toDTO); // Convertit Projet en ProjetDto
    }

    // Enregistre un nouveau projet et le convertit en ProjetDto
    public ProjetDto save(ProjetDto projetDto) {
        Projet projet = projetMapper.toModel(projetDto); // Convertit ProjetDto en Projet

        // Gérer les techniciens associés
        List<Technicien> techniciens = technicienMapper.toModels(projetDto.getTechniciens());
        projet.setTechniciens(techniciens);

        // Sauvegarde du projet
        return projetMapper.toDTO(projetRepository.save(projet)); // Convertit le Projet sauvegardé en ProjetDto
    }

    public ProjetDto updateProjet(Long id, ProjetDto projetDto) {
        // Récupère le projet existant par ID
        Projet existingProjet = projetRepository.findById(projetDto.getId())
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Met à jour les champs (sauf techniciens)
        existingProjet.setNom(projetDto.getNom());
        existingProjet.setEmplacement(projetDto.getEmplacement());
        existingProjet.setDateDebut(projetDto.getDateDebut());
        existingProjet.setDateFin(projetDto.getDateFin());
        existingProjet.setResponsable(projetDto.getResponsable());
        existingProjet.setEtat(projetDto.getEtat());
        existingProjet.setCommentaire(projetDto.getCommentaire());

        // Gérer les techniciens associés (ajouter sans écraser)
        List<Technicien> newTechniciens = technicienMapper.toModels(projetDto.getTechniciens());

        // Ajouter les nouveaux techniciens sans supprimer les existants
        for (Technicien newTechnicien : newTechniciens) {
            if (!existingProjet.getTechniciens().contains(newTechnicien)) {
                existingProjet.addTechnicien(newTechnicien); // Méthode d'ajout de technicien
            }
        }

        // Sauvegarde et retourne le projet mis à jour
        return projetMapper.toDTO(projetRepository.save(existingProjet));
    }
    public ProjetDto removeTechProjet(Long idProjet, ProjetDto projetDto) {
        // Récupère le projet existant par ID
        Projet existingProjet = projetRepository.findById(idProjet)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Met à jour les champs du projet (sauf techniciens)
        existingProjet.setNom(projetDto.getNom());
        existingProjet.setEmplacement(projetDto.getEmplacement());
        existingProjet.setDateDebut(projetDto.getDateDebut());
        existingProjet.setDateFin(projetDto.getDateFin());
        existingProjet.setResponsable(projetDto.getResponsable());
        existingProjet.setEtat(projetDto.getEtat());
        existingProjet.setCommentaire(projetDto.getCommentaire());

        // Remplace la liste des techniciens existants par la nouvelle liste
        List<Technicien> newTechniciens = technicienMapper.toModels(projetDto.getTechniciens());
        existingProjet.setTechniciens(newTechniciens);

        // Sauvegarde et retourne le projet mis à jour
        return projetMapper.toDTO(projetRepository.save(existingProjet));
    }


    // Supprime un projet par son ID
    public void deleteById(Long id) {
        projetRepository.deleteById(id);
    }

    // Ajouter cette méthode pour sauvegarder une liste de projets
    public List<Projet> saveProjets(List<ProjetDto> projetDtos) {
        List<Projet> projets = projetDtos.stream()
                .map(projetDto -> projetMapper.toModel(projetDto))
                .collect(Collectors.toList());
        return projetRepository.saveAll(projets);
    }
}
