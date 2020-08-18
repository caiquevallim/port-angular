import {BaseEntity} from './base.entity';
import {BaseInterface} from '../interfaces';

export class UserEntity extends BaseEntity implements BaseInterface {
  name: string;
  email: string;
  profile: string;
  isActive: boolean;
  constructor(id?: number) {
    super(id);
  }
  setRawValue(entity): void {
    if (entity) {
      const {
        name,
        email,
        profile,
        isActive,
      } = entity;
      this.name = name;
      this.email = email;
      this.profile = profile;
      this.isActive = isActive;
    }
  }
  isAdmin(): boolean {
    return this.profile === 'admin';
  }
}
