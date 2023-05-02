import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-modif-password',
  templateUrl: './modif-password.component.html',
  styleUrls: ['./modif-password.component.scss']
})
export class ModifPasswordComponent {

  registerForm!:FormGroup;
  title = 'login';
  submitted = false;
  spin= false;
  errorSms:any;
  img: boolean = false;

  constructor(private formBuilder:FormBuilder,private authService: UserService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(){

      //validaions

    this.registerForm = this.formBuilder.group({
      password :['', [Validators.required, Validators.minLength(6)]],
      password1:['', [Validators.required, Validators.minLength(6)]],
      password2:['', [Validators.required, Validators.minLength(6)]]
  })

  }


  onSubmit(){
    this.submitted = true
    this.spin = true

     if(this.registerForm.invalid){
      this.spin = false
      return ;
    }else if(this.registerForm.value.password1 != this.registerForm.value.password2){
      setTimeout(()=> this.spin = false, 2000)
      this.formBuilder.group({
        password1:[' '],
        password2:[' ']
    })
     return this.toastr.warning("les deux mot de passe sont differents")
    }

  const user={
    newPassword: this.registerForm.value.password1, 
    oldPassword: this.registerForm.value.password
  }
  const ids= localStorage.getItem('id')?.replace(/"/g, '');
  const id = ids?.split(' ').join('')
  
  
    return this.authService.update(id,user).subscribe(
      res=>{
          console.log(res);
          this.toastr.success("Mot de passe mis à jour avec succès")
          this.ngOnInit()
          this.spin = false
      },error =>{
        console.log(error);
        this.toastr.error(error)
        setTimeout(()=> this.spin = false, 2000 );
      }
    )

  }


}

