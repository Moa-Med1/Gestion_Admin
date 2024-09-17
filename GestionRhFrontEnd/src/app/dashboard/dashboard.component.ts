// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { TechnicienService } from '../Service/technicien-service.service'; // Ajustez le chemin
import { ProjetService } from '../Service/projet-service.service'; // Ajustez le chemin

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nombreTechniciens: number = 0;
  nombreProjets: number = 0;

  constructor(
    private technicienService: TechnicienService,
    private projetService: ProjetService
  ) {}

  ngOnInit(): void {
    this.getNombreTechniciens();
    this.getNombreProjets();
  }

  getNombreTechniciens(): void {
    this.technicienService.getTechniciens().subscribe(data => {
      this.nombreTechniciens = data.length; // Ajustez selon la structure de vos données
    });
  }

  getNombreProjets(): void {
    this.projetService.getProjets().subscribe(data => {
      this.nombreProjets = data.length; // Ajustez selon la structure de vos données
    });
  }
}
