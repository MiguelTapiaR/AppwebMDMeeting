import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Evento } from 'src/app/interfaces/evento.interface';
import { BackendService } from 'src/app/services/backend.service';
import { EventoId, CategoriaId } from '../inicio/inicio.component';

@Component({
  selector: 'app-selected-type',
  templateUrl: './selected-type.component.html',
  styleUrls: ['./selected-type.component.css']
})
export class SelectedTypeComponent implements OnInit {
  idRecibido = '';
  nombreCategoriaEN = '';
  nombreCategoriaES = '';
  terminoBusquedaNombre: string;
  activeLang = 'en';
  private shirtCollection: AngularFirestoreCollection<Evento>;
  items: Observable<EventoId[]>;

  private categoriasCollection: AngularFirestoreCollection<Categoria>;
  itemscategoria: Observable<CategoriaId[]>;


  private tipoEventoCollection: AngularFirestoreCollection<Categoria>;
  tipoEventocategoria: Observable<CategoriaId[]>;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private afs: AngularFirestore, public back: BackendService, private translate: TranslateService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.params
    .subscribe( parametros => {
    this.idRecibido = parametros.id;
    this.nombreCategoriaEN = parametros.name;
    this.nombreCategoriaES = parametros.nombre;
    console.log(parametros.id);
    this.obtenerInformacion(this.idRecibido);
   });
  }
  obtenerInformacion(idRecibido): void{

    console.log(navigator.language);
    if (navigator.language.includes('es')){
      this.activeLang = 'es';
    }
    this.translate.setDefaultLang(this.back.lang);

    this.shirtCollection = this.afs.collection<Evento>('eventos', ref => ref.where('idTipoEvento', '==', this.idRecibido));
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

    this.categoriasCollection = this.afs.collection<any>('categorias', ref => ref.orderBy('nombre-en'));
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
    this.tipoEventoCollection = this.afs.collection<any>('tiposEvento', ref => ref.orderBy('nombre-en'));
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
  }
}
