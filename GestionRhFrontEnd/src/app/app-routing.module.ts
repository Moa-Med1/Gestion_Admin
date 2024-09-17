import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TechnicienComponent } from './technicien/technicien.component';
import { ProjetComponent } from './projet/projet.component';
import { RapportComponent } from './rapport/rapport.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { PointageComponent } from './pointage/pointage.component';
import { CalendrierComponent } from './calendrier/calendrier.component';
import { RapportpointageComponent } from './rapportpointage/rapportpointage.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'projet', component: ProjetComponent },
  { path: 'evaluation', component: EvaluationComponent },
  { path: 'technicien', component: TechnicienComponent },
  { path: 'pointage', component: PointageComponent },
  { path: 'rapport', component: RapportComponent },
  { path: 'calendrier', component: CalendrierComponent },
  { path: 'rapportpointage', component: RapportpointageComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirection vers le dashboard par défaut
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' } // Redirection des routes non trouvées vers le dashboard
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
