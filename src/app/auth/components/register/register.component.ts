import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { UsersService } from 'src/app/core/services/users.service';

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
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],      
  })
  }

  ngOnInit(): void {
  }

  register():void{
    console.log(this.credentials.value)
    this.userServices.registerUser(
      this.credentials.value
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
