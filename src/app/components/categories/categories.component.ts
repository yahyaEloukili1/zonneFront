import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZonneService } from 'src/app/services/zonne.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  size:number = 6;
  currentPage:number = 0;
  totalPages: number;

  pages : Array<number>;
  currentKeyword: string = "";
  categories
  constructor(private zoneService:ZonneService, private router: Router) { }

  ngOnInit(): void {
this.onGetAffectations()

  }
  onGetAffectations(){
    this.zoneService.getResource("categories",this.currentPage,this.size).subscribe(data=>{
     this.categories = data;
     console.log(this.categories,"kekekek")
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
  
    this.zoneService.getResourceByKeyword("categories",this.currentPage,this.size,this.currentKeyword,"Name").subscribe(data=>{
      this.categories = data;
     
     this.totalPages = data['page'].totalPages
     this.pages = new Array<number>(this.totalPages);
     },err=>{
       console.log(err) 
     })

  }
  ajouter(){
    this.router.navigateByUrl('zonn/addCategorie');
  }
  onEditAffectation(p:any){
    console.log(p.id,"popopoop")
      // let url = p['_links'].self.href;
    
      this.router.navigateByUrl("zonn/edit-categorie/"+p.id)
  }
  onDeleteAffectation(url:string){
    if(confirm('Etes vous sur de vouloir supprimer ce categorie ?')){
    this.zoneService.deleteResource('categories',url).subscribe(data=>{
      this.chercherAffectations();
      this.onGetAffectations()
    },err=>{
      console.log(err)
    })
    }
}

}
