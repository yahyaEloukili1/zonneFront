import { Component, OnInit } from '@angular/core';
import { Affectation } from 'src/app/models/Affectation';
import { ZonneService } from 'src/app/services/zonne.service';
import { saveAs } from "file-saver/dist/FileSaver";
import { Router } from '@angular/router';
@Component({
  selector: 'app-zonne3',
  templateUrl: './zonne3.component.html',
  styleUrls: ['./zonne3.component.css']
})
export class Zonne3Component implements OnInit {

 
  size:number = 7;
  currentPage:number = 0;
  totalPages: number;
  affectations :Affectation[]
  pages : Array<number>;
  currentKeyword: string = "";
  categories
  typeName
  typeSelected
  total:number
  sucre
  oeil
  farine
  inputValue
  constructor(private zoneService:ZonneService, private router: Router) { }
  showInput(){
    this.zoneService.getResource2(this.zoneService.host+"/affectations/search/findByCinContainsIgnoreCaseAndType2Id?mc="+this.inputValue+"&id="+2).subscribe(data=> {
      console.log(data,"tttttttttttttttttttttt")
      this.affectations = data
    })
  }

  ngOnInit(): void {
    this.zoneService.getResourceAll("categories").subscribe(data=>{
      console.log(data,"kkkk")
      this.categories = data['_embedded'].categories
    

    })
 
this.onGetAffectations()

  }
  download(p){
let id = p.id;
console.log(p)
// this.zoneService.download(`${this.zoneService.host}/report/pdf/${id}`).subscribe(data=>{
//   alert('Fiche télechargé avec succées!')
// })
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
    // this.zoneService.getResource("affectations",this.currentPage,this.size).subscribe(data=>{
    //  this.affectations = data;
    // this.totalPages = data['page'].totalPages
    // this.pages = new Array<number>(this.totalPages);
    // console.log(this.affectations,"kapapapapap")
    // },err=>{
    //   console.log(err)
    // })
 
  this.zoneService.getResource2(this.zoneService.host+"/affectations/search/findByType2Id?id="+3).subscribe(data=>{
   this.affectations = data
   console.log(data,"nnnn")
   this.total = data['_embedded'].affectations.length
   this.zoneService.getResourceByKeywordNoPage2("types","PC-MF","Name").subscribe(data=>{
    this.sucre = data['_embedded'].types[0].sucre * this.total
    this.oeil = data['_embedded'].types[0].oeil * this.total
    this.farine = data['_embedded'].types[0].farine * this.total
    console.log(typeof data['_embedded'].types[0].sucre,"llllll")
    console.log(this.total,"llllll")
        })
    })
  }
  // onPageAffectation(i:number){
    
  //   this.currentPage = i;
  //  this.chercherAffectations()
  // }
  // onChercher(form :any){
  //     this.currentPage = 0;
  //     this.currentKeyword = form.keyword;
  //     this.chercherAffectations()
  // }
  onTypeChange(ev){
    this.typeSelected = ev.target.value
    if(!this.typeSelected){
this.onGetAffectations()
    }
    this.zoneService.getResourceByID("categories",this.typeSelected).subscribe(data=>{
     this.typeName = data['name']
     console.log(data,"kkkk") 
    })
    console.log(this.typeSelected,"pppppp")


    this.zoneService.getResource2(this.zoneService.host+"/affectations/search/findByCategorieIdAndType2Id?id="+this.typeSelected+"&id2="+3).subscribe(data=>{
      this.affectations = data
      console.log(data,"zaza")
        this.total = data['_embedded'].affectations.length
      this.zoneService.getResourceByKeywordNoPage2("types","PC","Name").subscribe(data=>{
        this.sucre = data['_embedded'].types[0].sucre * this.total
        this.oeil = data['_embedded'].types[0].oeil * this.total
        this.farine = data['_embedded'].types[0].farine * this.total
        console.log(typeof data['_embedded'].types[0].sucre,"llllll")
        console.log(this.total,"llllll")
            })
      // this.affectations = data['_embedded'].affectations
      console.log(data['_embedded'].affectations,"lpp")
    })
  }
  onChercher(value){
  
    // this.zoneService.getResourceByKeyword("affectations",this.currentPage,this.size,this.currentKeyword,"Numero").subscribe(data=>{
    //   this.affectations = data;
    //   console.log(this.affectations,"kapapapapap")
    //  this.totalPages = data['page'].totalPages
    //  this.pages = new Array<number>(this.totalPages);
    //  },err=>{
    //    console.log(err) 
    //  })
     this.zoneService.getResourceByKeywordNoPage2("affectations",value.keyword,"Numero").subscribe(data=>{
      this.affectations = data;
      console.log(data,"le")
     })
  }
  onEditAffectation(p:Affectation){
    console.log(p.id,"popopoop")
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
