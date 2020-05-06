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
import { DndDatabaseService } from '../dnd-database.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit{
  parentDataName;
  loading;
//For the Profile Routes
  user: FirebaseUserModel = new FirebaseUserModel();

  //campaign Selection variables
  thursdayCampaign: Boolean;
  menagerieCoast: Boolean;
  userID;

  signedInUser;
 

  @Input() currentUser: HomepageComponent["currentUser"];

 

  constructor(private auth: AuthGuard,
              public authService: AuthService,
              private router: Router,
              public dialog: MatDialog,
              public userService: UserService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private dndDatabaseService: DndDatabaseService) {}

  ngOnInit(){

    //Campaign Selection:
    this.userService.getCurrentUser().then(currentUser =>{this.getUserCampaigns(currentUser.uid), this.userID = currentUser.uid},
    err => console.log(err))//// This is how we get our campaign selection







    //This is fetching the name information, amongst other things, for the user
    this.parentDataName = new FirebaseUserModel();
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
        if(res.providerData[0].providerId == 'password'){
          this.parentDataName.image = 'user-profile-url.png';
          this.parentDataName.name = res.displayName;
          this.parentDataName.provider = res.providerData[0].providerId;
          return this.parentDataName;
        }
        else{
          this.parentDataName.image = res.photoURL;
          this.parentDataName.name = res.displayName;
          this.parentDataName.provider = res.providerData[0].providerId;
          return this.parentDataName;
        }
      }, err => {
        if (this.route.snapshot['_routerState'].url === '/register'){
          this.router.navigate(['/register'])
        } else { 
        this.router.navigate(['/login']);
        }
        return reject(err);
      })
    })







  } ////end OnInit
  
     //campaign Selection:
     getUserCampaigns(userID:string){
      this.dndDatabaseService.getUserCampaign(userID).subscribe(campaigns => {this.thursdayCampaign = campaigns["thursdayCampaign"],
                                                                              this.menagerieCoast = campaigns["menagerieCoast"] 
                                                                              })
    }   

  
  //Logging Out
  tryLogout(){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(['/login']);
    })
  }
/*Confirming that you logged out
  loggedOut(){
    alert("Successfully Logged Out")
    console.log("Logged Out")
    this.router.navigate(["/login"])
  }
*/
  ngAfterViewInit(){
    this.loading = false;
  }
 // Open Dialog box for the user Options
  openModal(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
    dialogConfig.data = this.authService.user$
    //dialogConfig.data = [this.parentDataName, {name: "thursdayCampaign", value: this.thursdayCampaign},{name: "menagerieCoast", value: this.menagerieCoast}, this.userID];
    
    const dialogRef = this.dialog.open(HeaderDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog was closed")
      console.log(result) });
 
  }



}
