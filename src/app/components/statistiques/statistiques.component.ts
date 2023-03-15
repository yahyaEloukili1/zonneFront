import { Component, OnInit } from '@angular/core';
import { ZonneService } from 'src/app/services/zonne.service';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  totalPC
  totalPN

  totalPCMF
arraypc: any[]=[]
arraypn: any[]=[]
arraypcmf: any[]=[]
categories
  constructor(private zonneService: ZonneService) { }

  ngOnInit(): void {
    this.zonneService.getResourceAll("categories").subscribe(data => {
      this.categories = data['_embedded'].categories;
    
      for(let i = 0; i < data['_embedded'].categories.length; i++) {
        const categorie = data['_embedded'].categories[i];
        this.zonneService.getResource2(this.zonneService.host+"/affectations/search/findByCategorieIdAndType2Id?id="+categorie.id+"&id2="+1).subscribe(data2 => {
          const obj = { categorie: categorie, affectationsLength: data2['_embedded'].affectations.length };
          this.arraypc.push(obj);
          console.log(this.arraypc,"kke")
        });
      }
    });


    this.zonneService.getResourceAll("categories").subscribe(data => {
      this.categories = data['_embedded'].categories;
    
      for(let i = 0; i < data['_embedded'].categories.length; i++) {
        const categorie = data['_embedded'].categories[i];
        this.zonneService.getResource2(this.zonneService.host+"/affectations/search/findByCategorieIdAndType2Id?id="+categorie.id+"&id2="+2).subscribe(data2 => {
          const obj = { categorie: categorie, affectationsLength: data2['_embedded'].affectations.length };
          this.arraypn.push(obj);
          console.log(this.arraypn,"kke")
        });
      }
    });


    this.zonneService.getResourceAll("categories").subscribe(data => {
      this.categories = data['_embedded'].categories;
    
      for(let i = 0; i < data['_embedded'].categories.length; i++) {
        const categorie = data['_embedded'].categories[i];
        this.zonneService.getResource2(this.zonneService.host+"/affectations/search/findByCategorieIdAndType2Id?id="+categorie.id+"&id2="+3).subscribe(data2 => {
          const obj = { categorie: categorie, affectationsLength: data2['_embedded'].affectations.length };
          this.arraypcmf.push(obj);
          console.log(this.arraypc,"kke")
        });
      }
    });

    
    




    this.zonneService.getResource2(this.zonneService.host+"/affectations/search/findByType2Id?id="+1).subscribe(data=>{
      this.totalPC = data['_embedded'].affectations.length
      this.zonneService.getResource2(this.zonneService.host+"/affectations/search/findByType2Id?id="+2).subscribe(data2=>{
        this.totalPN = data2['_embedded'].affectations.length
        this.zonneService.getResource2(this.zonneService.host+"/affectations/search/findByType2Id?id="+3).subscribe(data3=>{
          this.totalPCMF = data3['_embedded'].affectations.length
        })
      })


    })
 

}
}
