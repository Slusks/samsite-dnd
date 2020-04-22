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

  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

    this.passedData = [{ "displayName" : data.displayName},
                       { "providerData" : data.providerData},
                       { "uid" : data.uid}];
   
   }

  ngOnInit() {
    
    console.log("data",this.passedData)
    //this.createForm(this.user.name)


  }

}
