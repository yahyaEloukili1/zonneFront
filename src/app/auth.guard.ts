import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ZonneService } from "./services/zonne.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private pdi: ZonneService,private router: Router){}
  canActivate(){
    if(this.pdi.loggedIn()){
      return true
    }
    else{
      this.router.navigateByUrl('zonn/login')
      return false
    }
  }
  
}
