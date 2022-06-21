import { Component, OnInit } from '@angular/core';
import { Notebook } from '../../notebook/notebook';
import { Question } from '../../notebook/topic/question/question';
import { ActivatedRoute, Router } from '@angular/router';
import { NotebookService } from '../../notebook/notebook.service';
import { QuestionService } from '../../notebook/topic/question/question.service';
import { AnswerService } from 'src/app/notebook/topic/answer/answer.service';
import { Answer } from 'src/app/notebook/topic/answer/answer';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-contenido-notebook',
  templateUrl: './contenido-notebook.component.html',
  styleUrls: ['./contenido-notebook.component.scss']
})
export class ContenidoNotebookComponent implements OnInit {

  notebooks: Notebook[]=[];
  questions: Question[]=[];
  notebook!: Notebook;
  question!: Question;
  notebookId!: number;
  answers:Answer[]=[];
  jwt: JwtHelperService = new JwtHelperService();
  media=0;
  mostrarNota:boolean=false;

  constructor(private answerService: AnswerService,private questionService: QuestionService,private noteBookService:NotebookService,private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.getNotebook();

  this.getPreguntasNotebook();
  }

  cargarPreguntas(){
    this.questionService.getNotebookQuestion(this.notebook.id).subscribe({
      next:(questions)=>{
        this.questions=questions;
      }
    }
    );
   }


   getPreguntasNotebook(): void{
    this.activatedRoute.params.subscribe(params=>{
      this.notebookId= params['id']
      if (this.notebookId){
        this.questionService.getNotebookQuestion(this.notebookId).subscribe((question)=>{
          this.questions=question
          this.ordenarLista(this.questions)

          this.getAnswers(this.questions)
        }  )
        }


      })
    }

    calcularMedia(){
      let contador=0
      this.media=0
      for (let i=0;i<this.answers.length;i++){
        if (this.answers[i]!=null){
          this.media=this.media+this.answers[i].nota!
          contador++
        }else{
        }
      }
      this.media=this.media/contador;
      this.media=Math.round(this.media)
      this.mostrarNota=true;
      console.log(this.media)
    }

    ordenarLista(array: Question[]){
      array.sort(function(a,b){
        if (a.orden > b.orden) {
          return 1;
        }
        if (a.orden < b.orden) {
          return -1;
        }
        // a must be equal to b
        return 0;
      })
  }




  getAnswers(listaPreguntas:Question[]){
      for (let i=0;i<listaPreguntas.length;i++){

        this.answerService.getAnswerByQuestion(listaPreguntas[i].id, this.findIdUser()).subscribe({
          next: resp => {
            this.answers[i] = resp
          }
        })
      }


    }


    getNotebook(): void{
      this.activatedRoute.params.subscribe(params=>{
             let id= params['id']
             if (id){
               this.noteBookService.getNotebook(id).subscribe((notebook)=> this.notebook=notebook )
              }
          })
    }

    findIdUser() {

      return this.jwt.decodeToken(sessionStorage.getItem('token')!).id;
    }

}
