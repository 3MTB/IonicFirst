import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenu, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonFooter, IonIcon, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
  standalone: true,
  imports: [IonButton,RouterLink, IonIcon, IonFooter, IonItem, IonMenu, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MenuPrincipalPage implements OnInit {
  isDark = true;

  constructor() { }

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDark = prefersDark.matches;
    this.changeTheme();
    prefersDark.addEventListener('change', () => {
      this.isDark = prefersDark.matches;
      this.changeTheme();
    });
  }
  btnThemePush() {
    this.isDark = !this.isDark;
    this.changeTheme();
  }
  changeTheme() {
    document.documentElement.classList.toggle('ion-palette-dark', this.isDark);
  }
}
