import { Component, OnInit } from '@angular/core';
import { Question } from './question';
import { QuestionService } from './question.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Notebook } from '../../notebook';
import { NotebookService } from '../../notebook.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions: Question[]=[];
  question:Question=new Question;
  notebookId!:number;

  cols: any[] = [];
  items: MenuItem[] =[];
  items2: MenuItem[] =[];
  selectedQuestion?: Question;

  constructor(private questionService: QuestionService,private router:Router, private activatedRoute: ActivatedRoute,private notebookService:NotebookService) { }

  ngOnInit(): void {
   // this.cargarPreguntas();
this.getPreguntasNotebook();

this.cols = [
  {field: "question", header: "Pregunta"},
  {field: "type", header: "Tipo"},
  {field: "color", header: "Color"},
  {field: "size", header: "Tamaño"},
  {field: "file", header: "Fichero"}

]

this.items = [
  {
    label: "Nuevo",
    icon: 'pi pi-fw pi-user-plus',
    command: () => this.crearEditarPregunta(false)
  },
  {
    label: "Editar",
    icon: "pi pi-fw pi-user-edit",
    command: () => this.crearEditarPregunta(true)
  },
  {
    label: "Eliminar",
    icon: "pi pi-trash",
    command: () => this.eliminarPregunta()
  }
]


}

eliminarPregunta() {
  this.delete(this.selectedQuestion!);
}

crearEditarPregunta(editar: boolean) {
  if (editar) {
    if (this.selectedQuestion?.id != null) {

      this.router.navigateByUrl(`/pregunta/edit/${this.selectedQuestion.id}/${this.notebookId}`)
    } else {

      return;
    }

  } else {
    this.router.navigateByUrl(`/pregunta/form/${this.notebookId}`)
  }
}

 cargarPreguntas(){
  this.questionService.getQuestions().subscribe({
    next:(questions)=>{
      this.router.navigate(['/preguntas'])
      this.questions=questions;
    }
  }
  );
 }

getPreguntasNotebook(): void{
  this.activatedRoute.params.subscribe(params=>{
    this.notebookId= params['id']

    if (this.notebookId){
      this.questionService.getNotebookQuestion(this.notebookId).subscribe((question)=> this.questions=question )


    }
 })
}


  delete(question: Question): void {
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

          this.questionService.delete(question.id).subscribe(
            response => {
              this.questions=this.questions.filter(quest=> quest !== question)
            }
          )
          Swal.fire(
            'Pregunta borrada',
          )
      }
    })
  }

  }
