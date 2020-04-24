import { Component, OnInit, AfterViewInit, Input, ResolvedReflectiveFactory, Inject } from '@angular/core';
import { AuthGuard} from '../AuthenticationPackage/core/auth.guard';
import { AuthService } from '../AuthenticationPackage/core/auth.service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { HeaderDialogComponent } from './header-dialog/header-dialog.component';
import { ProfileComponent } from '../AuthenticationPackage/profile/profile.component';
import { ProfileResolver } from '../AuthenticationPackage/profile/profile.resolver';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../AuthenticationPackage/core/user.service';
import { FirebaseUserModel } from '../AuthenticationPackage/core/user.model';
import { HomepageComponent } from '../homepage/homepage.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit{
  parentData;
  loading;
//For the Profile Routes
  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  @Input() currentUser: HomepageComponent["currentUser"];

 

  constructor(private auth: AuthGuard,
              private authService: AuthService,
              private router: Router,
              public dialog: MatDialog,
              public userService: UserService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {}

  ngOnInit(){
    this.parentData = this.currentUser 
    console.log("data", this.parentData)
    this.loading = true;
    
    

    
  }
  //Logging Out
  tryLogout(){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(['/login']);
    })
  }
//Confirming that you logged out
  loggedOut(){
    alert("Successfully Logged Out")
    console.log("Logged Out")
    this.router.navigate(["/login"])
  }

  ngAfterViewInit(){
    this.loading = false;
  }
 // Open Dialog box for the user Options
  openModal(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {dataObject: this.getData()};
    
    const dialogRef = this.dialog.open(HeaderDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog was closed")
      console.log(result) });
 
  }

getData(){
  return this.userService.getCurrentUser()
}

}
