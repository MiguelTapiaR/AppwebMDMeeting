import { Component, OnInit } from '@angular/core';
import { Evento } from '../../interfaces/evento.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categoria } from '../../interfaces/categoria.interface';



export interface EventoId extends Evento { id: string; }
export interface CategoriaId extends Categoria { id: string; }

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  private shirtCollection: AngularFirestoreCollection<Evento>;
  items: Observable<EventoId[]>;

  private categoriasCollection: AngularFirestoreCollection<Categoria>;
  itemscategoria: Observable<CategoriaId[]>;

  constructor(afs: AngularFirestore) {
    this.shirtCollection = afs.collection<Evento>('eventos');
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

    this.categoriasCollection = afs.collection<Categoria>('categorias');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.itemscategoria = this.categoriasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Categoria;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

   }

  ngOnInit(): void {
  }

}



