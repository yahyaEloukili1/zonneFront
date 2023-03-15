import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ZonneService } from 'src/app/services/zonne.service';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit {
  ajoute
  constructor(private pdiService: ZonneService, private router: Router) { }
 

  ngOnInit(): void {
  }
  onSaveAffectation(f:NgForm){
    this.ajoute = false
    if(!f.value.name){
      alert('المرجو إدخال نوع الحصة ')
    }
    else if(!f.value.sucre){
      alert('المرجو إدخال كمية السكر')
    }
    else if(!f.value.oeil){
      alert('المرجو إدخال كمية الزيت')
    }
    
  
 else{
  this.pdiService.addResource("types",f.value).subscribe(data=>{
    console.log(f.value,"kekekekek")
   this.ajoute =true
   alert('تم الحفظ بنجاح ')
  

  
    f.reset()
        },err=>{
         
        })
 }
 
}
  gotoList(){
    this.router.navigateByUrl('zonn/types');
  }
  reset(f:NgForm){
f.reset()
  }

}
