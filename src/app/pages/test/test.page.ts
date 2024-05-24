import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonLabel } from '@ionic/angular/standalone';
import { CharacterService } from '@services/character.service';
import { StaticDataService } from '@services/static-data.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
  standalone: true,
  imports: [IonLabel, IonInput, ReactiveFormsModule, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TestPage implements OnInit {

  loginForm: FormGroup = new FormGroup({
    user: new FormControl('HP', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(2)
    ]),
    password: new FormControl(''),
    age: new FormControl<number>(0)
  })
  constructor(private lcData : StaticDataService) { }

  ngOnInit() {
    
    console.log('');
  }

  SubmitForm() {
    console.log('Form: ', this.loginForm);
    if (this.loginForm.status === 'VALID') {
      console.log('VaLidado');
    }
    else {
      console.warn('INVALIDO FALTAN RESTRINCIONES POR CUMPLIR');
    }
  }
}
