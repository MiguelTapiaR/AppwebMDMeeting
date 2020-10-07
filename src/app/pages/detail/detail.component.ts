import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Evento } from 'src/app/interfaces/evento.interface';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  idRecibido = '';
  private itemDoc: AngularFirestoreDocument<Evento>;
  itemRecibido: Observable<Evento>;

  fechaInicio: any;
  fechaFin: any;
  item: Evento = {
    id: '',
    descripcion: '',
    fechaFin: 0,
    fechaInicio: 0,
    idUsuario: '',
    imagenPromocional: '',
    institucionOrganizadora: '',
    linkPaginaEvento: '',
    lugar: '',
    nombre: '',
    nombreCategoriaEN: '',
    nombreCategoriaES: '',
    idCategoria: '',
    nombreTipoEN: '',
    nombreTipoES: '',
    idTipoEvento: '',
    programaActividades: '',
    estadoPublicacion: 0,
    fechaCreacion: 0
  };
  constructor(private route: ActivatedRoute, private afs: AngularFirestore, public back: BackendService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.params
    .subscribe( parametros => {
    this.idRecibido = parametros.id;
    console.log(parametros.id);
    this.obtenerInformacion(this.idRecibido);
   });
  }
  obtenerInformacion(idRecibido): void {
    // this.afs.collection('clients', ref => ref.where('key', '==', 'large'));
    this.itemDoc = this.afs.doc<any>('eventos/' + idRecibido);
    this.itemDoc.valueChanges().subscribe(data => {
      console.log(data);
      this.item = data;
      this.item.descripcion = data.descripcion;
      this.fechaFin = data.fechaFin;
      this.fechaInicio = data.fechaInicio;
      this.item.idUsuario = data.idUsuario;
      this.item.imagenPromocional = data.imagenPromocional;
      this.item.institucionOrganizadora = data.institucionOrganizadora;
      this.item.linkPaginaEvento = data.linkPaginaEvento;
      this.item.lugar = data.lugar;
      this.item.nombre = data.nombre;
      this.item.nombreCategoriaEN = data['nombreCategoria-en'];
      this.item.nombreCategoriaES = data['nombreCategoria-es-MX'];
      this.item.idCategoria = data.idCategoria;
      this.item.nombreTipoEN = data['nombreTipo-en'];
      this.item.nombreTipoES = data['nombreTipo-es-MX'];
      this.item.idTipoEvento = data.idTipoEvento;
      this.item.programaActividades = data.programaActividades;




    });


    // console.log(this.item.nombre);

  }

}
