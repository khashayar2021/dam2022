import { Component, OnInit } from '@angular/core';
import { NotebookService } from '../../notebook/notebook.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Notebook } from '../../notebook/notebook';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuItem } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-notebooks',
  templateUrl: './list-notebooks.component.html',
  styleUrls: ['./list-notebooks.component.css']
})
export class ListNotebooksComponent implements OnInit {

  notebook: Notebook[] = [];
  cols: any[] = [];
  items: MenuItem[] =[];
  items2: MenuItem[] =[];
  notas: number[]=[1, 2, 3, 4, 5];
  nota!: any;
  jwt: JwtHelperService = new JwtHelperService();


  selectedNotebook?: Notebook;

  constructor(private notebookService: NotebookService, private activatedRouter: ActivatedRoute , private router: Router) { }

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
      },
      {
        label: "Nota",
        icon: "pi pi-check",
         command: ()  => this.getNota()
      }
    ]


  }

  getNota() {

    this.activatedRouter.params.subscribe(params => {
      let id= params['id']

      if (id) {

        this.notebookService.getNota(id, this.selectedNotebook!.id).subscribe({
          next: resp => {

            if (resp === 0) {
              this.nota = 'Sin corregir'
              Swal.fire('Nota', `El notebook ${this.selectedNotebook?.title} aún está sin corregir`, 'info')
            } else {
              this.nota = resp;
              Swal.fire('Nota', `La nota de en el notebook ${this.selectedNotebook?.title} es de ${this.nota}`, 'info')
            }



            console.log(this.nota);
          }
        })
      }

    })

  }

  verContenido() {

    this.activatedRouter.params.subscribe(params=> {
      let id= params['id']

      if (id) {

        this.router.navigate(['alumnos/notebookview/',id ,this.selectedNotebook?.id])
      }

    })
  }

  findIdUser(): number {
    let token = sessionStorage.getItem('token')!;

    return this.jwt.decodeToken(token).id;
  }

  cargarTusNotebooks() {

    this.activatedRouter.params.subscribe(params=>{
      let id= params['id']

      if (id) {
        this.notebookService.getNotebooksUsuario(id).subscribe({

          next: resp => {

            this.notebook = resp;
          }
        })
      }
      })
  }

}
