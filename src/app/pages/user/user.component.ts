import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BackendService } from 'src/app/services/backend.service';
import { Usuario } from '../../interfaces/user.interface';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categoria.interface';
import { CategoriaId } from '../inicio/inicio.component';
import { finalize, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  activeLang = 'en';


  reemail: string;
  password: string;
  repasword: string;
  categoriaSeleccionada: any;

  apellido: string;

  fechaNacimientoString = '';
  item: Usuario = {

    ciudad: '',
    cp: '',
    direccion: '',
    email: '',
    especialidadId: '',
    especialidadNombre: '',
    estado: '',
    fechaCreacion: new Date(),
    fechaNacimiento: new Date(),
    nombre: '',
    pais: '',
    telefono: ''
  };

  private categoriasCollection: AngularFirestoreCollection<Categoria>;
  itemscategoria: Observable<CategoriaId[]>;

  // tslint:disable-next-line:max-line-length
  constructor( private auth: AngularFireAuth, private afs: AngularFirestore, private storage: AngularFireStorage, private router: Router, public back: BackendService, private translate: TranslateService) { }

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

  }
  crearItem(id: string): void {


    const current = new Date();
    this.item.nombre = this.item.nombre + ' ' + this.apellido;



    this.item.fechaNacimiento = new Date(this.fechaNacimientoString);


    this.item.fechaCreacion = current;

    console.log(this.categoriaSeleccionada);
    // categoria seleccionada
    this.item.especialidadId = this.categoriaSeleccionada['id'];
    this.item.especialidadNombre = this.categoriaSeleccionada['nombre-en'];
    
    // fecha inicio
 
    console.log(this.item);
    
    const itemDoc = this.afs.doc<Usuario>('usuarios/' + id);
    itemDoc.set(this.item);
    this.back.setUser(id);
    // itemCollection.add(this.item);
    Swal.fire({
        icon: 'success',
        title: 'Usuario creado con éxito',
  
  
      }).then((result) => {
        this.router.navigate(['inicio']);
      });

  }
  signUp(): void {
    // this.authe.auth.signInWithEmailAndPassword(this.email, this.password);
    this.auth.createUserWithEmailAndPassword(this.item.email, this.password).then(data => {
      console.log(data.user.uid);

      this.crearItem(data.user.uid);

    });

  }
}
