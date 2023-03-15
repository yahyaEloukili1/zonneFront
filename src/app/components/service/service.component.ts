import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZonneService } from 'src/app/services/zonne.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  size:number = 6;
  currentPage:number = 0;
  totalPages: number;

  pages : Array<number>;
  currentKeyword: string = "";
  services
  constructor(private zoneService:ZonneService, private router: Router) { }

  ngOnInit(): void {
this.onGetAffectations()

  }
  onGetAffectations(){
    this.zoneService.getResource("services",this.currentPage,this.size).subscribe(data=>{
     this.services = data;
     console.log(this.services)
    this.totalPages = data['page'].totalPages
    this.pages = new Array<number>(this.totalPages);
    },err=>{
      console.log(err)
    })
  }
  onPageAffectation(i:number){
    
    this.currentPage = i;
   this.chercherAffectations()
  }
  onChercher(form :any){
      this.currentPage = 0;
      this.currentKeyword = form.keyword;
      this.chercherAffectations()
  }

  chercherAffectations(){
  
    this.zoneService.getResourceByKeyword("services",this.currentPage,this.size,this.currentKeyword,"Name").subscribe(data=>{
      this.services = data;
     
     this.totalPages = data['page'].totalPages
     this.pages = new Array<number>(this.totalPages);
     },err=>{
       console.log(err) 
     })

  }
  ajouter(){
    this.router.navigateByUrl('zonn/addService');
  }
  onEditAffectation(p:any){
    console.log(p.id,"popopoop")
      // let url = p['_links'].self.href;
    
      this.router.navigateByUrl("zonn/edit-service/"+p.id)
  }
  onDeleteAffectation(url:string){
    if(confirm('Etes vous sur de vouloir supprimer ce service ?')){
    this.zoneService.deleteResource('services',url).subscribe(data=>{
      this.chercherAffectations();
      this.onGetAffectations()
    },err=>{
      console.log(err)
    })
    }
}
}
