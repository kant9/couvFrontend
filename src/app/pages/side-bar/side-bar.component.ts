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
  realtimeTemp=0; realtimeHum=0; realtimeLum=0; realtimeSol=0; ObjetJSON:any;
  nbJours!: number;
  buzzerStatus= false;
  fanStatus= false;
  humidStatus= false;
  heaterStatus= false;
  ledRedStatus= false;
  ledBlueStatus= false
  registerForm!:FormGroup;
  closeResult = '';
  showHistorique:boolean = false
  nombreDepart = 21; nombreRestant:any;
  
  derniereValeur!:any

  // showHome: boolean = false; showDashboard: boolean = true;
  // showInfo: boolean = false; infoArrosage: boolean = true; titleArrosage: boolean = true; 
  currentDate: any;
  cycleForm!: FormGroup; submitted = false; spin = false; errorSms: any; 
  cycleForm2!: FormGroup
  
  notChoise = false; 
  tabCycle: any;
  nombre: any; espece: any; numcycle: any; 
  tabCurrentCycle:any;

  constructor(private formBuilder: FormBuilder, private socketService: SocketioService, private authService: UserService, private toastr: ToastrService,private modalService: NgbModal,private router: Router) {
    this.socket = io(`${environment.apiUrl}`);
  }
  

 

  ngOnInit(): void {
    // Appeler la fonction récursive pour commencer à décrémenter le nombre à l'heure de départ
    this.decrementerNombre();
    this.alert19emeJour();
    this.getCurrentCycle();

    let rout= localStorage.getItem('currentUser') 
    if(!rout) window.location.pathname=''


    
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

    this.socket.on('lum', (data: number) => {
      // console.log('lum: '+data);
      this.realtimeLum = data;
    });

    this.socket.on('sol', (data: number) => {
      // console.log('sol: '+data);
      this.realtimeSol = data;
    });

// ACTIVATION/DESACTIVATION BUZZER
    this.socket.on('etaBuzzer', (data: any) => {
      if(data == 1) this.buzzerStatus = true;
      else  this.buzzerStatus = false;

      // console.log(this.buzzerStatus);
    });



  // ACTIVATION/DESACTIVATION VENTILLO
  this.socket.on('etatfan', (data: any) => {
    if(data == 1) this.fanStatus = true;
    else  this.fanStatus = false;

    // console.log(this.fanStatus);
  });
    
  // ACTIVATION/DESACTIVATION Humidificateur
  this.socket.on('etatbrum', (data: any) => {
    if(data == 1) this.humidStatus = true;
    else  this.humidStatus = false;

    // console.log(this.humidStatus);
  });

  // ACTIVATION/DESACTIVATION HEATER
  this.socket.on('etatHeater', (data: any) => {
    if(data == 1) this.heaterStatus = true;
    else  this.heaterStatus = false;

    // console.log(this.heaterStatus);
  });

  // ACTIVATION/DESACTIVATION LED POUR TEMPERATURE
  this.socket.on('etatLedRg', (data: any) => {
    if(data == 1) this.ledRedStatus = true;
    else  this.ledRedStatus = false;

    // console.log(this.ledRedStatus);
  });

  // ACTIVATION/DESACTIVATION LED POUR HUMIDITÉ
  this.socket.on('etatLedbleu', (data: any) => {
    if(data == 1) this.ledBlueStatus = true;
    else  this.ledBlueStatus = false;

    // console.log(this.ledBlueStatus);
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
      email:['', [Validators.required, Validators.email]],
      password :['', [Validators.required, Validators.minLength(6)]]
    })

    this.cycleForm = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      espece: ['',[Validators.required]],
      // taux: ['',[null]],
      numcycle: ['',[Validators.required]],
      
    })

    this.cycleForm2 = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      espece: ['',[Validators.required]],
      taux: ['',[Validators.required]],
      numcycle: ['',[Validators.required]],
      
    })

  

  }

  onSubmit()
  {
    // console.log("cycle");
    this.submitted = true
    // this.spin = true
   
    // Recuperation des donnees du formgcycle
  const cycle ={ 
    nombre: this.cycleForm.value.nombre,
    espece: this.cycleForm.value.espece,
    taux: this.cycleForm.value.taux,
    numcycle: this.cycleForm.value.numcycle,
    'dateInsertion': new Date(),
  } 
  console.log(cycle);

  return this.authService.insertCycle(cycle).subscribe(
    res=>{
        // console.log(res);
        let infoCycle = res;
        
        if (infoCycle._id) {
          this.toastr.success("Insertion reussie")
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }
       
        
    },
    error =>{
    
      setTimeout(()=> {this.spin = false; this.errorSms = false;},2000)
      if(error == 'Not Found') return this.toastr.error('Erreur', 'Remplissez tous les champs!'); 
      else return this.toastr.error('Erreur', 'Remplissez tous les champs!!'); 
      // this.errorSms = true;
      // this.showSuccess();
      
      
    }
  )

  }

  // ONSUBMIT2 POUR LE FORMULAIRE DE MODIFICATION DONNÉES CYCLE
  updateCycle()
  {
    // console.log("cycle");
    this.submitted = true
    // this.spin = true
  
    // Recuperation des donnees du formgcycle
  const cycle2 ={ 
    nombre: this.cycleForm2.value.nombre,
    espece: this.cycleForm2.value.espece,
    taux: this.cycleForm2.value.taux,
    numcycle: this.cycleForm2.value.numcycle,
 
    
  } 

  console.log(this.cycleForm2.value);
  return
  
  
  return this.authService.insertCycle(cycle2).subscribe(
    res=>{
        // console.log(res);
        
    },
    error =>{
    
      setTimeout(()=> {this.spin = false; this.errorSms = false;},2000)
      if(error == 'Not Found') return this.toastr.error('Erreur', 'Email introuvable!'); 
      else return this.toastr.error('Erreur', 'Email ou mot de passe incorrect!'); 
      
      
      
    }
  )

  }


  updateFormCycle(){
    //console.log(this.tabCurrentCycle.taux);
    
    this.cycleForm2 = this.formBuilder.group({
      id: [this.tabCurrentCycle._id],
      nombre: [this.tabCurrentCycle.nombre,[Validators.required]],
      espece: [this.tabCurrentCycle.espece,[Validators.required]],
      taux: [this.tabCurrentCycle.taux,[Validators.required]],
      numcycle: [this.tabCurrentCycle.numcycle,[Validators.required]],
      
    })
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



  showTime() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    this.currentDate = mm + '/' + dd + '/' + yyyy;
  }



  reloadHome = () => window.location.pathname = 'home';
    
    
    

  logout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('door');
    window.location.pathname = 'login';
  };

  
  
  getCurrentCycle() {
    
    this.authService.getCycle().subscribe(
      data => {
      //  console.log("donnee", data)
        let tmp= data;
        this.tabCurrentCycle=tmp;
        // console.log(this.tabCurrentCycle);
        
        
        
    
      }
    )
  }






  updateCurrentCycle()
  {

    const cycle={
      taux: this.cycleForm2.value.taux,
      espece: this.cycleForm2.value.espece,
      numcycle: this.cycleForm2.value.numcycle,
      nombre: this.cycleForm2.value.nombre
      
    }
   let id= this.cycleForm2.value.id;
  
    this.authService.updatecycle(id, cycle).subscribe(
      data => {
        // console.log(data);
        if (data.message == "Modifier avec succès") {
          this.toastr.success("Modifier avec succès")
          setTimeout(() => {
            window.location.reload()
          }, 2000);
        }
      }
    )
  }



  updateCurrentNombre()
  {

    const cycle={
      taux: this.cycleForm2.value.taux,
      espece: this.cycleForm2.value.espece,
      numcycle: this.cycleForm2.value.numcycle,
      nombre: this.cycleForm2.value.nombre,
      nbrJ: this.cycleForm2.value.nbJours
      
    }
   let id= this.cycleForm2.value.id;
  
    this.authService.updateNbrJour(id, cycle).subscribe(
      data => {
        // console.log(data);
        if (data.message == "Modifier avec succès") {
          this.toastr.success("Modifier avec succès")
          setTimeout(() => {
            this.updateCurrentNombre()
          }, 6000);
        }
      }
    )
  }

