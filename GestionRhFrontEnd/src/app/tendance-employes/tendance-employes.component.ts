import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProjetService } from '../Service/projet-service.service'; // Assurez-vous que le chemin est correct
import { Projet } from '../models/projet.model'; // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-tendance-employes',
  templateUrl: './tendance-employes.component.html',
  styleUrls: ['./tendance-employes.component.css']
})
export class TendanceEmployesComponent implements OnInit {

  projets: Projet[] = []; // Initialisez le tableau de projets
  displayedProjets: Projet[] = []; // Projets à afficher (les 3 plus proches)
  filterProjets: string = '';
  showFilterMenu: boolean = false;

  constructor(private projetService: ProjetService) { } // Injectez le service

  ngOnInit(): void {
    Chart.register(...registerables);

    // Initialiser le graphique
    const ctx = document.getElementById('tendanceChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui'],
        datasets: [{
          label: 'Tendance des Employés',
          data: [10, 20, 15, 30, 25, 40],
          borderColor: '#003366',
          backgroundColor: 'rgba(0, 51, 102, 0.2)',
          borderWidth: 3,
          pointBackgroundColor: '#e74c3c',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Tendance des Employés',
            color: '#003366',
            font: {
              size: 22,
              weight: 'bold'
            },
            padding: {
              bottom: 20
            }
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#333',
              font: {
                size: 14
              }
            }
          },
          tooltip: {
            backgroundColor: '#003366',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#e74c3c',
            borderWidth: 1
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Mois',
              color: '#333',
              font: {
                size: 14
              }
            },
            ticks: {
              color: '#333',
              font: {
                size: 12,
                weight: 'bold'
              }
            },
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Nombre d\'Employés',
              color: '#333',
              font: {
                size: 14
              }
            },
            ticks: {
              color: '#333',
              font: {
                size: 12,
                weight: 'bold'
              }
            }
          }
        }
      }
    });

    // Récupérer les projets réels
    this.projetService.getProjets().subscribe(data => {
      this.projets = data;
      this.updateDisplayedProjets();
    });
  }

  toggleFilterMenu(): void {
    this.showFilterMenu = !this.showFilterMenu;
  }

  setFilter(status: string): void {
    this.filterProjets = status;
    this.showFilterMenu = false;
    this.updateDisplayedProjets();
  }

  getStatusColor(etat: string): string {
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

  updateDisplayedProjets(): void {
    let filtered = this.filterProjetList();

    // Trier les projets par nombre de jours restants
    filtered.sort((a, b) => this.getDaysRemaining(a.dateFin) - this.getDaysRemaining(b.dateFin));

    // Prendre les 3 projets les plus proches
    this.displayedProjets = filtered.slice(0, 3);
  }

  filterProjetList(): Projet[] {
    if (!this.filterProjets) {
      return this.projets;
    }

    return this.projets.filter(projet => projet.etat.toLowerCase().includes(this.filterProjets.toLowerCase()));
  }

  getDaysRemaining(dateFin: string): number {
    const endDate = new Date(dateFin);
    const today = new Date();
    const timeDiff = endDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  formatDaysRemaining(days: number): string {
    if (days > 0) {
      return `${days} jour(s) restant(s)`;
    } else if (days === 0) {
      return 'Aujourd\'hui';
    } else {
      return 'Terminé';
    }
  }
}
