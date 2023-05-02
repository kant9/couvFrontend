import { Component } from '@angular/core';
import tableau from '../../histo.json'; 

@Component({
  selector: 'app-temp-hum',
  templateUrl: './temp-hum.component.html',
  styleUrls: ['./temp-hum.component.scss']
})
export class TempHumComponent {

  // histoSol: any[] = tableauSol;
  histo: any[] = tableau ;
showFormPass =false;
searchText!: string;
itemsperpage: number=4;
p: number=1;


 constructor() {}
 onclick(){
  this.showFormPass= true; 
 }
 on(){
   this.showFormPass= false; 
  }
  ngOnInit() {
   this.histo=tableau;
   console.log(this.histo)
  }

  search(e:any) {
   console.log(e.target.value)
   this.histo=this.histo.filter((el:any)=>{
     return el.date.toLowerCase().includes(e.target.value.toLowerCase())

   })
    
 }
}
