import { Component, OnInit } from '@angular/core';
// import tableauSol from '../../histo2.json';
//  import tableau from '../../histo.json'; 
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';



export interface DONNE {
  tempearture: string;
  humidite: string;
date:string;
}

export interface ensol{
 ensol: string;
  humiditeSol: string;
date:string;
}

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss']
})
export class TableauComponent implements OnInit {
  
  dataArray: any[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Bob' },
    { id: 4, name: 'Alice' },
  ];
  searchResult: any[] = [];
  searchTerm: string = '';

currentDte=new Date();
showFormPass =false;
searchText!: string;
itemsperpage: number=5;
p: number=1;
currentDate:any;
dataSerreInfo:any; dataCycle:any;


 constructor(private serreData: UserService) {}
 onclick(){
  this.showFormPass= true; 
 }
 on(){
   this.showFormPass= false; 
  }
  ngOnInit() {
  //  this.histo=tableau;
  //  console.log(this.currentDte)
  
   this.getDataSerre();
   this.getDataCycle();
  }

  search(e:any) {
  //  console.log(e.target.value)
   this.dataSerreInfo=this.dataSerreInfo.filter((el:any)=>{
     return el.date.toLowerCase().includes(e.target.value.toLowerCase())

   })
    
 }

 getDataSerre(){
  return this.serreData.getSerre().subscribe(
    res=>{
      // console.log(res);
      let data = res;
      this.dataSerreInfo = data;
      // console.log(this.dataSerreInfo);
    }
  )
 }

 getDataCycle(){
  return this.serreData.getAllCycle().subscribe(
    res=>{
      // console.log(res);
      let data = res;
      this.dataCycle = data;
      // console.log(this.dataCycle);
    }
  )
 }
}
