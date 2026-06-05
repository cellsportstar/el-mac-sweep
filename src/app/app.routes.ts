import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard';
import { UsersComponent } from './features/users/users';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' } // Default to dashboard
];