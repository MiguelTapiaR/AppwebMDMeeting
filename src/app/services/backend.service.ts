import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/user.interface';
import { Urls } from '../interfaces/urls.interface';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  urls = new Urls();
  lang = 'en';
  idUser = '';
  constructor(private http: HttpClient) { }

  isLoggedIn(): void{
    this.http.get(this.urls.isLoggedId).subscribe((data: any) => {
      console.log(data);
      if (data.response === 1){

        this.idUser = data.id;

      }else{
        console.log(this.idUser);
        this.idUser = '-1';
      }
    });
  }
  setUser(idUser: string): void{
    this.http.post(this.urls.sesion, {id: idUser}).subscribe( (data: any) => {
      this.isLoggedIn();
      if (data.response === 1){
        this.isLoggedIn();
        console.log(data);
      }else{
        

      }
    });
  }

  getLanguage(): void{
    this.http.get(this.urls.getLang).subscribe( (data: any) => {
      console.log('entro get');
      if (data.response === 1){
        this.lang = data.lang;
        console.log(data);
      }
    });
  }

  setLanguage(lang: string): void{
    this.http.post(this.urls.setLang, {setlang: lang}).subscribe( (data: any) => {
      if (data.response === 1){
        this.getLanguage();
        console.log(data);
      }

    });
  }
}
