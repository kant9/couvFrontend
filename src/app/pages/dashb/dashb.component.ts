import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SocketioService } from 'src/app/services/socketio.service';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Moment } from 'moment';

import { Chart } from 'angular-highcharts';
import moment from 'moment';



@Component({
  selector: 'app-dashb',
  templateUrl: './dashb.component.html',
  styleUrls: ['./dashb.component.scss']
})
export class DashbComponent implements OnInit {
  
  tabData12hT: any[] = [];
  tabData12hH: any[] = [];
  socket:any;
  realtimeTemp=0; realtimeHum=0; realtimeNivEau=0;
  ObjetJSON:any;
  buzzerStatus= false;
  registerForm!:FormGroup;
  closeResult = '';
  tbTemp=0;   tbHum:any;  


  Temp1:any=""; Temp2:any; Temp3:any; Temp4:any; Temp5:any; Temp6:any ;Temp7:any; Temp8:any; Temp9:any; Temp10:any
  Temp11:any=""; Temp12:any; Temp13:any; Temp14:any; Temp15:any; Temp16:any ;Temp17:any; Temp18:any; Temp19:any; Temp20:any; Temp21:any

  t1!:any ;  t2!:any ; t3!:any ; t4!:any ; t5!:any; t6!:any; t7!:any; t8!:any; t9!:any; t10!:any;
  t11!:any ;  t12!:any ; t13!:any ; t14!:any ; t15!:any; t16!:any; t17!:any; t18!:any; t19!:any; t20!:any; t21!:any;


//  LES VARIABLES POUR HUMIDITÉ
Hum1:any=""; Hum2:any; Hum3:any; Hum4:any; Hum5:any; Hum6:any ;Hum7:any; Hum8:any; Hum9:any; Hum10:any
Hum11:any=""; Hum12:any; Hum13:any; Hum14:any; Hum15:any; Hum16:any ;Hum17:any; Hum18:any; Hum19:any; Hum20:any; Hum21:any

  h1!:any ;  h2!:any ; h3!:any ; h4!:any ; h5!:any; h6!:any; h7!:any; h8!:any; h9!:any; h10!:any;
  h11!:any ;  h12!:any ; h13!:any ; h14!:any ; h15!:any; h16!:any; h17!:any; h18!:any; h19!:any; h20!:any; h21!:any;


  lineChart:any 
  lineChart2:any 
  tabCurrentCycle:any;
  tabHeur: any =null
  tabCurrentTH:any
  constructor(private socketService:SocketioService,  private formBuilder:FormBuilder,private modalService: NgbModal,private authService: UserService,  private toastr: ToastrService){
    this.socket = io(`${environment.apiUrl}`);
  }


  

  ngOnInit() {
    this.getTempHum12h();
 
   
    
    
    this.getCurrentTempHumi();
    

    this.socket.on('temp', (data: number) => {
      // console.log('temp: '+data);
      this.realtimeTemp = data;
    });

    this.socket.on('hum', (data: number) => {
      // console.log('hum: '+data);
      this.realtimeHum = data;
    });

    this.socket.on('niveau', (data: number) => {
      // console.log('niveau: '+data);
      this.realtimeNivEau = data;
    });

   
    this.socket.on('buzzer', (data: any) => {
      if(data == 1) this.buzzerStatus = true;
      else  this.buzzerStatus = false;

      // console.log(this.buzzerStatus);
    });

  
    // let test:number = this.realtimeTemp;
    this.ObjetJSON = { 
      "val1":this.realtimeTemp,
      "val2":71,
      "val3":53,
    }

    // this.r= this.tabCurrentTH.temp;
    // console.log(this.r)
  }

  getCurrentTempHumi() {
    
    this.authService.getmeteo().subscribe(
      data => {
      // console.log("donnee yi", data)
        let tmp= data;
        this.tabCurrentTH=tmp;
        this.tbTemp= this.tabCurrentTH.temp;
        // console.log(this.tbTemp)
        this.tbHum= this.tabCurrentTH.hum;
       
     
      }
    )
  }


