import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Technicien } from '../models/technicien.model'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class TechnicienService {
  private baseUrl: string = 'http://localhost:8080/api'; // URL de base pour l'API

  constructor(private http: HttpClient) { }

  // Méthode pour créer un technicien
  createTechnicien(technicien: Technicien): Observable<Technicien> {
    const url = `${this.baseUrl}/techniciens`; // URL pour créer un technicien
    return this.http.post<Technicien>(url, technicien);
  }

  // Méthode pour obtenir la liste de tous les techniciens
  getTechniciens(): Observable<Technicien[]> {
    const url = `${this.baseUrl}/techniciens`; // URL pour obtenir tous les techniciens
    return this.http.get<Technicien[]>(url);
  }

  // Méthode pour obtenir un technicien par son ID
  getTechnicienById(id: number): Observable<Technicien> {
    const url = `${this.baseUrl}/techniciens/${id}`; // URL pour obtenir un technicien par ID
    return this.http.get<Technicien>(url);
  }

  // Méthode pour mettre à jour un technicien
  updateTechnicien(id: number, technicien: Technicien): Observable<Technicien> {
    const url = `${this.baseUrl}/techniciens/${id}`; // URL pour mettre à jour un technicien par ID
    return this.http.put<Technicien>(url, technicien);
  }

  // Méthode pour supprimer un technicien
  deleteTechnicien(id: number): Observable<void> {
    const url = `${this.baseUrl}/techniciens/${id}`; // URL pour supprimer un technicien par ID
    return this.http.delete<void>(url);
  }
}
