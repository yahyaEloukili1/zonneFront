import { Component, OnInit } from '@angular/core';
import { ZonneService } from 'src/app/services/zonne.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
totalPC
totalPN
totalPCMF
sucreEnvoye
oeilEnvoye
farineENvoye
total
stock
stocks
typeSelected2
  constructor(private zoneService: ZonneService) { }

  ngOnInit(): void {
    this.zoneService.getResourceAll("stocks").subscribe(data=>{
    
      this.stocks = data['_embedded'].stocks
    

    })
    this.zoneService.getResource2(this.zoneService.host+"/affectations/search/findByType2Id?id="+1).subscribe(data=>{
      this.totalPC = data['_embedded'].affectations.length
      this.zoneService.getResource2(this.zoneService.host+"/affectations/search/findByType2Id?id="+2).subscribe(data2=>{
        this.totalPN = data2['_embedded'].affectations.length
        this.zoneService.getResource2(this.zoneService.host+"/affectations/search/findByType2Id?id="+3).subscribe(data3=>{
          this.totalPCMF = data3['_embedded'].affectations.length
          this.sucreEnvoye =   24*this.totalPC + 24*this.totalPN +24*this.totalPCMF
          this.oeilEnvoye = 5*this.totalPN + 15*this.totalPC + 15*this.totalPCMF
          this.farineENvoye = 50*this.totalPN + 50*this.totalPC 
          console.log(this.sucreEnvoye,"lekek")
          this.total = this.totalPC + this.totalPN + this.totalPCMF
      
           })
    
         })
  
       })
     
       
         
           
  }
  onTypeChange2(ev){
    this.typeSelected2 = ev.target.value
    if(this.typeSelected2!=0){
      this.zoneService.getResourceByID("stocks",this.typeSelected2).subscribe(data=>{
          this.stock = data
      
      })

    }
   

  
  }

}
