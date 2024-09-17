import { Component, OnInit } from '@angular/core';
import { PointageService } from '../Service/pointage-service.service';
import { Pointage } from '../models/pointage.model';
import { ProjetService } from '../Service/projet-service.service';
import { Projet } from '../models/projet.model';
import { Technicien } from '../models/technicien.model'; // Assurez-vous d'importer le modèle Technicien

@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrls: ['./pointage.component.css']
})
export class PointageComponent implements OnInit {
  pointages: Pointage[] = [];
  filteredPointages: Pointage[] = [];
  pagedPointages: Pointage[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  searchQuery: string = '';
  showForm: boolean = false;
  currentTab: string = 'infos';
  toastMessage: string | null = null;
  toastType: string | null = null;
  originalPointages: Pointage[] = [];
  pointage: Pointage = {
    id: 0,
    date: '',
    heureDebut: '',
    heureFin: '',
    commentaire: '',
    nomPrenomTechnicien: '',
    heuresSupplementaires: '',
    heureTravail: '',
    idTechPointage: 0 // Ajouter ce champ
  };
  heuresSupplementaire: string ='';
  techniciensFormatted: { id: number, fullName: string }[] = []; // Pour récupérer le nom et prénom
  techniciens: Technicien[] = []; // Liste des techniciens associés aux projets
  selectedTechnicien: number | null = null; // Technicien sélectionné son id

  constructor(
    private pointageService: PointageService,
    private projetService: ProjetService
  ) { }

  ngOnInit(): void {
    this.loadPointages();
    this.getProjets();
  }

  // Charge les pointages depuis le service
  loadPointages(): void {
    this.pointageService.getPointages().subscribe({
      next: (data: Pointage[]) => {
        
        this.originalPointages = data;
        this.pointages = data;
        this.filteredPointages = data;
        this.updatePagination();
      },
      error: error => {
        console.error('Erreur lors du chargement des pointages:', error);
      }
    });
  }

  // Récupère les techniciens associés aux projets
  getProjets(): void {
  
    this.projetService.getProjets().subscribe(
        (data: Projet[]) => {
            this.techniciensFormatted = data
                .flatMap(projet => projet.techniciens || [])
                .filter((value, index, self) =>
                    index === self.findIndex(t => t.id === value.id)
                )
                .map(t => ({
                    id: t.id,
                    fullName: `${t.nom} ${t.prenom}`
                }));
        },
        (error) => {
            console.error('Erreur lors de la récupération des projets', error);
        }
    );
  }

  // Affiche ou cache le formulaire de pointage
  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetPointageForm();
    }
  }

  // Réinitialise les données du formulaire de pointage
  resetPointageForm(): void {
    this.pointage = {
      id: 0,
      date: '',
      heureDebut: '',
      heureFin: '',
      commentaire: '',
      nomPrenomTechnicien: '',
      heuresSupplementaires: '',
      heureTravail: '',
      idTechPointage: 0 // Réinitialiser également ce champ
    };
    this.selectedTechnicien = null; // Réinitialise le technicien sélectionné
  }

  // Change l'onglet affiché
  changeTab(tabName: string): void {
    this.currentTab = tabName;
  }

  onSubmit(): void {
    if (this.selectedTechnicien !== null) {
      this.pointage.idTechPointage = this.selectedTechnicien;
  
      const technicien = this.techniciensFormatted.find(t => t.id === this.selectedTechnicien);
      const fullName = technicien ? technicien.fullName : 'Nom inconnu';
  
      this.pointage.nomPrenomTechnicien = fullName;
      
      // Update or create pointage
      if (this.pointage.id !== 0) {
        this.pointageService.updatePointage(this.pointage.id, this.pointage).subscribe({
          next: () => {
            this.showToast('Pointage mis à jour avec succès', 'success');
            this.loadPointages();
            this.toggleForm();
          },
          error: error => {
            console.error('Erreur lors de la mise à jour du pointage:', error);
          }
        });
      } else {
        this.pointageService.createPointage(this.pointage).subscribe({
          next: () => {
            this.showToast('Pointage ajouté avec succès', 'success');
            this.loadPointages();
            this.toggleForm();
          },
          error: error => {
            console.error('Erreur lors de l\'ajout du pointage:', error);
          }
        });
      }
    } else {
      this.showToast('Veuillez sélectionner un technicien', 'error');
    }
  }
  
  ///*********************POur calucler les differences d'heures ********************/
  
