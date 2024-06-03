import { FormsModule } from '@angular/forms';
import { delay } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Network } from '@capacitor/network';
import { IonApp, IonRouterOutlet, IonHeader, IonToolbar, IonAlert, IonItem, IonToggle, IonIcon } from '@ionic/angular/standalone';
import { StorageServiceService } from '@services/storage-service.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonIcon, FormsModule, IonToggle, IonItem, IonAlert, AsyncPipe, IonToolbar, IonHeader, IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  isDark = true;
  constructor(public storageServ: StorageServiceService, private alertController: AlertController) { }

  ngOnInit(): void {
    Network.getStatus().then(x => {
      this.storageServ.setNetwork(x.connected);
    })
    Network.addListener('networkStatusChange', (x) => {
      if (!x.connected) {
        this.generaAlertNetwork();
      }
      this.storageServ.setNetwork(x.connected);

    });
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDark = prefersDark.matches;
    this.changeTheme();
    prefersDark.addEventListener('change', () => {
      this.isDark = prefersDark.matches;
      this.changeTheme();
    });
  }
  updateScreen() {

  }
  async generaAlertNetwork() {
    const alert = await this.alertController.create({
      header: 'Without Connection',
      subHeader: 'Your connection is off',
      message: "You don't have connection. Some Functions can't functional in the correct way.",
      buttons: ['OK'],
    });

    await alert.present();

  }

  changeTheme() {
    document.documentElement.classList.toggle('ion-palette-dark', this.isDark);
  }
}
