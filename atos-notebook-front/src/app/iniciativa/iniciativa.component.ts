import { Component, OnInit } from '@angular/core';
import { Iniciativa } from './iniciativa';
import { IniciativaService } from './iniciativa.service';
import Swal from 'sweetalert2';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-iniciativa',
  templateUrl: './iniciativa.component.html',
  styleUrls: ['./iniciativa.component.css']
})
export class IniciativaComponent implements OnInit {

iniciativas: Iniciativa[]=[];
cols: any[] = [];
items: MenuItem[] = [];
items2: MenuItem[] = [];
mostrar:boolean=false;

selectedIniciativa?: Iniciativa;



  constructor(private iniciativaService :IniciativaService, private router: Router) { }

  ngOnInit(): void {



    this.iniciativaService.getIniciativas().subscribe({
      next:(iniciativas)=>{
        this.iniciativas=iniciativas;
        this.mostrar=true;
      }
    });

    this.cols = [
      {field: "title", header: "Titulo"},
      {field: "description", header: "Descripción"},
      {field: "starDate", header: "Fecha Inicio"},
      {field: "endDate", header: "Fecha Fin"}
    ]

    this.items = [
      {
        label: "Nuevo",
        icon: 'pi pi-fw pi-user-plus',
        command: () => this.crearEditarIniciativa(false)
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-user-edit",
        command: () => this.crearEditarIniciativa(true)
      },
      {
        label: "Dar de baja",
        icon: "pi pi-trash",
        command: () => this.darBajaIniciativa()
      },
      {
        label: "Agregar Notebooks",
        icon: "pi pi-list",
        command: () => this.addNotebook()
      }
    ]

    this.items2 = [
      {
        label: "Iniciativas de baja",
        icon: "pi pi-user-minus",
        command: () => this.router.navigateByUrl('/iniciativas/inactive')
      }
    ]

    }

    crearEditarIniciativa(editar: boolean) {

      if (editar) {
        if(this.selectedIniciativa?.id != null) {

          this.router.navigateByUrl('/iniciativas/form/' + this.selectedIniciativa?.id)
        } else {

          return;
        }
      } else {

        this.router.navigateByUrl('/iniciativas/form/');
      }
    }

    darBajaIniciativa() {

      if (this.selectedIniciativa == undefined) {
        return;
      }

      this.delete(this.selectedIniciativa)
    }


    delete(iniciativa: Iniciativa): void {
      Swal.fire({
        title: 'Estas seguro?',
        text: "Puedes volver a activarla en el menú de auditoria",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si!'
      }).then((result) => {
        if (result.isConfirmed) {

            this.iniciativaService.delete(iniciativa).subscribe(
              response => {
                this.iniciativas=this.iniciativas.filter(usr=> usr !== iniciativa)
              }
            )
            Swal.fire(
              'Iniciativa desactivada',
            )
        }
      })
    }

    addNotebook(){
      if (this.selectedIniciativa == undefined) {
        return;
      }

      this.router.navigateByUrl('/iniciativa/notebook/add/' + this.selectedIniciativa?.id)
    }





  }



