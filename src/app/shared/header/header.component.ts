import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { InfoPaginaService } from '../../services/info-pagina.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  email: string;
  password: string;

  constructor( public _servicio: InfoPaginaService, public auth: AngularFireAuth, private router: Router,
               public back: BackendService ) { }

  ngOnInit(): void {
    this.back.isLoggedIn();
  }

  login(): void{
    console.log(this.email + this.password);
    this.auth.signInWithEmailAndPassword(this.email, this.password).then(res => {

      this.closebutton.nativeElement.click();
      this.back.setUser(res.user.uid);
      Swal.fire({
        icon: 'success',
        title: 'Sesión iniciada con éxito',
  
  
      }).then((result) => {
        this.router.navigate(['inicio']);
      });
    }).catch( (error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      
    });
  }
  logout(): void{

    this.auth.signOut();
    this.back.setUser('-1');
  }
  cambiarIdioma(lang): void{

    console.log(lang.target.value);
    this.back.setLanguage(lang.target.value);

  }
}
