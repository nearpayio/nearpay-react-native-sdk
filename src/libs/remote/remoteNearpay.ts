import {
  NearPay as BaseNearPay,
  ConnectionInfo,
  ProfileType,
} from '@nearpaydev/nearpay-ts-sdk';
import { Profile } from './profile';
import { dbAddUser, dbGetLastUser } from '../db/db';

export class RemoteNearPay extends BaseNearPay {
  override async getProfile(): Promise<ProfileType | undefined> {
    return await Profile.get();
  }

  override async saveProfile(profile: ProfileType) {
    Profile.save(profile);
  }

  override async getLastConnection(): Promise<ConnectionInfo | undefined> {
    return await dbGetLastUser();
  }

  override async saveConnection(connection: ConnectionInfo) {
    await dbAddUser(connection);
  }
}
