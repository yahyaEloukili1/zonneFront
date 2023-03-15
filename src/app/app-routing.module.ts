import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZonneComponent } from "../app/components/zonne/zonne.component";
import { AuthGuard } from './auth.guard';
import { Zonne2Component } from './comonents/zonne2/zonne2.component';
import { Zonne3Component } from './components/zonne3/zonne3.component';
import { AddAffectationComponent } from './components/add-affectation/add-affectation.component';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { AddTypeComponent } from './components/add-type/add-type.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { EditAffectationComponent } from './components/edit-affectation/edit-affectation.component';
import { EditCategorieComponent } from './components/edit-categorie/edit-categorie.component';
import { EditServiceComponent } from './components/edit-service/edit-service.component';
import { EditTypeComponent } from './components/edit-type/edit-type.component';
import { LoginComponent } from './components/login/login.component';
import { ServiceComponent } from './components/service/service.component';
import { TypesComponent } from './components/types/types.component';
import { MokararinComponent } from './components/mokararin/mokararin.component';
import { DashComponent } from './components/dash/dash.component';
import { StatistiquesComponent } from './components/statistiques/statistiques.component';
import { Dash2Component } from './components/dash2/dash2.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { AddStockComponent } from './components/add-stock/add-stock.component';


const routes: Routes = [
  {path: "zonn/affectations",component: ZonneComponent,canActivate: [AuthGuard]},
  {path: "zonn/stocks",component: StocksComponent,canActivate: [AuthGuard]},
  {path: "zonn/affectations2",component: Zonne2Component,canActivate: [AuthGuard]},
  {path: "zonn/affectations3",component: Zonne3Component,canActivate: [AuthGuard]},
  {path: "zonn/mokararin",component: MokararinComponent,canActivate: [AuthGuard]},
  {path: "zonn/services",component: ServiceComponent,canActivate: [AuthGuard]},
  {path: "zonn/categories",component: CategoriesComponent,canActivate: [AuthGuard]},
  {path: "zonn/dash",component: DashComponent,canActivate: [AuthGuard]},
  {path: "zonn/dash2",component: Dash2Component,canActivate: [AuthGuard]},
  {path: "zonn/statistiques",component: StatistiquesComponent,canActivate: [AuthGuard]},
 {path: "zonn/types",component: TypesComponent,canActivate: [AuthGuard]},
  {path: "zonn/addAffectation",component: AddAffectationComponent,canActivate: [AuthGuard]},
  {path: "zonn/addType",component: AddTypeComponent,canActivate: [AuthGuard]},
  {path: "zonn/addCategorie",component: AddCategorieComponent,canActivate: [AuthGuard]},
  {path: "zonn/addStock",component: AddStockComponent,canActivate: [AuthGuard]},
  {path: "zonn/addService",component: AddServiceComponent,canActivate: [AuthGuard]},
  {path: "zonn/edit-affectation/:id",component: EditAffectationComponent,canActivate: [AuthGuard]},
  {path: "zonn/edit-service/:id",component: EditServiceComponent,canActivate: [AuthGuard]},
  {path: "zonn/edit-categorie/:id",component: EditCategorieComponent,canActivate: [AuthGuard]},
  {path: "zonn/edit-type/:id",component: EditTypeComponent,canActivate: [AuthGuard]},
  {path: "zonn/login",component: LoginComponent},
  {path: "zonn", redirectTo : "zonn/affectations", pathMatch: 'full'},
  {path: "", redirectTo : "zonn/affectations", pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
