import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })

export class LoginAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {
  }

  canActivate(): boolean {
    // izbrisati return true nakon implementacije logina na backendu
    console.log(this.authService.isLoggedIn, ' LoginAuth');

    if (!this.authService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
