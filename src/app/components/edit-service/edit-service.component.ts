import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZonneService } from 'src/app/services/zonne.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {

  
  currentAxe: any
  url: string
    constructor(private router:Router,private activatedRoute: ActivatedRoute,private pdiService:ZonneService) { }
  
    ngOnInit(): void {
       this.url = this.activatedRoute.snapshot.params['id']
       console.log(this.url,"ooooooooooooooo")
       this.pdiService.getOneResource(this.pdiService.host + "/services/"+this.url).subscribe(data=>{
        this.currentAxe = data;
        console.log(this.currentAxe)
      },err=>{
        console.log(err)
      })
      console.log(this.url);
    }
    onUpdateAxe(value: any){
console.log(value,"lelele")
      if(!value.nameAr){
        alert('المرجو إدخال رقم الإستفادة')
      }
      else if(!value.name){
        alert('المرجو إدخال رقم البطاقة الوطنية')
      }
  
      else{
      this.pdiService.updateResource(this.pdiService.host + "/services/"+this.url,value).subscribe(data=>{
      
        alert("Mise a jour effectué avec succés")
        let id = this.activatedRoute.snapshot.params['id'];
      console.log(id,"ùùùùùùùùùùùùùù")
      
      },err=>{
        
      })
    }
    }
    gotoList(){
      this.router.navigateByUrl('zonn/services');
    }
}
