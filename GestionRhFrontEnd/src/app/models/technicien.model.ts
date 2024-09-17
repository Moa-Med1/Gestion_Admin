import { Evaluation } from "./evaluation.model";
import { Projet } from "./projet.model";

export interface Technicien {
    id: number;
    matricule: string;
    nom: string;
    prenom: string;
    dateRecrutement: string;
    dateNaissance: string;
    telephone: string;
    email: string;
    cin: string;

    adresseRue: string;        // Nouvel attribut
    adresseVille: string;      // Nouvel attribut
    adresseRegion: string;     // Nouvel attribut
    adresseCodePostal: string; // Nouvel attribut

    situationFamiliale: string;
    fonction: string;
    evaluation?: Evaluation[];
    projets?: Projet[]; // Liste des projets associés
}
