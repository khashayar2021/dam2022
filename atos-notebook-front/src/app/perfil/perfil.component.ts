import { Component, OnInit } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  user!: User;
  errores:string[]=[];
  contrasena!: string;
  jwt: JwtHelperService = new JwtHelperService();

  archivo!: File;

  modal: boolean = false;

  constructor(private usuarioService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuario();
    this.user = new User();

  }

  getFoto(event: any): any {
    const archivoCapturado = event.target.files[0]

    this.archivo = archivoCapturado;

    console.log(this.archivo);

    this.usuarioService.uploadPhoto(this.archivo, this.jwt.decodeToken(sessionStorage.getItem('token')!).id).subscribe({
      next: resp => {
        this.user = resp;
        Swal.fire('Perfe', `Bien: ${this.user.foto}`, 'success')
      }
    })


  }

  abrirModal() {
    this.modal = true;
  }
  cerrarModal() {
    this.modal = false;
  }

  /**
   * Carga los datos del usuario para el formulario del perfil
   */
  cargarUsuario() {

    let id = this.jwt.decodeToken(sessionStorage.getItem('token')!).id;

    this.usuarioService.getUser(id).subscribe({
      next: user => {
        this.user = user;
        delete this.user.userNotebook
      }
      })
  }


  /**
   * Guarda los cambios del perfil
   */
  updatePerfil(): void {

    this.user.password=this.contrasena;

    this.usuarioService.update(this.user).subscribe({

      next: usuario => {

        this.router.navigate(['/perfil'])

        Swal.fire('Perfil Actualizado', 'Su perfil ha sido actualizado', 'success')

      }, error: err => {

        this.errores = err.error.errors as string[];
        console.error(err.error.errors);
      }
    });


  }





}
