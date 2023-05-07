import 'react-native-get-random-values';
import type { ProfileType } from '@nearpaydev/nearpay-ts-sdk';
import { v4 as uuid } from 'uuid';
export const PROFILE_DB_KEY = 'PROFILE_KEY';

import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AsyncStorage } from 'react-native';
// import EncryptedStorage from 'react-native-encrypted-storage';
// import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

// import { MMKVLoader } from 'react-native-mmkv-storage';

// const storage = new MMKVLoader().initialize();

/**
 * profile is used to connect the sdk with the pos device
 *
 * every connection will use a prev porfile if it has, or it will generate new one
 * the profile will be a uuid value
 *
 */
export class Profile {
  static async save(profile: ProfileType) {
    await AsyncStorage.setItem(PROFILE_DB_KEY, JSON.stringify(profile));

    // localStorage.setItem(PROFILE_DB_KEY, JSON.stringify(profile));
  }

  static async get(): Promise<ProfileType | undefined> {
    const profile = await AsyncStorage.getItem(PROFILE_DB_KEY);
    // const profile = localStorage.getItem(PROFILE_DB_KEY);
    if (!profile) return undefined;

    return JSON.parse(profile) as ProfileType;
  }

  static async getIdOrGenerate(): Promise<string> {
    const profile = await Profile.get();

    return profile === undefined ? uuid() : profile.id;
  }

  static forgetDevice() {
    // TODO: may add the forget device payload

    AsyncStorage.removeItem(PROFILE_DB_KEY);
    // localStorage.removeItem(PROFILE_DB_KEY);
  }
}
