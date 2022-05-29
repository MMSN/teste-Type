import LocalStorage from './local-storage';
import { StorageInterface } from './storage.interface';

class StorageFactory {
  public static make(serviceName?: string): StorageInterface {
    switch (serviceName) {
      case 'local':
        return new LocalStorage();
      default:
        return new LocalStorage();
    }
  }
}

export default StorageFactory;
