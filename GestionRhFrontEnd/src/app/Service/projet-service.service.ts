import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projet } from './../models/projet.model';
import { Technicien } from './../models/technicien.model'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private baseUrl: string = 'http://localhost:8080/api'; // URL de base pour l'API

  constructor(private http: HttpClient) { }

  // Méthode pour créer un projet
  createProjet(projet: Projet): Observable<Projet> {
    const url = `${this.baseUrl}/projets`; // URL pour créer un projet
    return this.http.post<Projet>(url, projet);
  }

  // Méthode pour obtenir la liste de tous les projets
  getProjets(): Observable<Projet[]> {
    const url = `${this.baseUrl}/projets`; // URL pour obtenir tous les projets
    return this.http.get<Projet[]>(url);
  }

  // Méthode pour obtenir un projet par son ID
  getProjetById(id: number): Observable<Projet> {
    const url = `${this.baseUrl}/projets/${id}`; // URL pour obtenir un projet par ID
    return this.http.get<Projet>(url);
  }

  // Méthode pour mettre à jour un projet
  updateProjet(id: number, projet: Projet): Observable<Projet> {
    const url = `${this.baseUrl}/projets/${id}`; // URL pour mettre à jour un projet par ID
    return this.http.put<Projet>(url, projet);
  }

  // Méthode pour supprimer un projet
  deleteProjet(id: number): Observable<void> {
    const url = `${this.baseUrl}/projets/${id}`; // URL pour supprimer un projet par ID
    return this.http.delete<void>(url);
  }

  // Méthode pour obtenir la liste des techniciens
  getTechniciens(): Observable<Technicien[]> {
    const url = `${this.baseUrl}/techniciens`; // URL pour obtenir les techniciens
    return this.http.get<Technicien[]>(url);
  }

  // Méthode pour retirer des techniciens d'un projet
  removeTechProjet(id: number, projet: Projet): Observable<Projet> {
    const url = `${this.baseUrl}/projets/tech/${id}`; // URL pour retirer les techniciens d'un projet
    return this.http.put<Projet>(url, projet);
  }
}
