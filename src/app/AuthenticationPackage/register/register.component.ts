import { Component} from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/user.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(  public authService: AuthService,
                private router: Router,
                private fb: FormBuilder,
                public userService: UserService
              ) {this.createForm();
                }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }




// new register user function
  registerUser(value){
    return firebase.auth().createUserWithEmailAndPassword(value.email, value.password).then(res =>{
      alert("User Registered!"), console.log(res), this.router.navigate['/home'];
      this.userService.registerUser(res.user.uid)
    }).catch(error => {
        console.log("something went wrong", error.message)
    })

  }
// old register user function
  tryRegister(value){
    this.authService.doRegister(value)
    .then(res => {
    console.log(res);
    this.errorMessage = "";
    this.successMessage = "Your account has been created, click the header to enter!";
    }, err => {
    console.log(err);
    this.errorMessage = err.message;
    this.successMessage = "";
    })
   }

   

}
