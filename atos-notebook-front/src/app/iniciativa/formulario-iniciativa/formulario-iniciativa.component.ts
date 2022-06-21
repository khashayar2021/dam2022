import { Component, OnInit } from '@angular/core';
import { Iniciativa } from '../iniciativa';
import { IniciativaService } from '../iniciativa.service';
import { Router,ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-formulario-iniciativa',
  templateUrl: './formulario-iniciativa.component.html',
  styleUrls: ['./formulario-iniciativa.component.css']
})
export class FormularioIniciativaComponent implements OnInit {

  iniciativas: Iniciativa =new Iniciativa;

  title:string= "Crear iniciativas"

  errores:string[]=[];

  currentDate:any=new Date();

  constructor( private iniciativaService :IniciativaService,private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarIniciativa()

  }
  cargarIniciativa(): void{
    this.activatedRoute.params.subscribe(params=>{
      let id= params['id']
      if (id){
        this.iniciativaService.getIniciativa(id).subscribe((iniciativas)=> this.iniciativas=iniciativas )
      }
    })
  }

  create(): void{
    this.iniciativaService.create(this.iniciativas).subscribe({
      next: iniciativa =>{
        this.router.navigate(['/iniciativas'])
        Swal.fire('Nueva iniciativa', `Iniciativa ${this.iniciativas.title} ${this.iniciativas.description} creado con éxito! `, 'success')
      },
      error: err =>{
        this.errores=err.error.errors as string[];
        console.error(err.error.errors);

      }
    }
    )
  }
  update(): void{
    this.iniciativaService.update(this.iniciativas).subscribe({
      next: iniciativa=>{
        this.router.navigate(['/iniciativas'])
        Swal.fire('Dato Actualizado', `Iniciativa ${this.iniciativas.title} ${this.iniciativas.description}  actualizado con éxtio!`, 'success')
      },
      error: err =>{
        this.errores=err.error.errors as string[];
        console.error(err.error.errors)
      }

    }

    )
  }




}
