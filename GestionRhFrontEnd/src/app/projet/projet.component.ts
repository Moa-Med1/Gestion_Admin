import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Projet } from '../models/projet.model';
import { Technicien } from '../models/technicien.model';
import { ProjetService } from '../Service/projet-service.service';

import { Router } from '@angular/router';
import { TechnicienService } from '../Service/technicien-service.service';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  projet: Projet = this.createEmptyProjet();
  projets: Projet[] = [];
  filteredProjets: Projet[] = [];
  techniciens: Technicien[] = [];
  filteredTechniciens: Technicien[] = [];
  techniciensSelectionnes: Technicien[] = []; // pour ajouter les techniciens selectionner
  isEditMode: boolean = false;
  showForm: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  toastMessage: string = '';
  toastType: string = '';
  searchQuery: string = '';
  currentTab: string = 'details';
  idProjetAssign: number = 0;
  isFormValid: boolean = false;
  dateFinInvalid: boolean = false;
  assignationEnCours: boolean = false; // Indicateur pour éviter l'ajout de produit pendant l'assignation
  showListTechniciens: boolean = false; //Pour cacher ou montrer la section ListTech si on click sur ok 

  constructor(private projetService: ProjetService,
    private technicienService: TechnicienService,
    private router: Router,) {}

  ngOnInit(): void {
    this.isFormValid = false; // Initialisation
    this.getProjets();
    this.getTechniciens(); // Récupération des techniciens lors de l'initialisation
  }

  // Méthode pour soumettre le formulaire
  onSubmit(form: NgForm): void {
    if (!form.valid) {
      this.toastMessage = 'Veuillez remplir correctement tous les champs.';
      this.toastType = 'error';
      this.hideToastAfterDelay();
      return;
    }
    if (this.currentTab === 'dates') {
      this.checkDateFin();
    }

    if (this.dateFinInvalid) {
      this.toastMessage = 'La date de fin ne peut pas être inférieure à la date de début.';
      this.toastType = 'error';
      this.hideToastAfterDelay();
      return;
    }

    this.saveProjet();
    //Pour revenir a la page normal apres le save 
    this.toggleForm();
  }

  //********  Debut pour la list des techniciens *****************////////////////

    // Vérifie si un technicien est sélectionné
    isTechnicienSelected(technicien: Technicien): boolean {
      return this.techniciensSelectionnes.some(t => t.id === technicien.id);
    }

  // Méthodes pour gérer la liste des techniciens
  filterTechniciens(): Technicien[] {
    const query = this.searchQuery?.toLowerCase() || '';
  
    // Vérifier si le projet et la liste des techniciens associés au projet existent
    const techniciensAssociesIds = this.projet?.techniciens?.map(t => t.id) || [];
  
    return this.techniciens.filter(technicien => {
      const technicienId = technicien.id;
  
      // Filtrer les techniciens dont l'ID ne figure pas dans la liste des techniciens associés au projet
      return !techniciensAssociesIds.includes(technicienId) &&
        (technicien.nom?.toLowerCase().includes(query) || technicien.prenom?.toLowerCase().includes(query));
    });
  }
  

  cancelSelection(): void {
    // Réinitialise les techniciens sélectionnés
    this.techniciensSelectionnes = [];
    
    // Cache la liste des techniciens
    this.showListTechniciens = false;
    
    // Réinitialiser la vue ou l'état si nécessaire
    this.currentTab = 'details'; // Ou un autre état approprié
  }
  
  
  async someMethod() {
    try {
      // Utilisation de await pour attendre la fin de updateProjet
      await this.updateProjet(this.idProjetAssign, this.projet);
  
      // Code à exécuter après la mise à jour du projet
      console.log('Le projet a été mis à jour avec succès.');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du projet:', error);
    }

  }
  confirmerSelection(): void {
    
    if (this.techniciensSelectionnes.length === 0) {
      // Hide the listTechniciens section if no technicians are selected
      this.showListTechniciens = false;
      return;
    }

    // Assigner les techniciens sélectionnés au projet
    this.projet.techniciens = Array.from(this.techniciensSelectionnes);
   
    // Mettre à jour le projet avec les techniciens sélectionnés
    this.someMethod();
  
    // Réinitialiser les techniciens sélectionnés après l'assignation
    this.techniciensSelectionnes = [];
  
    // Rediriger vers RapportComponent
    this.router.navigate(['/rapport']);
  }

  toggleSelection(technicien: Technicien): void {
    const index = this.techniciensSelectionnes.findIndex(t => t.id === technicien.id);
    if (index === -1) {
      this.techniciensSelectionnes.push(technicien); // Ajouter l'objet Technicien
    } else {
      this.techniciensSelectionnes.splice(index, 1); // Retirer l'objet Technicien
    }
   
  }
  

  // Méthodes pour gérer les onglets et l'assignation
  changeTab(tabName: string): void {
    this.currentTab = tabName;
  }

  terminerAssignation(): void {
    this.assignationEnCours = false;
    this.currentTab = 'details'; // Revenir à l'onglet des détails ou autre
  }

  handleClick(projetId: number): void {
    this.assignationEnCours = true;
    this.idProjetAssign = projetId;
    this.editProjetById(projetId);
    this.changeTab('listTechniciens');
    this.showListTechniciens = true; // Show the list of technicians
  }
  //********  Fin pour la list des techniciens *****************////////////////

  // Méthodes pour la gestion des projets
  checkDateFin(): void {
    if (this.projet.dateDebut && this.projet.dateFin) {
      this.dateFinInvalid = new Date(this.projet.dateFin) < new Date(this.projet.dateDebut);
    } else {
      this.dateFinInvalid = false;
    }
  }

  editProjetById(id: number): void {
    this.projetService.getProjetById(id).subscribe(
      (projet: Projet) => {
        this.projet = projet;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du projet', error);
        this.toastMessage = 'Erreur lors de la récupération du projet.';
        this.toastType = 'error';
        this.hideToastAfterDelay();
      }
    );
  }

  saveProjet(): void {
    if (this.isEditMode) {
      this.updateProjet(this.projet.id, this.projet);
    } else {
      this.createProjet();
    }
  }

  createProjet(): void {
    this.projetService.createProjet(this.projet).subscribe(
      (data: Projet) => {
       
        this.projets.push(data);
        this.filteredProjets = [...this.projets];
        this.toastMessage = 'Projet créé avec succès !';
        this.toastType = 'success';
        this.hideToastAfterDelay();
        this.resetForm();
      },
      (error: any) => {
        console.error('Erreur lors de la création du projet', error);
        this.toastMessage = 'Erreur lors de la création du projet.';
        this.toastType = 'error';
        this.hideToastAfterDelay();
      }
    );
  }

  updateProjet(id: number, projet: Projet): void {
    this.projetService.updateProjet(id, projet).subscribe(
      (data: Projet) => {
        console.log("Apres enrregistrement")
        console.log(data)
        const index = this.projets.findIndex(p => p.id === data.id);
        this.projets[index] = data;
        this.filteredProjets = [...this.projets];
        this.toastMessage = 'Projet mis à jour avec succès !';
        this.toastType = 'success';
        this.hideToastAfterDelay();
        this.resetForm();
      },
      (error: any) => {
        console.error('Erreur lors de la mise à jour du projet', error);
        this.toastMessage = 'Erreur lors de la mise à jour du projet.';
        this.toastType = 'error';
        this.hideToastAfterDelay();
      }
    );
  }
  

  editProjet(id: number): void {
    this.projetService.getProjets().subscribe(
      (data: Projet[]) => {
        const projet = data.find(p => p.id === id);
        if (projet) {
          this.projet = projet;
          this.isEditMode = true;
          this.showForm = true;
        }
      },
      (error: any) => {
        console.error('Erreur lors de la récupération du projet', error);
        this.toastMessage = 'Erreur lors de la récupération du projet.';
        this.toastType = 'error';
        this.hideToastAfterDelay();
      }
    );
  }

  confirmDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      this.projetService.deleteProjet(id).subscribe(
        () => {
          this.projets = this.projets.filter(p => p.id !== id);
          this.filteredProjets = [...this.projets];
          this.toastMessage = 'Projet supprimé avec succès !';
          this.toastType = 'success';
          this.hideToastAfterDelay();
        },
        (error: any) => {
          console.error('Erreur lors de la suppression du projet', error);
          this.toastMessage = 'Erreur lors de la suppression du projet.';
          this.toastType = 'error';
          this.hideToastAfterDelay();
        }
      );
    }
  }

  getProjets(): void {
    this.projetService.getProjets().subscribe(
      (data: Projet[]) => {
        this.projets = data;
        this.filteredProjets = [...this.projets];
        this.totalPages = Math.ceil(this.projets.length / this.itemsPerPage);
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des projets', error);
      }
    );
  }

  // Nouvelle méthode pour récupérer les techniciens (fictifs pour l'instant)
  getTechniciens(): void {
    this.technicienService.getTechniciens().subscribe(
      (techniciens: Technicien[]) => {
        this.techniciens = techniciens;
      },
      error => {
        console.error('Erreur lors de la récupération des techniciens', error);
        this.showToast('Erreur lors de la récupération des techniciens.', 'error');
      }
    );
  }
  
  showToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;

    setTimeout(() => {
      this.toastMessage = '';
    }, 3000); // Affiche le message pendant 3 secondes
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.projet = this.createEmptyProjet();
    this.currentTab = 'details';
    this.isEditMode = false;
    this.searchQuery = '';
    this.dateFinInvalid = false;
    this.assignationEnCours = false; // Réinitialiser l'état de l'assignation
    this.techniciensSelectionnes.length = 0; // Réinitialiser les techniciens sélectionnés
  }

  createEmptyProjet(): Projet {
    return {
      id: 0,
      nom: '',
      emplacement: '',
      dateDebut: '',
      dateFin: '',
      responsable: '',
      etat: 'en cours',
      commentaire: '',
      techniciens: []
    };
  }

  filterProjets(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value.toLowerCase();
    this.filteredProjets = this.projets.filter(projet =>
      projet.nom.toLowerCase().includes(query)
    );
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.filteredProjets = this.projets.slice((page - 1) * this.itemsPerPage, page * this.itemsPerPage);
    }
  }

  hideToastAfterDelay(): void {
    setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }

  isFormComplete(): boolean {
    // Vérifiez que chaque section est remplie et valide
    const detailsValid = !!(this.projet.nom && this.projet.emplacement);
    const datesValid = !!(this.projet.dateDebut && this.projet.dateFin && !this.dateFinInvalid);
    const responsableValid = !!this.projet.responsable;
  
    // Tous les champs doivent être remplis
    return detailsValid && datesValid && responsableValid;
  }
}
