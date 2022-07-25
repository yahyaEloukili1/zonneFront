import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { ZonneComponent } from './components/zonne/zonne.component';
import { AppRoutingModule } from './app-routing.module';
import { AddAffectationComponent } from './components/add-affectation/add-affectation.component';
import { EditAffectationComponent } from './components/edit-affectation/edit-affectation.component';
import { VentesComponent } from './components/ventes/ventes.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ZonneComponent,
    AddAffectationComponent,
    EditAffectationComponent,
    VentesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
