import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { AssessmentDetailsComponent } from './components/assessment-details/assessment-details.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'report/:id',
    component: AssessmentDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
