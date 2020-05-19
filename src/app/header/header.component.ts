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


    //This is fetching the name information, amongst other things, for the user
    this.parentDataName = new FirebaseUserModel();
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
        if(res.providerData[0].providerId == 'password' ){
          this.parentDataName.name = res.displayName;
          this.parentDataName.provider = res.providerData[0].providerId;
          //console.log("email provider data")
          return this.parentDataName;
        }
        if (res.providerData[0].providerId == 'google.com') {
          this.parentDataName.name = res.displayName;
          this.parentDataName.provider = res.providerData[0].providerId;
          //console.log("google provider data", res.providerData[0].providerId)
          return this.parentDataName;
        }
      }, err => {
        if (this.route.snapshot['_routerState'].url === '/register'){
          this.router.navigate(['/register'])
        } else { 
        this.router.navigate(['/login']);
        }
        return "Not Logged In";
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
    this.authService.signOut()
    .then(res => {
      this.router.navigate(['/login']);
    })
  }

  ngAfterViewInit(){
    this.loading = false;
  }
 // Open Dialog box for the user Options
  openModal(){
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
    dialogConfig.data = [this.parentDataName];
    
    const dialogRef = this.dialog.open(HeaderDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog was closed")
      console.log(result) });
 
  }



}
