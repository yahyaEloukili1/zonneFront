import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ZonneService } from 'src/app/services/zonne.service';

@Component({
  selector: 'app-add-affectation',
  templateUrl: './add-affectation.component.html',
  styleUrls: ['./add-affectation.component.css']
})
export class AddAffectationComponent implements OnInit {
ajoute = true
  constructor(private pdiService: ZonneService, private router: Router) { }

  ngOnInit(): void {
  }

  onSaveAffectation(f:NgForm){
    this.ajoute = false
 if(!f.value.cin){
  alert('Merci de saisir le cin !')
 }
 else if(!f.value.numero){
  alert('Merci de saisir le numéro !')
 }else{
  console.log(f.value)
  let date = new Date(f.value.date);
  f.value.numero = date.getUTCFullYear() + "/"+f.value.numero
  this.pdiService.addResource("affectations",f.value).subscribe(data=>{
   this.ajoute =true
    f.reset()
        },err=>{
          console.log(err)
        })
 }
 
}
  gotoList(){
    this.router.navigateByUrl('zonn/affectations');
  }
  reset(f:NgForm){
f.reset()
  }
}
