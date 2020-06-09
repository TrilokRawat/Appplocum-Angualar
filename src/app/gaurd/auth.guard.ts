import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loginUser;
  constructor(private router : Router ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   	
    if (localStorage.getItem('user')) { // logged in so return true
      this.loginUser = localStorage.getItem('user');
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          ver: Math.random().toString(36).substr(2, 5),
          nocache: 1
        }
      });
      localStorage.clear();
      return false;
    }

    return true;
  }
  
}
