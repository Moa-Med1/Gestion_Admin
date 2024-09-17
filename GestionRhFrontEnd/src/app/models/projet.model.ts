import { Technicien } from "./technicien.model";
import { Evaluation } from "./evaluation.model";

export interface Projet {
  id: number;
  nom: string;
  emplacement: string;
  dateDebut: string;
  dateFin: string;
  responsable: string;
  etat: string;
  commentaire: string;
  techniciens?: Technicien[];
  dateCreationRapport?: string;   
  contenuRapport?: string;        
  evaluations?: Evaluation[]; 
}
