import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZonneService } from 'src/app/services/zonne.service';

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.css']
})
export class EditTypeComponent implements OnInit {

  
  currentAxe: any
  url: string
    constructor(private router:Router,private activatedRoute: ActivatedRoute,private pdiService:ZonneService) { }
  
    ngOnInit(): void {
       this.url = this.activatedRoute.snapshot.params['id']
       console.log(this.url,"ooooooooooooooo")
       this.pdiService.getOneResource(this.pdiService.host + "/types/"+this.url).subscribe(data=>{
        this.currentAxe = data;
        console.log(this.currentAxe)
      },err=>{
        console.log(err)
      })
      console.log(this.url);
    }
    onUpdateAxe(value: any){
console.log(value,"lelele")
   
    
      this.pdiService.updateResource(this.pdiService.host + "/types/"+this.url,value).subscribe(data=>{
      
        alert("Mise a jour effectué avec succés")
        let id = this.activatedRoute.snapshot.params['id'];
      console.log(id,"ùùùùùùùùùùùùùù")
      
      },err=>{
        
      })
    
    }
    gotoList(){
      this.router.navigateByUrl('zonn/types');
    }
}
