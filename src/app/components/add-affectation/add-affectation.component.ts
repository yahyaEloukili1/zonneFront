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
types
services
categories
serviceID
selectedService
selectedType
selectedCategorie
selectedStock
stocks
moahal =true
  constructor(private pdiService: ZonneService, private router: Router) { }

  ngOnInit(): void {
    this.pdiService.getResourceAll(`types`).subscribe(data=>{
      this.types = data['_embedded'].types
      console.log(this.types,"lelllel")
    })
     this.pdiService.getResourceAll(`services`).subscribe(data=>{
      this.services = data['_embedded'].services
      console.log(this.services,"lelllel")
    })
    this.pdiService.getResourceAll(`stocks`).subscribe(data=>{
      this.stocks = data['_embedded'].stocks
      console.log(this.stocks,"lelllel")
    })
    this.pdiService.getResourceAll(`categories`).subscribe(data=>{
      this.categories = data['_embedded'].categories
      console.log(this.categories,"lelllel")
    })
  }

  onSaveAffectation(f:NgForm){
    this.ajoute = false
    // if(!f.value.num){
    //   alert('المرجو إدخال رقم الإستفادة')
    // }
    // else if(!f.value.cin){
    //   alert('المرجو إدخال رقم البطاقة الوطنية')
    // }
    // else if(!f.value.prenom){
    //   alert('المرجو إدخال إسم المستفيد')
    // }
    // else if(!f.value.nom){
    //   alert('المرجو إدخال نسب المستفيد')
    // }
    // else if(!f.value.type){
    //   alert('المرجو إدخال نوع الإستفادة ')
    // }
    // else if(!f.value.date){
    //   alert('المرجو إدخال تاريخ الإستفادة')
    // }
    // else if(!f.value.farine){
    //   alert('المرجو إدخال عدد أكياس الدقيق')
    // }
    // else if(!f.value.sucr){
    //   alert('المرجو إدخال عدد صناديق السكر')
    // }
    // else if(!f.value.oeil){
    //   alert('المرجو إدخال عدد صناديق الزيت')
    // }
 

  let date = new Date(f.value.date);
  // f.value.num= f.value.numero;
  f.value.ficheName= f.value.cin +"-"+f.value.num;
  f.value.numero = date.getUTCFullYear() + "/"+f.value.num
  if(f.value.service)
  f.value.service = `${this.pdiService.host}/services/${this.selectedService}`
  f.value.categorie = `${this.pdiService.host}/categories/${this.selectedCategorie}`
  f.value.stock = `${this.pdiService.host}/stocks/${this.selectedStock}`
  f.value.type2 = `${this.pdiService.host}/types/${this.selectedType}`
  this.pdiService.addResource("affectations",f.value).subscribe(data=>{
   this.ajoute =true
   alert('تم الحفظ بنجاح ')
   let id = data.id;
console.log(data)

this.pdiService.download(`${this.pdiService.host}/report/pdf/${id}`).subscribe(data=>{
  // alert('Fiche télechargé avec succées!')
})

  
    f.reset()
        },err=>{
         if(err.error.message.startsWith('could not execute statement; SQL [n/a]; constraint')){
          alert('توجد إستفادة أخرى بنفس الرقم')
         }
        })
 
 
}
  gotoList(){
    this.router.navigateByUrl('zonn/affectations');
  }
  reset(f:NgForm){
f.reset()
  }
  onServiceChange(ev){
    this.serviceID = ev.target.value

  }
}
