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
       this.url = atob(this.activatedRoute.snapshot.params['id'])
      this.pdiService.getOneResource(this.url).subscribe(data=>{
        this.currentAxe = data;
        console.log(this.currentAxe)
      },err=>{
        console.log(err)
      })
      console.log(this.url);
    }
    onUpdateAxe(value: any){
      this.pdiService.updateResource(this.url,value).subscribe(data=>{
        alert("Mise a jour effectué avec succés")
      },err=>{
        
      })
    }
    gotoList(){
      this.router.navigateByUrl('zonn/affectations');
    }

}
