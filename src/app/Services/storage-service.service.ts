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
  async getByKey(key: string) {
    return await this._store.get(key);
  }

  async setFavoriteCharacter(idCharacter: number) {
    this._store.get('favoriteCharacters').then(x => {
      if (x === null) {
        console.log('WithOut Favorites', x);
        this._store.set('favoriteCharacters', [idCharacter]);
      }
      else {
        console.log('With Favorites', x);
        x.push(idCharacter);
        this._store.set('favoriteCharacters', x);
      }
    });
    this._store.get('favoriteCharacters').then(x => console.log(x))
  }

  async getFavoriteCharacters() {
    return await this._store.get('favoriteCharacters');
  }
  async removeFavoriteCharacter(idCharacter: number) {
    this._store.get('favoriteCharacters').then(x => {
      x?.splice(x.indexOf(idCharacter), 1);
      this._store.set('favoriteCharacters', x);
    });
  }



}
