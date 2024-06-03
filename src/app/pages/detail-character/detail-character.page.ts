import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Character } from '@interfaces/Character';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CharacterService } from '@services/character.service';
import { EMPTY, catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-detail-character',
  templateUrl: './detail-character.page.html',
  styleUrls: ['./detail-character.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, RouterLink, IonLabel, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DetailCharacterPage implements OnInit {

  error!: string;
  character: Character
    = {
      id: -1,
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
      origin: {
        name: '',
        url: ''
      },
      location: {
        name: '',
        url: ''
      },
      image: '',
      episode: [],
      url: '',
      created: ''
    };
  colorStatus = 'success';
  colorGender = 'secondary';
  constructor(private route: ActivatedRoute, private serv: CharacterService) {


  }
  ngOnInit() {
    let valueReceived = this.route.snapshot.params['id'];
    if (isNaN(valueReceived) || !parseInt(valueReceived)) {
      console.error('El id proporcionado no es un numero');
      this.error = 'Caracter no encontrado';
      return;
    }
    this.serv.getCharacterById(valueReceived).pipe(
      catchError((err: string) => {
        this.error = err;
        return EMPTY;
      })
    ).subscribe(character => {
      this.character = character;
    });

    if (this.error) {
      console.error('Error en el detail: ', this.error);
      return;
    }
    this.colorStatus = this.character.status === 'Alive' ? 'success' : this.character.status === 'dead' ? 'danger' : 'tertiary';
    this.colorGender = this.character.gender === 'Male' ? 'secondary' : this.character.gender === 'Female' ? 'tertiary' : 'warning';


  }
}
