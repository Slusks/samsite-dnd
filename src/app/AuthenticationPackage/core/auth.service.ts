import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import {
    AngularFirestore,
    AngularFirestoreDocument
} from '@angular/fire/firestore'

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

//https://github.com/fireship-io/55-angularfire-google-auth/blob/master/src/app/services/auth.service.ts

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router) {
        //This is how we're getting into the firestoreDB        
        this.user$ = this.afAuth.authState.pipe(
          switchMap(user => {
            if (user){
              return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
            } else {
                return of(null)
            }
          })
        )
              } //end constructor

  private updateUserData(user){
    //sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`)

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      thursdayCampaign: user.thursdayCampaign,
      menagerieCoast: user.menagerieCoast
    }
    return userRef.set(data, { merge: true})
  }

  /*  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }*/
  async emailSignin(value){
    const provider = new firebase.auth.EmailAuthProvider();
    const credential = await this.afAuth.signInWithEmailAndPassword(value.email, value.password)
    return this.updateUserData(credential.user)
  }


  async googleSignin(){
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user)
  }

  async signOut(){
    await this.afAuth.signOut();
    return this.router.navigate(['/login']) // the example uses the empty / here but i'm routing to login directly for memory sake
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
  }
// Old GithubAuth, not sure if we want to keep or get rid of
  doGitHubAuth(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GithubAuthProvider();
      provider.addScope('repo');
      this.afAuth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      }, err => {
        console.log(err);
        reject(err);
      })
    })
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

  // Old Login, this I think is going to get replaced with a similar app to googleSignin
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
  ////////////////////////////////////////////////////////////

}
