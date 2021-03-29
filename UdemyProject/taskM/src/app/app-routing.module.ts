import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './admin/about/about.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProjectsComponent } from './admin/projects/projects.component';
import { SignUpComponent } from './admin/sign-up/sign-up.component';
import { TasksComponent } from './admin/tasks/tasks.component';
import { CanActivateGuardService } from './can-activate-guard.service';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "signup", component: SignUpComponent },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [CanActivateGuardService], data: { expectedRole: "Admin" } },
  { path: "about", component: AboutComponent },
  { path: "projects", component: ProjectsComponent, canActivate: [CanActivateGuardService], data: { expectedRole: "Admin" } },
  { path: "tasks", component: TasksComponent, canActivate: [CanActivateGuardService], data: { expectedRole: "Employee" } },
  // { path: "projects/view/:projectid", component: ProjectDetailsComponent, canActivate: [CanActivateGuardService], data: { expectedRole: "Admin" } },


];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
