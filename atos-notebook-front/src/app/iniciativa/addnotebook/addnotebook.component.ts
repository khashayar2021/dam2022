import { Component, NgZone, OnInit } from '@angular/core';
import { Notebook } from 'src/app/notebook/notebook';
import { Iniciativa } from '../iniciativa';
import { IniciativaService } from '../iniciativa.service';
import { NotebookService } from '../../notebook/notebook.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addnotebook',
  templateUrl: './addnotebook.component.html',
  styleUrls: ['./addnotebook.component.css']
})
export class AddnotebookComponent implements OnInit {


  idSelect!:number[];
  iniciativa!: Iniciativa;
  notebooksIn!:Notebook[];
  notebooks!: Notebook[];
  constructor(private iniciativaService:IniciativaService,private notebookService:NotebookService, private router:Router, private activatedRoute: ActivatedRoute,private ngZone: NgZone) {

  }


  ngOnInit(): void {

    this.cargarIniciativa()
    this.loadNotebooksNotIn();
    this.loadNotebooksIn();

  }


  cargarIniciativa(): void{
    this.activatedRoute.params.subscribe(params=>{
      let id= params['id']
      if (id){
        this.iniciativaService.getIniciativa(id).subscribe((iniciativa)=> this.iniciativa=iniciativa

        )
        this.loadNotebooksNotIn()

      }
    })
  }

  addNotebook(): void{
    console.log(this.idSelect[0])
    this.iniciativaService.addNotebook(this.iniciativa, this.idSelect[0]).subscribe({
      next: usuario=>{
        this.router.navigate(['/iniciativas'])
        Swal.fire('Notebook añadido', `Notebook añadido a iniciativa con éxito`, 'success')
      },
      error: err =>{
        console.error(err.error.errors)
      }


    }

    )
  }

  loadNotebooksNotIn(){
    this.activatedRoute.params.subscribe(params=>{
      let id= params['id']
      this.notebookService.getNotebooksNotIn(id).subscribe((response:Notebook[])=>{
        this.notebooks=response;
      });
    })

  }

  loadNotebooksIn(){
    this.activatedRoute.params.subscribe(params=>{
      let id= params['id']
      this.notebookService.getNotebooksIn(id).subscribe((response:Notebook[])=>{
        this.notebooksIn=response;
      });
    })

  }



}
