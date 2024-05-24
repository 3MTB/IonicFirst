import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonSelect, IonSelectOption, IonMenuButton, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonButtons, IonInfiniteScroll, IonInfiniteScrollContent, IonNote, IonSkeletonText, IonSearchbar, IonGrid, IonRow, IonCol, IonButton } from '@ionic/angular/standalone';
import { Character, ObjValuesToSearch } from '@interfaces/Character';
import { FilterCharacter, Info } from '@interfaces/shared';
import { EMPTY, catchError, delay, map } from 'rxjs';
import { CharacterService } from "@services/character.service";
import { CharacterPage } from "../character/character.page";
import { HttpErrorResponse } from '@angular/common/http';
import { Network } from '@capacitor/network';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { StaticDataService } from '@services/static-data.service';


@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  imports: [IonButton, IonCol, IonRow, IonGrid, IonSearchbar,
    IonSkeletonText, IonNote,
    IonInfiniteScrollContent,
    IonInfiniteScroll, IonButtons, IonMenuButton,
    IonItem, IonList, IonContent, IonHeader, IonTitle,
    IonSelect, IonSelectOption,
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
    location: null,
    episode: ''
  };
  objValuesToSearch: ObjValuesToSearch = {
    status: [],
    species: [],
    type: [],
    gender: [],
  }

  //?                                  TEST
  test: string[] = [];
  //?                                  TEST

  constructor(private characterService: CharacterService, private staticService: StaticDataService) { }

  ngOnInit() {
    this.MyEvents();
    this.objValuesToSearch = {
      status: this.staticService.getStatus,
      species: this.staticService.getSpecies,
      type: this.staticService.getTypes,
      gender: this.staticService.getGenders,
    }

    if (this.isConnected) {
      this.characterService.getPageCharacter().pipe(
        catchError((err: HttpErrorResponse) => {
          console.error('Error', err);
          return EMPTY;
        })
      ).subscribe(x => {
        // this.test.push(...new Set(x.results.map(x => x.species)));
        //console.log('test inicial', this.test);
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
          //this.test.push(...new Set(x.results.map(x => x.species)));
          this.Info = x.info;
          this.AllCharacter.push(...x.results);
          event.target.complete();
          this.IsChargingMore = false;
        });
    }
    else {
      event.target.disabled = true;
      event.target.complete();
      //this.test = [...new Set(this.test)];
      //console.log('Test Final: ', [...new Set(this.test)]);
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
        }),
      ).subscribe(x => {
        this.Info = x.info;
        this.AllCharacter = x.results;
        this.IsChargingMore = false;
      });
      console.log('Url Creada ', urlBusqueda);
    }
  }

}
