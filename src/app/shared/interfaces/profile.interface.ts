import {UserEntity} from '../entities';

export interface IProfile {
  user: UserEntity;
  token: string;
}
