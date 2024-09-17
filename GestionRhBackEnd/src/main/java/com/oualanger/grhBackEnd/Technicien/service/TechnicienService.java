package com.oualanger.grhBackEnd.Technicien.service;

import com.oualanger.grhBackEnd.Technicien.Dto.TechnicienDto;
import com.oualanger.grhBackEnd.Technicien.Mappers.TechnicienMapper;
import com.oualanger.grhBackEnd.Technicien.model.Technicien;
import com.oualanger.grhBackEnd.Technicien.repository.TechnicienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TechnicienService {

    @Autowired
    private TechnicienRepository technicienRepository;

    @Autowired
    private TechnicienMapper technicienMapper; // Injecter le mapper

    public List<TechnicienDto> findAll() {
        List<Technicien> techniciens = technicienRepository.findAll();
        return techniciens.stream()
                .map(technicienMapper::toDTO) // Convertit chaque Technicien en TechnicienDto
                .collect(Collectors.toList());
    }

    public Optional<TechnicienDto> findById(Long id) {
        Optional<Technicien> technicien = technicienRepository.findById(id);
        return technicien.map(technicienMapper::toDTO); // Convertit Technicien en TechnicienDto
    }

    public TechnicienDto save(TechnicienDto technicienDto) {
        Technicien technicien = technicienMapper.toModel(technicienDto); // Convertit TechnicienDto en Technicien
        Technicien savedTechnicien = technicienRepository.save(technicien);
        return technicienMapper.toDTO(savedTechnicien); // Convertit Technicien sauvegardé en TechnicienDto
    }

    public void deleteById(Long id) {
        technicienRepository.deleteById(id); // Supprime un technicien par son ID
    }
}
