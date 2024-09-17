package com.oualanger.grhBackEnd.Projet.controller;

import com.oualanger.grhBackEnd.Projet.Dto.ProjetDto;
import com.oualanger.grhBackEnd.Projet.service.ProjetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ProjetController {

    @Autowired
    private ProjetService projetService;

    @GetMapping("/projets")
    public List<ProjetDto> getAllProjets() {
        return projetService.findAll();
    }

    @GetMapping("/projets/{id}")
    public ResponseEntity<ProjetDto> getProjetById(@PathVariable Long id) {
        Optional<ProjetDto> projetDto = projetService.findById(id);
        return projetDto.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build()); // Retourne 404 si le projet n'existe pas
    }

    @PostMapping("/projets")
    public ResponseEntity<ProjetDto> createProjet(@RequestBody ProjetDto projetDto) {
        ProjetDto savedProjetDto = projetService.save(projetDto);
        return ResponseEntity.status(201).body(savedProjetDto); // Retourne 201 pour une création réussie
    }

    @PutMapping("/projets/{id}")
    public ResponseEntity<ProjetDto> updateProjet(@PathVariable Long id, @RequestBody ProjetDto projetDto) {
        try {
            ProjetDto updatedProjetDto = projetService.updateProjet(id, projetDto);
            return ResponseEntity.ok(updatedProjetDto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/projets/{id}")
    public ResponseEntity<Void> deleteProjet(@PathVariable Long id) {
        if (projetService.findById(id).isPresent()) {
            projetService.deleteById(id);
            return ResponseEntity.noContent().build(); // Retourne 204 pour une suppression réussie
        } else {
            return ResponseEntity.notFound().build(); // Retourne 404 si le projet n'existe pas
        }
    }

    @PutMapping("/projets/tech/{id}")
    public ResponseEntity<ProjetDto> removeTechProjet(@PathVariable Long id, @RequestBody ProjetDto projetDto) {
        try {
            ProjetDto updatedProjetDto = projetService.removeTechProjet(id, projetDto);
            return ResponseEntity.ok(updatedProjetDto);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
