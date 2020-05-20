import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/user.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = 'Not Logged In';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public userService: UserService,
    private afAuth: AngularFireAuth
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

    
   async emailLogin(value){
    this.authService.emailSignin(value)
    .then(res => {
    this.router.navigate(['/home']);
    })
  }

  async googleLogin(){
    this.authService.googleSignin()
    .then(res => {
      this.router.navigate(['/home']);
    })
  }

}