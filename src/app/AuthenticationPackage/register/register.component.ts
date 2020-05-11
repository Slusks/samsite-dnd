import { Component} from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../core/user.service';
import * as firebase from 'firebase';
import { User } from '../core/user1.model'
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(  private router: Router,
                private fb: FormBuilder,
                public userService: UserService,
                private afs: AngularFirestore
              ) {this.createForm();
                }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

tryRegister(values){
  const fireRef = this.afs.collection('/users')
  let data: User = {
    uid: values.uid,
    email: values.email,
    displayName: values.displayName || "Your Name Here!",
    role: "guest",
    thursdayCampaign: true,
    menagerieCoast: true
  }
  fireRef.doc(values.uid).set(data, {merge: true})
  }






// new register user function
  registerUser_EP(value){
    return firebase.auth().createUserWithEmailAndPassword(value.email, value.password).then(res =>{
      alert("User Registered!"), /*console.log("res",res)*/ this.router.navigate['/home'];
      this.tryRegister(res.user)
    }).catch(error => {
        console.log("something went wrong", error.message)
    })
  }

  
  registerUser_GU(user){
    this.tryRegister(user)
  }
}
