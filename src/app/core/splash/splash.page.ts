import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonFooter, IonLabel } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonLabel, IonFooter, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SplashPage/*  implements OnInit */ {

  constructor(private route: Router) {
    setTimeout(() => {
      this.route.navigateByUrl('home');
    }, 20);
  }

  /*  ngOnInit() {
   } */

}
