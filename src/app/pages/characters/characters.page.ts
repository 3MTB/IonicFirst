import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonMenuButton, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonButtons, IonInfiniteScroll, IonInfiniteScrollContent, IonNote, IonSkeletonText, IonSearchbar } from '@ionic/angular/standalone';
import { Character } from '@interfaces/Character';
import { FilterCharacter, Info } from '@interfaces/shared';
import { EMPTY, catchError, map } from 'rxjs';
import { CharacterService } from "@services/character.service";
import { CharacterPage } from "../character/character.page";
import { HttpErrorResponse } from '@angular/common/http';
import { Network } from '@capacitor/network';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  imports: [IonSearchbar,
    IonSkeletonText, IonNote,
    IonInfiniteScrollContent,
    IonInfiniteScroll, IonButtons, IonMenuButton,
    IonItem, IonList, IonContent, IonHeader, IonTitle,
    IonToolbar, CommonModule, FormsModule, CharacterPage
  ]
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
  filterSearch: FilterCharacter = {
    name: '',
    status: '',
    species: '',
    type: '',
    gender: '',
    origin: { name: '', url: '' },
    location: 0,
    episode: ''
  };
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
        })
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
  Search() {
    if (this.isConnected) {
      this.IsChargingMore = true;
      let urlBusqueda = this.characterService.makeUrlToFilter(this.filterSearch);
      this.characterService.getPageCharacter(urlBusqueda).pipe(
        catchError((err: HttpErrorResponse) => {
          console.error('Error', err);
          return EMPTY;
        })
      ).subscribe(x => {
        this.Info = x.info;
        this.AllCharacter = x.results;
        this.IsChargingMore = false;
      });
      console.log(urlBusqueda);
    }
  }

}