  // methode pour recuperer la température et l'humidité à 12h
  getTempHum12h()
  {
    // const now = new Date();
    // const present = moment(now).format('HH:mm');
    // //  console.log('present',present); 
        
    this.authService.getSerre().subscribe(
      data => {
      console.log("donnee yi", data)
      let h= data
      this.tabHeur = data

      for (const i of this.tabHeur) {
      // console.log(i.dateInsertion);
      const formattedTime = moment(i?.dateInsertion).format('HH:mm');
      // console.log(formattedTime ==="19:00");
      if(formattedTime == '19:00')
      {
        this.tabData12hT.push(i.temp)
        this.tabData12hH.push(i.hum)
        console.log(this.tabData12hT);
        
       
        this.Temp1= this.tabData12hT[0];   this.Temp2= this.tabData12hT[1];
        this.Temp3= this.tabData12hT[2];   this.Temp4= this.tabData12hT[3];
        this.Temp5= this.tabData12hT[4];   this.Temp6= this.tabData12hT[5];
        this.Temp7= this.tabData12hT[6];   this.Temp8= this.tabData12hT[7];
        this.Temp9= this.tabData12hT[8];   this.Temp10= this.tabData12hT[9];
        this.Temp11= this.tabData12hT[10];   this.Temp12= this.tabData12hT[11];
        this.Temp13= this.tabData12hT[12];   this.Temp14= this.tabData12hT[13];
        this.Temp15= this.tabData12hT[14];   this.Temp16= this.tabData12hT[15];
        this.Temp17= this.tabData12hT[16];   this.Temp18= this.tabData12hT[17];
        this.Temp19= this.tabData12hT[18];   this.Temp20= this.tabData12hT[19];
        this.Temp21= this.tabData12hT[20];   

        // humidite
        this.Hum1= this.tabData12hH[0];   this.Hum2= this.tabData12hH[1];
        this.Hum3= this.tabData12hH[2];   this.Hum4= this.tabData12hH[3];
        this.Hum5= this.tabData12hH[4];   this.Hum6= this.tabData12hH[5];
        this.Hum7= this.tabData12hH[6];   this.Hum8= this.tabData12hH[7];
        this.Hum9= this.tabData12hH[8];   this.Hum10= this.tabData12hH[9];
        this.Hum11= this.tabData12hH[10];   this.Hum12= this.tabData12hH[11];
        this.Hum13= this.tabData12hH[12];   this.Hum14= this.tabData12hH[13];
        this.Hum15= this.tabData12hH[14];   this.Hum16= this.tabData12hH[15];
        this.Hum17= this.tabData12hH[16];   this.Hum18= this.tabData12hH[17];
        this.Hum19= this.tabData12hH[18];   this.Hum20= this.tabData12hH[19];
        this.Hum21= this.tabData12hH[20];   
      
        // console.log(this.tabData12hT);
        this.t1 = parseFloat(this.Temp1, ); this.t2 = parseFloat(this.Temp2, );
        this.t3 = parseFloat(this.Temp3, ); this.t4 = parseFloat(this.Temp4, );
        this.t5 = parseFloat(this.Temp5, ); this.t6 = parseFloat(this.Temp6, );
        this.t7 = parseFloat(this.Temp7, ); this.t8 = parseFloat(this.Temp8, );

        this.t9 = parseFloat(this.Temp9, ); this.t10 = parseFloat(this.Temp10, );
        this.t11 = parseFloat(this.Temp11, ); this.t12 = parseFloat(this.Temp12, );
        this.t13 = parseFloat(this.Temp13, ); this.t14 = parseFloat(this.Temp14, );
        this.t15 = parseFloat(this.Temp15, ); this.t16 = parseFloat(this.Temp16, );

        this.t17 = parseFloat(this.Temp17, ); this.t18 = parseFloat(this.Temp18, );
        this.t19 = parseFloat(this.Temp19, ); this.t20 = parseFloat(this.Temp20, );
        this.t21 = parseFloat(this.Temp21, ); 

        // humidité 
        this.h1 = parseFloat(this.Hum1, ); this.h2 = parseFloat(this.Hum2, );
        this.h3 = parseFloat(this.Hum3, ); this.h4 = parseFloat(this.Hum4, );
        this.h5 = parseFloat(this.Hum5, ); this.h6 = parseFloat(this.Hum6, );
        this.h7 = parseFloat(this.Hum7, ); this.h8 = parseFloat(this.Hum8, );

        this.h9 = parseFloat(this.Hum9, ); this.h10 = parseFloat(this.Hum10, );
        this.h11 = parseFloat(this.Hum11, ); this.h12 = parseFloat(this.Hum12, );
        this.h13 = parseFloat(this.Hum13, ); this.h14 = parseFloat(this.Hum14, );
        this.h15 = parseFloat(this.Hum15, ); this.h16 = parseFloat(this.Hum16, );

        this.h17 = parseFloat(this.Hum17, ); this.h18 = parseFloat(this.Hum19, );
        this.h19 = parseFloat(this.Hum19, ); this.h20 = parseFloat(this.Hum20, );
        this.h21 = parseFloat(this.Hum21, ); 
        
        console.log(this.t15);
        console.log(this.Temp2);

     this.lineChart= new Chart({
          chart: {
            type: 'line'
          },
          title: {
            text: 'Temp (°C)'
          },
          credits: {
            enabled: false
          },
          series: [
            {
              name: 'Jours du cycle',
              data: [0,this.t1, this.t2, this.t3,this.t4, this.t5,this.t6,this.t7,this.t8,this.t9,this.t10,
              this.t11,this.t12,this.t13,this.t14,this.t15,this.t16,this.t17,this.t18,this.t19,this.t20,this.t21]
            } as any
          ]
        });

      // SECOND GRAPH 

      this.lineChart2= new Chart({
        chart: {
          type: 'line'
        },
        title: {
          text: 'Hum (%)'
        },
        credits: {
          enabled: false
        },
        series: [
          {
            name: 'Jours du cycle',
            data: [0,this.h1, this.h2, this.h3,this.h4, this.h5,this.h6,this.h7,this.h8,this.h9,this.h10,
            this.h11,this.h12,this.h13,this.h14,this.h15,this.h16,this.h17,this.h18,this.h19,this.h20,this.h21]
          } as any
        ]
      });
        
      }
          
        }
      
      }
    )
  }



