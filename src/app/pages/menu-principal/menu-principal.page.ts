import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenu, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonFooter, IonIcon, IonButton, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule, IonSelect, IonSelectOption, IonButton, RouterLink, IonIcon, IonFooter, IonItem, IonMenu, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MenuPrincipalPage implements OnInit {
  isDark = true;
  languages: { name: string, value: string }[] = [
    {
      name: 'English',
      value: 'en'
    },
    {
      name: 'Español',
      value: 'es'
    }
  ];
  selectedLanguage: string = 'en';

  constructor(private translateServ: TranslateService) { }

  async ngOnInit() {

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDark = prefersDark.matches;
    this.changeTheme();
    const data = await Device.getLanguageCode();
    if (this.languages.some(x => x.value === data.value)) {
      this.selectedLanguage = data.value;
    }
    prefersDark.addEventListener('change', () => {
      this.isDark = prefersDark.matches;
      this.changeTheme();
    });
    //!           ADD verificacion del idioma del dispositivo
    this.changeLang();
  }

  btnThemePush() {
    this.isDark = !this.isDark;
    this.changeTheme();
  }
  changeTheme() {
    document.documentElement.classList.toggle('ion-palette-dark', this.isDark);
  }
  changeLang() {
    this.translateServ.use(this.selectedLanguage);
  }
}
