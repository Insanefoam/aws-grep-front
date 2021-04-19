class LocalStorageService {
  private storage = localStorage;

  getItem(key: string) {
    return this.storage.getItem(key);
  }

  setItem(key: string, value: any) {
    return this.storage.setItem(key, value);
  }
}

export default new LocalStorageService();
