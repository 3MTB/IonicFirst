import { Character } from '@interfaces/Character';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { StorageServiceService } from '@services/storage-service.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
  standalone: true,
  imports: [IonIcon,TranslateModule, IonButton, RouterLink, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CharacterPage implements OnInit {

  @Input({ required: true }) character!: Character;
  isFavorite = false;
  allFavorites: number[] = [];

  constructor(private route: Router, private storage: StorageServiceService) { }

  ngOnInit() {
    this.storage.getFavoriteCharacters().then(x => {
      this.allFavorites = x;

      //this.isFavorite = this.allFavorites.includes(this.character.id) ?? false;
    })

  }


  goDetail() {
    this.route.navigateByUrl(this.character.id.toString())
  }

  changeFavorite() {
    this.isFavorite = !this.isFavorite;
    if (this.isFavorite) {
      this.storage.removeFavoriteCharacter(this.character.id);
    }
    else {
      this.storage.setFavoriteCharacter(this.character.id);
    }
  }

}
