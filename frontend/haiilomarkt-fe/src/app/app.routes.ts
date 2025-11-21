import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '**', component: HomeComponent },
];
