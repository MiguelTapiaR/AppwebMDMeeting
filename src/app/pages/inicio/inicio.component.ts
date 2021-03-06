import { Component, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/evento.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categoria } from '../../interfaces/categoria.interface';
import { BackendService } from '../../services/backend.service';
import { TranslateService } from '@ngx-translate/core';



export interface EventoId extends Evento { id: string; }
export interface CategoriaId extends Categoria { id: string; }

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  terminoBusquedaNombre: string;
  activeLang = 'en';
  private shirtCollection: AngularFirestoreCollection<Evento>;
  items: Observable<EventoId[]>;

  private categoriasCollection: AngularFirestoreCollection<Categoria>;
  itemscategoria: Observable<CategoriaId[]>;


  private tipoEventoCollection: AngularFirestoreCollection<Categoria>;
  tipoEventocategoria: Observable<CategoriaId[]>;


  constructor(afs: AngularFirestore, public back: BackendService, private translate: TranslateService) {

    console.log(navigator.language);
    if (navigator.language.includes('es')){
      this.activeLang = 'es';
    }
    this.translate.setDefaultLang(this.back.lang);

    this.shirtCollection = afs.collection<Evento>('eventos', ref => ref.orderBy('fechaInicio'));
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.items = this.shirtCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Evento;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    this.categoriasCollection = afs.collection<any>('categorias', ref => ref.orderBy('nombre-en'));
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.itemscategoria = this.categoriasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();

        console.log(data);
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    this.tipoEventoCollection = afs.collection<any>('tiposEvento', ref => ref.orderBy('nombre-en'));
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.tipoEventocategoria = this.tipoEventoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();

        console.log(data);
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  //   this.categoriasCollection.valueChanges({ idField: 'id' }).subscribe(data  => {
  //     console.log(id);
  //     console.log(data[0]['nombre-en']);
  //   });
   }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}



