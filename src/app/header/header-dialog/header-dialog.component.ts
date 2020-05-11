import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from 'src/app/AuthenticationPackage/core/user.service';
import { AuthService } from 'src/app/AuthenticationPackage/core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from 'src/app/AuthenticationPackage/core/user.model';
import { Resolve } from '@angular/router';
import { ProfileResolver } from 'src/app/AuthenticationPackage/profile/profile.resolver'
import { DndDatabaseService } from 'src/app/dnd-database.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-header-dialog',
  templateUrl: './header-dialog.component.html',
  styleUrls: ['./header-dialog.component.scss']
})
export class HeaderDialogComponent implements OnInit {

  
  profileForm: FormGroup;
  CF: boolean;

  

  constructor(public userService: UserService,
              public authService: AuthService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              public dndDatabaseService: DndDatabaseService,
              @Inject(MAT_DIALOG_DATA) public headerData: any) {

    
   }

  ngOnInit() {
    //this.createForm(this.headerData)
    //console.log("headerData", this.headerData)
    this.authService.user$.subscribe(response =>{
      this.createForm(response)
      //console.log("response", response)
    })

  }


  createForm(firebaseData) {
    this.profileForm = this.fb.group({
      name: [firebaseData.displayName, Validators.required ],
      thursdayCampaign:[firebaseData.thursdayCampaign],
      menagerieCoast:[firebaseData.menagerieCoast],
      uid: [firebaseData.uid],
      email: [firebaseData.email],
      role: [firebaseData.role]
      
    });
    //console.log("profile Form", this.profileForm)
    this.CF = true;
  }

  save(value){
    this.userService.updateUserData(value)


  

  }

}
