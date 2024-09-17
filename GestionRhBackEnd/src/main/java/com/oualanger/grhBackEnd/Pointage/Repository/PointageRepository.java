package com.oualanger.grhBackEnd.Pointage.Repository;

import com.oualanger.grhBackEnd.Pointage.Model.Pointage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PointageRepository extends JpaRepository<Pointage, Long> {

}
