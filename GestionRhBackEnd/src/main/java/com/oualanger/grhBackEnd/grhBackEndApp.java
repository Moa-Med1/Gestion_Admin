package com.oualanger.grhBackEnd;

import com.oualanger.grhBackEnd.Evaluation.Model.Evaluation;
import com.oualanger.grhBackEnd.Evaluation.Repository.EvaluationRepository;
import com.oualanger.grhBackEnd.Pointage.Model.Pointage;
import com.oualanger.grhBackEnd.Pointage.Repository.PointageRepository;
import com.oualanger.grhBackEnd.Technicien.model.Technicien;
import com.oualanger.grhBackEnd.Projet.model.Projet;
import com.oualanger.grhBackEnd.Technicien.repository.TechnicienRepository;
import com.oualanger.grhBackEnd.Projet.repository.ProjetRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@SpringBootApplication
public class grhBackEndApp {

	public static void main(String[] args) {
		SpringApplication.run(grhBackEndApp.class, args);
	}

	@Bean
	public CommandLineRunner demo(TechnicienRepository technicienRepository, ProjetRepository projetRepository, PointageRepository pointageRepository, EvaluationRepository evaluationRepository) {
		return (args) -> {
			// Create and save Technicien entities
			Technicien technicien1 = new Technicien();
			technicien1.setMatricule("T001");
			technicien1.setNom("Doe");
			technicien1.setPrenom("John");
			technicien1.setDateRecrutement(LocalDate.of(2018, 1, 1));
			technicien1.setDateNaissance(LocalDate.of(1980, 5, 15));
			technicien1.setTelephone("1234567890");
			technicien1.setEmail("john.doe@example.com");
			technicien1.setCin("AB123456");
			technicien1.setAdresseRue("123 Main Street");
			technicien1.setAdresseVille("Hometown");
			technicien1.setAdresseRegion("State");
			technicien1.setAdresseCodePostal("12345");
			technicien1.setSituationFamiliale("Married");
			technicien1.setFonction("Technician");

			Technicien technicien2 = new Technicien();
			technicien2.setMatricule("T002");
			technicien2.setNom("Smith");
			technicien2.setPrenom("Anna");
			technicien2.setDateRecrutement(LocalDate.of(2019, 8, 12));
			technicien2.setDateNaissance(LocalDate.of(1985, 11, 22));
			technicien2.setTelephone("0987654321");
			technicien2.setEmail("anna.smith@example.com");
			technicien2.setCin("CD234567");
			technicien2.setAdresseRue("456 Oak Street");
			technicien2.setAdresseVille("Metropolis");
			technicien2.setAdresseRegion("New York");
			technicien2.setAdresseCodePostal("10001");
			technicien2.setSituationFamiliale("Single");
			technicien2.setFonction("Technician");

			Technicien technicien3 = new Technicien();
			technicien3.setMatricule("T003");
			technicien3.setNom("Brown");
			technicien3.setPrenom("James");
			technicien3.setDateRecrutement(LocalDate.of(2021, 3, 5));
			technicien3.setDateNaissance(LocalDate.of(1992, 7, 15));
			technicien3.setTelephone("1122334455");
			technicien3.setEmail("james.brown@example.com");
			technicien3.setCin("EF345678");
			technicien3.setAdresseRue("789 Pine Street");
			technicien3.setAdresseVille("Gotham");
			technicien3.setAdresseRegion("New Jersey");
			technicien3.setAdresseCodePostal("07001");
			technicien3.setSituationFamiliale("Divorced");
			technicien3.setFonction("Technician");

			Technicien technicien6 = new Technicien();
			technicien6.setMatricule("T006");
			technicien6.setNom("Traore");
			technicien6.setPrenom("Mohamed");
			technicien6.setDateRecrutement(LocalDate.of(2024, 9, 1));
			technicien6.setDateNaissance(LocalDate.of(1980, 1, 15));
			technicien6.setTelephone("6677889900");
			technicien6.setEmail("mohamed.traore@example.com");
			technicien6.setCin("KL678901");
			technicien6.setAdresseRue("987 Elm Street");
			technicien6.setAdresseVille("Sunshine");
			technicien6.setAdresseRegion("Florida");
			technicien6.setAdresseCodePostal("33101");
			technicien6.setSituationFamiliale("Married");
			technicien6.setFonction("Technician");

			Technicien technicien7 = new Technicien();
			technicien7.setMatricule("T007");
			technicien7.setNom("Traore");
			technicien7.setPrenom("Niagale");
			technicien7.setDateRecrutement(LocalDate.of(2024, 9, 1));
			technicien7.setDateNaissance(LocalDate.of(1985, 7, 25));
			technicien7.setTelephone("9988776655");
			technicien7.setEmail("niagale.traore@example.com");
			technicien7.setCin("MN890123");
			technicien7.setAdresseRue("654 Cedar Lane");
			technicien7.setAdresseVille("Sunnydale");
			technicien7.setAdresseRegion("California");
			technicien7.setAdresseCodePostal("90210");
			technicien7.setSituationFamiliale("Single");
			technicien7.setFonction("Technician");

			// Save techniciens
			technicienRepository.save(technicien1);
			technicienRepository.save(technicien2);
			technicienRepository.save(technicien3);
			technicienRepository.save(technicien6);
			technicienRepository.save(technicien7);

			// Create and save Projet entities
			Projet projet1 = new Projet();
			projet1.setNom("Project A");
			projet1.setEmplacement("Location 1");
			projet1.setDateDebut(LocalDate.of(2024, 1, 1));
			projet1.setDateFin(LocalDate.of(2024, 12, 31));
			projet1.setResponsable("Alice");
			projet1.setEtat("En cours");
			projet1.setCommentaire("Project A details");

			Projet projet2 = new Projet();
			projet2.setNom("Project B");
			projet2.setEmplacement("Location 2");
			projet2.setDateDebut(LocalDate.of(2024, 3, 1));
			projet2.setDateFin(LocalDate.of(2024, 9, 30));
			projet2.setResponsable("Bob");
			projet2.setEtat("Annulé");
			projet2.setCommentaire("Project B details");

			Projet projet3 = new Projet();
			projet3.setNom("Project C");
			projet3.setEmplacement("Location 3");
			projet3.setDateDebut(LocalDate.of(2024, 5, 1));
			projet3.setDateFin(LocalDate.of(2024, 11, 30));
			projet3.setResponsable("Charlie");
			projet3.setEtat("En cours");
			projet3.setCommentaire("Project C details");

			// Save projects
			projetRepository.save(projet1);
			projetRepository.save(projet2);
			projetRepository.save(projet3);

			// Assign techniciens to projects
			projet1.setTechniciens(List.of(technicien1, technicien6));  // Assign John Doe and Mohamed Traore
			projet2.setTechniciens(List.of(technicien2, technicien7));  // Assign Anna Smith and Niagale Traore
			projet3.setTechniciens(List.of(technicien3)); // Assign James Brown

			projetRepository.save(projet1);
			projetRepository.save(projet2);
			projetRepository.save(projet3);
			// Create and save Evaluation entities
			Evaluation evaluation1 = new Evaluation();
			evaluation1.setQualite("Excellent");
			evaluation1.setDelai("Respecté");
			evaluation1.setCooperation("Bonne");
			evaluation1.setCommentaire("Travail très bien réalisé.");
			evaluation1.setDateEvaluation(LocalDateTime.of(2024, 9, 15, 10, 0));
			evaluation1.setScoreTotal(95);
			evaluation1.setFormation("Formation avancée recommandée");

			evaluationRepository.save(evaluation1);

			Evaluation evaluation2 = new Evaluation();
			evaluation2.setQualite("Satisfaisant");
			evaluation2.setDelai("Non respecté");
			evaluation2.setCooperation("Moyenne");
			evaluation2.setCommentaire("Des améliorations sont nécessaires.");
			evaluation2.setDateEvaluation(LocalDateTime.of(2024, 9, 16, 11, 0));
			evaluation2.setScoreTotal(75);
			evaluation2.setFormation("Formation de base recommandée");

			evaluationRepository.save(evaluation2);



			// Create and save Pointage entities
			Pointage pointage1 = new Pointage();
			pointage1.setDate(LocalDate.of(2024, 9, 10));
			pointage1.setIdTechPointage(4L);

			pointage1.setNomPrenomTechnicien("Traore Mohamed");
			pointage1.setHeureDebut(LocalTime.of(7, 0)); // 08:00 AM
			pointage1.setHeureFin(LocalTime.of(16, 0));  // 04:00 PM
			pointage1.setHeureSup(LocalTime.of(12, 0)); // 1 hour of overtime
			pointage1.setHeureTravail(LocalTime.of(2, 0)); // 1 hour of overtime

			pointage1.setCommentaire("Worked on Project A");

			Pointage pointage2 = new Pointage();
			pointage2.setDate(LocalDate.of(2024, 9, 11));
			pointage2.setIdTechPointage(5L);
			pointage2.setNomPrenomTechnicien("Traore Niagale");
			pointage2.setHeureDebut(LocalTime.of(9, 0)); // 09:00 AM
			pointage2.setHeureFin(LocalTime.of(17, 0));  // 05:00 PM
			pointage2.setHeureSup(LocalTime.of(1, 0)); // No overtime
			pointage2.setHeureTravail(LocalTime.of(1, 0)); // 1 hour of overtime

			pointage2.setCommentaire("Worked on Project B");

			pointageRepository.save(pointage1);
			pointageRepository.save(pointage2);
		};
	}
}
