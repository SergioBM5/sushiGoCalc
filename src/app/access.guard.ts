import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessService } from './access.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor(private accessService: AccessService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.accessService.hasAccess()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
