/*import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roles = route.data['roles'] as string[] | undefined;

    if (!roles || roles.length === 0) return true;
    if (!this.auth.hasRole(roles)) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
*/
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowed = route.data['roles'] as string[];

    if (!allowed || allowed.length === 0) return true;

    if (!this.auth.hasRole(allowed)) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
