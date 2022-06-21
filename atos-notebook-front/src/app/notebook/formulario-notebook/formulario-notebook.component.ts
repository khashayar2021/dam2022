import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Notebook } from '../notebook';
import { NotebookService } from '../notebook.service';
import { Iniciativa } from '../../iniciativa/iniciativa';
import { IniciativaService } from '../../iniciativa/iniciativa.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-formulario-notebook',
  templateUrl: './formulario-notebook.component.html',
  styleUrls: ['./formulario-notebook.component.css']
})
export class FormularioNotebookComponent implements OnInit {

  idNotebook!:number;

  mostrar:boolean=false;

  idSelect!: number;

  iniciativaSelecionada!: Iniciativa;

  iniciativas!:Iniciativa[];

  notebooks: Notebook =new Notebook;


  titulo:string= "Crear Notebooks";

  iniciativa!:Iniciativa;

  errores:string[]=[];

  constructor(private notebookService:NotebookService,private router:Router, private activatedRoute: ActivatedRoute, private iniciativaService: IniciativaService) { }

  ngOnInit(): void {
  this.cargarNotebook();
  this.cargarIniciativa();




  }

  cargarIniciativa(){
    this.iniciativaService.getIniciativas().subscribe((iniciativa) =>this.iniciativas=iniciativa)
  }

  cargarNotebook(): void{
    this.activatedRoute.params.subscribe(params=>{
      this.idNotebook= params['id']
      if (this.idNotebook){
        this.notebookService.getNotebook(this.idNotebook).subscribe((notebooks)=> this.notebooks=notebooks )
      }
    })
  }

  addIniciativa(iniciativa:Iniciativa,id:number){

    this.iniciativaService.addNotebook(iniciativa,id).subscribe({
      next: response => {

      }
    });
  }

  create(): void{

    var idSelecta: number = this.idSelect;

    this.notebooks.iniciativa=idSelecta


    this.notebookService.create(this.notebooks).subscribe({
      next: respuesta =>{

        this.iniciativaService.getIniciativa(idSelecta).subscribe({
          next: resp  => {
            this.addIniciativa(resp,respuesta.id);
          }
        } )

        this.router.navigate(['/notebook/list'])
        Swal.fire('Nuevo notebook', `Notebook ${this.notebooks.title} ${this.notebooks.description} creado con éxito! `, 'success')
      },
      error: err =>{
        this.errores=err.error.errors as string[];
        console.error(err.error.errors);

      }
    }
    )

  }

  update(): void{

    var idSelecta: number = this.idSelect;

    this.notebooks.iniciativa=idSelecta

    this.notebookService.update(this.notebooks).subscribe({
      next: notebook=>{

        this.iniciativaService.getIniciativa(idSelecta).subscribe({
          next: resp  => {
            this.addIniciativa(resp, this.idNotebook);
          }
        } )

        this.router.navigate(['/notebook/list'])
        Swal.fire('Dato Actualizado', `Notebook ${this.notebooks.title} ${this.notebooks.description}  actualizado con éxtio!`, 'success')
      },
      error: err =>{
        this.errores=err.error.errors as string[];
        console.error(err.error.errors)
      }

    }

    )
  }


}
