package com.oualanger.grhBackEnd.Projet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.oualanger.grhBackEnd.Projet.model.Projet;

@Repository
public interface ProjetRepository extends JpaRepository<Projet, Long> {
    // Interface pour accéder aux données des projets
}