// Calculate the total worked hours
calculDifferenceHeure(heureDebut: string, heureFin: string): string {
  // Convert strings to Date objects with a fictitious date
  const startTime = new Date(`1970-01-01T${heureDebut}`);
  const endTime = new Date(`1970-01-01T${heureFin}`);

  // Check if end time is before start time, assume overnight shift
  if (endTime < startTime) {
    endTime.setDate(endTime.getDate() + 1); // Adjust end time to the next day
  }

  // Calculate the difference in milliseconds
  const diffInMs = endTime.getTime() - startTime.getTime();

  this.heuresSupplementaire = this.calculateRemainingTimeAfterEightHours(diffInMs);

  // Check if the difference is negative (e.g., end time is before start time)
  if (diffInMs < 0) {
    console.error('Erreur : l\'heure de fin est antérieure à l\'heure de début.');
    return 'NaN'; // Or handle the error case as needed
  }
 
  // Convert the difference to hours
  return this.convertMillisecondsToTimeFormat(diffInMs);
}

//Convertir en heure
convertMillisecondsToTimeFormat(diffInMs: number): string {
  if (diffInMs < 0) {
    console.error('Erreur : la différence de temps est négative.');
    return '00:00'; // Handle the error case
  }

  // Convert milliseconds to total minutes
  const totalMinutes = Math.floor(diffInMs / (1000 * 60));

  // Extract hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Format hours and minutes as "HH:mm"
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}

calculateRemainingTimeAfterEightHours(diffInMs: number){
  const eightHoursInMs = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

  // If the difference is less than or equal to 8 hours, return zero hours and minutes
  if (diffInMs <= eightHoursInMs) {
    return '00:00';
  }

  // Calculate the remaining time after subtracting 8 hours
  const remainingMs = diffInMs - eightHoursInMs;
  const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
  const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));

  // Format hours and minutes as "HH:mm"
  const formattedHours = remainingHours.toString().padStart(2, '0');
  const formattedMinutes = remainingMinutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}


  ///*********************POur calucler les differences d'heures FIN ********************/

  
  // Filtrer les pointages par nom complet du technicien
  filterPointages(): void {
    if (this.searchQuery) {
      const searchQueryLower = this.searchQuery.toLowerCase();
      this.filteredPointages = this.originalPointages.filter(pointage => {
        const technicien = this.techniciensFormatted.find(t => t.id === pointage.idTechPointage);
        const fullName = technicien ? technicien.fullName.toLowerCase() : '';
        return fullName.includes(searchQueryLower);
      });
    } else {
      this.filteredPointages = [...this.originalPointages]; // Réinitialiser à la liste complète
    }
    this.updatePagination(); // Met à jour la pagination après le filtrage
  }  

  // Charge les détails du pointage pour modification
  editPointage(id: number): void {
    this.pointageService.getPointage(id).subscribe({
      next: (data: Pointage) => {
        this.pointage = data;
        this.selectedTechnicien = data.idTechPointage || null; // Préselecte le technicien
        this.showForm = true;
      },
      error: error => {
        console.error('Erreur lors de la récupération du pointage:', error);
      }
    });
  }

  // Confirme la suppression d'un pointage
  confirmDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce pointage ?')) {
      this.pointageService.deletePointage(id).subscribe({
        next: () => {
          this.showToast('Pointage supprimé avec succès', 'success');
          this.loadPointages();
        },
        error: error => {
          console.error('Erreur lors de la suppression du pointage:', error);
        }
      });
    }
  }

  // Affiche un message toast
  showToast(message: string, type: string): void {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = null;
      this.toastType = null;
    }, 3000);
  }

  // Met à jour les données pour la pagination
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredPointages.length / this.itemsPerPage);
    this.pointages = this.filteredPointages.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  // Change de page dans la pagination
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }
}
