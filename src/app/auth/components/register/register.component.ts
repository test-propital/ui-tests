import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { UsersService } from 'src/app/core/services/users.service';
import { passwordMatchValidator } from 'src/app/core/utils/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  credentials!: FormGroup ;
  constructor(
    private router:Router,
    private fb: FormBuilder,
    private alert:AlertService,
    private userServices:UsersService,
  ) {
    this.credentials = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator()       
  })
  }

  ngOnInit(): void {
  }

  register():void{
    const body={
      name:this.credentials.value.name,
      email:this.credentials.value.email,
      password:this.credentials.value.password
    }
    console.log(body);
    this.userServices.registerUser(
      body
    ).subscribe(
      {
        next:(results)=>{
          console.log(results)
          this.alert.successTimer("Registro exitoso")
          this.router.navigateByUrl('login/auth');
        },
        error:(error)=>{
          console.log(error)
          this.alert.errorTimer("Error Auth")
        }
      }
    )
  }

}
