import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Affectation } from 'src/app/models/Affectation';
import { ZonneService } from 'src/app/services/zonne.service';
import { saveAs } from "file-saver/dist/FileSaver";
import { DataTable } from "simple-datatables";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as TableExport from 'tableexport';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-zonne',
  templateUrl: './zonne.component.html',
  styleUrls: ['./zonne.component.css']
})
export class ZonneComponent implements OnInit {
  print() {
    alert('Teclechargé avec Succés')
  }

  affectations :Affectation[]
  stocks
  currentKeyword: string = "";
  categories
  typeName
  typeSelected=0
  typeSelected2=0
  total:number
  sucre
  oeil
  farine
  inputValue
  isCinSelected
  
  constructor(private zoneService:ZonneService, private router: Router) { }
  showInput(){
this.isCinSelected = 0
    this.zoneService.getResource2(this.zoneService.host+"/affectations/search/findByCinContainsIgnoreCaseAndType2Id?mc="+this.inputValue+"&id="+1).subscribe(data=> {
      console.log(data,"tttttttttttttttttttttt")
      this.affectations = data
    })
    this.zoneService.download(this.zoneService.host+"/report/pdf").subscribe()
  }
  ngOnInit(): void {
 
    this.zoneService.getResourceAll("categories").subscribe(data=>{
    
      this.categories = data['_embedded'].categories
    

    })
    this.zoneService.getResourceAll("stocks").subscribe(data=>{
    
      this.stocks = data['_embedded'].stocks
    

    })
 
this.onGetAffectations()

  }




  
  download(p){
let id = p.id;

this.zoneService.getFile(id).subscribe(pdf=>{
this.zoneService.getOneResource(`${this.zoneService.host}`+`/affectations/`+id).subscribe(data=>{
  

  const blob = new Blob([pdf],{type: 'application/pdf'})
  const fileName = data.ficheName;
  saveAs(blob,fileName)
  // alert('Fiche télechargé avec succées!')

})


})
  }

  
  ajouter(){
    this.router.navigateByUrl('zonn/addAffectation');
  }
  
  onGetAffectations(){
  this.zoneService.getResource2(this.zoneService.host+"/affectations/search/findByType2Id?id="+1).subscribe(data=>{
   this.affectations = data

   this.total = data['_embedded'].affectations.length
   this.zoneService.getResourceByKeywordNoPage2("types","PC","Name").subscribe(data=>{
    this.sucre = data['_embedded'].types[0].sucre * this.total
    this.oeil = data['_embedded'].types[0].oeil * this.total
    this.farine = data['_embedded'].types[0].farine * this.total
    
  
        })
    })
  }
  onTypeChange(ev){
    this.typeSelected = ev.target.value
  this.inputValue=""
    if(this.typeSelected2 ==0 && this.typeSelected==0){
      this.onGetAffectations()
      this.typeName = ""
    }
 
    if(this.typeSelected!=0  && this.typeSelected2==0){
    this.zoneService.getResourceByID("categories",this.typeSelected).subscribe(data=>{
     this.typeName = data['name']
    
    })


    this.zoneService.getResource2(this.zoneService.host+"/affectations/search/findByCategorieIdAndType2Id?id="+this.typeSelected+"&id2="+1).subscribe(data=>{
      this.affectations = data
      
        this.total = data['_embedded'].affectations.length
      this.zoneService.getResourceByKeywordNoPage2("types","PC","Name").subscribe(data=>{
        this.sucre = data['_embedded'].types[0].sucre * this.total
        this.oeil = data['_embedded'].types[0].oeil * this.total
        this.farine = data['_embedded'].types[0].farine * this.total
    
            })
   
    })
  }
  if(this.typeSelected2!=0 && this.typeSelected==0){
   

    this.zoneService.getResource2(this.zoneService.host+"/affectations/search/findByStockIdAndType2Id?id="+this.typeSelected2+"&id2="+1).subscribe(data=>{
      this.affectations = data
      
        this.total = data['_embedded'].affectations.length
      this.zoneService.getResourceByKeywordNoPage2("types","PC","Name").subscribe(data=>{
        this.sucre = data['_embedded'].types[0].sucre * this.total
        this.oeil = data['_embedded'].types[0].oeil * this.total
        this.farine = data['_embedded'].types[0].farine * this.total
    
            })
   
    })
  }
  if(this.typeSelected!=0  && this.typeSelected2!=0){
    this.zoneService.getResourceByID("categories",this.typeSelected).subscribe(data=>{
      this.typeName = data['name']
     
     })
 
 
     this.zoneService.getResource2(this.zoneService.host+"/affectations/search/findByCategorieIdAndType2IdAndStockId?id="+this.typeSelected+"&id2="+1+"&id3="+this.typeSelected2).subscribe(data=>{
       this.affectations = data
       
         this.total = data['_embedded'].affectations.length
       this.zoneService.getResourceByKeywordNoPage2("types","PC","Name").subscribe(data=>{
         this.sucre = data['_embedded'].types[0].sucre * this.total
         this.oeil = data['_embedded'].types[0].oeil * this.total
         this.farine = data['_embedded'].types[0].farine * this.total
     
             })
    
     })
  }
  }

