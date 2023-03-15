import { Component, OnInit } from '@angular/core';
import { ZonneService } from 'src/app/services/zonne.service';

@Component({
  selector: 'app-dash2',
  templateUrl: './dash2.component.html',
  styleUrls: ['./dash2.component.css']
})
export class Dash2Component implements OnInit {
categories
array: any[]=[]
arrayobj=[]
repeatedElementsArray=[]
totalMoahalFalseCount = 0;
totalRepeatedElements = 0;
totalAffectationsLength = 0;


  constructor(private zonneService:ZonneService) { }

  ngOnInit(): void {
    interface Obj2WithCountMap {
      categorie: any;
      affectations: any;
      countMap: { [key: string]: number };
    }
    this.zonneService.getResourceAll("categories").subscribe(data => {
      this.categories = data['_embedded'].categories;
    
      for(let i = 0; i < data['_embedded'].categories.length; i++) {
        const categorie = data['_embedded'].categories[i];
        this.zonneService.getResource2(this.zonneService.host+"/affectations/search/findByCategorieId?id="+categorie.id).subscribe(data2 => {
          const obj = { categorie: categorie, affectationsLength: data2['_embedded'].affectations.length };
          const obj2: Obj2WithCountMap = { categorie: categorie, affectations: data2['_embedded'].affectations, countMap: {} };
    
          // Count the number of occurrences of each affectation number
          const numCounts = {};
          let moahalCount = 0;
          obj2.affectations.forEach((affectation) => {
            const cin = affectation.cin;
            numCounts[cin] = (numCounts[cin] || 0) + 1;
            if (!affectation.moahal) {
              moahalCount++;
            }
          });
    
          // Filter the numCounts object to include only numbers that occur more than once
          const repeatedNums = Object.entries(numCounts)
            .filter(([cin, count]) => count > 1)
            .map(([cin, count]) => cin);
    
          // Assign the number of repeated elements to the countMap property of the obj2 object
          obj2.countMap = { repeatedElements: repeatedNums.length, moahalFalseCount: moahalCount };
    
          this.array.push(obj);
          this.arrayobj.push(obj2);
          console.log(this.arrayobj, "kkkk");
          if (i === data['_embedded'].categories.length - 1) {
            this.updateTotals();
          }
       
        });
      }
    });
    


    

    

  }
  updateTotals() {
    this.totalMoahalFalseCount = this.arrayobj.reduce((acc, curr) => acc + curr.countMap.moahalFalseCount, 0);
    this.totalRepeatedElements = this.arrayobj.reduce((acc, curr) => acc + curr.countMap.repeatedElements, 0);
    this.totalAffectationsLength = this.arrayobj.reduce((acc, curr) => acc + curr.affectations.length, 0);
  }

}
