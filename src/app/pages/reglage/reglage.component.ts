import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { io } from 'socket.io-client';
import { SocketioService } from 'src/app/services/socketio.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reglage',
  // standalone: true,
	// imports: [NgbDatepickerModule],
  templateUrl: './reglage.component.html',
  styleUrls: ['./reglage.component.scss']
})
// export class ReglageComponent {

// }

// @Component({
// 	selector: 'ngbd-modal-basic',
// 	standalone: true,
// 	imports: [NgbDatepickerModule],
// 	templateUrl: './modal-basic.html',
// })
export class ReglageComponent implements OnInit {
	closeResult = '';
	registerForm!:FormGroup;
	socket: any;
	constructor(private modalService: NgbModal, private formBuilder:FormBuilder, private socketService:SocketioService,  private toastr: ToastrService) {
		this.socket = io(`${environment.apiUrl}`)
	}

	ngOnInit(): void {
		this.registerForm = this.formBuilder.group({
			codeAccess:['', [Validators.required]],
		})
		
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