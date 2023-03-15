import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ZonneService } from 'src/app/services/zonne.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {
  ajoute
  constructor(private pdiService: ZonneService, private router: Router) { }
 

  ngOnInit(): void {
  }
  onSaveAffectation(f:NgForm){
    this.ajoute = false
    if(!f.value.name){
      alert('المرجو إدخال الفئة')
    }
    else if(!f.value.nameAr){
      alert('المرجو إدخال الفئة')
    }
   
  
 else{
  this.pdiService.addResource("services",f.value).subscribe(data=>{
    console.log(f.value,"kekekekek")
   this.ajoute =true
   alert('تم الحفظ بنجاح ')
  

  
    f.reset()
        },err=>{
         
        })
 }
 
}
  gotoList(){
    this.router.navigateByUrl('zonn/services');
  }
  reset(f:NgForm){
f.reset()
  }

}
