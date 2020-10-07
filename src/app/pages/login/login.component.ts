import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor( public auth: AngularFireAuth, private router: Router,
               public back: BackendService ) { }

  ngOnInit(): void {
    this.back.isLoggedIn();
  }

  login(): void{
    console.log(this.email + this.password);
    this.auth.signInWithEmailAndPassword(this.email, this.password).then(res => {


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
}
