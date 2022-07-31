import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Affectation } from 'src/app/models/Affectation';
import { ZonneService } from 'src/app/services/zonne.service';

@Component({
  selector: 'app-edit-affectation',
  templateUrl: './edit-affectation.component.html',
  styleUrls: ['./edit-affectation.component.css']
})
export class EditAffectationComponent implements OnInit {

 
  currentAxe: Affectation
  url: string
    constructor(private router:Router,private activatedRoute: ActivatedRoute,private pdiService:ZonneService) { }
  
    ngOnInit(): void {
       this.url = this.activatedRoute.snapshot.params['id']
       console.log(this.url,"ooooooooooooooo")
       this.pdiService.getOneResource(this.pdiService.host + "/affectations/"+this.url).subscribe(data=>{
        this.currentAxe = data;
        console.log(this.currentAxe)
      },err=>{
        console.log(err)
      })
      console.log(this.url);
    }
    onUpdateAxe(value: any){
      value.ficheName=value.cin +"-"+value.num;
      let date = new Date(value.date);
      value.numero = date.getUTCFullYear() + "/"+value.num
      if(!value.num){
        alert('المرجو إدخال رقم الإستفادة')
      }
      else if(!value.cin){
        alert('المرجو إدخال رقم البطاقة الوطنية')
      }
      else if(!value.prenom){
        alert('المرجو إدخال إسم المستفيد')
      }
      else if(!value.nom){
        alert('المرجو إدخال نسب المستفيد')
      }
      else if(!value.type){
        alert('المرجو إدخال نوع الإستفادة ')
      }
      else if(!value.date){
        alert('المرجو إدخال تاريخ الإستفادة')
      }
      else if(!value.farine){
        alert('المرجو إدخال عدد أكياس الدقيق')
      }
      else if(!value.sucr){
        alert('المرجو إدخال عدد صناديق السكر')
      }
      else if(!value.oeil){
        alert('المرجو إدخال عدد صناديق الزيت')
      }
      else{
      this.pdiService.updateResource(this.pdiService.host + "/affectations/"+this.url,value).subscribe(data=>{
      
        alert("Mise a jour effectué avec succés")
        let id = this.activatedRoute.snapshot.params['id'];
      console.log(id,"ùùùùùùùùùùùùùù")
      this.pdiService.download(`${this.pdiService.host}/report/pdf/${id}`).subscribe(data=>{
        // alert('Fiche télechargé avec succées!')
      })
      },err=>{
        
      })
    }
    }
    gotoList(){
      this.router.navigateByUrl('zonn/affectations');
    }

}
