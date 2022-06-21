import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  jwt:JwtHelperService=new JwtHelperService();

  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.authService.isAuthenticated()) {

        if (this.isTokenExpirado()) {
          this.authService.logout();
          this.router.navigate(['/login']);

          return false;
        }

        return true;
      }

      Swal.fire('Acceso denegado', 'No tienes acceso a este recurso', 'error');
      this.router.navigate(['/home']);

    return false;
  }

  isTokenExpirado(): boolean {

    let fechaExpiracion = this.jwt.decodeToken(sessionStorage.getItem('token')!).exp
    let now = new Date().getTime() / 1000;

    if (fechaExpiracion < now) return true;

    return false;

  }

}
