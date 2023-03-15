import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ZonneService } from 'src/app/services/zonne.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  ajoute
  constructor(private pdiService: ZonneService, private router: Router) { }
 

  ngOnInit(): void {
  }
  onSaveAffectation(f:NgForm){
    this.ajoute = false

    
  

  this.pdiService.addResource("stocks",f.value).subscribe(data=>{
    console.log(f.value,"kekekekek")
   this.ajoute =true
   alert('تم الحفظ بنجاح ')
  

  
    f.reset()
        },err=>{
         
        })
 
 
}
  gotoList(){
    this.router.navigateByUrl('zonn/stocks');
  }
  reset(f:NgForm){
f.reset()
  }

}
