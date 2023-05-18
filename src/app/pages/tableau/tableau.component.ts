import { Component, OnInit } from '@angular/core';
// import tableauSol from '../../histo2.json';
//  import tableau from '../../histo.json'; 
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';


import { Moment } from 'moment';
import moment from 'moment';

// export interface DONNE {
//   tempearture: string;
//   humidite: string;
// date:string;
// }

// export interface ensol{
//  ensol: string;
//   humiditeSol: string;
// date:string;
// }

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.scss'],
  providers: [DatePipe]
})
export class TableauComponent implements OnInit {

searchResult: any[] = [];
searchTerm: string = '';      searchText: any;


currentDte=new Date();
showFormPass =false;
  
itemsperpage: number=5;
p: number=1;
  searchDate!: Date;
currentDate:any;
dataSerreInfo: any[] = []; dataCycle:any;
  Data: any;
  filterTerm!: string;
  filteredData: any;

 constructor(private serreData: UserService, private datePipe: DatePipe) {}
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
  this.currentDate = new Date
       let nowdate= moment(this.currentDate).format('MM/DD/YYYY');
      //  const formattedTime = moment(i?.dateInsertion).format('HH:mm');
      // console.log(nowdate);
  return this.serreData.getSerre().subscribe(
    res=>{
      
      this.Data = res
console.log(this.Data);

      for (const i of this.Data) {
      // console.log(i.dateInsertion);
      const formattedTime = moment(i?.dateInsertion).format('DD:MM:YYYY');
          
        }
      this.dataSerreInfo = this.Data;
      console.log(this.dataSerreInfo);
    }
  )
 }

 getDataCycle(){
  return this.serreData.getAllCycle().subscribe(
    res=>{
       console.log(res);
      let data = res;
      this.dataCycle = data;
      // console.log(this.dataCycle);
    }
  )
 }

//  searchByDate() {

//    this.serreData.getSerre().subscribe(
//     res=>{
      
//       // let data = res;
//       this.Data = res
//       this.dataSerreInfo = this.Data;
//       console.log(this.dataSerreInfo);
//     }
//   )
//   if (this.searchDate) {
//     this.filteredData = this.dataSerreInfo.filter((item: { dateInsertion: Date; }) => {
//       // Remplacez "item.date" par la propriété contenant la date dans votre objet
//       const itemDate = new Date(item.dateInsertion);
//       return itemDate.toDateString() === this.searchDate.toDateString();
//     });
//   } else {
//     // Si aucune date n'est spécifiée, réinitialisez les éléments filtrés
//     this.filteredData = this.dataSerreInfo;
//   }
// }





}
