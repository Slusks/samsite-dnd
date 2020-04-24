import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider';
import { UserService } from '../AuthenticationPackage/core/user.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../AuthenticationPackage/core/auth.guard';
import { AuthService } from '../AuthenticationPackage/core/auth.service';
import { FormBuilder } from '@angular/forms';
import { HeaderDialogComponent } from '../header/header-dialog/header-dialog.component';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  
  currentUser;

  
                    
  constructor(private auth: AuthGuard,
              private authService: AuthService,
              private router: Router,
              public dialog: MatDialog,
              public userService: UserService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {}


  ngOnInit() {

    this.userService.getCurrentUser().then(currentUser =>{(this.currentUser = currentUser), console.log("currentUSer",currentUser)},
      err => console.log(err))
  }


}
