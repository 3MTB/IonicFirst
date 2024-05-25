import { ApiResultCharacter, Character } from '@interfaces/Character';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env, environment } from '@env/environment.prod';
import { FilterCharacter } from '@interfaces/shared';
@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  getCharacterById(getById: string) {
    return this.http.get<Character>(env.urlGetById + getById);

  }
  getPageCharacter(pageUrl: string = env.urlBase + '/character') {
    return this.http.get<ApiResultCharacter>(pageUrl);
  }

  makeUrlToFilter(dataToFilter: FilterCharacter) {
    console.log('OBJ FILTER IN MAKE URL', dataToFilter);
    let filterToUse = '';
    if (dataToFilter.name) {
      filterToUse += `name=${dataToFilter.name}&`;
    }
    if(dataToFilter.gender){
      filterToUse +=`gender=${dataToFilter.gender}`
    }
    if (dataToFilter.species) {
      filterToUse += `species=${dataToFilter.species}&`;
    }
    if (dataToFilter.status) {
      filterToUse += `status=${dataToFilter.status}&`;
    }
    if (dataToFilter.type) {
      filterToUse += `type=${dataToFilter.type}&`;
    }
    /*  if (dataToFilter.location !== null) {
       filterToUse += `location=${dataToFilter.location}&`;
     } */

    console.log('               URL GENERADA: ', filterToUse);
    //! Si no hay filtros me devuelve todos
    if (filterToUse == '') {
      return `${environment.urlBase}/character`;
    }
    //! Si hay filtros me devuelve todos los registros que cumplan dicho filtro
    else {
      filterToUse = filterToUse.substring(0, filterToUse.length - 1);
      console.log('FILTER GENERATED', `${environment.urlBase}/character/?${filterToUse}`);
      return `${environment.urlBase}/character/?${filterToUse}`;
    }
  }
}
