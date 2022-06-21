import { Component, Input, OnInit } from '@angular/core';
import { Notebook } from './notebook';
import { NotebookService } from './notebook.service';
import { Question } from './topic/question/question';
import { QuestionService } from './topic/question/question.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.css']
})
export class NotebookComponent implements OnInit {
  notebooks: Notebook[]=[];
  questions: Question[]=[];
  notebook:Notebook=new Notebook();
  question:Question=new Question();
  mostrar:boolean=false;
 notebookId!:number;

  constructor(private questionService: QuestionService,private noteBookService:NotebookService,private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

  this.getNotebook();

  this.getPreguntasNotebook();

  console.log(this.questions)
  }

  drop(event: CdkDragDrop<Question[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
    console.log(this.questions)
    for (let i=0;i<this.questions.length;i++){
      this.questions[i].orden=i;
    }
    for (let y=0;y<this.questions.length;y++){
      this.update(this.questions[y])
    }
  }


 getPreguntasNotebook(): void{
  this.activatedRoute.params.subscribe(params=>{
    this.notebookId= params['id']
    if (this.notebookId){
      this.questionService.getNotebookQuestion(this.notebookId).subscribe((question)=> {this.questions=question

      this.ordenarLista(this.questions)
      console.log(this.questions)

      }
      )

    }
 })

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






update(pregunta:Question): void{
  this.questionService.update(pregunta,this.notebookId).subscribe({
    next: question=>{
    },
    error: err =>{
    }


  }

  )
}


  getNotebook(): void{
    this.activatedRoute.params.subscribe(params=>{
           let id= params['id']
           if (id){
             this.noteBookService.getNotebook(id).subscribe((notebook)=> this.notebook=notebook )
            }
        })
  }

}










