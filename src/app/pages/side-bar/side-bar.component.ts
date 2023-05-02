import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { io } from 'socket.io-client';
import { SocketioService } from 'src/app/services/socketio.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cycle } from 'src/app/models/cycle';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  socket:any;
  realtimeTemp=0; realtimeHum=0; realtimeLum=0; realtimeSol=0;
  ObjetJSON:any;
  toi:any;
  buzzerStatus= false;
  registerForm!:FormGroup;
  closeResult = '';
  matine:any;
 
  
  imgArros: any = "https://media.discordapp.net/attachments/1033044458092118168/1087432078246813706/icons8-water-plants-66.png?width=72&height=72";
  
  switchRoof: boolean = false; fan: boolean = true; showHome: boolean = false; showDashboard: boolean = true;
  showInfo: boolean = false; infoArrosage: boolean = true; titleArrosage: boolean = true; currentDate: any;
  cycleForm!: FormGroup; submitted = false; spin = false; errorSms: any; 
  img: boolean = false; notChoise = false; tabArrosage: any; matin: any; soir: any;
  dureMatin: any; dureSoir: any;

  constructor(private formBuilder: FormBuilder, private socketService: SocketioService, private serviceArroge: UserService, private toastr: ToastrService,private modalService: NgbModal,private router: Router) {
    this.socket = io(`${environment.apiUrl}`);
  }
  


  ngOnInit(): void {
// 

this.matine='dinde';
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

    // 
    this.showTime();
    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]]
    })

    this.cycleForm = this.formBuilder.group({
      nombre: [''],
      espece: [''],
      taux: [''],
      numcycle: ['']
    })

    this.getArroge()

  }

  showHistorique:boolean = false
  displayStyle = "none";
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

 

  getArroge() {
    this.serviceArroge.getArrosage().subscribe(
      data => {
        console.log("donnee", data)
        this.tabArrosage = data

        localStorage.setItem("idArrosage", this.tabArrosage[0]._id)

        this.matin = this.tabArrosage[0].matin;
        this.soir = this.tabArrosage[0].soir;
        this.dureMatin = this.tabArrosage[0].dureMatin;
        this.dureSoir = this.tabArrosage[0].dureSoir
      }
    )
  }


  switchFan() {
    if (this.fan == true) {
      this.fan = false
      this.socket.emit("noFan", 0);
    } else {
      this.fan = true
      this.socket.emit("isFan", 1);
    }
  }

  switchInfo() {
    if (this.showDashboard == true) {
      this.showDashboard = false;
      // this.showInfo = true;
    } else {
      this.showDashboard = true;
      // this.showInfo = false;
    }
  }

  switchArrosage() {

    if (this.infoArrosage == true) {
      this.infoArrosage = false;
      this.titleArrosage = false;
    } else {
      this.infoArrosage = true;
      this.titleArrosage = true;
    }
  }

  showTime() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    this.currentDate = mm + '/' + dd + '/' + yyyy;
  }


  
  displaySerre = "none";


  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  openSerre() {
    this.displaySerre = "block";
  }

  closeSerre() {
    this.displaySerre = "none";
  }

  reloadHome = () => window.location.pathname = 'home';

  logout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('door');
    window.location.pathname = 'login';
  };

  
  // methode pour l'envoi des données de cycle vers la base de données

  onArroge() {

    let donneescycle = {
      nombre: this.cycleForm.value.nombre,
      espece: this.cycleForm.value.espece,
      taux: this.cycleForm.value.taux,
      numcycle: this.cycleForm.value.numcycle
    }
// idArrosage c'est rien de speciale
    let id = localStorage.getItem("idCycle")

    if (!donneescycle.nombre || !donneescycle.espece || !donneescycle.taux || !donneescycle.numcycle) 
    {
      this.notChoise = true;
      setTimeout(() => {
        this.notChoise = false;
      }, 2000);
      return
    }

    this.serviceArroge.updateArrosage(id, donneescycle).subscribe(
      data => {
        console.log(data);
        if (data.message == "Modifier avec succès") {
          this.toastr.success("Modifier avec succès")
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }
      }
    )
  }

  


}
