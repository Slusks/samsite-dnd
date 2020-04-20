import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthGuard} from '../AuthenticationPackage/core/auth.guard';
import { AuthService } from '../AuthenticationPackage/core/auth.service';
import { Router, Params } from '@angular/router';
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
              private router: Router,) {}

  ngOnInit(){
    this.loading = true;
    

    
  }

  tryLogout(){
    this.authService.doLogout()
    .then(res => {
      this.router.navigate(['']);
    })
  }

  ngAfterViewInit(){
    this.loading = false;
  }

}
