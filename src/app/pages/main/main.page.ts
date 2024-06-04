import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenu, IonMenuToggle, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonLabel, IonRouterOutlet, IonButton, IonItem, IonRow, IonCol, IonCard, IonCardHeader, IonImg, IonCardSubtitle, IonIcon, IonFooter } from '@ionic/angular/standalone';
import { RouterLink, RouterModule } from '@angular/router';
import { CharacterPage } from '@pages/character/character.page';
import { CharactersPage } from '@pages/characters/characters.page';
import { Storage } from '@ionic/storage-angular';
import { Network } from '@capacitor/network';
import { StorageServiceService } from '@services/storage-service.service';
import { TranslateModule } from '@ngx-translate/core';
import { Browser } from '@capacitor/browser';
import { environment } from '@env/environment.prod';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonFooter,TranslateModule, IonIcon, TranslateModule, IonCardSubtitle, RouterLink, IonImg, IonCardHeader, IonCard, IonCol, IonRow, CharactersPage, IonItem, IonButton, IonRouterOutlet, IonMenuToggle, IonMenu, IonLabel, IonList, IonButtons, IonContent, IonHeader, IonTitle, IonMenuButton, IonToolbar, CommonModule, FormsModule, RouterLink, RouterModule]
})
export class MainPage implements OnInit {

  AllDataStorafe: { key: string, value: any, index: Number }[] = [];
  constructor(private ServStorage: StorageServiceService) {

  }
  async ngOnInit() {
    //! VERIFICADOR CONEXION
    Network.getStatus().then(x => {
      this.ServStorage.setNetwork(x.connected);
    });
    Network.addListener('networkStatusChange', (x) => {
      this.ServStorage.setNetwork(x.connected);
    });
    this.ServStorage.clear();
    //! VERIFICADOR CONEXION
  }

  getAllKeys() {
    this.ServStorage.getAllValues().then(v => {
      this.AllDataStorafe = [];
      v.forEach((value, key, ind) => {
        const obj = { key: key, value: value, index: ind };
        this.AllDataStorafe.push(obj);
      })
    });
  }
  async goToOficialPage() {
    await Browser.open({ url: environment.urlSerieOficial });
  }
}


