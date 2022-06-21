import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Notebook } from '../notebook';
import { NotebookService } from '../notebook.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notebook-list',
  templateUrl: './notebook-list.component.html',
  styleUrls: ['./notebook-list.component.css']
})
export class NotebookListComponent implements OnInit {
  notebooks: Notebook[]=[];
  mostrar:boolean=false;
  notebook:Notebook=new Notebook();

  cols: any[] = [];
  items: MenuItem[] =[];
  items2: MenuItem[] =[];

  selectedNotebook?: Notebook;

  constructor(private noteBookService:NotebookService, private router: Router) { }

  ngOnInit(): void {
    this.cargarNotebooks();

    this.cols = [
      {field: "title", header: "Titulo"},
      {field: "content", header: "Contenido"},
      {field: "description", header: "Objetivos"},
      //{field: "iniciativas.title", header: "Iniciativa"}

    ]

    this.items = [
      {
        label: "Nuevo",
        icon: 'pi pi-fw pi-user-plus',
        command: () => this.crearEditarNotebook(false)
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-user-edit",
        command: () => this.crearEditarNotebook(true)
      },

      {
        label: "Contenido",
        icon: "pi pi-check",
        command: ()  => this.verContenido()
      },
      {
        label: "Ver preguntas",
        icon: "pi pi-eye",
        command: () => this.verPreguntas()
      },

      {
        label: "Clonar",
        icon: "pi pi-clone",
        command: ()  => this.clonarNotebook()
      }
    ]

  }

  clonarNotebook() {
    if (this.selectedNotebook?.id != undefined) {

      this.noteBookService.clone(this.selectedNotebook).subscribe({
        next: resp => {
          Swal.fire('Clonado con éxito', `Se ha clonado con éxito ${this.selectedNotebook?.title}`, 'success')
          this.router.navigate(['/notebook/list'])
        }
      });
      }
  }

  verContenido() {
    if (this.selectedNotebook?.id != undefined) {
    this.router.navigateByUrl('/notebook/' + this.selectedNotebook?.id)
    }
  }

  crearEditarNotebook(editar: boolean) {

    if (editar) {
      if (this.selectedNotebook?.id != null) {

        this.router.navigateByUrl('/notebook/form/' + this.selectedNotebook.id)
      } else {

        return;
      }
    } else {

      this.router.navigateByUrl('/notebook/form/')
    }
  }

  verPreguntas() {
    if (this.selectedNotebook?.id != undefined) {
    this.router.navigateByUrl('/preguntas/notebook/' + this.selectedNotebook?.id)}
  }

  cargarNotebooks(): void{
    this.noteBookService.getNotebooks().subscribe({
      next:(notebooks)=>{
        this.notebooks=notebooks;
        this.mostrar=true;
      }});
}




delete(notebook: Notebook): void {
  Swal.fire({
    title: 'Estas seguro?',
    text: "Este cambio es irreversible!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si!'
  }).then((result) => {
    if (result.isConfirmed) {

        this.noteBookService.delete(notebook).subscribe(
          response => {
            this.notebooks=this.notebooks.filter(usr=> usr !== notebook)
          }
        )
        Swal.fire(
          'Material Borrado',
        )
    }
  })
}




}
