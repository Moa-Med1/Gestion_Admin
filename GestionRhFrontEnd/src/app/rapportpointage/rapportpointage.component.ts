import { Component, OnInit } from '@angular/core';
import { Pointage } from '../models/pointage.model';
import { PointageService } from '../Service/pointage-service.service';

@Component({
  selector: 'app-rapportpointage',
  templateUrl: './rapportpointage.component.html',
  styleUrls: ['./rapportpointage.component.css']
})
export class RapportpointageComponent implements OnInit {
  searchQuery: string = '';
  selectedRapport: Pointage | null = null;
  rapports: Pointage[] = [];
  filteredRapports: Pointage[] = [];

  constructor(private pointageService: PointageService) { }

  ngOnInit(): void {
    this.loadPointages();
  }

  // Charge les pointages depuis le service
  loadPointages(): void {
    this.pointageService.getPointages().subscribe({
      next: (data: Pointage[]) => {
        this.rapports = data;
        this.filteredRapports = this.rapports;
      },
      error: error => {
        console.error('Erreur lors de la récupération des pointages', error);
      }
    });
  }

  // Filtre les rapports en fonction de la recherche
  filterRapports(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredRapports = this.rapports;
    } else {
      this.filteredRapports = this.rapports.filter(rapport =>
        (rapport.commentaire || '').toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  // Affiche ou cache les détails du rapport sélectionné
  showDetails(rapport: Pointage): void {
    this.selectedRapport = this.selectedRapport === rapport ? null : rapport;
  }

  // Imprime le rapport sélectionné
  printReport(rapport: Pointage): void {
    // Ajouter la logique spécifique d'impression ici si nécessaire
    window.print();
  }

  // Envoie une notification pour le rapport sélectionné
  notifyReport(rapport: Pointage): void {
    // Ajouter la logique spécifique pour envoyer une notification
    alert('Notification envoyée pour le pointage du technicien ID ' + (rapport.idTechPointage || 'Inconnu'));
  }

  // Obtient le nom du technicien à partir de l'ID (à implémenter)
  getTechnicienName(technicienId: number): string {
    // Implémentez cette méthode pour retourner le nom du technicien basé sur l'ID
    // Vous pourriez avoir besoin d'appeler un autre service ou utiliser une liste prédéfinie
    return 'Nom du Technicien'; // Remplacez ceci par la logique appropriée
  }
}
