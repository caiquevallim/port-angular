import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import {catchError, map} from 'rxjs/operators';
import {UserEntity} from '../entities';
import {ILogin} from '../interfaces';
import {IProfile} from '../interfaces/profile.interface';

@Injectable()
// @ts-ignore
export class UserService extends ApiService<UserEntity> {
  constructor(http: HttpClient) {
    super('users', http);
  }
  login(login: ILogin): Promise<IProfile> {
    const user = new UserEntity(1);
    user.email = login.username;
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (login.username.toLowerCase() === 'teste@hotmail.com' && login.password === 'teste@123') {
          resolve({
            user,
            token: 'hashTokenUmdois'
          });
        } else {
          reject({
            user: null,
            token: null
          });
        }
      }, 1500));
    // return this.http.post(`${this.api}/login/`, JSON.stringify(login), { headers: this.header })
    //   .pipe(
    //     map(response => response as IProfile),
    //     catchError(this.handleError)
    //   ).toPromise();
  }
}
