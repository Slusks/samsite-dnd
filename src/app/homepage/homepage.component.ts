import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { UserService } from '../AuthenticationPackage/core/user.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../AuthenticationPackage/core/auth.guard';
import { AuthService } from '../AuthenticationPackage/core/auth.service';
import { FormBuilder } from '@angular/forms';
import { HeaderDialogComponent } from '../header/header-dialog/header-dialog.component';
import { DndDatabaseService } from '../dnd-database.service';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { User } from '../AuthenticationPackage/core/user1.model'
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  
  currentUser;
  campaignSelection;
  firestoreUser

  
                    
  constructor(private auth: AuthGuard,
              public authService: AuthService,
              private router: Router,
              public dialog: MatDialog,
              public userService: UserService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private dnddatabaseService: DndDatabaseService,
              private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {

              this.currentUser = this.authService.user$.subscribe(res => { console.log(res)})}


  ngOnInit() {


    /*this.userService.getCurrentUser().then(currentUser =>{
      (this.currentUser = currentUser),
      console.log("currentUser",currentUser)
      //this.getUserCampaigns(currentUser.uid)
    },
      err => console.log(err))*/


  //const GoogleUserObject  = firebase.auth().currentUser;
  //this.firestoreUser = this.afs.doc<User>(`/users/${this.currentUser.uid}`).valueChanges();


  

  }

  getUserCampaigns(userID:string){
    return this.dnddatabaseService.getUserCampaign(userID).subscribe(campaigns => {this.campaignSelection = campaigns, console.log("campaignSelection", this.campaignSelection)})
  }


  
}
