import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthGuard} from '../AuthenticationPackage/core/auth.guard';
import { AuthService } from '../AuthenticationPackage/core/auth.service';
import { Router, Params } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
import { HeaderDialogComponent } from './header-dialog/header-dialog.component';
//import { UserService } from './user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit{

  loading;
 

  constructor(private auth: AuthGuard,
              private authService: AuthService,
              private router: Router,
              public dialog: MatDialog) {}

  ngOnInit(){
    this.loading = true;
    

    
  }

  tryLogout(){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(['/login']);
    })
  }

  loggedOut(){
    alert("Successfully Logged Out")
    console.log("Logged Out")
    this.router.navigate(["/login"])
  }

  ngAfterViewInit(){
    this.loading = false;
  }

  openModal(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data ={
      id:1,
      title: 'Dialog for Beginners'
    };

    const dialogRef = this.dialog.open(HeaderDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog was closed")
      console.log(result) });
 
  }



}
