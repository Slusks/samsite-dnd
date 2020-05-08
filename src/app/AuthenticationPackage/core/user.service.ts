import { Injectable } from "@angular/core";

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth/';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { User } from './user1.model';

@Injectable({
    providedIn:  'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              public db: AngularFirestore,

 ){
 }


  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  
  // new update user function from auth service
  public updateUserData(user){
    //sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`)
    const data: User = {
      uid: user.uid,
      email: user.email || "Default",
      displayName: user.displayName || "Default",
      role: user.role||"guest",
      thursdayCampaign: user.thursdayCampaign || true,
      menagerieCoast: user.menagerieCoast || true
    }
    console.log("data", data)
     userRef.set(data, { merge: true})
  }




  // Old update user function that I think will end up getting deleted
  updateCurrentUser(value){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      console.log("UCU:", user)
      user.updateProfile({
        displayName: value.name,
        //photoURL: user.photoURL
      }).then(res => {
        resolve(res)
      }, err => reject(err))
    })
  }
}
