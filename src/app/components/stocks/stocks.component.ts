import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ZonneService } from 'src/app/services/zonne.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

 
  size:number = 3;
  currentPage:number = 0;
  totalPages: number;

  pages : Array<number>;
  currentKeyword: string = "";
  stocks
  constructor(private zoneService:ZonneService, private router: Router) { }

  ngOnInit(): void {
this.onGetAffectations()

  }
  onGetAffectations(){
    this.zoneService.getResource("stocks",this.currentPage,this.size).subscribe(data=>{
     this.stocks = data;
     console.log(this.stocks)
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
  
    this.zoneService.getResourceByKeyword("stocks",this.currentPage,this.size,this.currentKeyword,"Name").subscribe(data=>{
      this.stocks = data;
     
     this.totalPages = data['page'].totalPages
     this.pages = new Array<number>(this.totalPages);
     },err=>{
       console.log(err) 
     })

  }
  ajouter(){
    this.router.navigateByUrl('zonn/addStock');
  }
  onEditAffectation(p:any){
    console.log(p.id,"popopoop")
      // let url = p['_links'].self.href;
    
      this.router.navigateByUrl("zonn/edit-stock/"+p.id)
  }
  onDeleteAffectation(url:string){
    if(confirm('Etes vous sur de vouloir supprimer ce stock ?')){
    this.zoneService.deleteResource('stocks',url).subscribe(data=>{
      this.chercherAffectations();
      this.onGetAffectations()
    },err=>{
      console.log(err)
    })
    }
}

}
