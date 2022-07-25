import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Affectation } from 'src/app/models/Affectation';
import { ZonneService } from 'src/app/services/zonne.service';

@Component({
  selector: 'app-zonne',
  templateUrl: './zonne.component.html',
  styleUrls: ['./zonne.component.css']
})
export class ZonneComponent implements OnInit {

  size:number = 7;
  currentPage:number = 0;
  totalPages: number;
  affectations :Affectation[]
  pages : Array<number>;
  currentKeyword: string = "";
  constructor(private zoneService:ZonneService, private router: Router) { }

  ngOnInit(): void {
this.onGetAffectations()
  }
  download(p){
let id = p.id;
console.log(p)
this.zoneService.download(`${this.zoneService.host}/report/pdf/${id}`).subscribe(data=>{
  alert('Fiche télechargé avec succées!')
})
  }
  ajouter(){
    this.router.navigateByUrl('zonn/addAffectation');
  }
  
  onGetAffectations(){
    this.zoneService.getResource("affectations",this.currentPage,this.size).subscribe(data=>{
     this.affectations = data;
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
  
    this.zoneService.getResourceByKeyword("affectations",this.currentPage,this.size,this.currentKeyword,"Numero").subscribe(data=>{
      this.affectations = data;
     
     this.totalPages = data['page'].totalPages
     this.pages = new Array<number>(this.totalPages);
     },err=>{
       console.log(err) 
     })

  }
  onEditAffectation(p:Affectation){
    console.log(p)
      let url = p['_links'].self.href;
      this.router.navigateByUrl("zonn/edit-affectation/"+btoa(url))
  }
  onDeleteAffectation(url:string){
    if(confirm('Etes vous sur de vouloir supprimer cette affectation ?')){
    this.zoneService.deleteResource('affectations',url).subscribe(data=>{
      this.chercherAffectations();
      this.onGetAffectations()
    },err=>{
      console.log(err)
    })
    }
     
   
  }  

}
