import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SocketioService } from 'src/app/services/socketio.service';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { Chart } from 'angular-highcharts';



@Component({
  selector: 'app-dashb',
  templateUrl: './dashb.component.html',
  styleUrls: ['./dashb.component.scss']
})
export class DashbComponent implements OnInit {
  
  socket:any;
  realtimeTemp=0; realtimeHum=0; realtimeNivEau=0;
  ObjetJSON:any;
  buzzerStatus= false;
  registerForm!:FormGroup;
  closeResult = '';
  r=0;
  tbTemp=0;   tbHum:any; 
  
  tabCurrentCycle:any;

  
  tabCurrentTH:any
  constructor(private socketService:SocketioService,  private formBuilder:FormBuilder,private modalService: NgbModal,private authService: UserService,  private toastr: ToastrService){
    this.socket = io(`${environment.apiUrl}`);
  }

  ngOnInit() {
    
    this.getCurrentTempHumi();
    // console.log("la porte :",this.prt)

    // this.registerForm = this.formBuilder.group({
		// 	codeAccess:['', [Validators.required]],
		// })

    this.socket.on('temp', (data: number) => {
      // console.log('temp: '+data);
      this.realtimeTemp = data;
    });

    this.socket.on('hum', (data: number) => {
      // console.log('hum: '+data);
      this.realtimeHum = data;
    });

    this.socket.on('niveau', (data: number) => {
      console.log('niveau: '+data);
      this.realtimeNivEau = data;
    });

   
    this.socket.on('buzzer', (data: any) => {
      if(data == 1) this.buzzerStatus = true;
      else  this.buzzerStatus = false;

      console.log(this.buzzerStatus);
    });

  
    // let test:number = this.realtimeTemp;
    this.ObjetJSON = { 
      "val1":this.realtimeTemp,
      "val2":71,
      "val3":53,
    }

    this.r= this.tabCurrentTH.temp;
    console.log(this.r)
  }

  getCurrentTempHumi() {
    
    this.authService.getmeteo().subscribe(
      data => {
      // console.log("donnee yi", data)
        let tmp= data;
        this.tabCurrentTH=tmp;
        this.tbTemp= this.tabCurrentTH.temp;
        // console.log(this.tbTemp)
        this.tbHum= this.tabCurrentCycle.hum;
       
     
    
      }
    )
  }


  lineChart = new Chart({
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
        data: [0,34, 33.5,29,32.8,34,37,38,38.3,36,35.6,36.8,35,34.7,33,32,34.9,35,34.7,34,33.8,]
      } as any
    ]
  });
// SECOND GRAPH
lineChart2 = new Chart({
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
      data: [0,57, 55,56.4,58,62,61,59,61,66,65,64.7,65.3,66.6,67,67.8,68.5,69,71,71.2,74,76.7]
    } as any
  ]
});

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
  console.log(this.registerForm.value.codeAccess);
  
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

