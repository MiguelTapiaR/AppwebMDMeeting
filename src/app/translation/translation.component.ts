import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { BackendService } from '../services/backend.service';
@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {

  public activeLang = 'en';
  constructor(
    private translate: TranslateService, private back: BackendService
  ) {

    
    console.log(navigator.language);
    if (navigator.language.includes('es')){
      this.activeLang = 'es';
    }
    this.translate.setDefaultLang(this.back.lang);
    
    
  }
  ngOnInit(): void {
  }

  cambiarLenguaje(lang): void {
    this.activeLang = lang;
    this.translate.use(lang);
    this.back.setLanguage(lang);
  }
}