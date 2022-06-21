import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notebook } from 'src/app/notebook/notebook';
import { NotebookService } from 'src/app/notebook/notebook.service';
import Swal from 'sweetalert2';
import { Question } from '../question';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-questionedit',
  templateUrl: './questionedit.component.html',
  styleUrls: ['./questionedit.component.css']
})
export class QuestioneditComponent implements OnInit {

  question:Question=new Question;
  notebookId!:number;
  errores:string[]=[];


  constructor(private questionService: QuestionService,private router:Router, private activatedRoute: ActivatedRoute,private notebookService:NotebookService) { }
  ngOnInit(): void {
   this.cargarQuestion();
  }



 cargarQuestion(){
 this.activatedRoute.params.subscribe(params => {
 let id=params['id']
 this.notebookId=params['note']

 if(id){
   this.questionService.getQuestion(id).subscribe((question)=> this.question=question)
 }


 })


 }

  update(): void{

    this.questionService.update(this.question,this.notebookId).subscribe({
      next: question=>{
        this.router.navigate(['/preguntas/notebook/',this.notebookId])
        Swal.fire('Pregunta actualizada', `Pregunta actualizado con éxtio!`, 'success')
      },
      error: err =>{
        this.errores=err.error.errors as string[];
        console.error(err.error.errors)
      }  }   ) }






}
