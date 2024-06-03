import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {


  constructor(private _store: Storage = new Storage()) {
    this._store = new Storage();
    this.Initial();
  }

  //!         TEST
  async getAllValues() {
    return await this._store;
  }
  //!         TEST

  async Initial() {
    await this._store.create();
  }
  async setNetwork(value: boolean) {
    await this._store.set('network', value);
  }
  async getNetworkValue() {
    return await this._store.get('network');
  }
  async clear() {
    await this._store.clear();
  }
  async set(key: string, value: any) {
    await this._store.set(key, value);
  }
  async get(key: string) {
    return await this._store.get(key);
  }

}
