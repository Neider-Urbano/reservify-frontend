import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { RedirectGuard } from './guards/redirect.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateServiceComponent } from './components/create-service/create-service.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: 'login', canActivate: [RedirectGuard], component: LoginComponent },
  {
    path: 'register',
    canActivate: [RedirectGuard],
    component: RegisterComponent,
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      { path: 'services', component: DashboardComponent },
      { path: 'create-service', component: CreateServiceComponent },
      { path: '', redirectTo: 'services', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