  showHistorique:boolean = false
  isOn = false;

  aroz:boolean = false;

  


  



  switchArros()
  {
    // this.aroz? this.aroz= false: this.aroz = true;
    if(this.aroz) {
      this.aroz= false
      this.socket.emit("noWater", 0);
    }else{
      this.aroz = true
      this.socket.emit("isWater", 1);
    };
  }

  displayStyle = "none";
  
 

openPopup() {
	
  this.displayStyle = "block";

  
}
closePopup() {
  this.displayStyle = "none";
  
}
displayStyle2 = "none";

openPopupInfo() {
	
  this.displayStyle2 = "block";

  
}
closePopupInfo() {
  this.displayStyle2 = "none";
  
}

switchHistorique(){
  if(this.showHistorique){
    this.showHistorique = false
  }else{
    this.showHistorique = true
  }
}

open(content:any) {
  this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    },
    (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
  );
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

onCode(){
  // console.log(this.registerForm.value.codeAccess);
  
   if(this.registerForm.value.codeAccess == 7890){
  this.socket.emit("openDoor", 1);
  localStorage.setItem('door', '1')
  this.toastr.info('Porte ouverte')
 }else if(this.registerForm.value.codeAccess == 9078){
  this.socket.emit("closeDoor", 0);
  localStorage.setItem('door', '0')
  this.toastr.info('Porte fermée')
 }else{
  this.toastr.error('Code d\'accès incorrect')
 }		

 setTimeout(() => {
  this.ngOnInit()
 }, 2000);
}


}

