import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZonneService } from 'src/app/services/zonne.service';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.css']
})
export class TypesComponent implements OnInit {

  size:number = 3;
  currentPage:number = 0;
  totalPages: number;

  pages : Array<number>;
  currentKeyword: string = "";
  types
  constructor(private zoneService:ZonneService, private router: Router) { }

  ngOnInit(): void {
this.onGetAffectations()

  }
  onGetAffectations(){
    this.zoneService.getResource("types",this.currentPage,this.size).subscribe(data=>{
     this.types = data;
     console.log(this.types)
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
  
    this.zoneService.getResourceByKeyword("types",this.currentPage,this.size,this.currentKeyword,"Name").subscribe(data=>{
      this.types = data;
     
     this.totalPages = data['page'].totalPages
     this.pages = new Array<number>(this.totalPages);
     },err=>{
       console.log(err) 
     })

  }
  ajouter(){
    this.router.navigateByUrl('zonn/addType');
  }
  onEditAffectation(p:any){
    console.log(p.id,"popopoop")
      // let url = p['_links'].self.href;
    
      this.router.navigateByUrl("zonn/edit-type/"+p.id)
  }
  onDeleteAffectation(url:string){
    if(confirm('Etes vous sur de vouloir supprimer ce type ?')){
    this.zoneService.deleteResource('types',url).subscribe(data=>{
      this.chercherAffectations();
      this.onGetAffectations()
    },err=>{
      console.log(err)
    })
    }
}
}
