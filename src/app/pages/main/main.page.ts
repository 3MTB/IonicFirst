import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenu, IonMenuToggle, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonList, IonLabel, IonRouterOutlet, IonButton, IonItem } from '@ionic/angular/standalone';
import { CharacterService } from 'src/app/Services/character.service';
import { Character } from '@interfaces/Character';
import { Info } from '@interfaces/shared';
import { map } from 'rxjs';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonItem, IonButton, IonRouterOutlet, IonMenuToggle, IonMenu, IonLabel, IonList, IonButtons, IonContent, IonHeader, IonTitle, IonMenuButton, IonToolbar, CommonModule, FormsModule, RouterLink, RouterModule]
})
export class MainPage {


}
