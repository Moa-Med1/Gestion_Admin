import { Component, OnInit } from '@angular/core';
import { TechnicienService } from '../Service/technicien-service.service'; // Assurez-vous que le chemin est correct
import { Technicien } from '../models/technicien.model'; // Assurez-vous que le chemin est correct
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-technicien',
  templateUrl: './technicien.component.html',
  styleUrls: ['./technicien.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TechnicienComponent implements OnInit {
  technicien: Technicien = {
    id: 0,
    matricule: '',
    nom: '',
    prenom: '',
    dateRecrutement: '',
    dateNaissance: '',
    telephone: '',
    email: '',
    cin: '',
    adresseRue: '',
    adresseVille: '',
    adresseRegion: '',
    adresseCodePostal: '',
    situationFamiliale: '',
    fonction: ''
  };

  techniciens: Technicien[] = [];
  showForm: boolean = false;
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  editIndex: number | null = null;
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success';
  currentTab: 'infos' | 'adresse' | 'autres' = 'infos'; // Ajouter cette ligne pour gérer les onglets

  situationsFamiliales: string[] = ['Célibataire', 'Marié', 'Divorcé', 'Veuf'];

  constructor(private technicienService: TechnicienService) { }

  ngOnInit(): void {
    this.getTechniciens();
  }

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

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.technicien = {
      id: 0,
      matricule: '',
      nom: '',
      prenom: '',
      dateRecrutement: '',
      dateNaissance: '',
      telephone: '',
      email: '',
      cin: '',
      adresseRue: '',
      adresseVille: '',
      adresseRegion: '',
      adresseCodePostal: '',
      situationFamiliale: '',
      fonction: ''
    };
    this.editIndex = null;
    this.currentTab = 'infos'; // Réinitialiser l'onglet à 'infos' lors de la réinitialisation du formulaire
  }

  saveTechnicien(): void {
    if (this.isFormValid()) {
      if (this.editIndex === null) {
        // Ajouter un nouveau technicien
        this.technicienService.createTechnicien(this.technicien).subscribe(
          (nouveauTechnicien: Technicien) => {
            this.techniciens.push(nouveauTechnicien);
            this.showToast('Technicien ajouté avec succès.', 'success');
            this.toggleForm();
          },
          error => {
            console.error('Erreur lors de l\'ajout du technicien', error);
            this.showToast('Erreur lors de l\'ajout du technicien.', 'error');
          }
        );
      } else {
        // Mettre à jour un technicien existant
        this.technicienService.updateTechnicien(this.technicien.id, this.technicien).subscribe(
          () => {
            this.techniciens[this.editIndex!] = this.technicien;
            this.showToast('Technicien mis à jour avec succès.', 'success');
            this.toggleForm();
          },
          error => {
            console.error('Erreur lors de la mise à jour du technicien', error);
            this.showToast('Erreur lors de la mise à jour du technicien.', 'error');
          }
        );
      }
    } else {
      this.showToast('Veuillez vérifier les informations du formulaire.', 'error');
    }
  }

  editTechnicien(id: number): void {
    const technicien = this.techniciens.find(t => t.id === id);
    if (technicien) {
      this.technicien = { ...technicien };
      this.editIndex = this.techniciens.indexOf(technicien);
      this.toggleForm();
    }
  }

  deleteTechnicien(id: number): void {
    this.technicienService.deleteTechnicien(id).subscribe(
      () => {
        this.techniciens = this.techniciens.filter(t => t.id !== id);
        this.showToast('Technicien supprimé avec succès.', 'success');
      },
      error => {
        console.error('Erreur lors de la suppression du technicien', error);
        this.showToast('Erreur lors de la suppression du technicien.', 'error');
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

  get totalPages(): number {
    return Math.ceil(this.techniciens.length / this.itemsPerPage);
  }

  get filteredTechniciens(): Technicien[] {
    return this.techniciens
      .filter(tech => {
        return (
          tech.nom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          tech.prenom.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          tech.matricule.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      })
      .slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  isFormValid(): boolean {
    const cinValid = this.technicien.cin.length === 8;
    const emailUnique = !this.techniciens.some(t => t.email === this.technicien.email && t.id !== this.technicien.id);
    const telephoneUnique = !this.techniciens.some(t => t.telephone === this.technicien.telephone && t.id !== this.technicien.id);
    const matriculeUnique = !this.techniciens.some(t => t.matricule === this.technicien.matricule && t.id !== this.technicien.id);

    return cinValid &&
           emailUnique &&
           telephoneUnique &&
           matriculeUnique &&
           this.technicien.matricule !== '' &&
           this.technicien.nom !== '' &&
           this.technicien.prenom !== '' &&
           this.technicien.dateRecrutement !== '' &&
           this.technicien.dateNaissance !== '' &&
           this.technicien.telephone !== '' &&
           this.technicien.email !== '' &&
           this.technicien.cin !== '' &&
           this.technicien.adresseRue !== '' &&
           this.technicien.adresseVille !== '' &&
           this.technicien.adresseRegion !== '' &&
           this.technicien.adresseCodePostal !== '' &&
           this.technicien.situationFamiliale !== '' &&
           this.technicien.fonction !== '';
  }
}
