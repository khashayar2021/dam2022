import { Component, OnInit } from '@angular/core';
import { Notebook } from '../../notebook/notebook';
import { MenuItem } from 'primeng/api';
import { UserService } from '../../user/user.service';
import { Router } from '@angular/router';
import { NotebookService } from '../../notebook/notebook.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-notebooks-list',
  templateUrl: './notebooks-list.component.html',
  styleUrls: ['./notebooks-list.component.css']
})
export class NotebooksListComponent implements OnInit {

  notebook: Notebook[] = [];
  cols: any[] = [];
  items: MenuItem[] =[];
  items2: MenuItem[] =[];
  jwt: JwtHelperService = new JwtHelperService();


  selectedNotebook?: Notebook;

  constructor(private notebookService: NotebookService, private router: Router) { }

  ngOnInit(): void {

    this.cargarTusNotebooks();

    this.cols = [
      {field: "title", header: "Titulo"},
      {field: "content", header: "Contenido"},
      {field: "description", header: "Objetivos"}

    ]

    this.items = [

      {
        label: "Contenido",
        icon: "pi pi-check",
         command: ()  => this.verContenido()
      }
    ]


  }

  verContenido() {
    this.router.navigate(['notebooks/contenido/', this.selectedNotebook?.id])
  }

  findIdUser(): number {
    let token = sessionStorage.getItem('token')!;

    return this.jwt.decodeToken(token).id;
  }

  cargarTusNotebooks() {
    this.notebookService.getNotebooksUsuario(this.findIdUser()).subscribe({

      next: resp => {

        this.notebook = resp;

      }
    })
  }

}