//   updateCurrentNombre()
//   {

//     setTimeout(() => {
//       const leNombre={
//         nbrJr: this.cycleForm2.value.nbJours +1
//       } 
//       console.log(leNombre)
//      let id= this.cycleForm2.value.id;
    
//       this.authService.updatecycle(id, leNombre).subscribe(
//         data => {
//           // console.log(data);
//           if (data.message == "Nombre Modifier avec succès") {
//             this.toastr.success("Nombre Modifier avec succès")
//             setTimeout(() => {
//               window.location.reload()
//             }, 2000);
//           }
//         }
//       )

//     }, 8000);
    
  

// }

  

  // updateNbrJour










// fonction pour la décrementation du nombre de jours

// Définir le nombre de départ et l'heure de départ
heureDepart = new Date();

// Fonction récursive pour décrémenter le nombre toutes les heures
decrementerNombre() {
    // Attendre une heure
    
      setTimeout(() => {
      
        // Décrémenter le nombre de départ
        this.nombreDepart -= 1;
        // this.nombreRestant= 21- this.nombreDepart;
       
        // Afficher le nouveau nombre de départ
        // console.log("NOMBRE DE DEPART : ", this.nombreDepart );

        // Appeler la fonction récursive pour décrémenter le nombre à la prochaine heure
        this.decrementerNombre();
    }, 4000); // 150000 millisecondes = 1 heure
    
  
    
{
  
}
}

// 86400000

alert19emeJour() {
  if (this.nombreDepart == 3) {
    //  console.log("attention on est au 19 eme jour ")
    this.socket.emit("19 eme", 1);
  } else {
    this.socket.emit("pas encore", 0);
  }
}
  




 
}
