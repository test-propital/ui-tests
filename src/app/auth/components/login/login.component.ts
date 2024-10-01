import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { SessionService } from 'src/app/core/services/session.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials!: FormGroup ;
  $loggerSubscribe:Subscription | undefined;
  $attemptAuth:Subscription | undefined;

  constructor(private router:Router,
    private fb: FormBuilder,
    private userServices:UsersService,
    private alert:AlertService) {
      this.credentials = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  login(){
   // this.loader = true
   console.log(this.credentials.value)
     this.$loggerSubscribe = this.userServices.logger(this.credentials.value).subscribe(
       {
          
          next: (token) => {
            console.log(token)
            if(token != null){
              const { 
                //decodedToken ,
                user} = token;
                this.$attemptAuth =  this.userServices.attemptAuth(user).subscribe(
                   {
                     next: () => {
                       const currentUser = SessionService.getUser();
                       
                       if (currentUser != null) {
                        
                         this.router.navigateByUrl('main', { replaceUrl: true });
                       } else {
                         this.alert.errorTimer("error")
                       }
                      // this.loader = false
                     },
                   },
                 )  
                  // this.router.navigateByUrl('main', { replaceUrl: true });
            }else{
               this.alert.errorTimer("invalid user")
            }
          },
          error: () => {
            this.alert.errorTimer("Error Auth")
          },
          complete: () => {
           // this.loader = false
          },
        },
      )
    }

}
