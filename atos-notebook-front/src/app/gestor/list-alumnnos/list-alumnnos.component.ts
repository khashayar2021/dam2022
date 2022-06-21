import { Component, OnInit } from '@angular/core';
import { User } from '../../user/user';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { IniciativaService } from '../../iniciativa/iniciativa.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Iniciativa } from '../../iniciativa/iniciativa';

@Component({
  selector: 'app-list-alumnnos',
  templateUrl: './list-alumnnos.component.html',
  styleUrls: ['./list-alumnnos.component.css']
})
export class ListAlumnnosComponent implements OnInit {

  users: User[] = [];
  iniciativa!: Iniciativa;
  cols: any[] = [];
  items: MenuItem[] =[];
  items2: MenuItem[] =[];
  displayStyle = "none";

  jwt: JwtHelperService = new JwtHelperService();


  selectedUser?: User;

  constructor(private userService: UserService, private router: Router, private iniService: IniciativaService) { }

  ngOnInit(): void {

    this.getIniciativa();

    this.cols = [
      {field: "das", header: "DAS"},
      {field: "name", header: "Nombre"},
      {field: "surName", header: "Apellido"},
      {field: "projectGroup", header: "Grupo"},
      {field: "email", header: "email"},
      {field: "trainingCenter", header: "Centro"},
      {field: "createAt", header: "Fecha de alta"},
      {field: "notaFinal", header: "Nota"},
    ]

    this.items = [
      {
        label: "Notebooks",
        icon: 'pi pi-fw pi-check',
        command: () => this.verNotebooks()
      }
    ]

  }

  findnIdUser() {
    return this.jwt.decodeToken(sessionStorage.getItem('token')!).id
  }

  getIniciativa() {

    this.iniService.getIniciativaUser(this.findnIdUser()).subscribe({
      next: resp => {
        this.iniciativa = resp

        this.userService.getUsersGestor(this.iniciativa.id).subscribe( {
          next: users => {
            this.users = users
            for (let i = 0; i < this.users.length; i++) {

              this.userService.getNotaMedia(this.users[i].id).subscribe({
                next: resp => {
                  this.users[i].notaFinal = resp;
                }
              })


            }
          }
         })
      }
    })

  }

  verNotebooks() {
    if(this.selectedUser?.id != null) {

      this.router.navigateByUrl('/alumnos/notebooks/' + this.selectedUser?.id)
    }
  }


}
