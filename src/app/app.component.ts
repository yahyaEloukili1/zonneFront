import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ZonneService } from './services/zonne.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  token
  constructor(public pdiService: ZonneService,private router: Router){
    this.met()
  }
  met(){
   this.token = this.pdiService.loadToken()
  }
  logout(){
    this.pdiService.logout()
    this.router.navigateByUrl('zonn/login')
  }
}
