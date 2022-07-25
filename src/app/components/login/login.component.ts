import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ZonneService } from '../../services/zonne.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
mode = 0
  constructor(private pdiService: ZonneService,private router: Router) { }

  ngOnInit(): void {
    if(this.pdiService.jwtToken){
      this.router.navigateByUrl("zonn/affectations")
    }
  }
  onSubmit(f:NgForm){
      this.pdiService.login(f.value).subscribe(resp=>{
        let jwt = resp.headers.get('Authorization')
        this.pdiService.saveToken(jwt);
        // this.pdiService.save(jwt) 
        this.router.navigateByUrl("zonn/affectations")
        console.log(jwt)
        
      },err=>{
        this.mode = 1;
      })
  }
}
