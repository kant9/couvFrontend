import { Component, OnInit } from '@angular/core';

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
  realtimeTemp=0; realtimeHum=0; realtimeLum=0; realtimeSol=0;
  ObjetJSON:any;
  toi:any;
  buzzerStatus= false;
  registerForm!:FormGroup;
  closeResult = '';
  r=34.9;
  
 

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
        data: [0,35, 33.5,29,32.8,34,37,38,38.3,36,35.6,36.8,35,34.7,33,32,34.9,35,34.7,34,33.8,this.r]
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
  constructor(private socketService:SocketioService,  private formBuilder:FormBuilder,private modalService: NgbModal,  private toastr: ToastrService){
    this.socket = io(`${environment.apiUrl}`);
  }

  ngOnInit() {
    
    console.log("la porte :",this.prt)

    this.registerForm = this.formBuilder.group({
			codeAccess:['', [Validators.required]],
		})

    this.socket.on('temp', (data: number) => {
      console.log('temp: '+data);
      this.realtimeTemp = data;
    });

    this.socket.on('hum', (data: number) => {
      console.log('hum: '+data);
      this.realtimeHum = data;
    });

    this.socket.on('lum', (data: number) => {
      console.log('lum: '+data);
      this.realtimeLum = data;
    });

    this.socket.on('sol', (data: number) => {
      console.log('sol: '+data);
      this.realtimeSol = data;
    });

    this.socket.on('buzzer', (data: any) => {
      if(data == 1) this.buzzerStatus = true;
      else  this.buzzerStatus = false;

      console.log(this.buzzerStatus);
    });

    this.socket.on('toit', (data: number) => {
      console.log('toit: '+data);
      this.toi = data;
    });

    // let test:number = this.realtimeTemp;
    this.ObjetJSON = { 
      "val1":this.realtimeTemp,
      "val2":71,
      "val3":53,
      "val4":800,
    }
  }

  showHistorique:boolean = false
  isOn = false;

  aroz:boolean = false;

  cris:boolean = true;
  prt = localStorage.getItem('door') //:boolean = false;
  
  lamp:boolean = false;
  cheminImage:any = "https://media.discordapp.net/attachments/1033044458092118168/1087419548929634408/vvv.png?width=498&height=374";
  imEnsoleillement:any="https://media.discordapp.net/attachments/1033044458092118168/1087422962031923302/nnn.png?width=498&height=374";

  image1Histo:any = "https://cdn.discordapp.com/attachments/1033044458092118168/1087430544268210276/icons8-sun-50.png";
  image2Histo:any = "https://media.discordapp.net/attachments/1033044458092118168/1087430544486322216/humSol.png?width=70&height=70";
  image3Histo:any = "https://media.discordapp.net/attachments/1033044458092118168/1087432077496033320/icons8-temperature-48.png?width=52&height=52";
  image4Histo:any = "https://media.discordapp.net/attachments/1033044458092118168/1087432078024523866/icons8-humidity-64.png?width=70&height=70";
  imtomate:any = "https://media.discordapp.net/attachments/1033044458092118168/1087435055397359656/imTomate.jpg?width=607&height=413";
  lampSerre:any = "https://uxwing.com/wp-content/themes/uxwing/download/household-and-furniture/spotlight-icon.svg";
  Alarm: any = "https://media.discordapp.net/attachments/1033044458092118168/1089453789712486501/icons8-alarm-80.png?width=88&height=88";
  AlarmGif:any="https://media.discordapp.net/attachments/1033044458092118168/1089457282296856577/icons8-alarm-50_1.png?width=55&height=55";
  Arrosoir:any= "https://media.discordapp.net/attachments/1033044458092118168/1089450396575072266/icons8-watering-can-50_1.png?width=55&height=55";
  ArrosoirGif:any="https://media.discordapp.net/attachments/1033044458092118168/1089451339240702043/icons8-watering-can-66.png?width=72&height=72";
  portFerm:any="https://uxwing.com/wp-content/themes/uxwing/download/household-and-furniture/door-close-icon.svg";
  portOuv:any="https://uxwing.com/wp-content/themes/uxwing/download/household-and-furniture/open-door-icon.svg";
  ToiFerm:any="https://media.discordapp.net/attachments/1072087018206675037/1089886716510347384/icons8-roofing-32_1.png?width=35&height=35";
  ToiOuv:any="";
  lampSerAlum:any="https://media.discordapp.net/attachments/1033044458092118168/1089460554214678528/icons8-spotlights-68.png?width=74&height=74";
  
  verin:any="https://media.discordapp.net/attachments/1072087018206675037/1089891409206726786/verinGIF-unscreen.gif?width=392&height=173";

  imArros:any="https://media.discordapp.net/attachments/1033044458092118168/1087432078246813706/icons8-water-plants-66.png?width=72&height=72";

  serre:any= "https://www.jadeespacesverts.com/public/img/big/serredejardinenboiscleophee10mpgjpg_603b6ea56781d.jpg";
  fandango:any= "data:image/jpeg;base64,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";


  

  switchLamp(){
    if(this.lamp) {
      this.lamp= false
      this.socket.emit("isOff", 0);
    }else{
      this.lamp = true
      this.socket.emit("isOn", 1);
    };
  }

  switchPorte(){
    
    
  }

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
