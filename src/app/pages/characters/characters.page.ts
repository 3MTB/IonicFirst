import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenuButton, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonButtons, IonInfiniteScroll, IonInfiniteScrollContent, IonNote, IonSkeletonText } from '@ionic/angular/standalone';
import { Character } from '@interfaces/Character';
import { Info } from '@interfaces/shared';
import { EMPTY, catchError, delay, map } from 'rxjs';
import { CharacterService } from "@services/character.service";
import { CharacterPage } from "../character/character.page";
import { HttpErrorResponse } from '@angular/common/http';
import { Network } from '@capacitor/network';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { InitialNavigation } from '@angular/router';
@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  imports: [IonSkeletonText, IonNote, IonInfiniteScrollContent, IonInfiniteScroll, IonButtons, IonMenuButton, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, CharacterPage]
})
export class CharactersPage implements OnInit {

  isConnected = true;
  AllCharacter: Character[] = [];
  Info: Info = {
    count: 0,
    pages: 0,
    next: null,
    prev: null
  };
  IsChargingMore = false;
  constructor(private characterService: CharacterService) { }

  ngOnInit() {

    this.MyEvents();
    if (this.isConnected) {
      this.characterService.getPageCharacter().pipe(
        catchError((err: HttpErrorResponse) => {
          console.error('Error', err);
          return EMPTY;
        })
      ).subscribe(x => {
        this.Info = x.info;
        this.AllCharacter = x.results;
      });
    }
  }

  //?                                  EVENTS
  MyEvents() {
    Network.getStatus().then(x => {
      this.isConnected = x.connected;
    });
    Network.addListener('networkStatusChange', (status) => {
      this.isConnected = status.connected;
    });
  }
  //?                                   Functions


  LoadMore(event: InfiniteScrollCustomEvent) {
    if (this.isConnected && this.Info.next !== null) {
      this.IsChargingMore = true;
      this.characterService.getPageCharacter(this.Info.next ?? undefined).pipe(
        catchError((err: HttpErrorResponse) => {
          console.error('Error', err);
          return EMPTY;
        }), delay(3000)
      ).subscribe(
        (x) => {
          this.Info = x.info;
          this.AllCharacter.push(...x.results);
          event.target.complete();
          this.IsChargingMore = false;
        });
    }
    else {
      event.target.disabled = true;
      event.target.complete();
    }
  }

}
