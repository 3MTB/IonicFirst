import { ApiResultCharacter } from '@interfaces/Character';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  getPageCharacter(pageUrl: string = env.urlBase+'/character') {
    return this.http.get<ApiResultCharacter>(pageUrl);
  }


}
