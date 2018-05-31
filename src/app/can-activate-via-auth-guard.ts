import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  response;

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean>|boolean {
    return this.userService.Auth().map((response) => {
      if (response) {
        console.log('authenticated');
        return true;
      }

    console.log('not authenticated');
    this.router.navigateByUrl('/login');
    return false;
  });
  }

}
