package com.oualanger.grhBackEnd.Technicien.repository;

import com.oualanger.grhBackEnd.Technicien.model.Technicien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TechnicienRepository extends JpaRepository<Technicien, Long> {
    // Interface pour accéder aux données des techniciens
}
