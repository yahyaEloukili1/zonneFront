import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZonneComponent } from "../app/components/zonne/zonne.component";
import { AuthGuard } from './auth.guard';
import { AddAffectationComponent } from './components/add-affectation/add-affectation.component';
import { EditAffectationComponent } from './components/edit-affectation/edit-affectation.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {path: "zonn/affectations",component: ZonneComponent,canActivate: [AuthGuard]},
  {path: "zonn/addAffectation",component: AddAffectationComponent,canActivate: [AuthGuard]},
  {path: "zonn/edit-affectation/:id",component: EditAffectationComponent,canActivate: [AuthGuard]},
  {path: "zonn/login",component: LoginComponent},
  {path: "zonn", redirectTo : "zonn/affectations", pathMatch: 'full'},
  {path: "", redirectTo : "zonn/affectations", pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
