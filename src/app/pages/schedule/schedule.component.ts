import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { Usuario } from 'src/app/interfaces/user.interface';
import { BackendService } from 'src/app/services/backend.service';
import { Evento } from '../../interfaces/evento.interface';
import { CategoriaId } from '../inicio/inicio.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  mensajeErrorImg = '';
  claseCargaImg = '';
  porcentajeCargaImg: any ;
  submitted = false;
  imgError = false;
  selectedFile = null;
  estadoCargaImg = false;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  categoriaSeleccionada: any;
  tipoSeleccionado: any;
  // fecha inicio
  fechaInicioString = '';
  horaInicioNum = 0;
  minInicioNum = 0;
  // fecha fin
  fechaFinString = '';
  horaFinNum = 0;
  minFinNum = 0;
  activeLang = 'en';

  item: Evento = {
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

  private categoriasCollection: AngularFirestoreCollection<Categoria>;
  itemscategoria: Observable<CategoriaId[]>;


  private tipoEventoCollection: AngularFirestoreCollection<Categoria>;
  tipoEventocategoria: Observable<CategoriaId[]>;
  // tslint:disable-next-line:max-line-length
  constructor(private afs: AngularFirestore, private storage: AngularFireStorage, private router: Router, public back: BackendService, private translate: TranslateService) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.obtenerInformacion();
  }

  obtenerInformacion(): void{

    console.log(navigator.language);
    if (navigator.language.includes('es')){
      this.activeLang = 'es';
    }
    this.translate.setDefaultLang(this.back.lang);



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
  crearItem(): void {


    const current = new Date();

    current.setHours(0);
    current.setMinutes(0);

    current.setSeconds(0);

    current.setMilliseconds(0);

    this.item.fechaCreacion = current.getTime();

    console.log(this.categoriaSeleccionada);
    // categoria seleccionada
    this.item.idCategoria = this.categoriaSeleccionada.id;
    this.item.nombreCategoriaEN = this.categoriaSeleccionada['nombre-en'];
    this.item.nombreCategoriaES = this.categoriaSeleccionada['nombre-es-MX'];

    // categoria seleccionada
    this.item.idTipoEvento = this.tipoSeleccionado.id;
    this.item.nombreTipoEN = this.tipoSeleccionado['nombre-en'];
    this.item.nombreTipoES = this.tipoSeleccionado['nombre-es-MX'];
    // fecha inicio
    const horaInicioSt = this.horaInicioNum.toString();
    const minInicioSt = this.minInicioNum.toString();
    const fechaInicioTS = new Date(this.fechaInicioString + ' ' + horaInicioSt + ':' + minInicioSt);
    this.item.fechaInicio = fechaInicioTS.getTime();
    // fecha fin
    const horaFinSt = this.horaFinNum.toString();
    const minFinSt = this.minFinNum.toString();
    const fechaFinTS = new Date(this.fechaFinString + ' ' + horaFinSt + ':' + minFinSt);
    this.item.fechaFin = fechaFinTS.getTime();


    if (this.item.imagenPromocional === ''){
      this.item.imagenPromocional = 'https://firebasestorage.googleapis.com/v0/b/eventosmedicos-23627.appspot.com/o/Imagen%201.png?alt=media&token=6d1cdb6c-a2b3-4eb0-9964-48cd30f5ab97';
    }
    console.log(this.item);
    const itemCollection = this.afs.collection<any>('eventos');
    itemCollection.add({
      descripcion: this.item.descripcion,
      estadoPublicacion: this.item.estadoPublicacion,
      fechaCreacion: current,
      fechaFin: fechaFinTS,
      fechaInicio: fechaInicioTS,
      idCategoria: this.item.idCategoria,
      idTipoEvento: this.item.idTipoEvento,
      idUsuario: this.item.idUsuario,
      imagenPromocional: this.item.imagenPromocional,
      institucionOrganizadora: this.item.institucionOrganizadora,
      linkPaginaEvento: this.item.linkPaginaEvento,
      lugar: this.item.lugar,
      nombre: this.item.nombre,
      'nombreCategoria-en': this.item.nombreCategoriaEN,
      'nombreCategoria-es-MX': this.item.nombreCategoriaES,
      'nombreTipo-en': this.item.nombreTipoEN,
      'nombreTipo-es-MX': this.item.nombreTipoES,
      programaActividades: this.item.programaActividades

      });
    Swal.fire({
        icon: 'success',
        title: 'Evento creado con éxito',


      }).then((result) => {
        this.router.navigate(['inicio']);
      });

  }
  /*Carga de imagenes */
  getFile(event): void {
    this.imgError = false;


    this.selectedFile = event.target.files[0];
    console.log(event.target.id);
    // this.uploadFile();
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type === 'image/jpeg' ||
        event.target.files[0].type === 'image/png' ||
        event.target.files[0].type === 'image/jpg') {
        console.log('Imagen válida');

        console.log('tamaño válida');
          // this.selectedFile.push(event.target.id = { tevent.target.files[0]});
          // console.log(this.selectedFile);
        if (event.target.files[0].size < 2000000) {//
            console.log('peso válido');
            this.uploadFile(event.target.id);
          } else {
            // Peso inválido

            this.mensajeErrorImg = 'Imagen demasiado grande. Debe pesar menos de ';
            this.imgError = true;

            console.log('peso inválido');
          }

      } else {
        // No es imagen

        this.mensajeErrorImg = 'Formato no válido, debe ser una imagen en .jpg o .png';
        this.imgError = true;

        console.log('No imagen');
        // alert('Error');
        // event.srcElement.value = '';

      }
    }
  }
  uploadFile(nombreImagen: string): void {

    // Activo proceso de carga

    this.estadoCargaImg = true;
    this.claseCargaImg = 'progress-bar progress-bar-primary progress-bar-striped';

    const file = this.selectedFile;
    const filePath = 'clients/' + file.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    this.uploadPercent.subscribe(n => {

      this.porcentajeCargaImg = n;

      console.log(n);
    });
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(
          url => {
            this.item.imagenPromocional = url;
            this.claseCargaImg = 'progress-bar progress-bar-success';
          }
        );
      }
      )
    )
      .subscribe(
        x => console.log(fileRef.getDownloadURL));
  }

}
