import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from '../user';
import { UserService } from '../user.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-unactiveusers',
  templateUrl: './unactiveusers.component.html',
  styleUrls: ['./unactiveusers.component.css']
})
export class UnactiveusersComponent implements OnInit {

  usuarios: User[]=[];
  cols: any[] = [];
  items: MenuItem[] =[];

  selectedUser?: User;

  mostrar:boolean=false;
  constructor(private usuarioService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.usuarioService.getUsersUnActive().subscribe({
      next:(usuarios)=>{
        this.usuarios=usuarios;
        this.mostrar=true;
      }
    });

    this.cols = [
      {field: "das", header: "DAS"},
      {field: "name", header: "Nombre"},
      {field: "surName", header: "Apellido"},
      {field: "projectGroup", header: "Grupo"},
      {field: "email", header: "email"},
      {field: "trainingCenter", header: "Centro"},
      {field: "createAt", header: "Fecha de alta"},

    ]

    this.items = [

      {
        label: "Dar de alta",
        icon: "pi pi-check",
        command: () => this.darAltaUsuario()
      }
    ]
  }


  darAltaUsuario() {
    if (this.selectedUser == undefined) {
      return;
    }

    this.delete(this.selectedUser);
  }


  delete(usuario: User): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Puedes volverlo a desactivar desde el menú de usuarios",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {
          this.usuarioService.delete(usuario).subscribe(
            response => {
              this.usuarios=this.usuarios.filter(usr=> usr !== usuario)
            }
          )
          Swal.fire(
            'Usuario Activado',
          )
      }
    })
  }

}
