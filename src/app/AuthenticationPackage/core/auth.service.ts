import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import {
    AngularFirestore,
    AngularFirestoreDocument
} from '@angular/fire/firestore'

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user1.model';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from './user.service';


//https://github.com/fireship-io/55-angularfire-google-auth/blob/master/src/app/services/auth.service.ts

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {

        //This is how we're getting into the firestoreDB        
        this.user$ = this.afAuth.authState.pipe(
          switchMap(user => {
            if (user){
              return this.afs.doc<User>(`/users/${user.uid}`).valueChanges();
            } else {
                return of(null)
            }
          })
        )
              } //end constructor




  async emailSignin(value){
    const credential = await this.afAuth.signInWithEmailAndPassword(value.email, value.password)
    console.log("credential", credential)
    this.router.navigate(['/home'])
  }


  async googleSignin(){
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider).then(res => {
      this.router.navigate(['/home']);
    }, err => {
      alert('failed Sign In')
    });
    //return this.updateUserData(credential.user)
    
  }

  async signOut(){
    await this.afAuth.signOut();
    alert("Successfully Logged Out")
    console.log("Logged Out")
    return this.router.navigate(['/']) // the example uses the empty / here but i'm routing to login directly for memory sake
  }



  

// Old Register, not sure what to do with this yet
   doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }
/*
  // Old Login, this I think is going to get replaced with async emailSignIn
  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }
  // Old Logout this is going to get replaced with async signOut
  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.signOut()
        resolve();
      }
      else{
        reject();
      }
    });
  }
  
    //Old Google Auth, will look to replace with above
  doGoogleAuth(){
    return new Promise<any>((resolve, reject) => {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        this.afAuth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        })
      })
  }*/
  ////////////////////////////////////////////////////////////
}
