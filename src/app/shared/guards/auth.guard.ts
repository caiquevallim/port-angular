import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import { Router } from '@angular/router';
import {DataStorageService} from '../services';

@Injectable()
// @ts-ignore
export class AuthGuard implements CanActivate {
  private dataStorageService: DataStorageService;
  constructor(
    private router: Router,
  ) {
    this.dataStorageService = new DataStorageService();
  }
  canActivate(): boolean {
    if (!this.dataStorageService.getUserLogged()?.id) {
      this.dataStorageService.reload();
    }
    if (!!this.dataStorageService.getUserLogged()?.id) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
