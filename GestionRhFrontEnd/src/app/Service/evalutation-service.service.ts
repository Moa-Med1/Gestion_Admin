import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evaluation } from '../models/evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private baseUrl: string = 'http://localhost:8080/api/evaluations'; // Updated base URL

  constructor(private http: HttpClient) { }

  // Method to create an evaluation
  createEvaluation(evaluation: Evaluation): Observable<Evaluation> {
    return this.http.post<Evaluation>(this.baseUrl, evaluation); // Using updated base URL
  }

  // Method to get the list of all evaluations
  getEvaluations(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>(this.baseUrl); // Using updated base URL
  }

  // Method to get an evaluation by its ID
  getEvaluationById(id: number): Observable<Evaluation> {
    const url = `${this.baseUrl}/${id}`; // Append ID to base URL
    return this.http.get<Evaluation>(url);
  }

  // Method to update an evaluation
  updateEvaluation(id: number, evaluation: Evaluation): Observable<Evaluation> {
    const url = `${this.baseUrl}/${id}`; // Append ID to base URL
    return this.http.put<Evaluation>(url, evaluation);
  }

  // Method to delete an evaluation
  deleteEvaluation(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`; // Append ID to base URL
    return this.http.delete<void>(url);
  }
}
