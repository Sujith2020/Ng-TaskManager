import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate {
  constructor(private loginService: LoginService, private router: Router, private jwtHelperService: JwtHelperService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    //console.log(this.router.url);
    var token = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser")).token : null;
    if (this.loginService.isAuthenticated() && this.jwtHelperService.decodeToken(token).role == route.data.expectedRole) {
      return true; //the user can navigate to the particular route
    }
    else {
      // console.log('Authenticated : ' + this.loginService.isAuthenticated());
      // console.log('role of the user : ' + this.jwtHelperService.decodeToken(token).role)
      // console.log('expected role of the user : ' + route.data.expectedRole)
      // console.log(route)
      this.router.navigate(["login"]);
      return false; //the user can't navigate to the particular route
    }
  }
}