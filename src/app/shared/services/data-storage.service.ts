import {UserEntity} from '../entities';
import {IProfile} from '../interfaces/profile.interface';
import {CryptService} from './crypt.service';

export class DataStorageService {
  private user: UserEntity;
  private cryptService: CryptService = new CryptService();
  constructor() {
    this.reload();
  }
  reload(): void {
    if (sessionStorage.getItem('user')) {
      const u = JSON.parse(this.cryptService.decrypt(sessionStorage.getItem('user')));
      this.user = new UserEntity(u ? u.id : 0);
      this.user.setRawValue(u);
    }
  }
  getUserLogged(): UserEntity {
    return this.user;
  }
  setProfileInStorage(res: IProfile): void {
    const token = this.cryptService.encrypt(res.token);
    const user = this.cryptService.encrypt(JSON.stringify(res.user));
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', user);
  }
}
