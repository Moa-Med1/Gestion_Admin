import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  status = false; // Contrôle la visibilité de la sidebar

  // Fonction pour basculer la visibilité de la sidebar
  addToggle() {
    this.status = !this.status;
  }

  // Fonction appelée lors de la soumission du formulaire
  onSubmit(form: NgForm) {
    console.log('Form submitted:', form.value);
    // Ajoutez ici la logique de traitement du formulaire
  }

  title = 'GestionRhFrontEnd';
}