  onTypeChange2(ev){
    this.inputValue=""
    this.typeSelected2 = ev.target.value
  
    if(this.typeSelected2 ==0 && this.typeSelected==0){
      this.onGetAffectations()
      // this.typeName = ""
    }
 
    if(this.typeSelected2!=0 && this.typeSelected==0){
   

    this.zoneService.getResource2(this.zoneService.host+"/affectations/search/findByStockIdAndType2Id?id="+this.typeSelected2+"&id2="+1).subscribe(data=>{
      this.affectations = data
      
        this.total = data['_embedded'].affectations.length
      this.zoneService.getResourceByKeywordNoPage2("types","PC","Name").subscribe(data=>{
        this.sucre = data['_embedded'].types[0].sucre * this.total
        this.oeil = data['_embedded'].types[0].oeil * this.total
        this.farine = data['_embedded'].types[0].farine * this.total
    
            })
   
    })
  }
  if(this.typeSelected!=0  && this.typeSelected2==0){
    this.zoneService.getResourceByID("categories",this.typeSelected).subscribe(data=>{
     this.typeName = data['name']
    
    })


    this.zoneService.getResource2(this.zoneService.host+"/affectations/search/findByCategorieIdAndType2Id?id="+this.typeSelected+"&id2="+1).subscribe(data=>{
      this.affectations = data
      
        this.total = data['_embedded'].affectations.length
      this.zoneService.getResourceByKeywordNoPage2("types","PC","Name").subscribe(data=>{
        this.sucre = data['_embedded'].types[0].sucre * this.total
        this.oeil = data['_embedded'].types[0].oeil * this.total
        this.farine = data['_embedded'].types[0].farine * this.total
    
            })
   
    })
  }
  if(this.typeSelected!=0  && this.typeSelected2!=0){
    this.zoneService.getResourceByID("categories",this.typeSelected).subscribe(data=>{
      this.typeName = data['name']
     
     })
 
 
     this.zoneService.getResource2(this.zoneService.host+"/affectations/search/findByCategorieIdAndType2IdAndStockId?id="+this.typeSelected+"&id2="+1+"&id3="+this.typeSelected2).subscribe(data=>{
       this.affectations = data
       
         this.total = data['_embedded'].affectations.length
       this.zoneService.getResourceByKeywordNoPage2("types","PC","Name").subscribe(data=>{
         this.sucre = data['_embedded'].types[0].sucre * this.total
         this.oeil = data['_embedded'].types[0].oeil * this.total
         this.farine = data['_embedded'].types[0].farine * this.total
     
             })
    
     })
  }
  }
  onChercher(value){
  
   
     this.zoneService.getResourceByKeywordNoPage2("affectations",value.keyword,"Numero").subscribe(data=>{
      this.affectations = data;
   
     })
  }
  onEditAffectation(p:Affectation){

      // let url = p['_links'].self.href;
    
      this.router.navigateByUrl("zonn/edit-affectation/"+p.id)
  }
  onDeleteAffectation(url:string){
    if(confirm('Etes vous sur de vouloir supprimer cette affectation ?')){
    this.zoneService.deleteResource('affectations',url).subscribe(data=>{
      this.onGetAffectations();
      this.onGetAffectations()
    },err=>{
      console.log(err)
    })
    }
     
   
  }  

}
