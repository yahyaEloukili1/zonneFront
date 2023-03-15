import { Component, OnInit } from '@angular/core';
import { ZonneService } from 'src/app/services/zonne.service';

@Component({
  selector: 'app-mokararin',
  templateUrl: './mokararin.component.html',
  styleUrls: ['./mokararin.component.css']
})
export class MokararinComponent implements OnInit {
affectations: any
duplicates=[]
  constructor(private zonneService: ZonneService) { }

  ngOnInit(): void {
    this.zonneService.getResourceAll("affectations").subscribe(data => {
        this.affectations = data['_embedded'].affectations
      
        const seenCins = new Set();
       
        this.affectations.forEach((affectation) => {
          if(affectation.cin!="" && affectation.cin!=null ){
          if (seenCins.has(affectation.cin)) {
            return;
          }
        
          const count = this.affectations.filter(obj => obj.cin === affectation.cin).length;
        
          if (count > 1) {
            this.duplicates.push(affectation);
          }
        
          seenCins.add(affectation.cin);

        }
        });
      
      
    })

  }

}
