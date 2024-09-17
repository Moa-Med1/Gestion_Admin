import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../Service/projet-service.service';
import { Projet } from '../models/projet.model';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.css']
})
export class CalendrierComponent implements OnInit {
  projets: Projet[] = [];
  projetsAffiches: Projet[] = [];
  joursDuMois: string[] = [];
  mois: string = '';
  annee: number = new Date().getFullYear();
  moisActuel: number = new Date().getMonth();
  selectedProjet: Projet | null = null; // Projet sélectionné

  constructor(private projetService: ProjetService) {}

  ngOnInit(): void {
    this.generateCalendar(this.moisActuel, this.annee);
    this.loadProjets();
  }

  generateCalendar(month: number, year: number): void {
    const date = new Date(year, month, 1);
    this.mois = date.toLocaleString('fr-FR', { month: 'long' });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    this.joursDuMois = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
  }

  loadProjets(): void {
    this.projetService.getProjets().subscribe(
      (projets: Projet[]) => {
        this.projets = projets;
        this.filterProjets();
      },
      (error) => {
        console.error('Erreur lors du chargement des projets:', error);
      }
    );
  }

  filterProjets(): void {
    this.projetsAffiches = this.projets.filter(projet => {
      const dateDebut = new Date(projet.dateDebut);
      const dateFin = new Date(projet.dateFin);

      return (
        (dateDebut.getFullYear() === this.annee && dateDebut.getMonth() === this.moisActuel) ||
        (dateFin.getFullYear() === this.annee && dateFin.getMonth() === this.moisActuel) ||
        (dateDebut <= new Date(this.annee, this.moisActuel + 1, 0) && dateFin >= new Date(this.annee, this.moisActuel, 1))
      );
    });
  }

  getColorForEtat(etat: string): string {
    switch (etat) {
      case 'En cours':
        return '#ffeb3b'; // Jaune
      case 'Terminé':
        return '#8bc34a'; // Vert
      case 'Annulé':
        return '#f44336'; // Rouge
      case 'En attente':
        return '#ff9800'; // Orange
      default:
        return '#9e9e9e'; // Gris
    }
  }

  getLeftPosition(dateDebut: string): string {
    const debut = new Date(dateDebut).getDate();
    const joursTotal = new Date(this.annee, this.moisActuel + 1, 0).getDate();
    const position = (debut - 1) * (100 / joursTotal);
    return `${position}%`;
  }

  getWidth(dateDebut: string, dateFin: string): string {
    const debut = new Date(dateDebut).getDate();
    const fin = new Date(dateFin).getDate();
    const joursTotal = new Date(this.annee, this.moisActuel + 1, 0).getDate();
    const largeurParJour = 100 / joursTotal;
    const largeur = (fin - debut + 1) * largeurParJour;
    return `${Math.min(largeur, 100)}%`;
  }

  getPreviousMonth(): void {
    if (this.moisActuel === 0) {
      this.moisActuel = 11;
      this.annee--;
    } else {
      this.moisActuel--;
    }
    this.generateCalendar(this.moisActuel, this.annee);
    this.loadProjets();
  }

  getNextMonth(): void {
    if (this.moisActuel === 11) {
      this.moisActuel = 0;
      this.annee++;
    } else {
      this.moisActuel++;
    }
    this.generateCalendar(this.moisActuel, this.annee);
    this.loadProjets();
  }

  selectProjet(projet: Projet): void {
    this.selectedProjet = projet;
  }

  deselectProjet(): void {
    this.selectedProjet = null;
  }
}
