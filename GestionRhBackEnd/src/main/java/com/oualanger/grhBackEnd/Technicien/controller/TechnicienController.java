package com.oualanger.grhBackEnd.Technicien.controller;

import com.oualanger.grhBackEnd.Technicien.Dto.TechnicienDto;
import com.oualanger.grhBackEnd.Technicien.service.TechnicienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class TechnicienController {

    @Autowired
    private TechnicienService technicienService;

    @GetMapping("/techniciens")
    public List<TechnicienDto> getAllTechniciens() {
        // Appelle la méthode findAll() du service, qui renvoie une liste de TechnicienDto
        return technicienService.findAll();
    }

    @GetMapping("/techniciens/{id}")
    public ResponseEntity<TechnicienDto> getTechnicienById(@PathVariable Long id) {
        Optional<TechnicienDto> technicienDto = technicienService.findById(id);
        return technicienDto.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build()); // Retourne 404 si le technicien n'existe pas
    }

    @PostMapping("/techniciens")
    public ResponseEntity<TechnicienDto> createTechnicien(@RequestBody TechnicienDto technicienDto) {
        TechnicienDto savedTechnicienDto = technicienService.save(technicienDto);
        return ResponseEntity.status(201).body(savedTechnicienDto); // Retourne 201 pour une création réussie
    }

    @PutMapping("/techniciens/{id}")
    public ResponseEntity<TechnicienDto> updateTechnicien(@PathVariable Long id, @RequestBody TechnicienDto technicienDto) {
        if (technicienService.findById(id).isPresent()) {
            technicienDto.setId(id); // Met à jour l'ID du technicien
            TechnicienDto updatedTechnicienDto = technicienService.save(technicienDto);
            return ResponseEntity.ok(updatedTechnicienDto); // Retourne 200 pour une mise à jour réussie
        } else {
            return ResponseEntity.notFound().build(); // Retourne 404 si le technicien n'existe pas
        }
    }

    @DeleteMapping("/techniciens/{id}")
    public ResponseEntity<Void> deleteTechnicien(@PathVariable Long id) {
        if (technicienService.findById(id).isPresent()) {
            technicienService.deleteById(id); // Supprime un technicien par son ID
            return ResponseEntity.noContent().build(); // Retourne 204 pour une suppression réussie
        } else {
            return ResponseEntity.notFound().build(); // Retourne 404 si le technicien n'existe pas
        }
    }
}
