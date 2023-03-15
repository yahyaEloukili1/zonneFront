import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from './app.component';
import { ZonneComponent } from './components/zonne/zonne.component';
import { AppRoutingModule } from './app-routing.module';
import { AddAffectationComponent } from './components/add-affectation/add-affectation.component';
import { EditAffectationComponent } from './components/edit-affectation/edit-affectation.component';
import { VentesComponent } from './components/ventes/ventes.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { AddTypeComponent } from './components/add-type/add-type.component';
import { EditTypeComponent } from './components/edit-type/edit-type.component';
import { AddCategorieComponent } from './components/add-categorie/add-categorie.component';
import { ServiceComponent } from './components/service/service.component';
import { AddServiceComponent } from './components/add-service/add-service.component';
import { EditServiceComponent } from './components/edit-service/edit-service.component';
import { EditCategorieComponent } from './components/edit-categorie/edit-categorie.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { TypesComponent } from './components/types/types.component';
import { Zonne2Component } from './comonents/zonne2/zonne2.component';
import { Zonne3Component } from './components/zonne3/zonne3.component';
import { MokararinComponent } from './components/mokararin/mokararin.component';
import { DashComponent } from './components/dash/dash.component';
import { StatistiquesComponent } from './components/statistiques/statistiques.component';
import { Dash2Component } from './components/dash2/dash2.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { AddStockComponent } from './components/add-stock/add-stock.component';

@NgModule({
  declarations: [
    AppComponent,
    ZonneComponent,
    AddAffectationComponent,
    EditAffectationComponent,
    VentesComponent,
    LoginComponent,
    AddTypeComponent,
    EditTypeComponent,
    AddCategorieComponent,
    ServiceComponent,
    AddServiceComponent,
    EditServiceComponent,
    EditCategorieComponent,
    CategoriesComponent,
    TypesComponent,
    Zonne2Component,
    Zonne3Component,
    MokararinComponent,
    DashComponent,
    StatistiquesComponent,
    Dash2Component,
    StocksComponent,
    AddStockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard,{
    provide : HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
