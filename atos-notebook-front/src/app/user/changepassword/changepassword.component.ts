import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router,ActivatedRoute } from '@angular/router';
import {Observable,throwError} from 'rxjs';
import { FormularioUsersComponent } from '../formulario-users/formulario-users.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private servicioUsuario:UserService,  private activatedRoute: ActivatedRoute,private router:Router) { }

  usuario:User=new User();


  errores:string[]=[];

  ngOnInit(): void {
    this.cargarUsuario()
    console.log(this.usuario.firstTime)
  }

  updatePassword(){
    this.usuario.firstTime=false;
    this.servicioUsuario.update(this.usuario).subscribe({
      next: usuario=>{
        this.router.navigate(['/users'])
        Swal.fire('Usuario Actualizado', `Usuario ${this.usuario.name} ${this.usuario.surName}  actualizado con éxito!`, 'success')
      },
      error: err =>{
        this.errores=err.error.errors as string[];
        console.error(err.error.errors)
      }
    }
    )
    this.router.navigate(['']);
  }

  cargarUsuario(): void{
    this.activatedRoute.params.subscribe(params=>{
      let id= params['id']
      if (id){
        this.servicioUsuario.getUser(id).subscribe((usuario)=> this.usuario=usuario )
      }
    })
  }

}
