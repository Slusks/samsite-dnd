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
    console.log("header Data", this.headerData)
    this.createForm(this.headerData)
  }


  createForm(data) {
    this.profileForm = this.fb.group({
      name: [data[0].name, Validators.required ],
      thursdayCampaign:[data[1]],
      menagerieCoast:[data[2]]
    });
    this.CF = true;
  }

  save(value){
    this.userService.updateCurrentUser(value)
    .then(res => {
    }, err => console.log(err))

    this.dndDatabaseService.updateUserCampaign(this.headerData[3], this.headerData[1].name, value.thursdayCampaign.value)
    this.dndDatabaseService.updateUserCampaign(this.headerData[3], this.headerData[2].name, value.menagerieCoast.value)

  

  }

}
