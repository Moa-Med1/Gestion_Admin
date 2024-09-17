import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pointage } from '../models/pointage.model';

@Injectable({
  providedIn: 'root'
})
export class PointageService {
  private apiUrl = 'http://localhost:8080/api/pointages';  // Ensure this URL is correct

  constructor(private http: HttpClient) { }

  // Method to get all pointages
  getPointages(): Observable<Pointage[]> {
    return this.http.get<Pointage[]>(this.apiUrl);
  }

  // Method to get a pointage by ID
  getPointage(id: number): Observable<Pointage> {
    return this.http.get<Pointage>(`${this.apiUrl}/${id}`);
  }

  // Method to create a new pointage
  createPointage(pointage: Pointage): Observable<Pointage> {
    return this.http.post<Pointage>(this.apiUrl, pointage);
  }

  // Method to update an existing pointage
  updatePointage(id: number, pointage: Pointage): Observable<Pointage> {
    return this.http.put<Pointage>(`${this.apiUrl}/${id}`, pointage);
  }

  // Method to delete a pointage
  deletePointage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
