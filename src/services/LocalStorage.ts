import { AwsCredentials, AwsLocalStorageKeys } from 'types';

class LocalStorageService {
  private storage = localStorage;

  getItem(key: string) {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: any) {
    return this.storage.setItem(key, value);
  }

  setCredentials(credentials: AwsCredentials) {
    Object.keys(credentials).forEach((key) => {
      this.setItem(key, credentials[key]);
    });
  }

  clearCredentials() {
    AwsLocalStorageKeys.forEach((key) => this.storage.removeItem(key));
  }
}

export default new LocalStorageService();
