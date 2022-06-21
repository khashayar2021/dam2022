import { Component, OnInit } from '@angular/core';
import { Question } from '../question';
import { QuestionService } from '../question.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-questionform',
  templateUrl: './questionform.component.html',
  styleUrls: ['./questionform.component.css']
})
export class QuestionformComponent implements OnInit {
  question: Question= new Question()
  notbookId!:number;
  titulo:string= "Crear Pregunta"
  errores:string[]=[];
  color!:string;


  constructor(private questionService: QuestionService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarquestion()
  }



  cargarquestion(): void{
    this.activatedRoute.params.subscribe(params=>{
      let id= params['id']
      this.notbookId=id;
      // if (id){
      //   this.questionService.getQuestion(id).subscribe((question)=> this.question=question )
      // }
    })
  }

  create(): void{
    console.log(this.question);
    this.questionService.create(this.notbookId,this.question).subscribe({
      next: question =>{
        console.log(question);
        this.router.navigate(['/preguntas/notebook/',this.notbookId])
        Swal.fire('Nueva pregunta', `Pregunta creada con éxito!`, 'success')
      },
      error: err =>{
        this.errores=err.error.errors as string[];
        console.error(err.error.errors);

      }
    }
    )
  }

  update(): void{
    this.questionService.update(this.question,this.notbookId).subscribe({
      next: question=>{
        this.router.navigate(['/questions'])
        Swal.fire('Pregunta actualizada', `Pregunta actualizado con éxtio!`, 'success')
      },
      error: err =>{
        this.errores=err.error.errors as string[];
        console.error(err.error.errors)
      }


    }

    )
  }



}
