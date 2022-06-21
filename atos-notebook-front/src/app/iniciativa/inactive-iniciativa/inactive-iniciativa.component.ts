import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Iniciativa } from '../iniciativa';
import { IniciativaService } from '../iniciativa.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inactive-iniciativa',
  templateUrl: './inactive-iniciativa.component.html',
  styleUrls: ['./inactive-iniciativa.component.css']
})
export class InactiveIniciativaComponent implements OnInit {
  iniciativas: Iniciativa[]=[];
  cols: any[] = [];
  items: MenuItem[] = [];
  items2: MenuItem[] = [];
  mostrar:boolean=false;

  selectedIniciativa?: Iniciativa;

  constructor(private iniciativaService: IniciativaService, private router: Router) { }

  ngOnInit(): void {

    this.iniciativaService.getIniciativasInactive().subscribe({
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
        label: "Activar Iniciativa",
        icon: "pi pi-check",
        command: () => this.activarIniciativa()
      }
    ]


  }
  activarIniciativa(): void {
    throw new Error('Method not implemented.');
  }

  delete(iniciativa: Iniciativa): void {
    Swal.fire({
      title: 'Estas seguro?',
      text: "Puedes volverla a desactivar en el menú de iniciativas",
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
            'Iniciativa activada',
          )
      }
    })
  }


  }


