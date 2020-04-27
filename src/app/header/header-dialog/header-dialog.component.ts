import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material';
import { UserService } from 'src/app/AuthenticationPackage/core/user.service';
import { AuthService } from 'src/app/AuthenticationPackage/core/auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from 'src/app/AuthenticationPackage/core/user.model';
import { Resolve } from '@angular/router';
import { ProfileResolver } from 'src/app/AuthenticationPackage/profile/profile.resolver'

@Component({
  selector: 'app-header-dialog',
  templateUrl: './header-dialog.component.html',
  styleUrls: ['./header-dialog.component.scss']
})
export class HeaderDialogComponent implements OnInit {
  passedData;

  
  profileForm: FormGroup;
  CF: boolean;

  constructor(public userService: UserService,
              public authService: AuthService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public headerData: any) {

    
   }

  ngOnInit() {
    
    console.log("headerData",this.headerData)
    this.createForm(this.headerData.name)
  }


  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required ]
    });
    this.CF = true;
  }

  save(value){
    this.userService.updateCurrentUser(value)
    .then(res => {
      console.log(res);
    }, err => console.log(err))

    }

}
