import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../Service/evalutation-service.service';
import { Evaluation } from '../models/evaluation.model';
import { Technicien } from '../models/technicien.model'; // Importer le modèle Technicien
import { ProjetService } from '../Service/projet-service.service';
import { Projet } from '../models/projet.model';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css'],
})
export class EvaluationComponent implements OnInit {
  evaluation: Evaluation = {
    id: 0,
    qualite: 'Bien',
    delai: 'Bien',
    cooperation: 'Bien',
    formation: 'Pas de formation',
    commentaire: '',
    scoreTotal: 0
  };

  evaluations: Evaluation[] = [];
  filteredEvaluations: Evaluation[] = [];
  techniciensEvalue: Technicien[] = [];
  projetEvolueTech: Projet[] = [];
  showForm: boolean = false;
  showDeleteConfirm: boolean = false;
  confirmDeleteId: number = 0;
  editMode: boolean = false;
  toastMessage: string = '';
  toastType: string = ''; // Ajout de la propriété 'toastType'
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  isFormValid: boolean = true;
  currentTab: string = 'infos'; // Ajout de la propriété 'currentTab'
  selectedTechnicien: number | null = null; //Id tech
  techniciensFormatted: { id: number, fullName: string }[] = [];

  criteres: Array<keyof Evaluation> = ['qualite', 'delai', 'cooperation']; // Utiliser les clés d'Evaluation
  scores: Record<string, number> = {
    'À améliorer': 1,
    'Assez bien': 2,
    'Bien': 3,
    'Excellent': 4
  };

  constructor(private evaluationService: EvaluationService,
              private projetService: ProjetService) {}

  ngOnInit() {
    this.loadEvaluations();
    this.getTechnicienEvaluer();
  }

  loadEvaluations() {
    this.evaluationService.getEvaluations().subscribe(evaluations => {
      this.evaluations = evaluations;
      this.filteredEvaluations = this.paginate(this.evaluations);
      this.totalPages = Math.ceil(this.evaluations.length / this.itemsPerPage);
    });
  }

  getTechnicienEvaluer(): void {
    this.projetService.getProjets().subscribe(
      (data: Projet[]) => {
        this.projetEvolueTech = data.filter(projet => projet.techniciens && projet.techniciens.length > 0);
        this.techniciensFormatted = data
          .flatMap(projet => projet.techniciens || [])
          .filter((value, index, self) =>
            index === self.findIndex(t => t.id === value.id)
          )
          .map(t => ({
            id: t.id,
            fullName: `${t.prenom} ${t.nom}`
          }));
      },
      (error) => {
        console.error('Erreur lors de la récupération des projets', error);
      }
    );
  }

  getTechnicienName(technicienId: number): string {
    const technicien = this.techniciensFormatted.find(t => t.id === technicienId);
    return technicien ? technicien.fullName : 'Inconnu';
  }

  paginate(evaluations: Evaluation[]): Evaluation[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return evaluations.slice(start, end);
  }

  filterEvaluations(event: Event): void {
    const target = event.target as HTMLInputElement;
    const query = target.value.toLowerCase();
    this.searchQuery = query;

    if (query) {
      this.filteredEvaluations = this.evaluations.filter(evaluation =>
        evaluation.commentaire.toLowerCase().includes(query) || // Adjust filtering criteria as needed
        evaluation.formation.toLowerCase().includes(query)
      );
    } else {
      this.filteredEvaluations = this.evaluations;
    }

    this.totalPages = Math.ceil(this.filteredEvaluations.length / this.itemsPerPage);
    this.goToPage(1);
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
    this.editMode = false;
  }

  toggleDeleteConfirm(id: number = 0) {
    this.showDeleteConfirm = !this.showDeleteConfirm;
    this.confirmDeleteId = id;
  }

  saveEvaluation() {
    const scoreTotal = this.calculateScore(this.evaluation);

    if (this.editMode) {
      this.evaluationService.updateEvaluation(this.evaluation.id, { ...this.evaluation, scoreTotal })
        .subscribe(() => {
          this.showToast('Évaluation mise à jour avec succès !', 'success');
          this.loadEvaluations();
        }, () => {
          this.showToast('Erreur lors de la mise à jour de l\'évaluation', 'error');
        });
    } else {
      this.evaluationService.createEvaluation({ ...this.evaluation, scoreTotal })
        .subscribe(() => {
          this.showToast('Évaluation ajoutée avec succès !', 'success');
          this.loadEvaluations();
        }, () => {
          this.showToast('Erreur lors de l\'ajout de l\'évaluation', 'error');
        });
    }

    this.toggleForm();
  }

  editEvaluation(id: number) {
    const evaluationToEdit = this.evaluations.find(evaluation => evaluation.id === id);
    if (evaluationToEdit) {
      this.evaluation = { ...evaluationToEdit };
      this.showForm = true;
      this.editMode = true;
    }
  }

  confirmDelete(id: number) {
    this.toggleDeleteConfirm(id);
  }

  deleteEvaluation(id: number) {
    this.evaluationService.deleteEvaluation(id).subscribe(() => {
      this.showToast('Évaluation supprimée avec succès !', 'success');
      this.loadEvaluations();
    });
    this.toggleDeleteConfirm();
  }

  calculateScore(evaluation: Evaluation): number {
    let total = 0;
    for (const critere of this.criteres) {
      const score = this.scores[evaluation[critere] as keyof typeof evaluation];
      if (score !== undefined) {
        total += score;
      }
    }
    return total / this.criteres.length;
  }

  resetForm() {
    this.evaluation = {
      id: 0,
      qualite: 'Bien',
      delai: 'Bien',
      cooperation: 'Bien',
      formation: 'Pas de formation',
      commentaire: '',
      scoreTotal: 0
    };
    this.currentTab = 'infos';
  }

  showToast(message: string, type: string) {
    this.toastMessage = message;
    this.toastType = type;
    setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filteredEvaluations = this.paginate(this.evaluations);
    }
  }
}
