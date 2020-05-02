import { Injectable } from '@angular/core';
import { CanActivate, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor ( 
  public userService: UserService,
  private router: Router
) {}

//gets current user and then routes to home page.
canActivate(): Promise<any>{
  return new Promise((resolve, reject) => {
    this.userService.getCurrentUser()
    .then(user => {
      this.router.navigate(['/home']);
      return resolve(false);
    }, err => {
      return resolve(true);
    })
  })
}
}
