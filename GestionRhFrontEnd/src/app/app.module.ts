import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts'; // Importation de NgxChartsModule pour les graphiques
import { FullCalendarModule } from '@fullcalendar/angular'; // Importation du module FullCalendar
import { NgSelectModule } from '@ng-select/ng-select'; // Importation de NgSelectModule

// Composants de votre application
import { AppComponent } from './app.component';
import { RapportComponent } from './rapport/rapport.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { PointageComponent } from './pointage/pointage.component';
import { ProjetComponent } from './projet/projet.component';
import { TendanceEmployesComponent } from './tendance-employes/tendance-employes.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { RapportpointageComponent } from './rapportpointage/rapportpointage.component';

// Matériel Angular
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    RapportComponent,
    DashboardComponent,
    CalendrierComponent,
    PointageComponent,
    ProjetComponent,
    TendanceEmployesComponent,
    EvaluationComponent,
    ConfirmationDialogComponent,
    RapportpointageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    NgxChartsModule, // Ajout de NgxChartsModule pour les graphiques
    FullCalendarModule, // Ajout du module FullCalendar
    NgSelectModule, // Ajout du module NgSelect
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withFetch()) // Activer l'utilisation de fetch avec HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
